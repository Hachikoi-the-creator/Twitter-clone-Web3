import { FormEvent, useState } from "react";
import { ChangeEvent, createRef } from "react";
import uploadIcon from "~/assets/place.png";
import polygonSvg from "~/assets/polygon.svg";
import TextAndProfilePic from "./TextAndProfilePic";
import ImageAndButtons from "./ImageAndButtons";
import { uploadImage } from "~/utils/cloudyUpload";
import Image from "next/image";
import defaultImg from "~/assets/tenshi.jpg";
import axios from "axios";

type FormE = FormEvent<HTMLFormElement>;
const baseUrl = process.env.API_URL || "http://localhost:1313";

export default function MainSection() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormE) => {
    e.preventDefault();
    if (!message.length || !image) {
      console.error("cannot post empty tweet");
      return;
    }

    postLogicHelper(message, image, false);
  };

  // * depending on wich button was clicked, the isPermanent bool is set, then we check if theres an image or text and act accordly
  const postLogicHelper = async (
    message: string,
    image: File | null,
    isPermanent: boolean
  ) => {
    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImage(image);
    }

    console.log(message, imageUrl);

    if (isPermanent) {
      // hybrid
      if (imageUrl.length && message.length) {
        postPermanentTweet(message, imageUrl);
      }
      // only message
      else if (message.length) {
        postPermanentTweet(message, "");
      }
      // only image
      else {
        postPermanentTweet("", imageUrl);
      }
    } else {
      // hybrid
      if (imageUrl.length && message.length) {
        postNormalTweet(message, imageUrl);
      }
      // only message
      else if (message.length) {
        postNormalTweet(message, "");
      }
      // only image
      else {
        postNormalTweet("", imageUrl);
      }
    }
  };

  // post to db
  const postNormalTweet = async (message: string, imageUrl: string) => {
    axios.post(`${baseUrl}/twit-it`);
  };

  // post to contract & db
  const postPermanentTweet = async (message: string, imageUrl: string) => {
    postLogicHelper(message, image, true);
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

  const handlePostPermanent = () => {
    postLogicHelper(message, image, true);
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
            className="w-full rounded font-mono text-xl p-3 text-black"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            name="tweet message"
            placeholder="Ohayou sekai good morning world!~"
            rows={4}
          />
        </div>
        {/* <TextAndProfilePic {...{ message, updateMessage }} /> */}
        <div className="mt-4">
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <div
            className=""
            onClick={handleClickImage}
            role="button"
            tabIndex={0}
          >
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt="Selected"
                width={80}
                height={80}
                className="ml-[9vw] w-1/4 object-fill"
              />
            ) : (
              <Image
                src={uploadIcon}
                alt="Upload Icon"
                width={40}
                height={40}
                className="ml-[9vw] object-fill"
              />
            )}
          </div>
          <div className="flex gap-4 justify-end">
            <button className={"p-3 bg-violet-700 cursor-pointer rounded"}>
              Tweet
            </button>
            <button
              className={"p-3 bg-violet-700 cursor-pointer rounded flex gap-2"}
              type="button"
              onClick={handlePostPermanent}
            >
              <Image
                src={polygonSvg}
                width={30}
                height={30}
                alt="polygon web3 icon"
                className="rounded"
              />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
