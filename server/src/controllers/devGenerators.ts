import { Tweet, User } from "@prisma/client";
import { prisma } from "..";

const allTweets = [
  {
    message: "Working thingy LFG",
    imageUrl:
      "https://ipfs.filebase.io/ipfs/bafkreigbqtch7s3qeaeag5pzbkwhq76y2h2yq64idmtrle5vhlguwruzr4",
    address: "0x82a6521D75879372bbe735553f7cc76cAdF54616",
    username: "MainDev",
  },
  {
    message: "pretty cool on-chain tweet!",
    imageUrl:
      "https://ipfs.moralis.io:2053/ipfs/QmQ7ykaYna4Tt73wbhCyp6e2xqKSjR7rjBSKJBbcbRs4bY",
    address: "0xa12AD0b358Edf4D0df7211435e4d6402ab63277F",
    username: "Moralis mod",
  },
  {
    message: "OHAYOU SEKAI GOOD MORNING WORLD!",
    imageUrl: "",
    address: "0xf2e25e11ab66632dae936fc12b5532ea9d0ede9e",
    username: "SupportDev",
  },
];

/******
  POST Create users from data in smart contracts & invented usernames
 ******/
export async function populateUsers() {
  const finalRes: User[] = [];

  for (let i = 0; i < allTweets.length; i++) {
    try {
      const user = await prisma.user.create({
        data: {
          profile_pic: process.env.DEFAULT_IMG || "",
          username: allTweets[i].username,
          web3_address: allTweets[i].address,
        },
      });
      finalRes.push(user);
    } catch (error) {
      console.error(error);
    }
  }

  return finalRes;
}

/******
  POST Post a couple of tweets (users must already exist)
 ******/
export async function generateTweets() {
  const postedTweets: Tweet[] = [];

  const allUsers = await prisma.user.findMany();
  if (allTweets.length !== allUsers.length)
    throw new Error("Not enough users, hit the other endpoint first");

  for (let i = 0; i < allTweets.length; i++) {
    try {
      const tweet = await prisma.tweet.create({
        data: {
          content: allTweets[i].message,
          image_url: allTweets[i].imageUrl,
          user: {
            // * prisma ids start with 1
            connect: { id: i + 1 },
          },
        },
      });

      postedTweets.push(tweet);
    } catch (error) {
      console.error(error);
    }
  }

  return postedTweets;
}
