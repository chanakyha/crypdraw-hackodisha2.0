import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import toast from "react-hot-toast";
import Header from "../components/Header";
import {
  useAddress,
  useContract,
  useContractData,
  useContractCall,
} from "@thirdweb-dev/react";
import Login from "../components/Login";
import Loading from "../components/Loading";
import { BarLoader } from "react-spinners";
import { ethers } from "ethers";
import { currency } from "../constants";
import CountdownTimer from "../components/CountdownTimer";

const Home: NextPage = () => {
  const address = useAddress();
  const [quantity, setQuantity] = useState(1);
  const [userTickets, setUserTickets] = useState(0);
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  const { data: remainingTickets, isLoading: remainingTicketsLoading } =
    useContractData(contract, "RemainingTickets");

  const { data: currentWinningReward, isLoading: currentWinningRewardLoading } =
    useContractData(contract, "CurrentWinningReward");

  const { data: ticketPrice, isLoading: ticketPriceLoading } = useContractData(
    contract,
    "ticketPrice"
  );

  const { data: ticketCommission, isLoading: ticketCommissionLoading } =
    useContractData(contract, "ticketCommission");

  const { data: expiration, isLoading: expirationLoading } = useContractData(
    contract,
    "expiration"
  );
  const { data: tickets, isLoading: ticketsLoading } = useContractData(
    contract,
    "getTickets"
  );

  const { mutateAsync: BuyTickets } = useContractCall(contract, "BuyTickets");

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;

    const noOfUserTickets = totalTickets.reduce((total, ticketAddress) => {
      console.log(address, "🤟", ticketAddress);
      return ticketAddress == address ? total + 1 : total;
    }, 0);

    setUserTickets(noOfUserTickets);
  }, [address]);

  if (isLoading) return <Loading />;
  if (!address) return <Login />;

  const buyTickets = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading(<b>Buying Your Tickets</b>);

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ]);

      toast.success(<b>Success</b>, { id: notification });
      setQuantity(1);
    } catch (e) {
      toast.error(<b>Failed to Buy Tickets</b>, {
        id: notification,
      });
      console.error(e);
    }
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <Head>
        <title>CrypDraw Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex-1">
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
                <p className="text-xl">
                  {currentWinningRewardLoading ? (
                    <Loader />
                  ) : (
                    ethers.utils.formatEther(currentWinningReward.toString()) +
                    ` ${currency}`
                  )}
                </p>
              </div>
              <div className="stats">
                <div className="text-sm">Tickets Remaining</div>
                <p className="text-xl">
                  {remainingTicketsLoading ? (
                    <Loader />
                  ) : (
                    remainingTickets?.toNumber()
                  )}
                </p>
              </div>
            </div>

            {/* Coundown Timer */}
            <div className="mt-5 mb-3">
              <CountdownTimer />
            </div>
          </div>

          <div className="stats-container space-y-2">
            <div className="stats-containter">
              <div className="flex justify-between items-center text-white pb-2">
                <h2>Price per Ticket</h2>
                <p>
                  {ticketPriceLoading ? (
                    <Loader />
                  ) : (
                    ethers.utils.formatEther(ticketPrice.toString()) +
                    ` ${currency}`
                  )}
                </p>
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
                  <p>
                    {ticketPriceLoading ? (
                      <Loader />
                    ) : (
                      Number(
                        ethers.utils.formatEther(ticketPrice?.toString())
                      ) * quantity
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>Service Fees</p>
                  <p>
                    {ticketCommissionLoading ? (
                      <Loader />
                    ) : (
                      ethers.utils.formatEther(ticketCommission.toString()) +
                      ` ${currency}`
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>
              {expirationLoading && remainingTicketsLoading ? (
                <Loader />
              ) : (
                <button
                  disabled={
                    expiration?.toString() < Date.now().toString() ||
                    remainingTickets?.toNumber() === 0
                  }
                  onClick={buyTickets}
                  className="mt-5 font-semibold w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:to-gray-600 disabled:text-gray-100 disabled:cursor-not-allowed"
                >
                  Buy {quantity} Tickets for{" "}
                  {ticketPrice &&
                    Number(ethers.utils.formatEther(ticketPrice?.toString())) *
                      quantity}{" "}
                  {currency}
                </button>
              )}
            </div>
            {userTickets > 0 && (
              <div className="stats">
                <p>You Have {userTickets} Tickets in this Draw</p>
                <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
                  {!ticketsLoading ? (
                    Array(userTickets)
                      .fill("")
                      .map((_, index) => (
                        <p
                          className="text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0 text-xs italic items-center justify-center"
                          key={index}
                        >
                          {index + 1}
                        </p>
                      ))
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Loader = () => <BarLoader color="white" className="mt-2" />;

export default Home;
