import Image from "next/image";
import { ChangeEvent, createRef } from "react";
import uploadIcon from "~/assets/place.png";
import polygonSvg from "~/assets/polygon.svg";

type Props = {
  image: File | null;
  updateImage: (image: File) => void;
  postPermanent: () => void;
};

export default function ImageUpload(props: Props) {
  const { image, updateImage, postPermanent } = props;
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
    <div className="mt-4">
      <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <div className="" onClick={handleClickImage} role="button" tabIndex={0}>
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
          onClick={postPermanent}
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
  );
}
