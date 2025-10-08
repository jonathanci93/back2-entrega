import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import cartRouter from "./src/routes/cartRouter.js";

import config from "./src/config/config.js";
import { initMongoDB } from "./src/config/db-connection.js";
import { initPassport } from "./src/config/passport.js";

import productRouter from "./src/routes/productRouter.js";
import viewsRouter from "./src/routes/viewsRouter.js";
import sessionsRouter from "./src/routes/sessionsRouter.js";

import __dirname from "./utils.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

// Passport
initPassport();
app.use(passport.initialize());

// Routers
app.use("/api/products", productRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);
app.use("/api/carts", cartRouter);
// DB + Server
await initMongoDB();
app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});

