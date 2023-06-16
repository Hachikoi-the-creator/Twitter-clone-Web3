import request from "supertest";
import assert from "assert";
import { server } from "../index";

server.listen({ port: 0 }, (err, adx) => {
  if (err) {
    console.error(err.message);
    return;
  }

  request(server.server)
    .post("/twit-it")
    .expect(201)
    .expect("Content-Type", "application/json")
    .expect(function (res) {
      assert(res.body.hasOwnProperty("content"));
      assert(res.body.hasOwnProperty("user"));
    })
    .end(function (err, res) {
      if (err) {
        console.error(err.message);
        return;
      }
    });
});
