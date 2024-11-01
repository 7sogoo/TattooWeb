import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
  artist: {
    type: Schema.ObjectId,
    required: [true, "Artist ID is required"],
    ref: "artist",
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
}, { timestamps: true });

notificationSchema.index({ artist: 1 });

export const notificationModel = model("notification", notificationSchema);
