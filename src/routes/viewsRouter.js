import { Router } from "express";
import passport from "passport";
import ProductManager from "../clases/productManager.js";

const viewsRouter = Router();
const PM = new ProductManager();

viewsRouter.get("/", async (req, res) => {
    const products = await PM.getProducts();
    res.render("home", { products });
});

viewsRouter.get(
    "/profile",
    passport.authenticate("current", { session: false }),
    (req, res) => {
        const user = req.user?.toObject?.() ? req.user.toObject() : req.user;
        res.render("profile", { user });
    }
);

export default viewsRouter;
