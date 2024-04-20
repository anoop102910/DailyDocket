import Dashboard from "@/components/shared/dashboard";
import Navbar from "@/components/shared/navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "DailyDocket",
  description: "",
};

export default async function Layout({ children }) {
  const session = await getServerSession();
  if (!session) redirect("/auth/signin");

  return (
        <div className="bg-slate-100 relative flex min-h-screen ">
          <Dashboard className="sticky top-0 left-0  max-md:hidden " />
          <div className="w-full md:ml-2 mt-1 relative">
            <Navbar />
            <div className="p-4">{children}</div>
          </div>
        </div>
  );
}
