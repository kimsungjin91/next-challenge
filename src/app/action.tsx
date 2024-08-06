"use server";

export async function handleFormSubmit(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const password = formData.get("password");

  if (password !== "12345") {
    return {
      errors: ["wrong password"],
    };
  }

  return {
    result: 200,
  };
}
