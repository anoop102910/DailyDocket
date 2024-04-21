import { NextResponse } from "next/server";
import joi from "joi";
import Task from "@/models/task.model";
import { connect } from "@/utils/db";
import { revalidatePath, revalidateTag } from "next/cache";

// Define Joi schema for validation
const taskSchema = joi.object({
  title: joi.string().trim().required().min(3).max(50),
  description: joi.string().trim().min(10).max(255),
  priority: joi.string().valid("Low", "Medium", "High").default("medium"),
  dueDate: joi
    .date()
    .optional()
    .custom((value, helper) => {
      if (value && value < Date.now()) {
        return helper.message({ value }, "{{#label}} should be greater than current date");
      }
      return value;
    }),
  createdBy: joi.string().required(),
});

// POST request to create a new task
export const POST = async request => {
  const body = await request.json();
  const { value, error } = taskSchema.validate(body);
  if (error) {
    console.log(error);
    return new NextResponse(error.details[0].message, { status: 400 });
  }

  try {
    connect();
    const newTask = await new Task(value);
    const response = await newTask.save();
    revalidatePath("/home");
    revalidateTag("tasks");
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, { status: 500 });
  }
};
