import Image from "next/image";
import defaultImg from "~/assets/tenshi.jpg";

type Props = { message: string; updateMessage: (msg: string) => void };

export default function TextAndProfilePic({ message, updateMessage }: Props) {
  return (
    <div className="flex gap-3">
      <Image
        src={defaultImg}
        alt="img"
        className="w-14 h-14 rounded-full object-cover"
      />
      <textarea
        className="w-full rounded font-mono text-xl p-3 text-black"
        value={message}
        onChange={(e) => updateMessage(e.currentTarget.value)}
        name="tweet message"
        placeholder="Ohayou sekai good morning world!~"
        rows={4}
      />
    </div>
  );
}
