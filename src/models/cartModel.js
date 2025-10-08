import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema(
    {
        products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, default: 1, min: 1 }
        }
        ]
    },
    { timestamps: true }
);

const CartModel = mongoose.model(collection, schema);
export default CartModel;
