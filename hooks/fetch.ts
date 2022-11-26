import useSWR from "swr";
import { get } from "../libs/api";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ContextAuth } from "../contexts/auth";

export type FetchReturn<T> = {
  data: T;
  error: any;
  isLoading: boolean;
  reValidate: any;
  isValidating: boolean;
};

export const useFetch = <D>(url, options = null): FetchReturn<D> => {
  const router = useRouter();
  const { logOut } = useContext(ContextAuth);
  const fetcher = async (url) => {
    const response = await get(url);
    if (response?.data?.statusCode === 401) {
      logOut();
      await router.push("/auth/login");
      return;
    }
    return response.data;
  };

  const { data, error, mutate, isValidating } = useSWR(url, fetcher, options);

  const isLoading = !data;

  const reValidate = async (dataToRevalidate = null) => {
    return await mutate(dataToRevalidate, !dataToRevalidate);
  };

  return { data, error, isLoading, reValidate, isValidating };
};
