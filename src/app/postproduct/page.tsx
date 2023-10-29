"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

type Product = {
  image: string;
  productid: string;
  name: string;
  typeid: string;
  dateEnd: string;
  value: number;
  price: number;
};

type User = {
  data: {
    image: string;
  };
};

const PostProduct = () => {
  const profilePage = () => {
    window.location.href = "/profile";
  };

  const [user, setUser] = useState<User | null>(null);
  const [product, setProduct] = useState<Product>({
    image: "",
    productid: "",
    name: "",
    typeid: "",
    dateEnd: "",
    value: 0,
    price: 0,
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const data = JSON.parse(userData);
      setUser(data);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "value" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSave = () => {
    Swal.fire({
      title: "ยืนยันการบันทึก",
      text: "คุณต้องการบันทึกข้อมูลหรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("บันทึกข้อมูล:", product);

        // ส่งข้อมูลไปยัง API
        fetch("http://localhost:8081/product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("ได้รับการตอบรับจาก API:", data);

            // แสดง SweetAlert2 สำเร็จ
            Swal.fire({
              title: "บันทึกสำเร็จ",
              text: "ข้อมูลได้รับการบันทึกเรียบร้อยแล้ว",
              icon: "success",
            });
            // setTimeout(() => {
            //   window.location.reload();
            // }, 500);
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการส่งข้อมูลไปยัง API:", error);

            // แสดง SweetAlert2 ข้อผิดพลาด
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "ไม่สามารถบันทึกข้อมูลได้",
              icon: "error",
            });
          });
      }
    });
  };
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
              <b className="text-[25px]">เพิ่มสินค้า</b>
            </div>
          </div>
          <div className="bg-[#6FC253] mt-11 w-[55px] h-[55px] rounded-[100%] ml-9 flex items-center justify-center">
            {user && (
              <img
                className="rounded-full w-[45px] h-[45px]"
                src={user.data.image}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="flex justify-center mt-6 mr-[45px]">
            <h1 className="text-2xl font-bold mb-4">เพิ่มสินค้า</h1>
          </div>
          <div className="flex items-center">
            <label className="text-lg mr-4">รูปภาพ:</label>
            <input
              type="text"
              name="image"
              className="border p-2 w-full"
              value={product.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center mt-4">
            <label className="text-lg mr-4">ชื่อสินค้า:</label>
            <input
              type="text"
              name="name"
              className="border p-2 w-full"
              value={product.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center mt-4">
            <label className="text-lg mr-4">วันที่สิ้นสุด:</label>
            <input
              type="date"
              name="dateEnd"
              className="border p-2 w-full"
              value={product.dateEnd}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center mt-4">
            <label className="text-lg mr-4">จำนวน:</label>
            <input
              type="number"
              name="value"
              className="border p-2 w-full"
              value={product.value}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center mt-4">
            <label className="text-lg mr-4">ราคา:</label>
            <input
              type="number"
              name="price"
              className="border p-2 w-full"
              value={product.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="bg-blue-500 text-white w-[100px] rounded-[10px] font-semibold p-2 mt-4"
              onClick={handleSave}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProduct;
