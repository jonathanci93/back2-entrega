import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
}, { timestamps: true });

const TicketModel = mongoose.model("tickets", schema);
export default TicketModel;
