// =========================================
// AUTH SERVICE (ENTERPRISE SAAS LAYER)
// Handles Authentication + Validation + User Creation
// =========================================

const AuthService = {

    // =========================================
    // INTERNAL: VALIDATION HELPERS
    // =========================================
    isValidEmail(email) {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    },

    isValidPassword(password) {

        // Minimum 6 characters (can extend later)
        return password && password.length >= 6;
    },

    isEmpty(value) {

        return (
            value === null ||
            value === undefined ||
            value.toString().trim() === ""
        );
    },

    // =========================================
    // LOGIN SYSTEM
    // =========================================
    login(email, password) {

        // Input validation
        if (this.isEmpty(email) || this.isEmpty(password)) {

            return {
                success: false,
                message: "Email and password are required"
            };
        }

        if (!this.isValidEmail(email)) {

            return {
                success: false,
                message: "Invalid email format"
            };
        }

        const users = StorageService.getUsers();

        const user = users.find(u =>
            u.email === email &&
            u.password === password
        );

        if (!user) {

            return {
                success: false,
                message: "Invalid email or password"
            };
        }

        // Update last login (important SaaS feature)
        user.lastLogin = new Date().toISOString();

        StorageService.updateUser(user);
        StorageService.setCurrentUser(user);

        return {
            success: true,
            message: "Login successful",
            user: user
        };
    },

    // =========================================
    // REGISTER SYSTEM
    // =========================================
    register(userData) {

        // Required field validation
        const requiredFields = [
            "fullName",
            "username",
            "email",
            "password"
        ];

        for (let field of requiredFields) {

            if (this.isEmpty(userData[field])) {

                return {
                    success: false,
                    message: `${field} is required`
                };
            }
        }

        // Email validation
        if (!this.isValidEmail(userData.email)) {

            return {
                success: false,
                message: "Invalid email format"
            };
        }

        // Password validation
        if (!this.isValidPassword(userData.password)) {

            return {
                success: false,
                message: "Password must be at least 6 characters"
            };
        }

        const existingUser =
            StorageService.findUserByEmail(userData.email);

        if (existingUser) {

            return {
                success: false,
                message: "User already exists"
            };
        }

        // Create structured user object
        const newUser = {

            id: Date.now(),

username: userData.username.trim(),
fullName: userData.fullName.trim(),
email: userData.email.trim().toLowerCase(),
password: userData.password,

wallet: 0,
xp: 0,
level: 1,

points: 0,

vipLevel: "Bronze",

dailyBonusClaimed: false,

totalReferrals: 0,
totalRewards: 0,

achievementCount: 0,

            referralCode:
                "VR-" +
                Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase(),

            totalReferrals: 0,
            totalRewards: 0,

            activities: [
                {
                    type: "ACCOUNT_CREATED",
                    description: "Account created successfully",
                    timestamp: new Date().toISOString()
                }
            ],

            notifications: [],

            securityScore: 100,

            createdAt: new Date().toISOString(),
            lastLogin: null
        };

        const result = StorageService.addUser(newUser);

        if (!result.success) {

            return result;
        }

        // Auto login after register (SaaS UX feature)
        StorageService.setCurrentUser(newUser);

        return {
            success: true,
            message: "Registration successful",
            user: newUser
        };
    },

    // =========================================
    // SESSION VALIDATION
    // =========================================
    validateSession() {

        const user = StorageService.getCurrentUser();

        if (!user) {

            return {
                success: false,
                message: "No active session"
            };
        }

        return {
            success: true,
            user: user
        };
    },

    // =========================================
    // LOGOUT SYSTEM
    // =========================================
    logout() {

        StorageService.logout();

        return {
            success: true,
            message: "Logged out successfully"
        };
    }
};
