import Image from "next/image";
import React from "react";

type Props = {};

const EditEmployeeList = (props: Props) => {
  return (
    <div>
      <div className="bg-[#7CD05F] w-[390px] h-[123px]">
        <div className="flex items-center">
          <div className=" mt-14 ml-5 flex items-center justify-around w-[250px]">
            <div>
              <Image
                src="/Vector2.svg"
                alt="กลับหน้าหลัก"
                width={15}
                height={4}
              />
            </div>
            <div className="ml-5">
              <b className="text-[25px]">จัดการข้อมูลพนักงาน</b>
            </div>
          </div>
          <div className="bg-[#6FC253] mt-11 w-[55px] h-[55px] rounded-[100%] ml-9 flex items-center justify-center">
            <Image src="/bell.svg" alt="กริ่งเตือน" width={25} height={5} />
          </div>
        </div>
      </div>
      <div className="bg-[#D9D9D9] w-[390px] h-[609px] mt-16">
        <div className="w-[390px] flex justify-center">
          <Image
            className="mt-[-50px]"
            src="/profile.svg"
            alt="กริ่งเตือน"
            width={129}
            height={129}
          />
        </div>
        <div className="ml-[55px]">
          <div className="mt-[15px]">
            <p>ชื่อจริง</p>
            <input
              type="text"
              className="outline-0	bg-[#D9D9D9]"
              defaultValue={"นาย สมชาย"}
            />
            <hr className="bg-black w-[250px]" />
          </div>
          <div className="mt-[15px]">
            <p>นามสกุล</p>
            <input
              type="text"
              className="outline-0	bg-[#D9D9D9]"
              defaultValue={"ใจดี"}
            />
            <hr className="bg-black w-[250px]" />
          </div>
          <div className="mt-[15px]">
            <p>ชื่อผู้ใช้</p>
            <input
              type="text"
              className="outline-0	bg-[#D9D9D9]"
              defaultValue={"Somchai.J"}
            />
            <hr className="bg-black w-[250px]" />
          </div>
          <div className="mt-[15px]">
            <p>เบอร์มือถือ</p>
            <input
              type="text"
              className="outline-0	bg-[#D9D9D9]"
              defaultValue={"0123456789"}
            />
            <hr className="bg-black w-[250px]" />
          </div>
          <div className="mt-[15px]">
            <p>รหัสผ่านใหม่</p>
            <input
              type="text"
              className="outline-0	bg-[#D9D9D9]"
              placeholder="หากต้องการตั้งรหัสผ่านใหม่ ให้กรอกช่องนี้"
            />
            <hr className="bg-black w-[250px]" />
          </div>
        </div>
        <div className="flex justify-center mt-[80px]">
            <button className="bg-[#A2E18C] w-[142px] h-[56px] rounded-[49px]">บันทึก</button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeList;
