"use client";

import { UserProfile } from "@/app/(tab)/profile/[username]/page";
import { redirect } from "next/navigation";
import { useState } from "react";
import ListTweet from "./ListTweet";
import ProfileTweetItem from "./ProfileTweetItem";

interface ProfileProps {
  user: UserProfile;
}

export default function Profile({ user }: ProfileProps) {
  if (!user) {
    redirect("/");
  }

  const [select, setSelect] = useState<"POST" | "LIKE">("POST");

  return (
    <div className="w-full">
      <p className="text-xl font-bold">{`${user.username}'s Profile`}</p>
      <p className="text-sm font-extralight">{user.email}</p>
      <div className="my-2 border-b-2 border-white"></div>
      <div className="flex justify-evenly p-2">
        <span
          className="cursor-pointer"
          style={{ fontWeight: select === "POST" ? "bold" : "lighter" }}
          onClick={() => setSelect("POST")}
        >
          작성한 글
        </span>
        <span
          className="cursor-pointer"
          style={{ fontWeight: select === "LIKE" ? "bold" : "lighter" }}
          onClick={() => setSelect("LIKE")}
        >
          좋아요한 글
        </span>
      </div>
      <div className="space-y-2 p-4">
        <>
          {select === "POST" && (
            <>
              {user.tweets.map((tweet) => (
                <ProfileTweetItem key={tweet.id} {...tweet} />
                // <PostOnlyTitle key={post.id} id={post.id} title={post.title} />
              ))}
            </>
          )}
          {select === "LIKE" && (
            <>
              {user.likes.map(({ tweet }) => (
                <ProfileTweetItem key={tweet.id} {...tweet} />
                // <PostOnlyTitle
                //   key={like.post.id}
                //   id={like.post.id}
                //   title={like.post.title}
                // />
              ))}
            </>
          )}
        </>
      </div>
    </div>
  );
}
