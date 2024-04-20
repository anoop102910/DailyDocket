"use client";
import { useSession } from "next-auth/react";
import Icon from "@/components/shared/icon";
import Image from "next/image";
import SearchInput from "./search";
import Dashboard from "./dashboard";
import { useState } from "react";

function Navbar() {
  const { data, status } = useSession();
  const [hide, toggle] = useState(true);

  if (status === "loading") return <div>Loading..</div>;

  return (
    <>
      <header
        onClick={() => toggle(!hide)}
        className="sticky z-[1000] top-0 left-0 w-full gap-4 h-16 rounded-md shadow-md bg-white flex items-center px-6 justify-between"
      >
        {hide && <Dashboard className={` lg:hidden absolute top-0 left-0 min-h-screen `} />}
        <Icon
          onClick={() => toggle(!hide)}
          icon="mingcute:menu-fill"
          className="text-3xl lg:hidden text-slate-700"
        />
        <div className="sm:w-[35vw] w-full   rounded-md  flex gap-4 px-4 items-center bg-slate-100 py-2">
          <SearchInput />
        </div>

        <div className="max-w-[230px] max-sm:hidden flex gap-10 justify-between items-center rounded-lg bg-white border border-slate-200 px-2 py-1 ">
          <div className="flex  items-center gap-4">
            <Image
              width={40}
              height={40}
              src="/avatar.png"
              className=" rounded-full"
              alt="profile image"
            />

            <div className="flex flex-col max-sm:hidden ">
              <span className="text-xs">Welcome back</span>
            </div>
          </div>
          <div>
            <Icon icon="bx:arrow-back" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
