// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Mail, Lock } from "lucide-react";
import backimage from "../Assets/backimage.jpg";

const LoginPage = () => {
  const { login } = useUser();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login({ token: data.jwt, email: data.user.email });
        alert("Login successful");
        navigate("/chat");
      } else {
        alert(data.error.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Left Section: Login Form */}
        <div className="flex items-center justify-center w-full p-8 md:w-1/2">
          <div className="w-full max-w-md p-8 space-y-8 shadow-2xl bg-slate-900/50 rounded-2xl backdrop-blur-sm">
            <div className="text-center">
              <h1 className="font-mono text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                Ayna Chat App
              </h1>
              <p className="mt-2 text-slate-300">Welcome back! Please sign in.</p>
            </div>
  
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full py-3 pl-10 pr-4 text-white transition-all border rounded-lg bg-slate-800/50 border-slate-600 focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-slate-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
  
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-3 pl-10 pr-4 text-white transition-all border rounded-lg bg-slate-800/50 border-slate-600 focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-slate-400"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>
  
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Sign In
              </button>
  
              <div className="text-center text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium transition-colors text-amber-400 hover:text-amber-300"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
  
        {/* Right Section: Image (remains the same) */}
        <div className="relative hidden overflow-hidden md:flex md:w-1/2">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <img
            src={backimage}
            alt="background"
            className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 transform scale-105 hover:scale-100"
          />
        </div>
      </div>
    );
  };

export default LoginPage;
