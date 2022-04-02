import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>loli.lgbt</title>
        <meta
          content="loli.lgbt - The serious URL shortener."
          property="og:title"
        />
        <meta
          content="Shorten links and get put on an F.B.I. watchlist while you're at it."
          property="og:description"
        />
        <meta content="https://loli.lgbt/" property="og:url" />
        <meta content="#FF0000" data-react-helmet="true" name="theme-color" />
        <meta
          name="description"
          content="Shorten links and get put on an F.B.I. watchlist while you're at it."
        />
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
          <div className="url-form-input-outer">
            <input
              className="url-form-input"
              type="url"
              autoComplete="off"
              placeholder="Paste a URL"
              name="link-url"
            />
          </div>
          <br />
          <div style={{ float: "left" }}>
            <p className="dropdown-header">URL Type</p>
            <select name="url-mode" className="dropdown">
              <option value="alphanumeric">Alphanumeric (A-Za-z0-9)</option>
              <option value="test">Gfycat Word List</option>
              <option value="test">Zero-Width Spaces</option>
            </select>
          </div>

          <div style={{ float: "right" }}>
            <p className="dropdown-header">Custom URL</p>
            <input
              className="dropdown"
              type="custom-url"
              autoComplete="off"
              placeholder="your-custom-url"
              name="custom-link-url"
            />
          </div>
          <br />
          <br />
          <br />
          <p className="info">
            <em>
              Setting a value for &quot;Custom URL&quot; will cause the setting
              &quot;URL Type&quot; to be ignored!
            </em>
          </p>
        </div>

        <div className="sticky-footer">
          <p>Made with</p>
          <p style={{ color: "indianred" }}>&nbsp;&lt;</p>
          <p style={{ color: "slategray" }}>/</p>
          <p style={{ color: "indianred" }}>3&nbsp;</p>
          <p>
            by <a href="https://github.com/Steviegt6/">Tomat</a> | Open source
            on <a href="https://github.com/Steviegt6/loli/">GitHub</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
