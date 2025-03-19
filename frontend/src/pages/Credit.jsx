import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Credit = () => {
  const [creditRequests, setCreditRequests] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchCreditRequests = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/credit-loginuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCreditRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching credit requests", error);
      }
    };

    fetchCreditRequests();
  }, [token]);

  const handleDeleteCredit = async(id)=>{
    const token = Cookies.get('token');
    if(!token){
        navigate("/login");
        return
    }
    if (!window.confirm("Are you sure you want to delete this credit request?")) {
        return;
      }
    try {
        const response = await axios.delete(`http://localhost:3000/credit/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        if(response.status === 200){
            return navigate("/credits")
        }
        
    } catch (error) {
        console.log("error deleting credit",error)
    }
  }

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
        Credit Requests
      </h1>

      {creditRequests.length === 0 ? (
        <p className="text-center text-black">No credit requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {creditRequests.map((request) => (
            <div key={request.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-bold text-blue-600">
                Product: {request.product?.name || "N/A"}
              </h2>
              <p className="text-gray-600">Description: {request.product?.description || "N/A"}</p>
              <img
                src={`http://localhost:3000/${request.product?.image}`}
                alt={request.product?.name}
                className="w-full h-60 object-cover rounded-md mt-4"
              />
              <p className="mt-4 text-green-500 font-bold">
                <span className="font-semibold ">Price:</span> $. {request.price}
              </p>
              <p>
                <span className="font-bold">Status:</span> {request.status}
              </p>
              <p>
                <span className="font-semibold">Payment Status:</span> {request.isPaid}
              </p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(request.createdAt).toLocaleString()}
              </p>
             
              <p className="text-gray-700 mt-4">
                <span className="font-semibold">User:</span> {request.user?.username} ({request.user?.email})
              </p>
              <div className="button flex gap-2 mt-4">
              <button className="bg-red-500 px-4 py-2 rounded" 
              onClick={()=>{handleDeleteCredit(request.id)}}
              >Delete</button>
              <button className="bg-blue-500 px-4 py-2 rounded" >update</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Credit;
