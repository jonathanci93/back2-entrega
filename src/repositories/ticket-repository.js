import ticketDAO from "../daos/ticket-dao.js";

function genCode() {
    return Math.random().toString(36).slice(2, 10).toUpperCase();
}

export default {
    async create({ amount, purchaser }) {
        return ticketDAO.create({ code: genCode(), amount, purchaser });
    },
};
