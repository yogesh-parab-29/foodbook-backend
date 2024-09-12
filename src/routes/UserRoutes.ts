import express from "express";
import MyUserController from "../controller/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/Auth";
import { validateMyrequest } from "../middleware/Validation";

const router = express.Router();
router.get("", jwtCheck, jwtParse, MyUserController.getCurrentUser);
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyrequest,
  MyUserController.updateCurrentUser
);

export default router;
