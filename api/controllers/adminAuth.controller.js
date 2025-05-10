import Admin from "../models/admin.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res, next) => {
  const { adminUsername, adminPassword } = req.body;
  const hashedAdminPassword = bcryptjs.hashSync(adminPassword, 10);
  const newAdmin = new Admin({
    adminUsername,
    adminPassword: hashedAdminPassword,
  });
  try {
    await newAdmin.save();
    res.status(201).json("Admin created successfully!");
  } catch (error) {
    next(error);
  }
};

export const adminSignin = async (req, res, next) => {
  const { adminUsername, adminPassword } = req.body;
  try {
    const validAdmin = await Admin.findOne({ adminUsername });
    if (!validAdmin) return next(errorHandler(404, "Admin not found!"));

    const validAdminPassword = bcryptjs.compareSync(
      adminPassword,
      validAdmin.adminPassword
    );
    if (!validAdminPassword)
      return next(errorHandler(401, "Wrong credentials!"));

    // Generate the JWT token
    const adminToken = jwt.sign(
      { id: validAdmin._id },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "7d" } // Optional: Set expiration to 7 days
    );

    const { adminPassword: adminPass, ...rest } = validAdmin._doc;

    // Set the cookie with the JWT token
    res.cookie("admin_access_token", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
      sameSite: "Strict",
    }).status(200).json(rest);
    
  } catch (error) {
    next(error);
  }
};

export const adminSignout = async (req, res, next) => {
  try {
    res.clearCookie("admin_access_token");
    res.status(200).json("Admin has been logged out successfully!");
  } catch (error) {
    next(error);
  }
};
