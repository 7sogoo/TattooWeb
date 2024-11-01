import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import studioRouter from "./router/studio";
import cors from "cors";
import bodyParser from "body-parser";
import { Connect } from "./utils/db";
import eventRouter from "./router/event";
import artistRouter from "./router/artist";
import tattooRouter from "./router/tattoo";
import categoryRouter from "./router/category";
import authRouter from "./router/auth";
import notificationRouter from "./router/notification";
import { sendMail } from "./controller/mail";

dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
const port = process.env.PORT || 8000;

app.use("/studio", studioRouter);
app.use("/event", eventRouter);
app.use("/artist", artistRouter);
app.use("/tattoo", tattooRouter);
app.use("/category", categoryRouter);
app.use("/auth", authRouter);
app.use("/notification", notificationRouter);
app.post("/mail", sendMail);

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to Express & TypeScript Server ${port}`);
});

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://localhost:8000";

Connect(MONGODB_URI);

app.listen(port, () => {
  console.log(
    `Server is Fire at http://localhost:${port}`,
    `Mongodb is connected ${MONGODB_URI}`
  );
});
