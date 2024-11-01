import { Schema, model } from "mongoose";

const socialLinkSchema = new Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
    },
  },
  { _id: false }
);

export const imageSchema = new Schema(
  {
    url: {
      type: String,
      // match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
    },
  },
  { _id: false }
);

const studioSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    logo: imageSchema,
    description: {
      type: String,
      trim: true,
    },
    images: [imageSchema],
    socialLinks: [socialLinkSchema],
    establishedDate: {
      type: Date,
    },
    timeTable: {
      type: String,
      trim: true,
      require: true,
    },
  },
  { timestamps: true }
);

export const studioModel = model("studio", studioSchema);
