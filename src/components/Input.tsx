import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
}

function Input({ type, placeholder, required, errors, name }: InputProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`py-3 px-4 border-2 bg-white rounded-full focus:ring-2 ring-gray-300 ring-offset-1 outline-none ${
          errors.length > 0
            ? "border-red-400 ring-red-300"
            : "border-gray-200 ring-gray-300"
        }`}
      />
      {errors.map((error, index) => (
        <div className="text-red-400 text-sm" key={index}>
          {error}
        </div>
      ))}
    </div>
  );
}

export default Input;
