import { useEffect } from "react";
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(async () => {
    await router.push("/companies/home");
  }, []);

  return null;
};
export default IndexPage;
