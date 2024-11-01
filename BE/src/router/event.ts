import { Router } from "express"; 
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from "../controller/event";

const eventRouter = Router()

eventRouter
.post("/create", createEvent)
.get("/", getEvents)
.get("/:id", getEvent)
.delete("/:id", deleteEvent)
.put("/:id", updateEvent)

export default eventRouter