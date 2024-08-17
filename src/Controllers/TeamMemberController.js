import TeamMember from "../models/TeamMember.js";

export const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        if (!teamMembers) {
            return res.status(404).json({ message: "No team members found" });
        }
        res.status(200).json({ data: teamMembers });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
