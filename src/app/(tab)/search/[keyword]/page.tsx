import AddTweet from "@/components/AddTweet";
import BackButton from "@/components/BackButton";
import ListTweet from "@/components/ListTweet";
import TweetList from "@/components/TweetList";
import db from "@/lib/db";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { useState } from "react";

async function SearchPost(keyword: string) {
  const tweets = await db.tweet.findMany({
    where: {
      tweet: {
        contains: keyword,
      },
    },
    select: {
      tweet: true,
      id: true,
      created_at: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export default async function SearchDetail({
  params,
}: {
  params: { keyword: string };
}) {
  const decodeKeyword = decodeURI(params.keyword);
  const tweets = await SearchPost(decodeKeyword);

  return (
    <div className="h-screen flex justify-center">
      <div className="p-5 w-full flex flex-col gap-3">
        <div className="flex gap-2 py-5 items-center">
          <BackButton />
          <div className="flex items-center gap-2 text-lg">
            <span>Search for</span>{" "}
            <span className="text-2xl font-semibold">{decodeKeyword}</span>
          </div>
        </div>
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </div>
  );
}
