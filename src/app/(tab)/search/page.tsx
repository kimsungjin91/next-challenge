import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { FormHTMLAttributes } from "react";

export default function Messages() {
  //   const router = useRouter();

  const onSubmit = async (FormData: any) => {
    "use server";
    console.log(FormData.get("search"));
    if (FormData.get("search") === "") {
      return;
    }
    redirect(`/search/${FormData.get("search")}`);
  };

  return (
    <div className="w-full h-screen overflow-y-scroll flex flex-col items-center justify-start p-5 pt-10">
      <form
        action={onSubmit}
        className="w-full flex justify-start items-center gap-1"
      >
        <input
          type="text"
          className="w-[80%] px-3 py-2 rounded-lg bg-white border text-neutral-700 placeholder:text-neutral-500 active:outline-none focus:outline-none font-semibold placeholder:font-semibold "
          placeholder="Searhch 🔍"
          name="search"
        />
        <button
          type="submit"
          className=" px-6 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 active:scale-95"
        >
          Search
        </button>
      </form>
    </div>
  );
}
