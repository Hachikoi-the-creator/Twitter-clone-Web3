import { FastifyPluginCallback } from "fastify";
import { generateTweets, populateUsers } from "../controllers/devGenerators";

// todo: add psw system later on
const devRoutes: FastifyPluginCallback = (fastify, options, done) => {
  fastify.get("/ping", async (request, reply) => {
    reply.send("PONG");
  });

  fastify.get("/users", async (request, reply) => {
    try {
      const createdUsers = await populateUsers();
      reply.status(201).send(createdUsers);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error Creating users" });
    }
  });

  fastify.get("/tweets", async (request, reply) => {
    try {
      const createdTweets = await generateTweets();
      reply.status(201).send(createdTweets);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Error Creating users" });
    }
  });

  done();
};

export default devRoutes;
