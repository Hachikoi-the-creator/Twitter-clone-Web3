import { Tweet } from "@prisma/client";
import { prisma } from "..";
import { validateNum } from "../utils/validators";

/******
  Get all tweets from user
 ******/
export const getAllUserTwits = async (id: any) => {
  return await prisma.tweet.findMany({
    where: { user_id: validateNum(id) },
  });
};

/******
  Post a new tweet
 ******/
export async function postNewTweet(
  userId: any,
  content: any,
  imageUrl: any
): Promise<Tweet> {
  const id = validateNum(userId);
  // only got content
  if (typeof content === "string" && typeof imageUrl !== "string") {
    return await postTweet(content, "", id);
  }

  // only got imageUrl
  if (typeof content !== "string" && typeof imageUrl === "string") {
    return await postTweet("", imageUrl, id);
  }

  if (typeof content !== "string" || typeof imageUrl !== "string") {
    throw new Error(
      "Error posting twit, invalid sent data, please only send strings values"
    );
  }

  if (!content.length && !imageUrl.length) {
    throw new Error(
      "Error posting twit, missing data, either send content or imageUrl"
    );
  }

  // has both correctly
  return postTweet(content, imageUrl, id);
}

// * helpers
const postTweet = async (
  content: string,
  image_url: string,
  user_id: number
) => {
  return await prisma.tweet.create({
    data: {
      content,
      image_url,
      user: {
        connect: { id: user_id },
      },
    },
  });
};
