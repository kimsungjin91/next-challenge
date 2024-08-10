import { redirect } from "next/navigation";

export default function Home() {
  //   const [state, formAction] = useFormState(handleFormSubmit, {} as any);
  const createAccount = async () => {
    "use server";
    redirect("/create-account");
  };

  const logOut = async () => {
    "use server";
    redirect("/log-in");
  };
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">환영합니다!</h1>
        <div className="flex flex-col space-y-4">
          <form action={logOut}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
              로그인
            </button>
          </form>
          <form action={createAccount}>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
