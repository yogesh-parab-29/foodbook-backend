import express from "express";
import MyUserController from "../controller/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/Auth";
import { validateMyrequest } from "../middleware/Validation";

const userRouter = express.Router();
userRouter.get("",jwtCheck,jwtParse,MyUserController.getCurrentUser)
userRouter.post("/", jwtCheck, MyUserController.createCurrentUser);
userRouter.put("/",jwtCheck, jwtParse,validateMyrequest, MyUserController.updateCurrentUser);

export default userRouter;
