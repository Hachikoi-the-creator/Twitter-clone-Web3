// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const pswExists = req.query.psw;
    const correctPsw = req.query.psw === process.env.DEV_PSW;
    const data = req.body;
    console.log(data);

    if (pswExists) {
      // fetch all the post in the smart contract and post them to my db
    }
    return;
  }
  res.status(400);
}
