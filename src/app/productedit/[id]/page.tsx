"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";

type Props = {
  params: any;
};

const ProductEdit = ({ params }: Props) => {
  const { id } = params;
  const [data, setData] = useState({
    data: { image: "", name: "", value: "", dateEnd: "", price: "" },
  });
  const [formData, setFormData] = useState({
    image: data.data.image,
    name: data.data.name,
    value: data.data.value,
    dateEnd: data.data.dateEnd,
    price: data.data.price,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "ยืนยันการลบ",
      text: "คุณแน่ใจหรือไม่ที่ต้องการลบสินค้านี้?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        // ถ้าผู้ใช้คลิก "ใช่, ลบ" ให้ทำการลบ
        deleteProduct();
      }
    });
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8081/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          title: "ลบสำเร็จ",
          text: "สินค้าถูกลบเรียบร้อยแล้ว",
          icon: "success",
        });
        setTimeout(() => {
          window.location.href = "/productlist";
        }, 1500);
      } else {
        console.error("ไม่สามารถลบสินค้าได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบสินค้า", error);
    }
  };

  const handleSubmit = async (e: any) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("formData", formData);
      if (response.ok) {
        // อัปเดตข้อมูลสำเร็จ
        Swal.fire({
          title: "บันทึกสำเร็จ",
          text: "ข้อมูลได้รับการบันทึกเรียบร้อยแล้ว",
          icon: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("ไม่สามารถอัปเดตข้อมูลได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/product/" + id);
        if (response.ok) {
          const result = await response.json();
          setData(
            result || { data: { image: "", name: "", value: "", dateEnd: "" } }
          );
          setFormData({
            image: result.data.image,
            name: result.data.name,
            value: result.data.value,
            dateEnd: result.data.dateEnd,
            price: result.data.price,
          });
        } else {
          console.error("ไม่สามารถดึงข้อมูลได้");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
      }
    };

    fetchData();
  }, [id]);
  const [user, setUser] = useState<any>(null);

  const profilePage = () => {
    window.location.href = "/profile";
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    }
  }, []);
  const productlist = () => {
    window.location.href = "/productlist";
  };

  return (
    <div>
      <div className="bg-[#7CD05F] w-[380px] h-[123px]">
        <div className="flex items-center">
          <div className=" mt-14 flex items-center justify-around w-[250px]">
            <div onClick={productlist}>
              <Image
                src="/Vector2.svg"
                alt="กลับหน้าหลัก"
                width={15}
                height={4}
              />
            </div>
            <div className="ml-5">
              <b className="text-[25px]">จัดการสินค้า</b>
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
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-6">
        <div className="flex justify-center">
          <img
            className="w-48 h-48 rounded-full"
            src={data.data.image}
            alt="Product Image"
          />
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            className="p-2 mt-6 border rounded-md w-full"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ชื่อสินค้า"
          />
        </div>
        <div className="flex mt-4">
          <p>จำนวน: </p>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="p-2 border rounded-md ml-2 w-[150px]"
            placeholder="จำนวน"
          />
        </div>
        <div className="flex mt-4">
          <p>ราคา: </p>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border rounded-md ml-2 w-[150px]"
            placeholder="ราคา"
          />
        </div>
        <div className="flex mt-4">
          <p>วันหมดอายุ: </p>
          <input
            type="date"
            name="dateEnd"
            value={formData.dateEnd}
            onChange={handleChange}
            className="p-2 border rounded-md ml-2"
          />
        </div>
        <div className="flex justify-around">
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
          >
            บันทึก
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-md"
          >
            ลบ
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
