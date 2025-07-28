import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";
import Footer from "../components/Footer";


function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", credentials, {
        headers: {
          "Content-Type": "application/json"
        }
      });

  
      const token = response.data.token;
      const role = response.data.role;

        
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      window.dispatchEvent(new Event("storage"));

      alert("Login successful!");

      if(role == "ADMIN"){
        navigate("/dashboard");
      }else{
      navigate("/home");
      }
    } catch (error) {
      
      const errorMsg = error.response?.data?.error || "Login failed";
      console.error("Login failed", error);
      alert(errorMsg);
    }
  };

  return (
    <div>
    <div className="login-bg min-h-screen flex justify-center items-center bg-gray-100">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
        initial={{ opacity: 0, scale: 0.9, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
          whileHover={{ scale: 1.03, backgroundColor: "#2563eb" }}
          whileTap={{ scale: 0.97 }}
        >
          Login
        </motion.button>
      </motion.form>
      
    </div>
     <Footer/>
    </div>
  );
}

export default Login;
