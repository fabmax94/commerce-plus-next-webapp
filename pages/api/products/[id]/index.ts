import { NextApiRequest, NextApiResponse } from "next";
import { put, remove } from "../../../../libs/server";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = _req.query;
    let response;
    if (_req.method === "DELETE") {
      response = await remove(`products/${id}`, _req.cookies);
    } else {
      response = await put(`products/${id}`, _req.body);
    }

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "500mb",
    },
  },
};

export default handler;
