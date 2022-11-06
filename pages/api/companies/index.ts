import { NextApiRequest, NextApiResponse } from "next";
import { get, post } from "../../../libs/server";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    let response;
    if (_req.method === "POST") {
      response = await post("companies", _req.body);
    } else {
      response = await get("companies");
    }

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
