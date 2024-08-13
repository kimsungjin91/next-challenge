import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
// import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params: { id },
  params,
}: {
  params: { id: string };
}) {
  const numberId = Number(params.id);
  if (isNaN(numberId)) {
    return notFound();
  }
  const tweet = await getTweet(numberId);
  if (!tweet) {
    return notFound();
  }
  const isOwner = await getIsOwner(tweet.userId);
  return (
    <div className="flex flex-col">
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <h3 className="text-xl">{tweet.user.username}</h3>
        <p className="text-sm text-neutral-500">
          {formatToTimeAgo(tweet.created_at.toString())}
        </p>
      </div>

      <div className="p-5">
        <p className="text-2xl ">{tweet.tweet}</p>
      </div>
      <div className="flex justify-end p-5">
        <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={`/`}
        >
          목록가기
        </Link>
      </div>
    </div>
  );
}
