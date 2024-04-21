import { fetchUserByEmail, fetchUserTask } from "@/lib/data";
import TaskCard from "./components/taskcard";
import { getServerSession } from "next-auth";
import Filter from "./components/filter";

async function page({ searchParams }) {
  const status = searchParams.status;
  const priority = searchParams.priority;
  const sortBy = searchParams.sortBy;
  const page = searchParams.page;
  const q = searchParams.q;
  const session = await getServerSession();
  const user = await fetchUserByEmail(session.user.email);
  const tasks = await fetchUserTask({ userId: user._id, status, priority, sortBy, page, q });

  return (
    <>
      <div className="mb-4">
        <Filter />
      </div>
      <div className="flex gap-6 flex-wrap">
        {tasks.length === 0 ? (
          <div className="text-4xl font-bold flex items-center justify-center w-full pt-20">
            No Task Found
          </div>
        ) : (
          tasks.map(task => <TaskCard key={task._id} task={task} />)
        )}
      </div>
    </>
  );
}

export default page;
