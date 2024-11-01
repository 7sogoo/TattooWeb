import { Router } from "express"; 
import { createTattoo, deleteTattoo, getTattoo, getTattoos, updateTattoo } from "../controller/tattoo";

const tattooRouter = Router();

tattooRouter
.post("/create", createTattoo)
.get("/", getTattoos)
.get("/:id", getTattoo)
.put("/:id", updateTattoo)
.delete("/:id", deleteTattoo)

export default tattooRouter;