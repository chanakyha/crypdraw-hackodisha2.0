import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Login from "../components/Login";
import Loading from "../components/Loading";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  if (!address) return <Login />;
  if (isLoading) return <Loading />;

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
