import { Router } from "express"; 
import { getNotification } from "../controller/notification";

const notificationRouter = Router();

notificationRouter
.get("/", getNotification)

export default notificationRouter;