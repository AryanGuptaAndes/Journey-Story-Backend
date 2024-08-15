import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "", required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

export default mongoose.model("Blog", blogSchema);
