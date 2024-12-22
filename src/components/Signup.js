import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert"; 
const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [error, setError] = useState(null); // Track errors
  const [success, setSuccess] = useState(null); 
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password}),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      alert("user already exists");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <form className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
        
        <div className="mb-6">
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-400 bg-gray-700 border border-r-0 border-gray-600 rounded-l-md">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              name="name"
              onChange={onChange}
              id="website-admin"
              className="flex-1 bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-r-md p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Your Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              onChange={onChange}
              id="email-address-icon"
              className="w-full bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Your Password
          </label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            id="password"
            className="w-full bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="cpassword"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Confirm Password
          </label>
          <input
            type="cpassword"
            name="cpassword"
            onChange={onChange}
            id="cpassword"
            className="w-full bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Confirm password"
            required
          />
        </div>

        <div className="flex items-start mb-6">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-300"
          >
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
