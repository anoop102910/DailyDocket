"use server";
import Task from "@/models/task.model";
import { revalidatePath } from "next/cache";

export const deleteTask = async formData => {
  const { taskId } = Object.fromEntries(formData);
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    revalidatePath("/home/tasks");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
