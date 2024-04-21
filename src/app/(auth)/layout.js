import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "DailyDocket",
  description: "",
};

export default async function Layout({ children }) {
  const session = await getServerSession();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">DailyDocket</h1>
        <button className="text-white bg-violet-500 px-4 py-2 rounded-md shadow-md ">Sign in</button>
      </div>
      <div>{children}</div>
    </div>
  );
}
