export default class UserDTO {
    constructor(user) {
        this.id = user._id?.toString?.() ?? user.id;
        this.name = `${user.first_name} ${user.last_name}`.trim();
        this.email = user.email;
        this.role = user.role;
        this.cart = user.cart?._id?.toString?.() ?? user.cart ?? null;
        this.createdAt = user.createdAt;
    }
}
