import dotenv from "dotenv";
import Server from "./models/server";

//Config from ENV
dotenv.config();

const server = new Server();

server.listen();
