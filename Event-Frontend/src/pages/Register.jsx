import React, { useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name:"", email:"", password:"",companyName:"",jobTitle:""
  });

  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register",user);
      alert("Registration suceesfull");
      setUser({
        name: "", email:"" , password:"", companyName:"",jobTitle:"",
      }); 
    } catch (error) {
      console.error("Registration failed",error);
      alert("Registration Failed");
    }
  };
  return (
    <div>
    <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row justify-between gap-8 px-6 py-10 bg-blue-50">
      {/* Key Highlights */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Easy Registration with 100% Security</h2>

        <div className="border-b py-3">
          <p className="font-bold text-black">
            We Create Family Not Customer <span className="text-blue-600">Welcome</span> To the Eventhub
          </p>
        </div>

        <div className="border-b py-3">
          <p className="font-bold text-black">
            You Feel better with us..<span className="text-blue-600"></span>
          </p>
          <p className="text-gray-600">
          </p>
        </div>

        <div className="border-b py-3">
          <p className="font-bold text-black">
            Thank you Tusting Us <span className="text-blue-600">@EventHub</span>
          </p>
          <p className="text-gray-600">
          </p>
        </div>
      </div>

      {/* Register Form */}
      <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Register Here</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name*"
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="companyName"
            value={user.companyName}
            onChange={handleChange}
            placeholder="Company Name*"
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="jobTitle"
            value={user.jobTitle}
            onChange={handleChange}
            placeholder="Job Title*"
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email*"
            required
            className="w-full border border-gray-300 p-2 rounded"
          />

          <input type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required className="w-full border border-gray-300 p-2 rounded"
           />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
  
};

export default Register;
