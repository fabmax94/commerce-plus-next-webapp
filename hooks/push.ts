import { useState } from "react";
import { post, put } from "../libs/api";

export const usePush = (uri: string, method: string = "PUT") => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const pushData = async (data) => {
    setIsLoading(true);
    let response;
    if (method === "POST") {
      response = await post(uri, data);
    } else {
      response = await put(uri, data);
    }
    setIsLoading(false);
    const result = response.data;
    setData(result);

    return result;
  };

  return { data, pushData, isLoading };
};
