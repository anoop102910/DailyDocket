"use client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import toast from "react-hot-toast";

function CreateTask() {
  const { data } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [selected, setSelected] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, dueDate: selected, createdBy: data.user.id }),
      });
      if (!res.ok) {
        const error = new Error(res.statusText);
        error.json = await res.json();
        throw error;
      }
      toast.success("Task created successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data ? error.response.data : "Something went wrong");
    }
  };

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  return (
    <div className="flex justify-between items-center w-full ">
      <div className="w-full  mx-auto max-w-lg p-4  rounded-lg sm:p-6 ">
        <h5 className="text-3xl font-medium text-slate-800 mb-6">Create a new Task</h5>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="authorId" />
          <div>
            <label htmlFor="title" className="block mb-2  font-medium text-slate-800">
              Title
            </label>
            <input
              type="title"
              name="title"
              id="title"
              className="bg-transparent border border-slate-500 text-slate-800  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="E.g. Create a mongoose pipeline"
              value={formData.title}
              onChange={onChange}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2  font-medium text-slate-800">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              name="description"
              className="block p-2.5 w-full  bg-transparent border border-slate-500 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-slate-800 placeholder-slate-400"
              placeholder="Write a des..."
              value={formData.description}
              onChange={onChange}
              disabled={loading}
            ></textarea>
          </div>
          <div>
            <label htmlFor="priority" className="block mb-2  font-medium text-slate-800">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="block p-2.5 w-full  bg-transparent border border-slate-500 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-slate-800 placeholder-slate-400"
              value={formData.priority}
              onChange={onChange}
              required
              disabled={loading}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="due date" className="block mb-2  font-medium text-slate-800">
              Due date
            </label>
            <div className="bg-white w-min rounded-md shadow-md pb-1">
              <DayPicker mode="single" selected={selected} onSelect={setSelected} footer={footer} />
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? "Loading..." : "Create a new todo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
