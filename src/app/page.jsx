import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Home() {
  const session = await getServerSession();
  if (!session) redirect("/auth/signin");
  else redirect("/home");

  return <></>;
}

export default Home;
