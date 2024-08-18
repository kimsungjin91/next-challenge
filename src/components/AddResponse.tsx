"use client";

import addResponse from "@/app/tweets/[id]/action";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface AddResponseProps {
  tweetId: number;
}

export default function AddResponse({ tweetId }: AddResponseProps) {
  const [state, action] = useFormState(addResponse, tweetId);

  return (
    <form className="flex gap-2" action={action}>
      <textarea
        className="w-full p-4 text-lg text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
        name="response"
      ></textarea>
      <button className="bg-orange-500 p-4 rounded-md text-white">Reply</button>
    </form>
  );
}
