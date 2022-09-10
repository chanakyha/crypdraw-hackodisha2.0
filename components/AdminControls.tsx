import React from "react";
import {
  StarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import {
  useContract,
  useContractData,
  useContractCall,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";
import { currency } from "../constants";

const AdminControls = () => {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  const { data: totalCommission } = useContractData(
    contract,
    "operatorTotalCommission"
  );

  const { mutateAsync: drawWinnerTicket } = useContractCall(
    contract,
    "DrawWinnerTicket"
  );
  const { mutateAsync: refundAll } = useContractCall(contract, "RefundAll");
  const { mutateAsync: restartDraw } = useContractCall(contract, "restartDraw");
  const { mutateAsync: withdrawCommission } = useContractCall(
    contract,
    "WithdrawCommission"
  );

  const onDrawWinner = async () => {
    const notification = toast.loading(<b>Picking a Lucky Winner</b>);

    try {
      const data = await drawWinnerTicket([{}]);
      toast.success(<b>A Winner has been selected</b>, { id: notification });
    } catch (e) {
      toast.error(<b>Whoops Something went wrong</b>, { id: notification });
      console.error(e);
    }
  };
  const onRefundAll = async () => {
    const notification = toast.loading(<b>Refunding All...</b>);

    try {
      const data = await refundAll([{}]);
      toast.success(<b>All Refunded Successfully</b>, {
        id: notification,
      });
    } catch (e) {
      toast.error(<b>Whoops Something went wrong</b>, { id: notification });
      console.error(e);
    }
  };
  const onRestartDraw = async () => {
    const notification = toast.loading(<b>Restarting Draw...</b>);

    try {
      const data = await restartDraw([{}]);
      toast.success(<b>Draw Restarted Successfully</b>, {
        id: notification,
      });
    } catch (e) {
      toast.error(<b>Whoops Something went wrong</b>, { id: notification });
      console.error(e);
    }
  };
  const onWithdrawCommission = async () => {
    const notification = toast.loading(<b>Withdrawing Commission...</b>);

    try {
      const data = await withdrawCommission([{}]);
      toast.success(<b>Your Commission has been withdrawn successfully!</b>, {
        id: notification,
      });
    } catch (e) {
      toast.error(<b>Whoops Something went wrong</b>, { id: notification });
      console.error(e);
    }
  };

  return (
    <div className="text-white space-x-2 text-center px-5 py-3 rounded-md border border-emerald-300/20">
      <h2 className="font-bold">Admin Controls</h2>
      <p className="mb-5">
        Total Commission to be withdrawn:{" "}
        {totalCommission
          ? ethers.utils.formatEther(totalCommission?.toString()) +
            ` ${currency}`
          : "..."}
      </p>

      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <button onClick={onDrawWinner} className="admin-button">
          <StarIcon className="admin-icons" /> Draw Winner
        </button>
        <button onClick={onWithdrawCommission} className="admin-button">
          <CurrencyDollarIcon className="admin-icons" />
          Withdraw Commission
        </button>
        <button onClick={onRestartDraw} className="admin-button">
          <ArrowPathIcon className="admin-icons" />
          Restart Draw
        </button>
        <button onClick={onRefundAll} className="admin-button">
          <ArrowUturnDownIcon className="admin-icons" />
          Refund All
        </button>
      </div>
    </div>
  );
};

export default AdminControls;
