import Episode from "../models/Episode.js";
import cloudinary from "cloudinary";

export const createEpisode = async (req, res) => {
    const { title, category, duration, EpisodeUrl } = req.body;
    if (!title || !category || !duration || !EpisodeUrl) {
        return res.status(400).send("Please fill all the fields");
    }
    const newEpisode = new Episode({
        title,
        category,
        duration,
        EpisodeUrl,
    });

    const thumbnailUrl = await uploadImage(req.file);
    newEpisode.thumbnail = thumbnailUrl;
    await newEpisode.save();

    res.status(201).json({ data: newEpisode });
};

const uploadImage = async (file) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
};

export const getEpisodes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const episodes = await Episode.find().skip(skip).limit(pageSize);

    const total = await Episode.countDocuments();

    if (!episodes) {
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
        data: episodes,
        pagination: {
            total,
            page,
            pages: Math.ceil(total / pageSize),
        },
    };

    res.json({ data: response });
};
