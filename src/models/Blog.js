import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "", required: true },
    content: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
    category: { type: String, required: true },
    author: { type: String, required: true },
    authorProfession: { type: String, required: true },
    authorImageUrl: { type: String, required: true },
    blogImageUrl: { type: String, required: true },
});

export default mongoose.model("Blog", blogSchema);
