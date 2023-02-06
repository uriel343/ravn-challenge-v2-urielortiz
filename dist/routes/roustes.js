"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controller/categories.controller");
const products_controller_1 = require("../controller/products.controller");
const user_controller_1 = require("../controller/user.controller");
const ensureAuth_1 = require("../middleware/ensureAuth");
const router = (0, express_1.Router)();
//User routes
router.post("/register", user_controller_1.registerUser);
router.post("/login", user_controller_1.loginUser);
router.post("/logout", user_controller_1.logoutUser);
router.get("/getusers", ensureAuth_1.authenticatedUser, user_controller_1.getUsuarios);
//Product routes 
router.post('/product/create', products_controller_1.createProduct);
//Category routes 
router.post('/create-category', categories_controller_1.createCategory);
exports.default = router;
//# sourceMappingURL=roustes.js.map