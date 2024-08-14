"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getMoreTweets(page: number) {
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
    skip: page * 5,
    take: 5,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

const tweetSchema = z.object({
  tweet: z
    .string({
      required_error: "필수 값 입니다.",
    })
    .min(1, "등록 정보를 입력해주세요")
    .max(200, "200 글자를 넘길 수 없습니다."),
});

export async function addTweet(state: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/tweets/${tweet.id}`);
    }
  }
}
