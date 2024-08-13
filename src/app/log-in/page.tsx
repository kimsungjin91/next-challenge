"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import MessageBox from "@/components/MessageBox";
import { useFormState } from "react-dom";
import { logIn } from "./action";
import { useRouter } from "next/navigation";

export default function Login() {
  const [state, formAction] = useFormState(logIn, null);
  const { replace } = useRouter();

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">로그인</h2>
        <form action={formAction} className="flex flex-col gap-3 w-full">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={state?.fieldErrors.password}
          />
          <Button text="Log in" />
        </form>
        <div
          className="mt-4 ext-xl font-semibold text-gray-400 underline cursor-pointer"
          onClick={() => replace("/create-account")}
        >
          <p>회원가입</p>
        </div>
      </div>
    </div>
  );
}
