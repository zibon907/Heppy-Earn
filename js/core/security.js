import crypto from "crypto";

export const Security = {

    hashPassword(password) {

        return crypto
            .createHash("sha256")
            .update(password.trim())
            .digest("hex");
    },

    verifyPassword(password, hash) {

        return this.hashPassword(password) === hash;
    }
};
