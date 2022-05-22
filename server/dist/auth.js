"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("You are authenticated user");
    }
    return next();
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map