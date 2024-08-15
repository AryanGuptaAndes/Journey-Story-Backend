import Blog from "../models/Blog.js";
import cloudinary from "cloudinary";

export const createBlog = async (req, res) => {
    const {
        title,
        description,
        content,
        author,
        authorProffesion,
        date,
        category,
    } = req.body;
    const { blogImage, authorImage } = req.files;

    if (!title || !content || !blogImage || !authorImage) {
        return res
            .status(400)
            .send("Title, content, and image files are required");
    }

    const blogImageUrl = await uploadImage(blogImage[0]);
    const authorImageUrl = await uploadImage(authorImage[0]);

    const blog = new Blog({
        title,
        description,
        content,
        author,
        authorProffesion,
        category,
        date,
        blogImageUrl,
        authorImageUrl,
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

export const getBlogById = async (req, res) => {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);
    res.send(blog);
};

export const getBlogs = async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
};
