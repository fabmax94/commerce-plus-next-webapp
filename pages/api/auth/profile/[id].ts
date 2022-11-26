import { NextApiRequest, NextApiResponse } from "next";
import { put } from "../../../../libs/server";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = _req.query;
    const response = await put(`users/${id}`, _req.body, _req.cookies);

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
