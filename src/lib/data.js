"use server";
import Task from "@/models/task.model";
import User from "@/models/user.model";
import { connect } from "@/utils/db";

export const fetchUserTask = async ({ userId, q, status, priority, limit, page, sortBy }) => {
  try {
    connect();
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (q) filter.title = new RegExp(q, "i");

    limit = Number(limit) || 10;
    page = Number(page) || 1;
    const tasks = await Task.find({ createdBy: userId, ...filter })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ [sortBy]: -1 })
      .lean();
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchUser = async ({ userId }) => {
  try {
    connect();
    const user = await User.findById(userId).select("-password").lean();
    return {
      ...user.toJSON(),
      _id: user._id.toHexString(),
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchUserByEmail = async email => {
  try {
    connect();
    const user = await User.findOne({ email }).select("-password");
    if (!user) throw Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fetchTasksCount = async ({ userId, status, priority }) => {
  try {
    connect();
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    const totalTasks = await Task.countDocuments({ createdBy: userId, ...filter });
    return totalTasks;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
