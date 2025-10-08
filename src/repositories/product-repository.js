import productDAO from "../daos/product-dao.js";

export default {
    getAll: () => productDAO.findAll(),
    getById: (id) => productDAO.findById(id),
    create: (data) => productDAO.create(data),
    update: (id, data) => productDAO.update(id, data),
    delete: (id) => productDAO.delete(id),
    };
