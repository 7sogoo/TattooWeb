import { Schema, model } from "mongoose";

const eventSchema = new Schema({
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
    posterPicture: {
        type: String,
        trim: true,
        match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
    },
    description: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    artists: [{
        type: Schema.ObjectId,
        ref: "artist",
    }],
}, { timestamps: true });

export const eventModel = model("event", eventSchema);
