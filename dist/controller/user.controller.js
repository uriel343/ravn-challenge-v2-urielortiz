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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = exports.getUsuarios = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.users.findMany();
        res.json({ msg: "Get Usuarios", allUsers });
    }
    catch (error) {
        res.json({ msg: "Internal error" });
    }
});
exports.getUsuarios = getUsuarios;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const role = "Client";
    try {
        if (!name || !email || !password) {
            console.log(name, email, password);
            res.json({
                msg: "Incomplete params",
            });
        }
        const userRegistered = yield prisma.users.create({
            data: {
                name: name,
                role: role,
                email: email,
                password: yield bcrypt_1.default.hash(password, 12),
            },
        });
        res.json({
            msg: "postUsuario",
            userRegistered,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Internal error",
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ msg: "Incomplete params" });
    }
    try {
        const user = yield prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        let passwordVerified = bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!user || !passwordVerified) {
            res.status(404).send({
                msg: "Invalid credentials",
            });
        }
        const accessToken = (0, jsonwebtoken_1.sign)({
            id: user === null || user === void 0 ? void 0 : user.id,
        }, "access_secret", { expiresIn: "10s" });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, //1 day
        });
        res.status(200).send({ msg: "User authenticated" });
    }
    catch (error) {
        res.status(500).send({ msg: "Internal error" });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("accessToken", "", { maxAge: 0 });
    res.send({ msg: "Success" });
});
exports.logoutUser = logoutUser;
//# sourceMappingURL=user.controller.js.map