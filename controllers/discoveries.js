import Discovery from "../models/DISCOMODEL";
import User from "../models/USERMODEL";


export const createDiscovery = async (req, res) => {
  const { title, location, description, tangibility, user, userId } = req.body;

  try {

    const discovery = await Discovery.create({
      title,
      location,
      description,
      tangibility,
      user,
      userId,
    });


    const author = await User.findById(userId);

    if (!author) {
      return res.status(404).json({ message: "User not found" });
    }

    author.discoveries.push(discovery._id);


    await author.save();


    res.status(201).json({ discovery });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
