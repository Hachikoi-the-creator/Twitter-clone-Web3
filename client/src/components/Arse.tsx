import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { abi, contractAdx } from "~/data/contractData";
import { readContract, writeContract } from "wagmi/actions";

export default function Arse() {
  const { address } = useAccount();

  // const { data, isError, isLoading } = useContractRead({
  const getFirstTweet = async () => {
    const res = await readContract({
      address: contractAdx,
      abi: abi,
      functionName: "addressToTweets",
      args: [address, 0],
    });
    console.log(res);
  };

  const postOhayouTweet = async () => {
    const res = await writeContract({
      address: contractAdx,
      abi: abi,
      functionName: "postTextTweet",
      args: ["OHAYOU SEKAI GOOD MORNING WORLD!"],
    });
    console.log(res);
  };
  console.log(address);

  return (
    <div>
      <h1>Dicks</h1>
      <ConnectButton />
      <button onClick={getFirstTweet}>Get Num</button>
      <hr />
      <button onClick={postOhayouTweet}>update</button>
    </div>
  );
}
