import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a className="text-sm font-medium text-gray-900">About</a>
      </Link>
    </p>
  </Layout>
);
export default IndexPage;
