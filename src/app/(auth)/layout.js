import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "DailyDocket",
  description: "",
};

export default async function Layout({ children }) {
  const session = await getServerSession();

  return (
      <div>{children}</div>
  );
}
