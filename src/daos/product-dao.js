import { productModel } from "../models/productModel.js";

export default {
    findAll: () => productModel.find().lean(),
    findById: (id) => productModel.findById(id),
    create: (data) => productModel.create(data),
    update: (id, data) => productModel.updateOne({ _id: id }, data),
    delete: (id) => productModel.deleteOne({ _id: id }),
};
