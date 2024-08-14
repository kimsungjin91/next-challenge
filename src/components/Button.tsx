"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button
      className="bg-gray-200 p-3 text-neutral-500 font-semibold border-2 w-full rounded-full hover:bg-gray-300 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}

export default Button;
