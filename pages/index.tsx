import type { NextPage } from "next";
import Layout from "../components/layout";
import styles from "../styles/index/index.module.scss";

const Home: NextPage = () => {
  // Use <Layout> to provide a consistent site format.
  return (
    <Layout>
      {/* Main text input, the big text bar accepting the URL to shroten. */}
      <div className={styles.urlFormInputOuter}>
        <input
          className={styles.urlFormInput}
          type="url"
          autoComplete="off"
          placeholder="Paste a URL"
          name="url"
        />
      </div>

      {/* Left component under the text input - a dropdown accepting different randomized URL types. */}
      <div className={styles.floatLeft}>
        {/* "Title" text rendering above the element. */}
        <p className={styles.dropdownHeader}>URL Type</p>

        <select name="url-mode" className={styles.dropdown} autoComplete="off">
          <option value="alphanumeric">Alphanumeric</option>
          <option value="test">Gfycat Word List</option>
          <option value="test">Zero-Width Spaces</option>
        </select>
      </div>

      {/* Right component under the text input - a text box accepting a custom URL input. */}
      <div className={styles.floatRight}>
        {/* "Title" text rendering above the element. */}
        <p className={styles.dropdownHeader}>Custom URL</p>

        <input
          className={styles.dropdown}
          type="custom-url"
          autoComplete="off"
          placeholder="your-custom-url"
          name="custom-url"
        />
      </div>

      <p className={styles.info}>
        <em>
          Setting a value for &quot;Custom URL&quot; will cause the setting
          &quot;URL Type&quot; to be ignored!
        </em>
      </p>
    </Layout>
  );
};

export default Home;
