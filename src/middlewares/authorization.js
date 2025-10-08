export const requireRole = (...roles) => {
    return (req, res, next) => {
        try {
            const role = req.user?.role;
            if (!role || !roles.includes(role)) {
                return res.status(403).json({ status: "error", error: "No autorizado" });
            }
            next();
        } catch (e) {
            res.status(401).json({ status: "error", error: "No autorizado" });
        }
    };
};
