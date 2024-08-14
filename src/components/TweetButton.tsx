"use client";

import React from "react";
import { useFormStatus } from "react-dom";

function TweetButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="px-6 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 active:scale-95"
    >
      {pending ? "처리 중..." : "Tweet"}
    </button>
  );
}

export default TweetButton;
