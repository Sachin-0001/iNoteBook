import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // Track errors
  const [success, setSuccess] = useState(null); // Track success message

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    // console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      alert("incorrect credentials or sign-up and create an account");
      // navigate("/signup");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <form className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            id="email"
            className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@domain.com"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="password"
            className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your password"
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

export default Login;
