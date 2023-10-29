"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import EditPayment from "../editpayment/page";
import Swal from "sweetalert2";

type Props = {};

const PaymentEdit = (props: Props) => {
  const [data, setData] = useState<any>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    promptpay: "",
    name: "",
    lastname: "",
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/payment");
        if (response.ok) {
          const result = await response.json();
          setData(result || []);
        } else {
          console.error("ไม่สามารถดึงข้อมูลได้");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
      }
    };

    fetchData();
  }, []);

  const profilePage = () => {
    window.location.href = "/profile";
  };

  const handleEdit = () => {
    setIsEditing(true);
    // โหลดข้อมูลที่มีเพื่อแก้ไข
    if (data && data[0]) {
      setEditedData({
        promptpay: data[0].promptpay,
        name: data[0].name,
        lastname: data[0].lastname,
      });
    }
  };

  const handleSave = () => {
    // ส่งข้อมูลแก้ไขไปยังเซิร์ฟเวอร์
    fetch("http://localhost:8081/payment/653d41ca0a29604ca07efa7a", {
      method: "PUT", // ใช้เมธอด PUT สำหรับการอัปเดตข้อมูล
      headers: {
        "Content-Type": "application/json", // ระบุประเภทข้อมูลเป็น JSON
      },
      body: JSON.stringify(editedData), // แปลงข้อมูลที่แก้ไขเป็น JSON และส่งไปยังเซิร์ฟเวอร์
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ข้อมูลที่แก้ไข:", data); // แสดงข้อมูลที่ได้จากเซิร์ฟเวอร์
        Swal.fire({
          title: "บันทึกสำเร็จ",
          text: "ข้อมูลได้รับการบันทึกเรียบร้อยแล้ว",
          icon: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล:", error);
      });

    setIsEditing(false);
  };

  return (
    <div>
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
                <b className="text-[25px]">ตั้งค่าการชำระเงิน</b>
              </div>
            </div>
            <div className="bg-[#6FC253] mt-11 w-[55px] h-[55px] rounded-[100%] ml-9 flex items-center justify-center">
              {user && user.data && (
                <img
                  onClick={profilePage}
                  className="w-full h-full object-cover rounded-full"
                  src={user.data.image}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <div>
          {data && data[0] && !isEditing && (
            <div className="flex flex-col">
              <div className="flex">
                <b className="text-[18px]">หมายเลข พร้อมเพย์</b>
                <p className="text-[18px] ml-4">{data[0].promptpay}</p>
              </div>
              <div className="flex">
                <b className="text-[18px]">ชื่อ</b>
                <p className="text-[18px] ml-4">{data[0].name}</p>
              </div>
              <div className="flex">
                <b className="text-[18px]">นามสกุล</b>
                <p className="text-[18px] ml-4">{data[0].lastname}</p>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleEdit}
              >
                แก้ไขข้อมูล
              </button>
            </div>
          )}
          {isEditing && (
            <div className="flex flex-col">
              <div className="flex">
                <b className="text-[18px]">หมายเลข พร้อมเพย์</b>
                <input
                  type="text"
                  value={editedData.promptpay}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      promptpay: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex">
                <b className="text-[18px]">ชื่อ</b>
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex">
                <b className="text-[18px]">นามสกุล</b>
                <input
                  type="text"
                  value={editedData.lastname}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      lastname: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleSave}
              >
                บันทึก
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[28px]">ทดสอบ QR</p>
          <EditPayment amount={1} />
        </div>
      </div>
    </div>
  );
};

export default PaymentEdit;
