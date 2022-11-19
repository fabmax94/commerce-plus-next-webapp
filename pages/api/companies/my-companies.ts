import { NextApiRequest, NextApiResponse } from "next";
import { get } from "../../../libs/server";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await get("companies/my-companies", _req.cookies);

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
