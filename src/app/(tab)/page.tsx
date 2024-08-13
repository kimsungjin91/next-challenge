import ListTweet from "@/components/ListTweet";
import TweetList from "@/components/TweetList";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { useState } from "react";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
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
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  const createAccount = async () => {
    "use server";
    redirect("/create-account");
  };

  const logOut = async () => {
    "use server";
    redirect("/log-in");
  };

  return (
    <div className="h-screen flex justify-center">
      <div className="p-5 w-full flex flex-col gap-3">
        <TweetList initialTweets={initialTweets} />
      </div>
    </div>
  );
}
