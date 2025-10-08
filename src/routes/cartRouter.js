
import { Router } from "express";
import passport from "passport";
import mongoose from "mongoose";
import UserModel from "../models/userModel.js";
import { requireRole } from "../middlewares/authorization.js";
import cartRepo from "../repositories/cart-repository.js";
import productRepo from "../repositories/product-repository.js";
import ticketRepo from "../repositories/ticket-repository.js";

const router = Router();
const isId = (id) => mongoose.Types.ObjectId.isValid(id);

//! Agregar producto al carrito como usuario user
router.post("/:cid/product/:pid",
    passport.authenticate("current", { session: false }),
    requireRole("user"),
    async (req, res) => {
        try {
            let { cid, pid } = req.params;
            const { quantity = 1 } = req.body;

            
            if (cid === "me") {
                const user = await UserModel.findById(req.user._id || req.user.uid);
                cid = user?.cart?._id?.toString?.() || user?.cart?.toString?.() || null;
            }

            if (!cid || !mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
                return res.status(400).json({ status: "error", error: "ID inválido" });
            }

            const cart = await cartRepo.getById(cid);
            if (!cart) return res.status(404).json({ status: "error", error: "Carrito no encontrado" });

            const idx = cart.products.findIndex(p => p.product._id.toString() === pid);
            if (idx === -1) cart.products.push({ product: pid, quantity });
            else cart.products[idx].quantity += quantity;

            await cartRepo.save(cart);
            res.json({ status: "success", payload: cart });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: "error", error: "No se pudo agregar al carrito" });
        }
    });

//! Finalizar compra
router.post(
    "/:cid/purchase",
    passport.authenticate("current", { session: false }),
    requireRole("user"),
    async (req, res) => {
        try {
            let { cid } = req.params;


            if (cid === "me") {
                const user = await UserModel.findById(req.user._id || req.user.uid);
                cid = user?.cart?._id?.toString?.() || user?.cart?.toString?.() || null;
            }

            if (!isId(cid)) {
                return res.status(400).json({ status: "error", error: "ID inválido" });
            }

            const cart = await cartRepo.getById(cid);
            if (!cart) {
                return res.status(404).json({ status: "error", error: "Carrito no encontrado" });
            }

            const purchasable = [];
            const notProcessed = [];

            //! Verificar stock
            for (const item of cart.products) {
                const prod = await productRepo.getById(item.product._id);
                if (!prod) continue;
                if (prod.stock >= item.quantity) {
                    purchasable.push({ prod, qty: item.quantity });
                } else {
                    notProcessed.push(item.product._id.toString());
                }
            }

            //! Descontar stock y calcular total
            let amount = 0;
            for (const { prod, qty } of purchasable) {
                prod.stock -= qty;
                amount += prod.price * qty;
                await productRepo.update(prod._id, { stock: prod.stock });
            }

            //! Generar ticket si hubo compra
            let ticket = null;
            if (amount > 0) {
                ticket = await ticketRepo.create({
                    amount,
                    purchaser: req.user.email,
                });
            }

            //! Dejar en el carrito solo los no comprados
            cart.products = cart.products.filter((it) =>
                notProcessed.includes(it.product._id.toString())
            );
            await cartRepo.save(cart);

            res.json({
                status: "success",
                payload: {
                    ticket,
                    notProcessed, //! ids que no se pudieron procesar
                    cart,
                },
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({ status: "error", error: "No se pudo finalizar la compra" });
        }
    }
);

export default router;
