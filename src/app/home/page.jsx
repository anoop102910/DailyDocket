import { fetchTasksCount, fetchUserByEmail } from "@/lib/data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const session = await getServerSession();
  const user = await fetchUserByEmail(session.user.email);

  const totalTasks = await fetchTasksCount({ userId: user._id });
  const pendingTasks = await fetchTasksCount({ userId: user._id, status: "Pending" });
  const completedTasks = await fetchTasksCount({ userId: user._id, status: "Completed" });
  const inProgressTasks = await fetchTasksCount({ userId: user._id, status: "In Progress" });
  const cancelledTasks = await fetchTasksCount({ userId: user._id, status: "Cancelled" });
  const deferredTasks = await fetchTasksCount({ userId: user._id, status: "Deferred" });
  const highPriorityTasks = await fetchTasksCount({ userId: user._id, priority: "High" });
  const mediumPriorityTasks = await fetchTasksCount({
    userId: user._id,
    priority: "Medium",
  });
  const lowPriorityTasks = await fetchTasksCount({ userId: user._id, priority: "Low" });

  if (!session) redirect("/auth/signin");
  return (
    <div>
      <div className="task-count flex justify-around flex-wrap gap-6 flex-1">
        {[
          { title: "Total Tasks", count: totalTasks },
          { title: "Pending Tasks", count: pendingTasks },
          { title: "Completed Tasks", count: completedTasks },
          { title: "In Progress Tasks", count: inProgressTasks },
          { title: "Cancelled Tasks", count: cancelledTasks },
          { title: "Deferred Tasks", count: deferredTasks },
          { title: "High Priority Tasks", count: highPriorityTasks },
          { title: "Medium Priority Tasks", count: mediumPriorityTasks },
          { title: "Low Priority Tasks", count: lowPriorityTasks },
        ].map(({ title, count }) => (
          <div key={title} className="px-12 py-8 rounded-md shadow-md bg-white text-center space-y-4 flex-1 min-w-max ">
            <h3 className="text-2xl font-bold text-slate-500">{title}</h3>
            <p className="text-4xl font-bold text-green-500">{count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
