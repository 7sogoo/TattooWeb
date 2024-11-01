import { Router } from "express"; 
import { approveArtist, createArtist, deleteArtist, getArtist , getArtists, updateArtist } from "../controller/artist";

const artistRouter = Router();

artistRouter
.post("/create", createArtist)
.get("/:id", getArtist)
.get("/", getArtists)
.put("/:id", updateArtist)
.delete("/:id", deleteArtist)
.put("/approve/:id", approveArtist)

export default artistRouter;