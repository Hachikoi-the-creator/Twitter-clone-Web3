import Image from "next/image";
import polygonSvg from "~/assets/polygon.svg";

type Props = { postPermanentTweet: () => void };

export default function PolygonBtn({ postPermanentTweet }: Props) {
  return (
    <button
      className={"p-3 bg-violet-700 cursor-pointer rounded flex gap-2"}
      type="button"
      onClick={postPermanentTweet}
    >
      <Image
        src={polygonSvg}
        width={30}
        height={30}
        alt="polygon web3 icon"
        className="rounded"
      />
    </button>
  );
}
