"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  data: any[];
};

const ProductDateEnd = (props: Props) => {
  const [data, setData] = useState(props.data || []);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API+"/product");
      if (response.ok) {
        const result = await response.json();
        const products = result || [];
        // แปลงวันหมดอายุเป็นวัตถุ Date
        const today = new Date();
        products.forEach((product: any) => {
          product.dateEnd = new Date(product.dateEnd);
        });

        // เรียงลำดับรายการสินค้า
        products.sort((a: any, b: any) => a.dateEnd - b.dateEnd);

        setData(products);
      } else {
        console.error("ไม่สามารถดึงข้อมูลได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
    }
  };

  const editProduct = (id: any) => {
    window.location.href = "/productedit/" + id;
  };
  const profilePage = () => {
    window.location.href = "/profile";
  };

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
              <b className="text-[25px]">สินค้าไกล้หมดอายุ</b>
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
        {data.map((product: any) => (
          <div
            onClick={() => editProduct(product._id)}
            className="flex items-center mt-5"
            key={product._id}
          >
            <img
              className="w-[103px] h-[83px] rounded-[7px]"
              src={product.image}
              alt=""
            />
            <div>
              <p className="ml-[15px]">{product.name}</p>
              <p className="ml-[15px]">
                วันหมดอายุ &quot;
                <span
                  style={{
                    color:
                      product.dateEnd <=
                      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                        ? "red"
                        : "black",
                  }}
                >
                  {product.dateEnd.toDateString()}
                </span>
                &quot;
              </p>
              <p className="ml-[15px]">จำนวน {product.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDateEnd;
