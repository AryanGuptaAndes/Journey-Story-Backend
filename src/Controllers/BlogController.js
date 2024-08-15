import Blog from "../models/Blog.js";
import cloudinary from "cloudinary";

export const createBlog = async (req, res) => {
    const { title, description, content } = req.body;
    const imageFile = req.file;

    if (!title || !content || !imageFile) {
        return res
            .status(400)
            .send("Title, content and image file are required");
    }
    const imageUrl = await uploadImage(req.file);

    const blog = new Blog({
        title,
        description,
        content,
        imageUrl,
    });
    await blog.save();
    res.send(blog);
};

const uploadImage = async (file) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
};

export const getBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
};
