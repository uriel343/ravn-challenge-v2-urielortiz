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
exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        let category;
        category = {
            name: name,
        };
        const createCategory = yield prisma.categories.create({ data: category });
        if (!createCategory) {
            res.status(400).send({ msg: 'Something was wrong, please try again' });
        }
        res.status(200).send({ msg: "Success", createCategory });
    }
    catch (error) {
        res.status(500).send({ msg: "Error, try again" });
    }
});
exports.createCategory = createCategory;
//# sourceMappingURL=categories.controller.js.map