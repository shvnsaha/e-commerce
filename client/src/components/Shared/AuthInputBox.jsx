import React from "react";

export default function AuthInputBox({
  children,
  type,
  placeholder,
  label,
  name,
}) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-lg">{label}</span>
      </label>
      <div className="input-group">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full input input-bordered focus:outline-none border-green-700"
          required
        />
        <div className="flex items-center justify-center border-green-700 text-lg hover:bg-green-600  bg-green-600 text-white px-4">
          {children}
        </div>
      </div>
    </div>
  );
}