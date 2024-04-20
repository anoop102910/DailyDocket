import "./globals.css";
import SessionProvider from "@/components/shared/sessionprovider";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "DailyDocket",
  description: "",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="bg-[#0F1117]">
        <SessionProvider session={session}>
          {children}
          <Toaster position="bottom-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
