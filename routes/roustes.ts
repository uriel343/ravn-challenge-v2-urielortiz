import { Router } from "express";
import { createCategory } from "../controller/categories.controller";
import { createProduct } from "../controller/products.controller";
import {
  getUsuarios,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller";
import { authenticatedUser } from "../middleware/ensureAuth";

const router = Router();

//User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getusers", authenticatedUser, getUsuarios);

//Product routes 
router.post('/product/create', createProduct)

//Category routes 
router.post('/create-category', createCategory)


export default router;
