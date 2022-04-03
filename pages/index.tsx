import type { NextPage } from "next";
import Layout from "../components/layout";

const Home: NextPage = () => {
  // Use <Layout> to provide a consistent site format.
  return (
    <Layout>
      {/* Main text input, the big text bar accepting the URL to shroten. */}
      <div className="url-form-input-outer">
        <input
          className="url-form-input"
          type="url"
          autoComplete="off"
          placeholder="Paste a URL"
          name="url"
        />
      </div>

      {/* Left component under the text input - a dropdown accepting different randomized URL types. */}
      <div className="float-left">
        {/* "Title" text rendering above the element. */}
        <p className="dropdown-header">URL Type</p>

        <select name="url-mode" className="dropdown" autoComplete="off">
          <option value="alphanumeric">Alphanumeric</option>
          <option value="test">Gfycat Word List</option>
          <option value="test">Zero-Width Spaces</option>
        </select>
      </div>

      {/* Right component under the text input - a text box accepting a custom URL input. */}
      <div className="float-right">
        {/* "Title" text rendering above the element. */}
        <p className="dropdown-header">Custom URL</p>

        <input
          className="dropdown"
          type="custom-url"
          autoComplete="off"
          placeholder="your-custom-url"
          name="custom-url"
        />
      </div>

      <p className="info">
        <em>
          Setting a value for &quot;Custom URL&quot; will cause the setting
          &quot;URL Type&quot; to be ignored!
        </em>
      </p>
    </Layout>
  );
};

export default Home;
