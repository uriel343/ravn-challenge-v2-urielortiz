import express, { Application } from "express";
import router from "../routes/roustes";
import cors from "cors";
import cookieParser from "cookie-parser";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    routes: "/",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    //Initial methods
    this.middlewares();
    this.routes();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //body read
    this.app.use(express.json());

    //cookie parser
    this.app.use(cookieParser());

    //Public file
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.routes, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server is runnin on ==> " + this.port);
    });
  }
}

export default Server;
