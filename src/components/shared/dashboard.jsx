"use client";
import React from "react";
import Icon from "@/components/shared/icon";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const dashboardItems = [
  {
    icon: "fluent:home-16-regular",
    title: "Home",
    link: "/home/",
  },

  {
    icon: "material-symbols:task-outline",
    title: "Tasks",
    link: "/home/tasks",
  },
  {
    icon: "fluent:task-list-square-add-20-regular",
    title: "Create Task",
    link: "/home/create-task",
  },
  {
    icon: "mdi:account-outline",
    title: "Account",
    link: "/home/account",
  },

  {
    icon: "solar:settings-linear",
    title: "Settings",
    link: "/home/",
  },
];
function Dashboard({ className }) {
  const session = useSession();
  return (
    <aside
      aria-label="sidebar "
      aria-controls="default-sidebar"
      className={`${className} bg-white font-urbanist min-w-max px-6 shadow-md rounded-md `}
    >
      <div className="pt-10 hover:text-slate-100 text-slate-600">
        <a className="flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-main hover:text-white transition duration-150 cursor-pointer">
          <Image
            width={40}
            height={40}
            src="/avatar.png"
            className=" rounded-full"
            alt="profile image"
          />
          <span className="ml-4 font-semibold  tracking-wide ">{session?.data?.user?.name}</span>
        </a>
      </div>

      <div className="wrapper pt-6">
        <ul>
          {dashboardItems.map((item, index) => (
            <li key={item.title}>
              <Link
                href={item.link}
                className="flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-violet-500 hover:text-white transition duration-150 cursor-pointer"
              >
                <i>
                  <Icon icon={item.icon} className="hover:text-white text-2xl " />
                </i>
                <span className="ml-8 text-[0.9rem] font-semibold  tracking-wider">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
          <button onClick={signOut}>
            <div className="flex mb-4 items-center px-4 py-3 rounded-xl text-slate-700 hover:bg-violet-500 hover:text-white transition duration-150 cursor-pointer">
              <i>
                <Icon icon={"uil:signout"} className="hover:text-white text-2xl " />
              </i>
              <span className="ml-8 text-[0.9rem] font-semibold  tracking-wider">Sign out</span>
            </div>
          </button>
        </ul>
      </div>
    </aside>
  );
}

export default Dashboard;
