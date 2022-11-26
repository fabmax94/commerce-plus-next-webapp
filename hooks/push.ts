import { useState } from "react";
import { post, put } from "../libs/api";

export const usePush = (uri: string, method = "POST") => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const pushData = async (data, attempt = 10) => {
    setIsLoading(true);
    let response;
    if (method === "POST") {
      response = await post(uri, data);
    } else {
      response = await put(uri, data);
    }
    if (response.status === 503 && attempt >= 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await pushData(data, attempt - 1);
    }
    setIsLoading(false);
    const result = response.data;
    setData(result);

    return result;
  };

  return { data, pushData, isLoading };
};
