"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <ChevronLeftIcon
      className="-ml-2 size-7 hover:cursor-pointer text-[ghostwhite]"
      onClick={() => {
        router.back();
      }}
    />
  );
}
