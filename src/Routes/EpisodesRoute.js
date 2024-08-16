import express from "express";
import {
    createEpisode,
    getEpisodes,
} from "../Controllers/EpisodeController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 7 * 1024 * 1024, //7mb
    },
});
router.get("/", getEpisodes);

router.post("/", upload.single("thumbnailImage"), createEpisode);

export default router;
