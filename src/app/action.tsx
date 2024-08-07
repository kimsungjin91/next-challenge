"use server";

import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .regex(/@zod\.com$/, "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username must be at least 5 characters long"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(10, "Password should be at least 10 characters long")
    .regex(/\d/, "Password should contain at least one number (0123456789)"),
});

export async function handleFormSubmit(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
