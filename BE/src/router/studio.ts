import { Router } from "express"; 
import { createStudio, deleteStudio, getStudio, getStudios, updateStudio } from "../controller/studio";

const studioRouter = Router()

studioRouter
.post("/create", createStudio)
.get("/", getStudios)
.get("/:id", getStudio)
.delete("/:id", deleteStudio)
.put("/:id", updateStudio)

export default studioRouter