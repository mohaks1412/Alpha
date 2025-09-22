// routes/authRoutes.js
import express from "express";
import { getCurrentUser, logout, register, socialSignin} from "../controllers/authController.js";
import { loginWithEmail } from "../controllers/authController.js";
import { loginWithPhone } from "../controllers/authController.js";

const router = express.Router();


//     /api/auth/
router.get("/me", getCurrentUser);

router.post("/register", register);
router.post("/emailLogin", loginWithEmail);
router.post("/phoneLogin", loginWithPhone)


router.post("/socialAuth", socialSignin);

router.post("/logout", logout)


export default router;
