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


export const getUserDiscoveries = async (req, res) => {
  const { id } = req.body;

  try {
    const discoveryList = await Discovery.find({ userId: id });

    // Check if the array is empty
    if (!discoveryList || discoveryList.length === 0) {
      return res.status(404).json({ message: 'No discoveries yet.' });
    }

    // Return the discoveries
    return res.status(200).json({ discoveries: discoveryList });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};




export const searchBar = async (req, res) => {
   const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    // MongoDB search
    const results = await Discovery.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },      
        { location: { $regex: query, $options: 'i' } },  
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'No discoveries found' });
    }

    return res.status(200).json(results);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}



export const deleteDiscovery = async (req, res) => {
  const { id, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: 'Unable to fetch user' });

    const discovery = await Discovery.findByIdAndDelete(id);
    if (!discovery) return res.status(404).json({ message: 'Discovery not found' });

    // Remove the discovery from the user's discoveries array
    user.discoveries = user.discoveries.filter(d => d._id.toString() !== id);
    await user.save();

    return res.status(200).json({ message: 'Discovery deleted successfully' });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
