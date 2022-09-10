import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Login from "../components/Login";
import Loading from "../components/Loading";

const Home: NextPage = () => {
  const address = useAddress();
  const [quantity, setQuantity] = useState(1);
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  if (isLoading) return <Loading />;
  if (!address) return <Login />;

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <Head>
        <title>CrypDraw Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* The Next Draw Box */}
      <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
        <div className="stats-container">
          <h1 className="text-5xl text-white font-semibold text-center">
            The Next Draw
          </h1>
          <div className="flex justify-between p-2 space-x-2">
            <div className="stats">
              <h2 className="text-sm">Total Pool</h2>
              <p className="text-xl">0.1 MATIC</p>
            </div>
            <div className="stats">
              <div className="text-sm">Tickets Remaining</div>
              <p className="text-xl">100</p>
            </div>
          </div>

          {/* Coundown Timer */}
        </div>

        <div className="stats-container space-y-2">
          <div className="stats-containter">
            <div className="flex justify-between items-center text-white pb-2">
              <h2>Price per Ticket</h2>
              <p>0.01 MATIC</p>
            </div>
            <div className="flex text-white items-center space-x-2 bg-primary border border-bor-primary p-4">
              <p>TICKETS</p>
              <input
                type="number"
                min={1}
                max={10}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="flex w-full bg-transparent text-right outline-none"
              />
            </div>
            <div className="space-y-2 mt-5 ">
              <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                <p>Total Cost of Tickets</p>
                <p>0.999</p>
              </div>
              <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                <p>Service Fees</p>
                <p>0.001 MATIC</p>
              </div>
              <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                <p>+ Network Fees</p>
                <p>TBC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Per Ticket Box */}
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
