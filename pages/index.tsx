import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { useAddress } from "@thirdweb-dev/react";
import Login from "../components/Login";

const Home: NextPage = () => {
  const address = useAddress();

  if (!address) {
    return <Login />;
  }

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <Head>
        <title>CrypDraw Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  );
};

export default Home;
