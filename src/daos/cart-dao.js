import CartModel from "../models/cartModel.js";

export default {
    findById: (id) => CartModel.findById(id).populate("products.product"),
    createEmpty: () => CartModel.create({ products: [] }),
    save: (cart) => cart.save(),
};
