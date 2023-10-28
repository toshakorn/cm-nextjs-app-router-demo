import React from "react";
import Image from "next/image";
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="w-[390px] h-[844px]">
      <div className="bg-[#7CD05F] w-[554px] left-[-90px] h-[554px] rounded-[100%] absolute top-[-205px] -z-10"></div>
      <div className="mt-12 flex items-center">
        <div className="flex items-center">
          <img
            className="w-[67px] h-[67px] rounded-[100%]"
            src="https://t4.ftcdn.net/jpg/05/62/99/31/360_F_562993122_e7pGkeY8yMfXJcRmclsoIjtOoVDDgIlh.jpg"
            alt=""
          />
          <div className="ml-5">
            <p>Welcome admin</p>
            <b className="text-[25px]">DASHBOARD</b>
          </div>
        </div>
        <div className="bg-[#6FC253] w-[55px] h-[55px] rounded-[100%] ml-9 flex items-center justify-center">
          <Image src="/bell.svg" alt="กริ่งเตือน" width={25} height={5} />
        </div>
      </div>
      <div className="w-[337px] h-[205px] bg-[#CFE3CD] ml-2 mt-6 rounded-[20px]"></div>
      <div>
        <div className="flex justify-center">
          <h1 className="mr-6 mt-6 text-[24px]">Timeline</h1>
        </div>
        <div className="ml-2">
          <div className="w-[340px] h-[83px] bg-[#F0F0F0] flex items-center rounded-[9px] justify-between">
            <div className="ml-4">
              <p className="text-[8px] text-[#787878]">02/02/22 12:00</p>
              <p className="text-[#007805]">จ่ายเงินแล้ว</p>
              <p className="text-[#787878]">รายการสั่งซื้อ 27789</p>
            </div>
            <div className="mr-4">
              <p className="text-[#007805]">200</p>
              <p className="text-[#007805]">บาท</p>
            </div>
          </div>
          <div className="w-[340px] h-[83px] bg-[#F0F0F0] flex items-center mt-3 rounded-[9px] justify-between">
          <div className="ml-4">
              <p className="text-[8px] text-[#787878]">02/02/22 12:00</p>
              <p className="text-[#007805]">จ่ายเงินแล้ว</p>
              <p className="text-[#787878]">รายการสั่งซื้อ 27789</p>
            </div>
            <div className="mr-4">
              <p className="text-[#007805]">200</p>
              <p className="text-[#007805]">บาท</p>
            </div>
          </div>
          <div className="w-[340px] h-[83px] bg-[#F0F0F0] flex items-center mt-3 rounded-[9px] justify-between">
          <div className="ml-4">
              <p className="text-[8px] text-[#787878]">02/02/22 12:00</p>
              <p className="text-[#007805]">จ่ายเงินแล้ว</p>
              <p className="text-[#787878]">รายการสั่งซื้อ 27789</p>
            </div>
            <div className="mr-4">
              <p className="text-[#007805]">200</p>
              <p className="text-[#007805]">บาท</p>
            </div>
          </div>
          <div className="w-[340px] h-[83px] bg-[#F0F0F0] flex items-center mt-3 rounded-[9px] justify-between">
          <div className="ml-4">
              <p className="text-[8px] text-[#787878]">02/02/22 12:00</p>
              <p className="text-[#007805]">จ่ายเงินแล้ว</p>
              <p className="text-[#787878]">รายการสั่งซื้อ 27789</p>
            </div>
            <div className="mr-4">
              <p className="text-[#007805]">200</p>
              <p className="text-[#007805]">บาท</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
