import Head from "next/head";

const siteUrl = "https://loli.lgbt";
const siteTitle = "loli.lgbt - The serious URL shortener.";
const siteDescription = "Shorten URLs whilst being tracked by the FBI.";
const siteColor = "#FF0000";

/**
 * Simple consistent layout for all pages. Provides a header and footer, as well as site metadata.
 * @param param0 The site content, as a React node.
 * @returns A constructed site, incorporating the `children` node alongside a header, footer, and website metadata.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>loli.lgbt</title>
        <meta content={siteTitle} property="og:title" />
        <meta content={siteDescription} property="og:description" />
        <meta content={siteUrl} property="og:url" />
        <meta content={siteColor} data-react-helmet="true" name="theme-color" />
        <meta content={siteDescription} name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* HEADER SHARED BY ALL PAGES */}
        <div className="sticky-header">
          <div className="flex">
            <h1 className="lighter-text">loli.</h1>
            <h1 className="lgbt lgbt-animated">lgbt</h1>
          </div>
          <p className="sub-text">
            <em>
              The <strong>serious</strong> URL shortener.
            </em>
          </p>
        </div>

        {/* ACTUAL PAGE CONTENTS, INBETWEEN HEADER AND FOOTER */}
        <div className="content">{children}</div>

        {/* FOOTER SHARED BY ALL PAGES */}
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
}
