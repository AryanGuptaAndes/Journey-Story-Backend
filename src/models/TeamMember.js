import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

export default mongoose.model("TeamMember", teamMemberSchema);
