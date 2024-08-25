"use server";

import db from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkUsername = (username: string) => !username.includes("potato");

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      .toLowerCase()
      .trim()
      .refine(checkUsername, "No potatoes allowed!"),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function UpdateProfile(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
  const session = await getSession();

  if (data.username) {
    await db.user.update({
      where: {
        id: session.id,
      },
      data: {
        username: data.username.toString(),
      },
    });
  }

  redirect("/profile");
}
