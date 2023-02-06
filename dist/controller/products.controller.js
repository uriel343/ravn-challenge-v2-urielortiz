"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, stock, img, category } = req.body;
        let product;
        if (!name || !description || !price || !stock || !img || !category) {
            res.status(400).send({ msg: "Incomplete params" });
        }
        product = {
            name: name,
            description: description,
            price: price,
            stock: stock,
            img: img,
            enabled: true,
            categoryId: category,
        };
        const createdProduct = yield prisma.products.create({ data: product });
        if (!createdProduct) {
            res.status(400).send({ msg: "Something was wrong please try again" });
        }
        res.status(200).send({ msg: "success", createdProduct });
    }
    catch (error) {
        res.status(500).send({ msg: "Error" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, stock, price, enabled, img } = req.body;
        const { id } = req.params;
        const updateProduct = yield prisma.products.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                stock: stock,
                price: price,
                img: img,
                enabled: enabled
            }
        });
        if (!updateProduct) {
            res.status(400).send({ msg: 'Something was wrong please try again' });
        }
        res.status(200).send({ msg: 'success', updateProduct });
    }
    catch (error) {
        res.status(500).send("Internal server error");
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).send({ msg: 'Incomplete params' });
        }
        const deletedProduct = yield prisma.products.delete({
            where: {
                id: id
            }
        });
        res.status(200).send({ msg: 'Success, product deleted', deletedProduct });
    }
    catch (error) {
        res.status(500).send({ msg: 'Success! Product Deleted' });
    }
});
exports.deleteProduct = deleteProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield prisma.products.findMany({
            where: {
                enabled: true
            }
        });
        if (!allProducts) {
            res.status(404).send({ msg: "There aren't products to show" });
        }
        res.status(200).send({ allProducts });
    }
    catch (error) {
        res.status(500).send({ msg: 'Internal server error' });
    }
});
exports.getProducts = getProducts;
//# sourceMappingURL=products.controller.js.map