import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>loli.lgbt</title>
        <meta content="loli.lgbt - *The* ***serious*** *URl shortener.*" property="og:title" />
        <meta content="Shorten links and get put on an F.B.I. watchlist while you're at it." property="og:description" />
        <meta content="https://loli.lgbt/" property="og:url" />
        <meta content="#FF0000" data-react-helmet="true" name="theme-color" />
        <meta name="description" content="Shorten links and get put on an F.B.I. watchlist while you're at it." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="sticky-header">
          <div className="header">
            <h1 style={{ fontWeight: "lighter" }}>loli.</h1>
            <h1 className="lgbt lgbt-animated">lgbt</h1>
          </div>
          <p style={{ marginTop: "-20px" }}>
            <em>
              The <strong>serious</strong> URL shortener.
            </em>
          </p>
        </div>

        <div className="content">
          <form action="/create-url" method="POST">
            <div className="url-form-input-outer">
              <input
                className="url-form-input"
                type="url"
                autoComplete="off"
                placeholder="Paste a URL"
                name="link-url"
              />
            </div>
            {/* <label for="url">Name</label>
            <input id="url" type="text" required />
            <button type="submit">Create</button> */}
          </form>
        </div>

        <div className="sticky-footer">
          <p>
            Made without &lt;3 by{" "}
            <a href="https://github.com/Steviegt6/">Tomat</a> | Fully
            open-source on{" "}
            <a href="https://github.com/Steviegt6/loli/">GitHub</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
