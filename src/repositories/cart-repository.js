import CartModel from "../models/cartModel.js";

export default {
    //!Hacemos populate para que cada producto venga completo
    getById: (id) => CartModel.findById(id).populate("products.product"),

    //!Crear carrito vacío
    createEmpty: () => CartModel.create({ products: [] }),

    //! Guardar los cambios
    save: (cart) => cart.save(),
};

