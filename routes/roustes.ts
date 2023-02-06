import { Router } from "express";
import { createCategory } from "../controller/categories.controller";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controller/products.controller";
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
router.get('/products', getProducts)
router.put('/product/update/:id', updateProduct)
router.delete('/product/delete/:id', deleteProduct)


//Category routes 
router.post('category/create', createCategory)



export default router;
