"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  data: any[];
};

const SellProduct = (props: Props) => {
  const [data, setData] = useState(props.data || []);
  const [cart, setCart] = useState<any[]>([]); // สร้าง State สำหรับรถเข็น
  const [totalPrice, setTotalPrice] = useState<number>(0); // สร้าง State สำหรับราคารวม

  const handleIncrement = (id: string) => {
    const product = data.find((product) => product._id === id);

    if (product) {
      if (product.amount > 0) {
        const updatedData = data.map((item) => {
          if (item._id === id) {
            const newValue = item.value + 1;
            return { ...item, value: newValue };
          }
          return item;
        });
        setData(updatedData);
      }
    }
  };

  const handleDecrement = (id: string) => {
    const updatedData = data.map((product) => {
      if (product._id === id) {
        const newValue = product.value - 1; // ลดลง 1
        return { ...product, value: newValue >= 0 ? newValue : 0 }; // ไม่ให้ค่าติดลบ
      }
      return product;
    });
    setData(updatedData);
  };

  const addToCart = (id: string) => {
    const product = data.find((item) => item._id === id);

    if (product) {
      if (product.value > 0) {
        const existingCartItem = cart.find((item) => item.id === id);

        if (existingCartItem) {
          // หากรายการสินค้ามีอยู่แล้วในรถเข็น
          const updatedCart = cart.map((item) => {
            if (item.id === id) {
              // บวกจำนวนสินค้าที่มีอยู่ด้วยจำนวนใหม่
              return { id, name: product.name, amount: item.amount + 1 };
            }
            return item;
          });
          setCart(updatedCart);
        } else {
          // หากรายการสินค้ายังไม่มีอยู่ในรถเข็น
          const updatedCart = [...cart, { id, name: product.name, amount: 1 }];
          setCart(updatedCart);
        }

        const updatedTotalPrice = totalPrice + product.price;
        setTotalPrice(updatedTotalPrice);

        handleDecrement(id); // ลด value หลังจากเพิ่มสินค้า
      }
    }
  };

  const decrementCartItem = (id: string) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (item.amount > 0) {
          const updatedAmount = item.amount - 1;
          const product = data.find((product) => product._id === id);
          if (product) {
            const updatedValue = product.value + 1;
            setCart((prevCart) => {
              return prevCart.map((cartItem) => {
                if (cartItem.id === id) {
                  return { ...cartItem, amount: updatedAmount };
                }
                return cartItem;
              });
            });
            setData((prevData) => {
              return prevData.map((product) => {
                if (product._id === id) {
                  return { ...product, value: updatedValue };
                }
                return product;
              });
            });

            const updatedTotalPrice = totalPrice - product.price;
            setTotalPrice(updatedTotalPrice >= 0 ? updatedTotalPrice : 0);
          }
        }
      }
      return item;
    });
  };

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
  const editProduct = (id: any) => {
    window.location.href = "/productedit/" + id;
  };

  const profilePage = () => {
    window.location.href = "/profile";
  };

  const handleConfirm = () => {

    {data.map((item:any,index:number) =>{
        Submit(item)
    })}
    console.log("รายการในรถเข็น:", cart,"ราคารวม",totalPrice);
    localStorage.setItem("cart",JSON.stringify(cart))
    localStorage.setItem("totalPrice",JSON.stringify(totalPrice))
    window.location.href = "/Payment";
  };

  const Submit = async (data:any) => {
    console.log("data._id",data._id);
    const obj = {
        image:data.image,
        name:data.name,
        dateEnd:data.dateEnd,
        value:data.value,
        price:data.price
    }
    try {
      const response = await fetch(`http://localhost:8081/product/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      console.log("formData", data);
      if (response.ok) {
        // อัปเดตข้อมูลสำเร็จ
      } else {
        console.error("ไม่สามารถอัปเดตข้อมูลได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล", error);
    }
  };

  return (
    <div>
      <div className="bg-[#7CD05F] w-[390px] h-[123px] p-4 flex items-center">
        <div className="mt-14 flex items-center justify-between w-[250px]">
          <div onClick={profilePage} className="cursor-pointer">
            <Image
              src="/Vector2.svg"
              alt="กลับหน้าหลัก"
              width={15}
              height={4}
            />
          </div>
          <div className="ml-5">
            <b className="text-2xl font-bold">รายการขาย</b>
          </div>
        </div>
        <div className="bg-[#6FC253] mt-11 w-[55px] h-[55px] rounded-[100%] ml-9 flex items-center justify-center">
          <Image src="/bell.svg" alt="กริ่งเตือน" width={25} height={5} />
        </div>
      </div>

      {data.map((product: any) => (
        <div className="flex items-center mt-5" key={product._id}>
          <img
            className="w-[103px] h-[83px] rounded-[7px]"
            src={product.image}
            alt=""
          />
          <div className="ml-4">
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="mt-1">วันหมดอายุ {`"${product.dateEnd}"`}</p>
            <p className="mt-1">สินค้าที่เลือก {product.value}</p>
            <p className="mt-1">ราคา {product.price} บาท</p>
            <div className="mt-2">
              <button
                onClick={() => {
                  decrementCartItem(product._id);
                  handleIncrement(product._id);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded-md  mr-2"
              >
                ลดจำนวนในรถเข็น
              </button>
              <button
                onClick={() => {
                  addToCart(product._id);
                  handleDecrement(product._id);
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                เพิ่มลงในรถเข็น
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-4">
        <h2 className="text-xl font-semibold">รถเข็น</h2>
        <ul className="mt-2">
          {cart.map((item: any) => (
            <li key={item.id} className="mb-2">
              {item.name} - จำนวน: {item.amount} - ราคา: {item.price} บาท
            </li>
          ))}
        </ul>
        <p className="mt-2">ราคารวม: {totalPrice} บาท</p>
      </div>
      <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          ยืนยัน
        </button>
    </div>
  );
};

export default SellProduct;
