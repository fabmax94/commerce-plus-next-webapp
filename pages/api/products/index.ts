import { NextApiRequest, NextApiResponse } from "next";
import { post, put } from "../../../libs/server";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = _req.query;
    let response;
    if (_req.method === "POST") {
      response = await post(`products`, _req.body);
    } else {
      response = await put(`products/${id}`, _req.body);
    }

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
