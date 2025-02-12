import React from "react";

const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg shadow-sm dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-white"
    />
  </div>
);

export default InputField;