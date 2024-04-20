import mongoose from "mongoose";

const connection = {};

export const connect = async () => {
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGOURI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
};