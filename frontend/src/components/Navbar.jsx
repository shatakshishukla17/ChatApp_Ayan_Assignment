import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { HiOutlineLogout, HiChatAlt2 } from "react-icons/hi";
import userimage from "../Assets/userimage.png";

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const defaultUserIcon = userimage;

  return (
    <div className="shadow-lg bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="flex items-center justify-between max-w-screen-xl p-4 mx-auto">
        {/* Left section: Logo/Name */}
        <div className="flex items-center space-x-2">
          <HiChatAlt2 className="text-3xl text-blue-500" />
          <div className="text-2xl font-semibold">
            <span className="text-blue-500">Chat</span>
            <span className="text-white">App</span>
          </div>
        </div>

        {/* Right section: User details & logout button */}
        {user ? (
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={user.avatar || defaultUserIcon}
                  alt="User Avatar"
                  className="object-cover w-10 h-10 border-2 border-blue-500 rounded-full"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 rounded-full border-slate-900"></div>
              </div>
              <span className="hidden font-medium text-white sm:block">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-white transition duration-200 bg-red-500 rounded-lg shadow-md hover:bg-red-600"
            >
              <HiOutlineLogout className="mr-2" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-white transition duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;