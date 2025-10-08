import { Router } from "express";
import passport from "passport";
import UserModel from "../models/userModel.js";
import UserDTO from "../dtos/user-dto.js";
import { hashPasswordSync, comparePasswordSync } from "../utils/crypto.js";
import { signJWT } from "../utils/jwt.js";
import cartRepo from "../repositories/cart-repository.js";

const router = Router();

//! Crear carrito para el usuario logueado si no tiene
router.post(
  "/me/ensure-cart",
  passport.authenticate("current", { session: false }),
  async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id); 

      if (!user.cart) {
        const newCart = await cartRepo.createEmpty();
        user.cart = newCart._id;
        await user.save();
      }

      return res.json({
        status: "success",
        cart: user.cart.toString(), 
      });
    } catch (e) {
      console.error("ENSURE_CART_ERROR:", e);
      return res
        .status(500)
        .json({ status: "error", error: "No se pudo asegurar carrito" });
    }
  }
);


//! Registro + asociar carrito vacio
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    const exists = await UserModel.findOne({ email });
    if (exists)
      return res
        .status(400)
        .json({ status: "error", error: "Email ya registrado" });

    const hashed = hashPasswordSync(password);
    const newCart = await cartRepo.createEmpty();

    const user = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashed,
      cart: newCart._id,
      role: role || "user",
    });

    res
      .status(201)
      .json({ status: "success", payload: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", error: "Fallo al registrar usuario" });
  }
});

//! login de JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: "error", error: "Credenciales inválidas" });

    const ok = comparePasswordSync(password, user.password);
    if (!ok)
      return res
        .status(400)
        .json({ status: "error", error: "Credenciales inválidas" });

    const token = signJWT(
      { uid: user._id.toString(), role: user.role, email: user.email },
      "1d"
    );

    res
      .cookie("authToken", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false, 
        maxAge: 24 * 60 * 60 * 1000, //! 24 horas
      })
      .json({ status: "success", payload: { email: user.email, role: user.role } });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", error: "Fallo al iniciar sesión" });
  }
});


router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    const dto = new UserDTO(req.user);
    res.json({ status: "success", payload: dto });
  }
);

//! logout de JWT
router.post("/logout", (req, res) => {
  res
    .clearCookie("authToken")
    .json({ status: "success", message: "Sesión cerrada" });
});

export default router;


