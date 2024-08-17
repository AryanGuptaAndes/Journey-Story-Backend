import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import cloudinary from "cloudinary";

export const createBlog = async (req, res) => {
    const {
        title,
        description,
        content,
        author,
        authorProfession,
        lastUpdated,
        category,
    } = req.body;
    const { blogImage, authorImage } = req.files;

    if (
        !title ||
        !content ||
        !author ||
        !authorProfession ||
        !category ||
        !blogImage ||
        !authorImage
    ) {
        return res.status(400).send("All fields are required");
    }

    const blogImageUrl = await uploadImage(blogImage[0]);
    const authorImageUrl = await uploadImage(authorImage[0]);

    const blog = new Blog({
        title,
        description: description ? description : "",
        content,
        author,
        authorProfession,
        category,
        lastUpdated: lastUpdated ? lastUpdated : new Date(),
        blogImageUrl,
        authorImageUrl,
    });
    await blog.save();
    res.json({ data: blog });
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
    if (!blogId) {
        return res.status(400).send("BlogId is required");
    }
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).send("Invalid BlogId format");
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
        return res.status(404).send("Blog not found");
    }
    res.json({ data: blog });
};

export const getBlogs = async (req, res) => {
    const sortOption = req.query.sortOption || "lastUpdated";
    const page = parseInt(req.query.page) || 1;

    const total = await Blog.countDocuments();

    const pageSize = 8;
    const skip = (page - 1) * pageSize;

    const blogs = await Blog.find()
        .sort({ [sortOption]: 1 })
        .skip(skip)
        .limit(pageSize);

    if (!blogs) {
        return res.status(404).json({
            data: [],
            pagination: {
                total: 0,
                page: 1,
                pages: 0,
            },
        });
    }

    const response = {
        data: blogs,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / pageSize),
        },
    };

    res.json({ data: response });
};
