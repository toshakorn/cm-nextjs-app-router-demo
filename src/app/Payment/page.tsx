"use client";
import React, { useState } from "react";
import EditPayment from "../editpayment/page";
import Image from "next/image";
type Props = {
  amount: number;
  dataList:any;
};
const PaymentPage = (props: Props) => {
  const { amount } = props;
  const [amount2, setAmount] = useState(amount);

  const handleAmountChange = (event: any) => {
    setAmount(parseFloat(event.target.value));
  };
  const profilePage = () =>{
    window.location.href = "/profile";
  }

  return (
    <div>
      <div className="bg-[#7CD05F] w-[390px] h-[123px]">
        <div className="flex items-center">
          <div className=" mt-14 flex items-center justify-around w-[250px]">
            <div onClick={profilePage}>
              <Image
                src="/Vector2.svg"
                alt="กลับหน้าหลัก"
                width={15}
                height={4}
              />
            </div>
            <div className="ml-5">
              <b className="text-[25px]">ชำระเงิน</b>
            </div>
          </div>
          <div className="bg-[#6FC253] mt-11 w-[55px] h-[55px] rounded-[100%] ml-9 flex items-center justify-center">
            <Image src="/bell.svg" alt="กริ่งเตือน" width={25} height={5} />
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">PromptPay QR Code</h1>
        <input
          className="w-full p-2 border rounded-md"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          step="0.01"
        />
        <EditPayment amount={amount2} />
      </div>
    </div>
  );
};

export default PaymentPage;
