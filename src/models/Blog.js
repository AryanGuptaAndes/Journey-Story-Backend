import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "", required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    authorProffesion: { type: String, required: true },
    authorImageUrl: { type: String, required: true },
    blogImageUrl: { type: String, required: true },
});

export default mongoose.model("Blog", blogSchema);
