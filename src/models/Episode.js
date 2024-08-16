import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    EpisodeUrl: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Episode", episodeSchema);
