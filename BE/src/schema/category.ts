import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        unique: true,
    }
}, { timestamps: true }); 

export const categoryModel = model("category", categorySchema);
