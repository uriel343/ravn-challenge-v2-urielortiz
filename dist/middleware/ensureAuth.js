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
exports.authenticatedUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies["accessToken"];
        const payload = (0, jsonwebtoken_1.verify)(accessToken, "access_secret");
        if (!payload) {
            return res.status(401).send({ msg: "Unauthenticated" });
        }
        const user = yield prisma.users.findUnique({
            where: {
                id: payload.id,
            },
        });
        if (!user) {
            return res.status(401).send({ msg: "Unauthenticated" });
        }
        next();
    }
    catch (error) {
        return res.status(401).send({ msg: "Unauthenticated" });
    }
});
exports.authenticatedUser = authenticatedUser;
//# sourceMappingURL=ensureAuth.js.map