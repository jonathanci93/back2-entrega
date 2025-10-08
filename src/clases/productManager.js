import { productModel } from "../models/productModel.js";

class ProductManager {
    constructor() {
        this.products = [];
    }

    async getProducts() {
        return await productModel.find().lean()
    }

    async getProductById(id) {
        return await productModel.findOne({_id:id})
    }

    async addProduct(product) {
        return await productModel.create(product)
    }

    async editProduct(id, product) {
        return await productModel.updateOne({_id:id}, product)
    }

    async deleteProduct(id) {
        return await productModel.deleteOne({_id:id})
    }
}

export default ProductManager