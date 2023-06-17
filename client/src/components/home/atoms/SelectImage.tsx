import Image from "next/image";
import uploadIcon from "~/assets/place.png";

type Props = { image: File | null };

export default function SelectImage({ image }: Props) {
  return (
    <>
      {image ? (
        <Image
          src={URL.createObjectURL(image)}
          alt="Selected"
          width={185}
          height={180}
          className="object-fill "
        />
      ) : (
        <Image
          src={uploadIcon}
          alt="Upload Icon"
          width={40}
          height={40}
          className="object-fill"
        />
      )}
    </>
  );
}
