import { NextApiRequest, NextApiResponse } from "next";
import { post } from "../../../libs/server";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(_req.body);
    const response = await post("companies", _req.body);

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
