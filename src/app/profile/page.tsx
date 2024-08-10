import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          안녕하세요, {user?.username}님
        </h2>
        <form action={logOut}>
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200">
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
}
