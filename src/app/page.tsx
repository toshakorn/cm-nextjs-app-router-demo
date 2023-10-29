"use client"
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State เพื่อแสดงข้อความ

  const handleLogin = async () => {
    try {
      const response = await fetch("https://0868-2001-fb1-11d-16c8-2c02-ccbd-f325-542.ngrok-free.app/owner/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Login successful
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("user",JSON.stringify(data))
        // Redirect on the client side
        window.location.href = "/profile"; // Use window.location.href for client-side redirects
      } else {
        // Login failed
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred while processing the request:", error);
    }
  };

  return (
    <div>
      <div className="w-[390px] h-[844px] bg-green-600">
        <div className="bg-white rounded-tr-[40px] w-[390px] h-[744px] absolute top-28">
          <div>
            <div>
              <p className="ml-[50px] text-[29px] mt-12">Welcome 👋</p>
              <input
                type="text"
                placeholder="Email"
                className="border-spacing-2 bg-gray-300 h-[45px] rounded-3xl mt-9 ml-3 w-[350px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border-spacing-2 bg-gray-300 h-[45px] rounded-3xl mt-9 ml-3 w-[350px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleLogin}
                className="bg-[#3F6640] w-[326px] h-[40px] ml-5 mt-7 rounded-[18px]"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;