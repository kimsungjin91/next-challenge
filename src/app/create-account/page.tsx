"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import { createAccount } from "./action";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const [state, formAction] = useFormState(createAccount, null);
  const { replace } = useRouter();
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">회원가입</h2>
        <form action={formAction} className="flex flex-col gap-3 w-full">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors.email}
          />
          <Input
            name="username"
            type="text"
            placeholder="Uesrname"
            required
            errors={state?.fieldErrors.username}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            required
            errors={state?.fieldErrors.password}
          />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            errors={state?.fieldErrors.confirm_password}
          />
          <Button text="Create Account" />
        </form>
        <div
          className="mt-4 ext-xl font-semibold text-gray-400 underline cursor-pointer"
          onClick={() => replace("/log-in")}
        >
          <p>로그인</p>
        </div>
      </div>
    </div>
  );
}
