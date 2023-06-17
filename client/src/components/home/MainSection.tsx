import { FormEvent, useState } from "react";
import { ChangeEvent, createRef } from "react";
import Image from "next/image";
import defaultImg from "~/assets/tenshi.jpg";
import SubmitBtn from "./atoms/SubmitBtn";
import PolygonBtn from "./atoms/PolygonBtn";
import SelectImage from "./atoms/SelectImage";
import { writeContract } from "wagmi/actions";
import { abi, contractAdx } from "~/data/contractData";
import { validateTweetData } from "~/utils/validators";

export default function MainSection() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // post to db
  const postNormalTweet = async () => {
    // axios.post(`${baseUrl}/twit-it`);
    try {
      const { msg, imgUrl } = await validateTweetData(image, message);
    } catch (error) {
      console.error(error);
    }
  };

  // post to contract & db
  const postPermanentTweet = async () => {
    try {
      const { msg, imgUrl } = await validateTweetData(image, message);

      await writeContract({
        abi: abi,
        address: contractAdx,
        functionName: "postTweet",
        args: [msg, imgUrl],
      });

      // await postNormalTweet();
    } catch (error) {
      console.error(error);
    }
  };

  // ? form submit - normal tweet post
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.length || !image) {
      console.error("cannot post empty tweet");
      return;
    }
    postNormalTweet();
  };

  const updateImage = (image: File) => {
    setImage(image);
  };

  // image selection
  const inputRef = createRef<HTMLInputElement>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    updateImage(file);
  };

  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <h1 className="text-xl p-3">Home</h1>
      <form onSubmit={handleSubmit} className="flex flex-col px-3">
        <div className="flex gap-3">
          <Image
            src={defaultImg}
            alt="img"
            className="w-14 h-14 rounded-full object-cover"
          />
          <textarea
            className="w-full rounded font-mono text-l p-3 text-black"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            name="tweet message"
            placeholder="Ohayou sekai good morning world!~"
            rows={3}
          />
        </div>
        {/* image & buttons wrapper */}
        <div className="mt-4 flex gap-4">
          <div
            className="ml-auto"
            onClick={handleClickImage}
            role="button"
            tabIndex={0}
          >
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <SelectImage image={image} />
          </div>

          <div className="flex gap-4 justify-end h-14">
            <SubmitBtn />
            <PolygonBtn postPermanentTweet={postPermanentTweet} />
          </div>
        </div>
      </form>
    </>
  );
}
