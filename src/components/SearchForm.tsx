"use client";

import addResponse from "@/app/tweets/[id]/action";
import { useFormState } from "react-dom";

interface SearchFormProps {
  tweetId: number;
}

export default function SearchForm({ tweetId }: SearchFormProps) {
  const [state, action] = useFormState(addResponse, tweetId);

  return (
    <form className="flex gap-2" action={action}>
      <input
        type="text"
        className="w-full px-3 py-2 rounded-lg bg-black border text-[ghostwhite] placeholder:text-neutral-500 active:outline-none focus:outline-none font-semibold placeholder:font-semibold "
        placeholder="Searhch 🔍"
      />
      <button className="bg-orange-500 p-4 rounded-md text-white">검색</button>
    </form>
  );
}
