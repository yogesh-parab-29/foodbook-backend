import { Request, Response } from "express";
import Restaurant from "../model/restaurant";
import cloudinary from "cloudinary";
import mongoose, { Mongoose } from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
  console.log("reached 2");
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (!existingRestaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    return res.json(existingRestaurant);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error fetching restaurant" });
  }
};

const createMyrestaurant = async (req: Request, res: Response) => {
  // -----------------------------------------------------------------------------
  // try {
  //   console.log("reached");
  //   const existingRestaurant = await Restaurant.findOne({
  //     user: req.userId,
  //   });

  //   if (existingRestaurant) {
  //     return res.status(409).json({ message: "Restaurant exist already" });
  //   }

  //   const image = req.file as Express.Multer.File;
  //   const base64Image = Buffer.from(image.buffer).toString("base64");
  //   const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  //   const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  //   const restaurant = new Restaurant(req.body);
  //   restaurant.imageUrl = uploadResponse.url;
  //   restaurant.user = new mongoose.Types.ObjectId(req.userId);
  //   restaurant.lastUpdated = new Date();
  //   await restaurant.save();

  //   return res.status(201).send(restaurant);
  // } catch (e) {
  //   console.log(e);
  //   return res.status(500).json({ message: "Error while creating restaturant" });
  // }

  //////////////////////////////////////////////////////////////////////

  // try {
  //   const existingRestaurant = await Restaurant.findOne({ user: req.userId });

  //   if (existingRestaurant) {
  //     return res
  //       .status(409)
  //       .json({ message: "User restaurant already exists" });
  //   }

  //   const imageUrl = await uploadImage(req.file as Express.Multer.File);

  //   const restaurant = new Restaurant(req.body);
  //   restaurant.imageUrl = imageUrl;
  //   restaurant.user = new mongoose.Types.ObjectId(req.userId);
  //   restaurant.lastUpdated = new Date();
  //   await restaurant.save();

  //   res.status(201).send(restaurant);
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ message: "Something went wrong" });
  // }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // try {
  //   console.log("Received request to create restaurant");

  //   // Log the entire request body
  //   console.log("Request body:", req.body);

  //   // Log file information if present
  //   if (req.file) {
  //     console.log("Received file:", {
  //       fieldname: req.file.fieldname,
  //       originalname: req.file.originalname,
  //       mimetype: req.file.mimetype,
  //       size: req.file.size,
  //     });
  //   } else {
  //     console.log("No file received");
  //   }

  //   // Log other form fields
  //   console.log("Restaurant Name:", req.body.restaurantName);
  //   console.log("City:", req.body.city);
  //   console.log("Country:", req.body.country);
  //   console.log("Delivery Price:", req.body.deliveryPrice);
  //   console.log("Estimated Delivery Time:", req.body.estimatedDeliveryTime);

  //   // Log arrays
  //   console.log("Cuisines:", req.body.cuisines);
  //   console.log("Menu Items:", req.body.menuItems);

  //   // Send a success response
  //   return res
  //     .status(200)
  //     .json({ message: "Data received successfully", body: req.body });
  // } catch (e) {
  //   console.error("Error in createMyRestaurant:", e);
  //   return res.status(500).json({ message: "Error while processing request" });
  // }

  try {
    const existingRestaurant = await Restaurant.findOne({
      user: req.userId,
    });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  //------------------------------------------------------------------------------------
  // Alternate approach testing pending
  // const allowedFields = Object.keys(Restaurant.schema.paths).filter((field) => {
  //   // Filter out any internal fields or fields you don't want to allow for update
  //   return !['_id', '__v', 'createdAt', 'updatedAt'].includes(field);
  // });
  // Now use the allowedFields to update only those fields
  //  Object.keys(req.body).forEach((key) => {
  //   if (allowedFields.includes(key)) {
  //     (existingRestaurant as any)[key] = req.body[key];
  //   }
  // });
  //------------------------------------------------------------------------------------

  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (!existingRestaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    existingRestaurant.restaurantName = req.body.restaurantName;
    existingRestaurant.city = req.body.city;
    existingRestaurant.country = req.body.country;
    existingRestaurant.cuisines = req.body.cuisines;
    existingRestaurant.deliveryPrice = req.body.deliveryPrice;
    existingRestaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    existingRestaurant.menuItems = req.body.menuItems;
    existingRestaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      existingRestaurant.imageUrl = imageUrl;
    }
    await existingRestaurant.save();
    return res.status(200).send(existingRestaurant);
  } catch (e) {
    res.status(500).json({ message: "Update did not succeed" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  getMyRestaurant,
  createMyrestaurant,
  updateMyRestaurant,
};
