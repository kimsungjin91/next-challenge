import WriteProfile from "@/components/WriteProfile";
import db from "@/lib/db";
import getSession from "@/lib/session";

async function getUser(sid: number) {
  return await db.user.findUnique({
    where: {
      id: sid,
    },
    select: {
      username: true,
    },
  });
}

export default async function EditProfile() {
  const session = await getSession();
  const user = await getUser(session.id!);

  return <WriteProfile username={user?.username!} />;
}
