import express from "express";
import { param } from "express-validator";
import SearchRestaurantController from "../controller/SearchRestaurantController";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("city parameter must be a validated string"),
    SearchRestaurantController.searchRestaurant
);

export default router

