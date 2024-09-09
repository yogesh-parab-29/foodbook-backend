import { Request, Response } from "express";
import User from "../model/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      // return res.status(200).send();
      return res.status(201).json(existingUser?.toObject());
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (e) {
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error updating user" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId)
    if (!user){
      return res.status(400).json({message:"User not found"})
    }
    res.json(user)
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "message" });
  }
};

export default { createCurrentUser, updateCurrentUser ,getCurrentUser};
