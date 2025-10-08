import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name:  { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
    age:        { type: Number, min: 0, default: 0 },
    password:   { type: String, required: true },
    cart:       { type: mongoose.Schema.Types.ObjectId, ref: "carts", default: null },
    role:       { type: String, enum: ["user","admin"], default: "user" }
  },
  { timestamps: true }
);

const UserModel = mongoose.model(collection, schema);
export default UserModel;
