import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "./config.js";
import UserModel from "../models/userModel.js";

function cookieExtractor(req) {
  if (!req || !req.cookies) return null;
  return req.cookies["authToken"] || null;
}

export function initPassport() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.SECRET_KEY
  };

  passport.use(
    "current",
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await UserModel.findById(jwtPayload.uid).populate("cart");
        if (!user) return done(null, false, { message: "Usuario no encontrado" });
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
}

