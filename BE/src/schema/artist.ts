import { Schema, model } from "mongoose";

const socialLinkSchema = new Schema(
  {
    platform: {
      type: String,
    },
    url: {
      type: String,
      match: /^(https?:\/\/)?(www\.)?[a-z0-9]+\.[a-z]+(\/[^\s]*)?$/i,
    },
  },
  { _id: false }
);

const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    socialLinks: {
      type: [socialLinkSchema],
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    studio: {
      type: Schema.ObjectId,
      ref: "studio",
    },
    experience: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Barber", "Tattoo artist", "User", "Admin"],
      default: "User",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved"],
      default: "Pending",
    }
  },
  { timestamps: true }
);

export const artistModel = model("artist", artistSchema);
