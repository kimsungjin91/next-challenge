"use client";

import { dislikeTweet, likeTweet } from "@/app/tweets/[id]/action";
import { startTransition, useOptimistic } from "react";

interface TweetLikeProps {
  likeCount: number;
  isLiked: boolean;
  tweetId: number;
}

export default function TweetLike({
  likeCount,
  isLiked,
  tweetId,
}: TweetLikeProps) {
  const [state, reduceFn] = useOptimistic(
    { likeCount, isLiked },
    (currentState) => ({
      isLiked: !currentState.isLiked,
      likeCount: currentState.isLiked
        ? currentState.likeCount - 1
        : currentState.likeCount + 1,
    })
  );
  const onClick = async () => {
    reduceFn(null);
    if (state.isLiked) {
      await dislikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <button
      onClick={() => {
        startTransition(() => {
          onClick();
        });
      }}
      className={`${
        state.isLiked ? "bg-red-500" : "bg-neutral-300"
      } px-5 py-2.5 rounded-md text-white font-semibold transition hover:bg-red-500`}
    >
      {state.isLiked ? "DisLike" : "Like"}
      {` ${state.likeCount}`}
    </button>
  );
}
