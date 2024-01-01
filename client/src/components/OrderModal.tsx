import React, { useState, useEffect } from "react";
import { GrStatusGood } from "react-icons/gr";

const OrderModal = ({
  showOrderModal,
  setShowOrderModal,
}: {
  showOrderModal: boolean;
  setShowOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(5);

  //logic counting from 5 to 0
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (showOrderModal) {
      intervalId = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [showOrderModal]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      setShowOrderModal(false);
    }
  }, [secondsRemaining, setShowOrderModal]);

  return (
    <div style={{ backgroundColor: " rgba(0, 0, 0, 0.5)" }} className=" fixed inset-0 flex justify-center items-center">
      <div className=" bg-white p-12 rounded-lg">
        <div className="flex flex-col items-center">
          <h1 className=" text-2xl mb-5 font-semibold">Order placed successfully!</h1>
          <GrStatusGood size={45} className=" bg-[#2dee56] rounded-full" />
          <p className=" text-xl mt-5">Thank you</p>

          <p className="mt-2 text-slate-500">You will be transferred in {secondsRemaining} seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
