import { db } from "../core/db.js";
import { Security } from "../core/security.js";

export const AuthService = {

    // =========================
    // REGISTER (FIXED)
    // =========================
    register({ email, password, name }) {

        // validation
        if (!email || !password || !name) {
            return {
                success: false,
                message: "All fields are required"
            };
        }

        email = email.trim().toLowerCase();
        password = password.trim();

        if (password.length < 6) {
            return {
                success: false,
                message: "Password must be at least 6 characters"
            };
        }

        if (db.findUserByEmail(email)) {
            return {
                success: false,
                message: "User already exists"
            };
        }

        const user = {
            id: Date.now().toString(),
            name: name.trim(),
            email,
            password: Security.hashPassword(password),

            wallet: 0,
            createdAt: new Date()
        };

        db.createUser(user);

        return {
            success: true,
            message: "Registration successful",
            user
        };
    },

    // =========================
    // LOGIN (FIXED)
    // =========================
    login({ email, password }) {

        if (!email || !password) {
            return {
                success: false,
                message: "Email and password required"
            };
        }

        email = email.trim().toLowerCase();
        password = password.trim();

        const user = db.findUserByEmail(email);

        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }

        const valid = Security.verifyPassword(password, user.password);

        if (!valid) {
            return {
                success: false,
                message: "Wrong password"
            };
        }

        user.lastLogin = new Date();

        return {
            success: true,
            message: "Login successful",
            user
        };
    }
};
