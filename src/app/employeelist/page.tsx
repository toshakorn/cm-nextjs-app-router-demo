import Image from "next/image";
import React from "react";

type Props = {};

const EmployeeList = (props: Props) => {
  return (
    <div className="bg-white w-[390px] h-[123px]">
      <div className="bg-[#7CD05F] w-[390px] h-[123px]">
        <div className="flex items-center">
          <div className=" mt-14 flex items-center justify-around w-[250px]">
            <div>
              <Image
                src="/Vector2.svg"
                alt="กลับหน้าหลัก"
                width={15}
                height={4}
              />
            </div>
            <div className="ml-5">
              <b className="text-[25px]">จัดการพนักงาน</b>
            </div>
          </div>
          <div className="bg-[#6FC253] mt-11 w-[55px] h-[55px] rounded-[100%] ml-9 flex items-center justify-center">
            <Image src="/bell.svg" alt="กริ่งเตือน" width={25} height={5} />
          </div>
        </div>
      </div>
      <div className="mt-8 w-[390px] h-[652px] bg-[#D9D9D9]">
        <div className="bg-white h-[132px]">
          <div className="flex">
            <div className="ml-[15px]">
              <Image
                src="/profile.svg"
                alt="กริ่งเตือน"
                width={65}
                height={65}
              />
            </div>
            <div className="ml-[15px]">
              <p className="text-[25px]">นาย ชมชาย ใจดี</p>
              <p>ชื่อผู้ใช้: somchai.J</p>
              <p>เบอร์มือถือ: 0123456789</p>
            </div>
          </div>
          <div className="flex justify-end mt-2 mr-[15px]">
            <button className="w-[87px] mr-[15px] h-[30px] bg-[#C84242] rounded-[45px]">
              ลบพนักงาน
            </button>
            <button className="w-[87px] h-[30px] bg-[#6FC253] rounded-[45px]">
              แก้ไข
            </button>
          </div>
        </div>
        <div className="bg-white h-[132px] mt-2">
          <div className="flex">
            <div className="ml-[15px]">
              <Image
                src="/profile.svg"
                alt="กริ่งเตือน"
                width={65}
                height={65}
              />
            </div>
            <div className="ml-[15px]">
              <p className="text-[25px]">นาย ชมชาย ใจดี</p>
              <p>ชื่อผู้ใช้: somchai.J</p>
              <p>เบอร์มือถือ: 0123456789</p>
            </div>
          </div>
          <div className="flex justify-end mt-2 mr-[15px]">
            <button className="w-[87px] mr-[15px] h-[30px] bg-[#C84242] rounded-[45px]">
              ลบพนักงาน
            </button>
            <button className="w-[87px] h-[30px] bg-[#6FC253] rounded-[45px]">
              แก้ไข
            </button>
          </div>
        </div>
        <div className="bg-white h-[132px] mt-2">
          <div className="flex">
            <div className="ml-[15px]">
              <Image
                src="/profile.svg"
                alt="กริ่งเตือน"
                width={65}
                height={65}
              />
            </div>
            <div className="ml-[15px]">
              <p className="text-[25px]">นาย ชมชาย ใจดี</p>
              <p>ชื่อผู้ใช้: somchai.J</p>
              <p>เบอร์มือถือ: 0123456789</p>
            </div>
          </div>
          <div className="flex justify-end mt-2 mr-[15px]">
            <button className="w-[87px] mr-[15px] h-[30px] bg-[#C84242] rounded-[45px]">
              ลบพนักงาน
            </button>
            <button className="w-[87px] h-[30px] bg-[#6FC253] rounded-[45px]">
              แก้ไข
            </button>
          </div>
        </div>
        <div className="bg-white h-[132px] mt-2">
          <div className="flex">
            <div className="ml-[15px]">
              <Image
                src="/profile.svg"
                alt="กริ่งเตือน"
                width={65}
                height={65}
              />
            </div>
            <div className="ml-[15px]">
              <p className="text-[25px]">นาย ชมชาย ใจดี</p>
              <p>ชื่อผู้ใช้: somchai.J</p>
              <p>เบอร์มือถือ: 0123456789</p>
            </div>
          </div>
          <div className="flex justify-end mt-2 mr-[15px]">
            <button className="w-[87px] mr-[15px] h-[30px] bg-[#C84242] rounded-[45px]">
              ลบพนักงาน
            </button>
            <button className="w-[87px] h-[30px] bg-[#6FC253] rounded-[45px]">
              แก้ไข
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-4 mr-3">
          <button className="w-[65px] h-[65px] bg-[#6FC253] rounded-full flex items-center justify-center"><p className="text-[45px] text-white">+</p></button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
