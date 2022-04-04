import { NextPage, NextPageContext } from "next";
import Layout from "../components/layout";
import { store } from "./api/create-url";

const UrlRedirect: NextPage = () => {
  // Use <Layout> to provide a consistent site format.
  return (
    <Layout>
      <p>Automatically directing...</p>
      <p>If you were not redirected, then this link is invalid. Either it no longer exists or never existed.</p>
    </Layout>
  );
};

export function getServerSideProps(context: NextPageContext) {
  const urlReq = context.req?.url?.substring(1);

  if (store.urls.some((url) => url.shortenedUrl === urlReq)) {
    var storedUrl = store.urls.find((url) => url.shortenedUrl === urlReq);

    return {
      redirect: {
        destination: storedUrl!.originalUrl,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default UrlRedirect;
