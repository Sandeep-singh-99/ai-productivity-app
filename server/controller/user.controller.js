import User from "../models/user.model.js";
import { DeleteImage } from "../utils/delete-image.js";
import { generateToken } from "../utils/generateToken.js";
import { UploadImage } from "../utils/upload-image.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(401)
        .json({ message: "User already exists", success: false });
    }

    const imageUrl = req.file;

    if (!imageUrl) {
      return res
        .status(401)
        .json({ message: "Please upload a profile image", success: false });
    }

    const profileImage = await UploadImage(imageUrl, "ai-productivity-app");

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      imageUrl: profileImage.secure_url,
      imageUrlId: profileImage.public_id,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      res
        .status(200)
        .json(newUser, {
          message: "User registered successfully",
          success: true,
        });
    } else {
      res
        .status(401)
        .json({ message: "User registration failed", success: false });
    }
  } catch (error) {
    res.status(401).json({ message: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      res.status(401).json({ message: "User does not exist", success: false });
    }

    const isPasswordValid = await userExists.comparePassword(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    generateToken(userExists._id, res);
    res
      .status(200)
      .json(userExists, {
        message: "User logged in successfully",
        success: true,
      });
  } catch (error) {
    res.status(401).json({ message: error.message, success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: true, // Set to true if using HTTPS
    });
    res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.log("Error in logout:", error);
    res.status(401).json({ message: error.message, success: false });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res
      .status(200)
      .json(req.user, { message: "User is authenticated", success: true });
  } catch (error) {
    res.status(401).json({ message: error.message, success: false });
  }
};


export const allUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found", success: false });
    }

    res.status(200).json( users,{
      message: "Users fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({ message: error.message, success: false });
  }
};


export const updateUser = async (req, res) => {
  try {
    const id  = req.user;

    const userExists = await User.findById(id);

    if (!userExists) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Please upload a profile image", success: false });
    }

    
    if (userExists.imageUrlId) {
      await DeleteImage(userExists.imageUrlId);
    }

    
    const newImage = await UploadImage(req.file, "ai-productivity-app");

   
    userExists.imageUrl = newImage.secure_url;
    userExists.imageUrlId = newImage.public_id;

    await userExists.save();

    res.status(200).json(userExists,{
      message: "User profile image updated successfully",
      success: true,
    });

  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
