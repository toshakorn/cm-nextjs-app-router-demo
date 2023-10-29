"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {};

const ProfileEdit = (props: Props) => {
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

  const handleInputChange = (key: string, value: string) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      data: {
        ...prevUser.data,
        [key]: value,
      },
    }));
  };

  const ProfilePage = () => {
    window.location.href = "/profile";
  };

  const handleSave = () => {
    // console.log(user.data._id);
    // Assuming you have an API endpoint for updating the user data
    fetch(process.env.NEXT_PUBLIC_API+"/owner/" + user.data._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log(data);  
          console.log("User data updated successfully");
          Swal.fire({
            title: "บันทึกสำเร็จ",
            text: "ข้อมูลได้รับการบันทึกเรียบร้อยแล้ว",
            icon: "success",
          });
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1500);
        } else {
          console.error("Failed to update user data:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <div className="bg-green-500 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-[#7CD05F] w-[390px] h-[123px] flex items-center justify-between px-4">
        <div className="flex items-center">
          <div onClick={ProfilePage} className="mr-5">
            <Image
              src="/Vector2.svg"
              alt="กลับหน้าหลัก"
              width={15}
              height={4}
            />
          </div>
          <div>
            <b className="text-2xl ml-[90px]">จัดการโปรไฟล์</b>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 mt-4 rounded-lg shadow-md w-[390px]">
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
          {user && user.data && (
            <img
              onClick={ProfilePage}
              className="w-full h-full object-cover"
              src={user.data.image}
              alt=""
            />
          )}
        </div>
        {user && user.data && (
          <div className="text-center">
            <div>
              <b className="text-2xl">{user.data.user}</b>
              <p>
                {user.data.name} {user.data.lastname}
              </p>
            </div>
            <div className="mt-4">
              <label className="text-gray-600">เบอร์:</label>
              <input
                type="text"
                value={user.data.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full border rounded p-1"
              />
              <label className="text-gray-600 mt-2"> รูปภาพ :</label>
              <input
                type="text"
                value={user.data.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                className="w-full border rounded p-1"
              />
              <label className="text-gray-600 mt-2">ชื่อ:</label>
              <input
                type="text"
                value={user.data.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full border rounded p-1"
              />
              <label className="text-gray-600 mt-2">นามสกุล:</label>
              <input
                type="text"
                value={user.data.lastname}
                onChange={(e) => handleInputChange("lastname", e.target.value)}
                className="w-full border rounded p-1"
              />
              <label className="text-gray-600 mt-2">Username:</label>
              <input
                type="text"
                value={user.data.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full border rounded p-1"
              />
              <label className="text-gray-600 mt-2">Password:</label>
              <input
                type="text"
                value={user.data.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full border rounded p-1"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEdit;
