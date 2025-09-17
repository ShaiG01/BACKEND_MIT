import Discovery from "../models/DISCOMODEL.js";
import User from "../models/USERMODEL.js";


export const createDiscovery = async (req, res) => {
  const { title, location, description, tangibility, user, userId, image} = req.body;

  try {

    const discovery = await Discovery.create({
      title,
      location,
      description,
      tangibility,
      user,
      userId,
      image,
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



export const getTangibleDiscoveries = async (req, res) => {
  try {

    const tangibleDiscoveries = await Discovery.find({ tangibility: 'tangible' });

    if (tangibleDiscoveries && tangibleDiscoveries.length > 0) {
      return res.status(200).json({ tangibleDiscoveries });
    }

  
    return res.status(404).json([]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const getIntangibleDiscoveries = async (req, res) => {
  try {

    const intangibleDiscoveries = await Discovery.find({ tangibility: 'intangible' });

    if (intangibleDiscoveries && intangibleDiscoveries.length > 0) {
      return res.status(200).json({ intangibleDiscoveries });
    }

  
    return res.status(404).json([]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

