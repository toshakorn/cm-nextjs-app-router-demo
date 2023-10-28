"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

const Profile = (props: Props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    }
  }, []);

  const logout = () => {
    window.location.href = "/";
    localStorage.removeItem("user");
    localStorage.clear();
  };

  const productList = () => {
    window.location.href = "/productlist";
  };

  const ProfileEdit = () => {
    window.location.href = "/profileEdit";
  };

  const productdateend = () => {
    window.location.href = "/productdateend";
  };

  const PaymentEdit = () =>{
    window.location.href = "/PaymentEdit"
  }

  const sellProduct = () =>{
    window.location.href = "/sellProduct"
  }

  return (
    <div className="w-[390px] h-[844px]">
      <div className="bg-[#7CD05F] w-[554px] left-[-90px] h-[554px] rounded-[100%] absolute top-[-205px] -z-10"></div>
      <div className="mt-12 w-full flex justify-center">
        <b className="text-[25px]">Profile</b>
      </div>
      <div className="w-[390px] flex flex-col items-center">
        <div>
          {user && user.data && (
            <img
              className="w-[129px] h-[129px] rounded-[100%]"
              src={user.data.image}
              alt=""
            />
          )}
        </div>
        <div className="flex flex-col items-center">
          {user && user.data && (
            <div>
              <b className="text-[29px]">{user.data.email}</b>
              <p>
                {user.data.name} {user.data.lastname}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12">
          <div onClick={ProfileEdit} className="w-[300px] mt-7">
            <p className="text-[25px]">ตั้งค่าโปรไฟล์</p>
            <hr />
          </div>
          <div onClick={productdateend} className="w-[300px] mt-7">
            <p className="text-[25px]">รายการสินค้าไกล้หมดอายุ</p>
            <hr />
          </div>
          <div onClick={PaymentEdit} className="w-[300px] mt-7">
            <p className="text-[25px]">ตั้งค่าสลีปจ่ายเงิน - ธนาคาร</p>
            <hr />
          </div>
          <div onClick={productList} className="w-[300px] mt-7">
            <p className="text-[25px]">รายการสินค้า</p>
            <hr />
          </div>
          <div onClick={sellProduct} className="w-[300px] mt-7">
            <p className="text-[25px]">ขายรายการสินค้า</p>
            <hr />
          </div>
          <div onClick={logout} className="w-[300px] mt-7">
            <p className="text-[25px] text-red-600">ออกจากระบบ</p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
