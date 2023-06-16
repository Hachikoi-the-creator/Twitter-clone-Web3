const oldContractData = [
  {
    message: "Working thingy LFG",
    imageUrl:
      "https://ipfs.filebase.io/ipfs/bafkreigbqtch7s3qeaeag5pzbkwhq76y2h2yq64idmtrle5vhlguwruzr4",
    address: "0x82a6521D75879372bbe735553f7cc76cAdF54616",
  },
  {
    message: "pretty cool on-chain tweet!",
    imageUrl:
      "https://ipfs.moralis.io:2053/ipfs/QmQ7ykaYna4Tt73wbhCyp6e2xqKSjR7rjBSKJBbcbRs4bY",
    address: "0xa12AD0b358Edf4D0df7211435e4d6402ab63277F",
  },
];

const newContractData = [
  {
    message: "OHAYOU SEKAI GOOD MORNING WORLD!",
    imageUrl: "",
    address: "0xf2e25e11ab66632dae936fc12b5532ea9d0ede9e",
  },
];

export const userames = ["MainDev", "Moralis mod", "SupportDev"];

export const allTweets = oldContractData
  .concat(newContractData)
  .map((e, i) => ({ ...e, username: userames[i] }));
