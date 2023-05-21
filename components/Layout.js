import Head from "next/head";
import Modal from "./Modal";
import Notify from "./Notify";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="description" content="Ita Beauty Shop" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Modal />
      <Notify />
      {children}
    </>
  );
};

export default Layout;
