import express from "express";
import multer from "multer";
import { createBlog, getBlogs } from "../Controllers/BlogController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 7 * 1024 * 1024, //7mb
    },
});

router.post("/", upload.single("imageFile"), createBlog);
router.get("/", getBlogs);
export default router;
