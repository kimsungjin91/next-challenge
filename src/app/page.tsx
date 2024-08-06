"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import MessageBox from "@/components/MessageBox";
import { useFormState } from "react-dom";
import { handleFormSubmit } from "./action";

export default function Home() {
  const [state, formAction] = useFormState(handleFormSubmit, {} as any);

  return (
    <div className="max-w-96 w-full h-screen flex items-center mx-auto ">
      <form action={formAction} className="flex flex-col gap-3 w-full">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <Input
          name="username"
          type="text"
          placeholder="Uesrname"
          required
          errors={[]}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
        />
        <Button text="Log in" />
        {state?.result && <MessageBox />}
      </form>
    </div>
  );
}
