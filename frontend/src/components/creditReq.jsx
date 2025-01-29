import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CreditReq = ({ productId }) => {
  const navigate = useNavigate();

  const handleCreditReq = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/credit-req/${productId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Credit request placed successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error requesting credit", error);
      alert("Failed to request credit. Please try again.");
    }
  };

  return (
    <div className="">
      <button
        onClick={handleCreditReq}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-3 rounded-2xl font-semibold"
      >
        Request Credit
      </button>
    </div>
  );
};

export default CreditReq;
