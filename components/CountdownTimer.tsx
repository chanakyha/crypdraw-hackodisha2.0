import React from "react";
import Countdown from "react-countdown";
import { useContract, useContractData } from "@thirdweb-dev/react";
import { ClipLoader } from "react-spinners";

const CountdownTimer = () => {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  const { data: expiration, isLoading: expirationLoading } = useContractData(
    contract,
    "expiration"
  );

  if (expirationLoading)
    return (
      <div className="w-3/2 flex justify-center">
        <ClipLoader color="white" className="mt-2 text-center" />
      </div>
    );
  return (
    <div>
      <Countdown date={new Date(expiration * 1000)} renderer={Renderer} />
    </div>
  );
};

export default CountdownTimer;

interface Props {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}
const Renderer = ({ hours, minutes, seconds, completed }: Props) => (
  <div>
    {completed && <h2>Ticket Sales are Now Closed</h2>}

    <div>
      <h3 className="text-white text-sm mb-2 italic">Time Remaining</h3>
      <div className="flex space-x-6">
        <div className="flex-1">
          <div className={`${completed && "animate-pulse"} countdown`}>
            {hours}
          </div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="flex-1">
          <div className={`${completed && "animate-pulse"} countdown`}>
            {minutes}
          </div>
          <div className="countdown-label">Minutes</div>
        </div>
        <div className="flex-1">
          <div className={`${completed && "animate-pulse"} countdown`}>
            {seconds}
          </div>
          <div className="countdown-label">Seconds</div>
        </div>
      </div>
    </div>
  </div>
);
