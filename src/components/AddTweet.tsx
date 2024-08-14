"use client";

import { useFormState } from "react-dom";
import { addTweet } from "@/app/(tab)/action";
import TweetButton from "./TweetButton";

export default function AddTweet() {
  const [state, action] = useFormState(addTweet, null);

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-xl rounded-lg shadow-md">
        <form action={action} className="space-y-4">
          <div>
            <textarea
              id="tweet"
              name="tweet"
              placeholder="What's happening?"
              className="w-full p-4 text-lg text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <p>{state?.fieldErrors.tweet}</p>
            <TweetButton />
          </div>
        </form>
      </div>
    </div>
  );
}
