import Fastify, { FastifyReply as Res, FastifyRequest as Req } from "fastify";
import { PrismaClient } from "@prisma/client";
import { getAllUserTwits, postNewTweet } from "./controllers/userTweetCtrl";
import {
  createUser,
  getUserById,
  updateUserPic,
  userFollowUser,
} from "./controllers/userCtrl";
import { getTweetsPaginated } from "./controllers/tweetCtrl";
import devRoutes from "./routes/devRoutes";

export const prisma = new PrismaClient();
const server = Fastify();

// Route to check if the server is running
server.get("/ping", async (request, reply) => {
  reply.send(" PONG - Server is running");
});

// * Get all tweets from user
server.get("/user-tweets", async (request: IdParam, reply) => {
  const { id } = request.params;

  try {
    const tweets = await getAllUserTwits(id);
    reply.send(tweets);
  } catch (error) {
    reply.status(500).send({ error: "Error fetching tweets" });
  }
});

// * GET user by id
type IdParam = Req<{ Params: { id: any } }>;
server.get("/:id", async (request: IdParam, reply) => {
  const { id } = request.params;

  try {
    const user = await getUserById(id);
    if (user) {
      reply.send(user);
    } else {
      reply.status(404).send({ error: "user not found" });
    }
  } catch (error) {
    reply.status(500).send({ error: "Error fetching user" });
  }
});

// * GET last 10 tweets & pagination
type PageParam = Req<{ Params: { page: string } }>;
server.get("/all-tweets", async (request: PageParam, reply) => {
  const { page } = request.params;

  try {
    const tweets = await getTweetsPaginated(page);
    reply.send(tweets);
  } catch (error) {
    reply.status(500).send({ error: "Error fetching tweets" });
  }
});

// * POST user_a follow user_b
type IdsBody = Req<{
  Body: { follower_id: string; followed_id: string };
}>;
server.post("/follow-user", async (request: IdsBody, reply) => {
  const { follower_id, followed_id } = request.body;

  try {
    await userFollowUser(followed_id, followed_id);
    reply.send(`${follower_id} now follows ${followed_id}`);
  } catch (error) {
    reply.status(500).send({ error: "Error fetching tweets" });
  }
});

// * POST user makes a tweet
type TweetBody = Req<{
  Body: { content: any; userId: any; imageUrl: any };
}>;
server.post("/tweet-it", async (request: TweetBody, reply) => {
  // let { content, imageUrl } = request.body;
  const { userId, content, imageUrl } = request.body;

  try {
    const newTweet = await postNewTweet(userId, content, imageUrl);
    reply.send(newTweet);
  } catch (error) {
    reply.status(500).send({ error: "Error posting tweet" });
  }
});

// * UPDATE user profile pic
type PicBody = Req<{
  Body: { picLink: any; userId: any };
}>;
server.put("/user-pic", async (request: PicBody, reply) => {
  const { picLink, userId } = request.body;
  try {
    const updatedUser = await updateUserPic(userId, picLink);
    reply.status(201).send(updatedUser);
  } catch (error) {
    reply.status(500).send({ error: "Error fetching tweets" });
  }
});

// * POST user profile pic
type UserData = Req<{
  Body: { username: any; profilePic: any; web3Address: any };
}>;
server.post("/create-user", async (request: UserData, reply) => {
  const { username, web3Address } = request.body;

  try {
    const updatedUser = await createUser(username, web3Address);
    reply.status(201).send(updatedUser);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: "Error Creating user" });
  }
});

// * generate stuff
server.register(devRoutes, { prefix: "/dev" });

// Start the server w IIFC/E (Immediately Invoked Function Call/Expression)
const PORT = process.env.PORT || "1313";
(async () => {
  try {
    await prisma.$connect();
    await server.listen({ port: +PORT });
    console.log(`Server listening on port ${PORT}`);
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
})();

export { server };
