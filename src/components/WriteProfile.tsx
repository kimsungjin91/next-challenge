"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { UpdateProfile } from "@/app/(tab)/profile/edit/action";

interface WriteProfileProps {
  username: string;
}

export default function WriteProfile({ username }: WriteProfileProps) {
  const [state, formAction] = useFormState(UpdateProfile, null);
  const { replace } = useRouter();
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          회원 정보 수정
        </h2>
        <form action={formAction} className="flex flex-col gap-3 w-full">
          <Input
            name="username"
            type="text"
            required
            placeholder={username}
            errors={state?.fieldErrors.username}
          />

          <Button text="Updata Profile" />
        </form>
        <div
          className="mt-4 ext-xl font-semibold text-gray-400 underline cursor-pointer"
          onClick={() => replace("/profile")}
        >
          <p>뒤로가기</p>
        </div>
      </div>
    </div>
  );
}
