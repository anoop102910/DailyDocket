"use client";

import React from "react";

function Button({ className, onClick, children }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`text-sm px-4 py-2 bg-violet-600 hover:bg-violet-800 rounded-md ${className}`}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
