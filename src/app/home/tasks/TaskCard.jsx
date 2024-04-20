import { deleteTask } from "@/lib/action";
import Link from "next/link";
import React from "react";

function TaskCard({ task }) {
  return (
      <div className="shadow-lg  rounded-xl w-full md:w-96 p-4 bg-white relative overflow-hidden">
        <div className="w-full">
          <p className="text-gray-800 text-xl font-medium mb-4">{task.title}</p>
          <div className="flex gap-8 mb-2">
            <div>
              <p className="text-blue-600 text-xs font-medium mb-2">
                Created At: {new Date(task.createdAt).toLocaleDateString()}
              </p>
              <p className="text-blue-600 text-xs font-medium mb-2">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              {" "}
              <p className="text-blue-600 text-xs font-medium mb-2">Status : {task.status}</p>
              <p className="text-blue-600 text-xs font-medium mb-2">Priority: {task.priority}</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">{task.description}</p>
        </div>
        <div className="flex justify-between">
         <form action={deleteTask}>
          <input type="hidden" name={"taskId"} value={task._id}/>
         <button className="text-white text-sm px-3 py-1 rounded-md shadow-md bg-red-600 hover:bg-red-700 font-medium mb-2">
            Delete
          </button>
         </form>
          <Link href={`/home/tasks/update/${task._id}`}>
            <button className="text-white text-sm px-3 py-1 rounded-md shadow-md bg-violet-600 hover:bg-violet-700 font-medium mb-2">
              Edit
            </button>
          </Link>
        </div>
      </div>
  );
}

export default TaskCard;
