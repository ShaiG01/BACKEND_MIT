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




export const logInUser = async(req,res)=>{
  const {email, password} = req.body
  const checkEmail = await User.findOne({email: email})

  try{
    if(checkEmail){
      if(checkEmail.password === password){
        res.status(200).json({checkEmail})
      }

      else{
        res.status(400).json({message: 'Incorrect password'})
      }
    }

    res.status(404).json({message: 'User not found'})
  } catch(error){
    res.status(500).json(error)
  }

}


export const editProfile = async (req, res) => {
  const { newUsername, newPassword, newAvatar, id } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

 
    if (newUsername && newUsername.trim() !== "" && newUsername.length < 15) {
      user.username = newUsername;
    }

    if(newUsername.length > 15){
      return res.status(400).json({message: 'Username must not exceed 15 characters'})
    }

    if (newPassword && newPassword.trim() !== "") {
  
      user.password = newPassword;
    }

    if (newAvatar && newAvatar.trim() !== "") {
  
      user.avatar = newAvatar;
    }

    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
