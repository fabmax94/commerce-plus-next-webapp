import { NextApiRequest, NextApiResponse } from "next";
import { get, put } from "../../../../libs/server";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = _req.query;
    let response;
    if (_req.method === "PUT") {
      response = await put(`companies/${id}`, _req.body);
    } else {
      response = await get(`companies/${id}`);
    }

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
