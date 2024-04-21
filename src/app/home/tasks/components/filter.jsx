"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;

    if (value) params.set(name, value);
    else params.delete(name);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearQuery = () => {
    router.replace(pathname);
  };

  const handlePrev = e => {
    const page = Number(searchParams.get("page")) || 1;
    if (page > 1) params.set("page", page - 1);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleNext = e => {
    const page = Number(searchParams.get("page")) || 1;
    params.set("page", page + 1);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-between flex-wrap">
      <form className="flex gap-4 mb-4 flex-wrap" onSubmit={e => e.preventDefault()}>
        <select
          name="sortBy"
          id="sortBy"
          className="border px-4 py-2  outline-none  rounded-md"
          defaultValue={searchParams.get("sortBy") || "date"}
          onChange={handleChange}
        >
          <option value={""}>Select Sort</option>
          <option value="createdAt">Sort by Created Date</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
        <select
          name="priority"
          id="priority"
          className="border px-4 py-2  outline-none  rounded-md"
          defaultValue={searchParams.get("priority") || "low"}
          onChange={handleChange}
        >
          <option value="">Select Priority</option>
          <option value="Low">Priority : Low</option>
          <option value="Medium">Priority : Medium</option>
          <option value="High">Priority : High</option>
        </select>
        <select
          name="status"
          id="status"
          className="border px-4 py-2  outline-none  rounded-md"
          defaultValue={searchParams.get("status") || "pending"}
          onChange={handleChange}
        >
          <option value={""}>Select Status</option>
          <option value="Completed">Status : Completed</option>
          <option value="Pending">Status : Pending</option>
          <option value="Cancelled">Status : Cancelled</option>
          <option value="In Progress">Status : In Progress</option>
          <option value="Deferred">Status : Deferred</option>
        </select>
        <button
          onClick={clearQuery}
          className="px-5 py-2 bg-violet-600 hover:bg-violet-700 rounded-md text-white"
        >
          Clear
        </button>
      </form>
      <div className="flex gap-3 items-start ">
        <button
          type="submit"
          name="Prev"
          value="Prev"
          onClick={handlePrev}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
        >
          Prev
        </button>

        <button
          type="submit"
          name="Next"
          value="Next"
          onClick={handleNext}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Filter;
