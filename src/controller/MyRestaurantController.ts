import { Request, Response } from "express";
import Restaurant from "../model/restaurant";
import cloudinary from "cloudinary";
import mongoose, { Mongoose } from "mongoose";

const createMyrestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.find({
    //   user: req.userId,
    });

    if (existingRestaurant) {
      return res.status(409).json({ message: "Restaurant exist already" });
    }

    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    await restaurant.save()
  } catch (e) {
    res.status(500).json({ message: "Error while creating restaturant" });
  }
};
