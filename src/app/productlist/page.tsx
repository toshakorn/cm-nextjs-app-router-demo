"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  data: any[];
};

const ProductList = (props: Props) => {
  const [data, setData] = useState(props.data || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/product");
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

  const editProduct = (id:any) =>{
    window.location.href = "/productedit/"+id;
  }
  const profilePage = () =>{
    window.location.href = "/profile";
  }

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
              <b className="text-[25px]">จัดการสินค้า</b>
            </div>
          </div>
          <div className="bg-[#6FC253] mt-11 w-[55px] h-[55px] rounded-[100%] ml-9 flex items-center justify-center">
            <Image src="/bell.svg" alt="กริ่งเตือน" width={25} height={5} />
          </div>
        </div>
      </div>
      <div>
        {data.map((product: any) => (
          <div onClick={() => editProduct(product._id)} className="flex items-center mt-5" key={product._id}>
            <img
              className="w-[103px] h-[83px] rounded-[7px]"
              src={product.image}
              alt=""
            />
            <div>
              <p className="ml-[15px]">{product.name}</p>
              <p className="ml-[15px]">
                วันหมดอายุ {`"`}
                {product.dateEnd}
                {`"`}
              </p>
              <p className="ml-[15px]">จำนวน {product.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
