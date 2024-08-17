import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import blogRouter from "./Routes/BlogRoute.js";
import episodeRouter from "./Routes/EpisodesRoute.js";
import TeamMemberRouter from "./Routes/TeamMemberRoute.js";

dotenv.config();

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
    res.send({ message: "Health OK!" });
});

app.use("/api/blog", blogRouter);
app.use("/api/episode", episodeRouter);
app.use("/api/team-members", TeamMemberRouter);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
