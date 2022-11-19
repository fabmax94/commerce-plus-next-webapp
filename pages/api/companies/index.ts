import { NextApiRequest, NextApiResponse } from "next";
import { get, post } from "../../../libs/server";

function loadUrl(type: any): string {
  return type ? `companies?type=${type.toString().toUpperCase()}` : "companies";
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { type } = _req.query;
    let response;
    if (_req.method === "POST") {
      response = await post("companies", _req.body, _req.cookies);
    } else {
      response = await get(loadUrl(type));
    }

    res.status(200).json(response.data);
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
