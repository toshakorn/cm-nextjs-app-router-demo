"use client";
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

type Props = {
  amount: number;
};

const EditPayment = (props: Props) => {
  const [qrCodeImage, setQRCodeImage] = useState('');

  useEffect(() => {
    const { amount } = props;
    
    axios.post('http://localhost:8081/paymentqr', { amount })
      .then(response => {
        // Handle the response from the server
        console.log('Response from server:', response.data.result);
        
        // Set the base64 data as the image source
        setQRCodeImage(response.data.result);
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      });
  }, [props]);

  return (
    <div>
      {/* Display the base64 image */}
      <img src={qrCodeImage} alt="QR Code" />
    </div>
  );
};

export default EditPayment;
