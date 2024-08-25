"use client";

import {
  HomeIcon as SolidHomeIcon,
  UserIcon as SolidUserIcon,
  MagnifyingGlassCircleIcon as SolidMagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  UserIcon as OutlineUserIcon,
  MagnifyingGlassCircleIcon as OutlineMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-sm grid grid-cols-3 border-neutral-600 border-t px-5 py-3 bg-neutral-700 *:text-white">
      <Link
        href="/"
        className={`flex flex-col items-center gap-px ${
          pathname === "/" ? "*:text-orange-400" : "*:text-white"
        }`}
      >
        {pathname === "/" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>홈</span>
      </Link>
      <Link
        href="/search"
        className={`flex flex-col items-center gap-px ${
          pathname === "/search" ? "*:text-orange-400" : "*:text-white"
        }`}
      >
        {pathname === "/search" ? (
          <SolidMagnifyingGlassIcon className="w-7 h-7" />
        ) : (
          <OutlineMagnifyingGlassIcon className="w-7 h-7" />
        )}
        <span>검색</span>
      </Link>
      <Link
        href="/profile"
        className={`flex flex-col items-center gap-px ${
          pathname === "/profile" ? "*:text-orange-400" : "*:text-white"
        }`}
      >
        {pathname === "/profile" || pathname === "/profile/edit" ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>나의 프로필</span>
      </Link>
    </div>
  );
}
