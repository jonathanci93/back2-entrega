import userDAO from "../daos/user-dao.js";

export default {
    getById: (id) => userDAO.findById(id),
    getByEmail: (email) => userDAO.findByEmail(email),
    create: (data) => userDAO.create(data),
};
