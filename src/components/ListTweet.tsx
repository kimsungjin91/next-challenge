import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  created_at: Date;
  id: number;
  user: {
    username: string;
  };
}

export default function ListTweet({
  tweet,
  created_at,
  id,
  user: { username },
}: ListTweetProps) {
  return (
    <>
      <Link href={`/tweets/${id}`} className="flex gap-5 ">
        <div className="flex flex-col gap-1 *:text-white">
          <div className="flex gap-2 items-center">
            <span className="text-lg font-semibold">{username}</span>
            <span className="text-sm text-neutral-500">
              {formatToTimeAgo(created_at.toString())}
            </span>
          </div>
          <span className="text-lg">{tweet}</span>
        </div>
      </Link>
      <hr className="w-full border-b border-neutral-800"></hr>
    </>
  );
}