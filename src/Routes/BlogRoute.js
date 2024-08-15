import express from "express";
import multer from "multer";
import {
    createBlog,
    getBlogById,
    getBlogs,
} from "../Controllers/BlogController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 7 * 1024 * 1024, // 7MB
    },
});

const uploadFields = upload.fields([
    { name: "blogImage", maxCount: 1 },
    { name: "authorImage", maxCount: 1 },
]);

router.post("/", uploadFields, createBlog);
router.get("/:blogId", getBlogById);
router.get("/", getBlogs);

export default router;
