import { jwtCheck, jwtParse } from "./../middleware/Auth";
import express from "express";
import multer from "multer";
import MyRestaurantController from "../controller/MyRestaurantController";
import { validateMyRestaurantRequest } from "../middleware/Validation";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
router.get(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse, 
  MyRestaurantController.getMyRestaurant
);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse, 
  MyRestaurantController.createMyrestaurant
);
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse, 
  MyRestaurantController.updateMyRestaurant
);

export default router;
