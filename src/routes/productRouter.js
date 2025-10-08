import { Router } from "express";
import passport from "passport";
import { requireRole } from "../middlewares/authorization.js";
import productRepo from "../repositories/product-repository.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const products = await productRepo.getAll();
    res.json({ status: "OK", data: products });
});

productRouter.get("/:id", async (req, res) => {
    const p = await productRepo.getById(req.params.id);
    if (!p) return res.status(404).json({ status: "error", error: "No encontrado" });
    res.json({ status: "OK", data: p });
});

//! admin 
productRouter.post("/",
    passport.authenticate("current", { session: false }),
    requireRole("admin"),
    async (req, res) => {
        const created = await productRepo.create(req.body);
        res.status(201).json({ status: "OK", data: created });
    });

productRouter.put("/:id",
    passport.authenticate("current", { session: false }),
    requireRole("admin"),
    async (req, res) => {
        const result = await productRepo.update(req.params.id, req.body);
        res.json({ status: "OK", data: result });
    });

productRouter.delete("/:id",
    passport.authenticate("current", { session: false }),
    requireRole("admin"),
    async (req, res) => {
        const result = await productRepo.delete(req.params.id);
        res.json({ status: "OK", data: result });
    });

export default productRouter;
