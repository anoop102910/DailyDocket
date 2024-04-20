import { NextResponse } from "next/server";
import Task from "@/models/task.model";
import joi from "joi";
import { revalidatePath, revalidateTag } from "next/cache";

const taskSchema = joi.object({
  title: joi.string().trim().optional().allow("").min(3).max(50),
  description: joi.string().trim().optional().allow("").min(10).max(255),
  priority: joi.string().valid("Low", "Medium", "High").optional(),
  dueDate: joi
    .date()
    .optional()
    .custom((value, helper) => {
      if (value && value < Date.now()) {
        return helper.message({ value }, "{{#label}} should be greater than current date");
      }
      return value;
    }),
  status: joi
    .string()
    .trim()
    .valid("Pending", "In Progress", "Completed", "Cancelled", "Deferred")
    .optional(),
});

export const PUT = async (request, { params }) => {
  try {
    const id = params.id;
    const body = await request.json();
    const { value, error } = taskSchema.validate(body);

    if (error) {
      const message = `${error.details[0].message}`;
      console.log(error);
      return new NextResponse(message, { status: 400 });
    }

    const task = await Task.findById(id);
    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }
    const response = await Task.findByIdAndUpdate(id, value, { new: true });
    revalidatePath('/home/tasks/')
    revalidatePath('/home')
    revalidateTag('tasks')

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, { status: 500 });
  }
};

export const GET = async (request, { params }) => {
  try {
    const id = params.id;
    const task = await Task.findById(id).lean();
    if (!task) return new NextResponse("Task not found", { status: 404 });
    return new NextResponse(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, { status: 500 });
  }
};

