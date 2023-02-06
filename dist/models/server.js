"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roustes_1 = __importDefault(require("../routes/roustes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class Server {
    constructor() {
        this.apiPaths = {
            routes: "/",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        //Initial methods
        this.middlewares();
        this.routes();
    }
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        //body read
        this.app.use(express_1.default.json());
        //cookie parser
        this.app.use((0, cookie_parser_1.default)());
        //Public file
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.routes, roustes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is runnin on ==> " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map