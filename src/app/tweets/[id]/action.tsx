"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId: tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-${tweetId}`);
  } catch (e) {
    console.error(e);
  }
}

export async function dislikeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId: tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-${tweetId}`);
  } catch (e) {
    console.error(e);
  }
}

const formSchema = z.object({
  content: z.string().min(1),
});

export default async function addResponse(state: any, formData: FormData) {
  const session = await getSession();
  const data = formData.get("response");
  const result = await formSchema.spa({ content: data });
  const tweetId = state;

  if (!result.success) {
    return state;
  }

  try {
    await db.response.create({
      data: {
        tweetId,
        userId: session.id!,
        content: result.data?.content.toString()!,
      },
    });
    revalidateTag(`response`);
    revalidateTag(`response-${tweetId}`);
    formData.set("response", "");
  } catch (e) {
    console.error(e);
  }

  return state;
}
