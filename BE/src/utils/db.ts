import mongoose from "mongoose";

export const Connect = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Succesfully connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
