"use client";
import React, { useState } from "react";
import EditPayment from "../editpayment/page";
import Image from "next/image";

const PaymentPage = () => {
  const profilePage = () => {
    window.location.href = "/profile";
  };
  const price = localStorage.getItem("totalPrice");
  const cart = JSON.parse(String(localStorage.getItem("cart")));
  const user = JSON.parse(String(localStorage.getItem("user")));

  return (
    <div>
      <div className="bg-[#7CD05F] w-[390px] h-[123px]">
        <div className="flex items-center">
          <div className="mt-14 flex items-center justify-around w-[250px]">
            <div onClick={profilePage}>
              <Image
                src="/Vector2.svg"
                alt="กลับหน้าหลัก"
                width={15}
                height={4}
              />
            </div>
            <div className="ml-5">
              <b className="text-2xl">ชำระเงิน</b>
            </div>
          </div>
          <div className="bg-[#6FC253] mt-11 w-[55px] h-[55px] rounded-full ml-9 flex items-center justify-center">
            <Image src="/bell.svg" alt="กริ่งเตือน" width={25} height={25} />
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg flex justify-center flex-col items-center">
        <EditPayment amount={Number(price)} />
        <div>
          <p>{user.data.name}</p>
        </div>
      </div>
      <div>
        <div className="flex justify-center mt-8">
          <p className="text-2xl">รายการซื้อ</p>
        </div>
        <div className="flex justify-center mt-5">
          <div>
            {cart.map((item: any, index: number) => (
              <div key={index} className="mt-3">
                <div>
                  <p className="text-xl">ชื่อสินค้า {item.name}</p>
                  <span className="text-xl">
                    จำนวน <b>{item.amount}</b>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <span className="text-2xl">
            ราคารวม <b>{price}</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
