import { Router } from "express";
import { LoginUser, LogoutUser, refreshAccesToken, registerUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/authentication.middleware.js";

const router=Router();

router.route("/register").post(registerUser)
router.route("/logging").post(LoginUser)

router.route("/logout").post(verifyJwt,LogoutUser);
router.route("/RefreshToken").post(refreshAccesToken);

export default router;