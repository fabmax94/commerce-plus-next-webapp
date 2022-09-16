import useSWR from "swr";
import { get } from "../libs/api";

export type FetchReturn<T> = {
  data: T;
  error: any;
  isLoading: boolean;
  reValidate: any;
  isValidating: boolean
};

export const useFetch = <D>(url, options = null) : FetchReturn<D> => {
  const fetcher = async (url) => {
    const response = await get(url);
    return response.data;
  };

  const { data, error, mutate, isValidating } = useSWR(url, fetcher, options);

  const isLoading = !data;

  const reValidate = async (dataToRevalidate = null) => {
    return await mutate(dataToRevalidate, !dataToRevalidate);
  };

  return { data, error, isLoading, reValidate, isValidating };
};
