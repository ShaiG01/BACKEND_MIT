import User from "../models/USERMODEL.js";

export const signUpUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
 
    const existingUser = await User.findOne({ username: username });
    const existingEmail = await User.findOne({ email: email })
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    if(existingEmail){
      return res.status(401).json({message:'Email already exists.'})
    }

   
    const newUser = await User.create({
      email,
      password,
      username,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


