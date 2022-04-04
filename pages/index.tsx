import type { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import Layout from "../components/layout";
import styles from "../styles/index/index.module.scss";
import { UrlResponse } from "./api/create-url";

type QueryRes = string | string[] | undefined;

var hostname: string | undefined = undefined;

const Home: NextPage = () => {
  const { query } = useRouter();
  // Use <Layout> to provide a consistent site format.
  return (
    <Layout>
      <ResMessage url={query.url} message={query.message} code={query.code} />
      <UrlForm />
    </Layout>
  );
};

function ResMessage({
  url,
  message,
  code,
}: {
  url: QueryRes;
  message: QueryRes;
  code: QueryRes;
}) {
  var theUrl = url?.toString();
  var theMessage = message?.toString();
  var theCode = code?.toString();

  if (
    theUrl === undefined ||
    theMessage === undefined ||
    theCode === undefined
  ) {
    return (
      <p className={styles.info}>
        Your shortened URL will appear here once you create one.
      </p>
    );
  }

  return (
    <div suppressHydrationWarning={true}>
      <h1 className={theCode == "200" ? styles.success : styles.failure}>
        {theCode == "200" ? "Success!" : `Error: ${theCode}`}
      </h1>
      <UrlMessage
        showUrl={theCode == "200"}
        url={theUrl}
        message={theMessage}
      />
    </div>
  );
}

function UrlMessage({
  showUrl,
  url,
  message,
}: {
  showUrl: boolean;
  url: string | undefined;
  message: string;
}) {
  return (
    <div suppressHydrationWarning={true} className="flex">
      {showUrl ? (
        <>
          <p suppressHydrationWarning={true} className={styles.resultText}>
            Your shortened URL is available
          </p>
          <p className={styles.atText}>&nbsp;@&nbsp;</p>
          <p
            suppressHydrationWarning={true}
            className={styles.linkText + " lgbt-animated"}
          >
            {(hostname || (hostname = window.location.hostname)) + "/" + url}
          </p>
        </>
      ) : (
        <p suppressHydrationWarning={true} className={styles.resultText}>
          {message}
        </p>
      )}
    </div>
  );
}

function UrlForm() {
  const createUrl = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // @ts-ignore
    var urlType = event.target.mode.value;

    // @ts-ignore
    if (event.target.custom.value != "") {
      urlType = "Custom";
    }

    const res = await fetch("/api/create-url", {
      body: JSON.stringify({
        // @ts-ignore
        sourceUrl: event.target.url.value,

        urlType: urlType,

        // @ts-ignore
        customUrl: event.target.custom.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    var result: UrlResponse = await res.json();

    // @ts-ignore
    window.location = `/?url=${result.url}&message=${result.message}&code=${res.status}`;
  };

  return (
    <form onSubmit={createUrl}>
      <div>
        {/* Main text input, the big text bar accepting the URL to shroten. */}
        <div className={styles.urlFormInputOuter}>
          <label htmlFor="url" />
          <input
            className={styles.urlFormInput}
            type="text"
            autoComplete="off"
            placeholder="Paste a URL"
            name="url"
            id="url"
          />
        </div>{" "}
        {/* Submit button, actually creates the URL. */}
        <button type="submit" className={styles.urlSubmitButton}>
          Shorten URL
        </button>
      </div>

      {/* Left component under the text input - a dropdown accepting different randomized URL types. */}
      <div className={styles.floatLeft}>
        {/* "Title" text rendering above the element. */}
        <p className={styles.dropdownHeader}>URL Type</p>

        <label htmlFor="mode" />
        <select
          name="mode"
          id="mode"
          className={styles.dropdown}
          autoComplete="off"
        >
          <option value="Alphanumeric">Alphanumeric</option>
          <option value="Gfycat">Gfycat Word List</option>
          <option value="ZWS">Zero-Width Spaces</option>
        </select>
      </div>

      {/* Right component under the text input - a text box accepting a custom URL input. */}
      <div className={styles.floatRight}>
        {/* "Title" text rendering above the element. */}
        <p className={styles.dropdownHeader}>Custom URL</p>

        <label htmlFor="custom" />
        <input
          className={styles.dropdown}
          type="text"
          autoComplete="off"
          placeholder="your-custom-url"
          name="custom"
          id="custom"
        />
      </div>

      <p className={styles.info}>
        <em>
          Setting a value for &quot;Custom URL&quot; will cause the setting
          &quot;URL Type&quot; to be ignored!
        </em>
      </p>
    </form>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  hostname = context.req?.headers?.host;

  return {
    props: {},
  };
}

export default Home;
