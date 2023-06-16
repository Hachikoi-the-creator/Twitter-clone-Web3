import { prisma } from "..";
import { validateNum } from "../utils/validators";

/******
  Get user by id
 ******/
export async function getUserById(id: any) {
  return prisma.user.findUnique({
    where: { id: validateNum(id) },
  });
}

/******
  Post user follow user
 ******/
export async function userFollowUser(follower_id: any, followed_id: any) {
  await prisma.follows.create({
    data: {
      follower: { connect: { id: validateNum(follower_id) } },
      following: { connect: { id: validateNum(followed_id) } },
    },
  });
}

/******
  Update user's pic
 ******/
export async function updateUserPic(userId: any, picLink: any) {
  if (typeof picLink !== "string") throw new Error("invalid picLink");
  if (!picLink.length) throw new Error("invalid picLink lenght");

  return await prisma.user.update({
    where: { id: validateNum(userId) },
    data: { profile_pic: picLink },
  });
}

/******
  POST Create new user
 ******/
export async function createUser(username: any, web3_address: any) {
  const validName = Boolean(username && typeof username === "string");
  const validAdx = Boolean(web3_address && typeof web3_address === "string");

  if (!validName || !validAdx)
    throw new Error("Missing params or invalid types, cannot create user");

  return await prisma.user.create({
    data: {
      profile_pic: process.env.DEFAULT_IMG || "",
      username,
      web3_address,
    },
  });
}
