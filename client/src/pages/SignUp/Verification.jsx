import React from "react";
import { Link } from "react-router-dom";

const Verification = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <h1>Registration Completed</h1>
          <p>Check your email to verify account</p>
          <Link to={'/login'} className="btn btn-outline">Login</Link>
      </div>
    </div>
  );
};

export default Verification;
