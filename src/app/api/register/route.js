import bcrypt from "bcryptjs";
import Joi from "joi";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import { connect } from "@/utils/db";

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  rememberMe: Joi.boolean().optional(),
});

export const POST = async request => {
  const { value, error } = registerSchema.validate(await request.json());
  console.log(error, value);

  if (error) {
    const message = `${error.details.map(detail => detail.message)}`;
    return new NextResponse(message, { status: 400 });
  }

  try {
    await connect();

    const user = await User.findOne({ email: value.email });
    if (user) return new NextResponse("User already exists", { status: 400 });
    const hashedPassword = await bcrypt.hash(value.password, 10);
    const newuser = new User({
      name: value.name,
      email: value.email,
      password: hashedPassword,
    });
    const response = await newuser.save();
    return new NextResponse(JSON.stringify(response), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, { status: "500" });
  }
};
