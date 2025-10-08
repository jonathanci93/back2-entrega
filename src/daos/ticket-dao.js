import TicketModel from "../models/ticketModel.js";
export default {
    create: (data) => TicketModel.create(data),
};
