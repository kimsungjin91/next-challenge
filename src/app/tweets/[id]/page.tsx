import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import TweetLike from "@/components/TweetLike";
import Link from "next/link";
import AddResponse from "@/components/AddResponse";

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

const getCachedTweet = nextCache(getTweet, ["cached-tweet"], {
  revalidate: 30,
});

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  const userId = session.id!;
  const cachedOperation = nextCache(getLikeStatus, ["cached-like-status"], {
    tags: [`like-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
}

async function getResponses(tweetId: number) {
  return db.response.findMany({
    where: {
      tweetId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}

const getCachedResponses = nextCache(getResponses, ["cached-responses"], {
  revalidate: 30,
  tags: ["response"],
});

export default async function TweetDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const tweetId = Number(id);
  if (isNaN(tweetId)) {
    return notFound();
  }
  const tweet = await getCachedTweet(tweetId);
  if (!tweet) {
    return notFound();
  }
  const { likeCount, isLiked } = await getCachedLikeStatus(tweetId);
  const responses = await getCachedResponses(tweetId);
  return (
    <div className="flex flex-col items-center mt-5 h-svh gap-2 mx-auto *:w-full">
      <div className="p-5 rounded-md text-2xl">{tweet.tweet}</div>
      <div className="flex justify-between items-center p-5 ">
        <div className="flex gap-2">
          <p>{tweet.user.username}</p>
          <p>{formatToTimeAgo(tweet.created_at.toString())}</p>
        </div>
        <div className="flex gap-2">
          <Link
            className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
            href={`/`}
          >
            목록가기
          </Link>
          <TweetLike
            likeCount={likeCount}
            isLiked={isLiked}
            tweetId={tweetId}
          />
        </div>
      </div>
      <hr className="w-full border-b border-white"></hr>
      <AddResponse tweetId={tweetId} />
      <div className="flex flex-col gap-2">
        {responses.map((response, index) => (
          <div key={index} className="px-2">
            <div className="mb-2">
              <p className="text-xl">{response.user.username}</p>
              <p className="text-sm">{response.content}</p>
            </div>
            <hr className="w-full border-b` border-white"></hr>
          </div>
        ))}
      </div>
    </div>
  );
}
