import { Schema, model } from "mongoose";

const tattooSchema = new Schema(
  {
    images: {
      type: String
    },
    category: {
      type: Schema.ObjectId,
      ref: "category",
    },
    artist: {
      type: Schema.ObjectId,
      required: [true, "Tattoo artist is required"],
      ref: "artist",
    },
  },
  { timestamps: true }
);

export const tattooModel = model("tattoo", tattooSchema);
