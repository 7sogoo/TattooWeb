import { Router } from "express"; 
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controller/category";

const categoryRouter = Router();

categoryRouter
.post("/create", createCategory)
.get("/:id", getCategory)
.get("/", getCategories)
.put("/:id", updateCategory)
.delete("/:id", deleteCategory)

export default categoryRouter