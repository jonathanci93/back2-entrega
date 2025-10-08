import UserModel from "../models/userModel.js";
export default {
    findById: (id) => UserModel.findById(id).populate("cart"),
    findByEmail: (email) => UserModel.findOne({ email }),
    create: (data) => UserModel.create(data),
};
