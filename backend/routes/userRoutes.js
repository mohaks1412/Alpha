import express from "express";
import { updateUser, deleteUser, getAllUsers } from "../controllers/userController.js";
import {authMiddleware} from '../middlewares/authMiddleware.js'

const router = express.Router();


router.put("/:id", authMiddleware, updateUser);
router.delete("/:id",authMiddleware, deleteUser)

router.get("/", getAllUsers);


export default router;