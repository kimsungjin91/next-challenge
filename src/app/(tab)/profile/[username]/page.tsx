import Profile from "@/components/Profile";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

interface UserProfilePageProps {
  params: {
    username: string;
  };
}

const getUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      email: true,
      tweets: {
        select: {
          id: true,
          tweet: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
      likes: {
        select: {
          tweet: {
            select: {
              id: true,
              tweet: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      },
    },
  });
  return user;
};

export type UserProfile = Prisma.PromiseReturnType<typeof getUser>;

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { username } = params;
  const user = await getUser(username);

  return (
    <main className="flex flex-col items-center py-8">
      <Profile user={user} />
    </main>
  );
}
