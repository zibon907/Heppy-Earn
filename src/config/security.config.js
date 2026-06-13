const SecurityConfig = Object.freeze({

    PASSWORD: {

        MIN_LENGTH: 8,

        MAX_LENGTH: 64,

        REQUIRE_UPPERCASE: true,

        REQUIRE_LOWERCASE: true,

        REQUIRE_NUMBER: true,

        REQUIRE_SPECIAL: true
    },

    LOGIN: {

        MAX_ATTEMPTS: 5,

        LOCKOUT_MINUTES: 15
    },

    SESSION: {

        REMEMBER_ME_DAYS: 30,

        TOKEN_EXPIRY_HOURS: 24,

        REFRESH_THRESHOLD_MINUTES: 30
    },

    RATE_LIMIT: {

        ENABLED: true,

        REQUESTS_PER_MINUTE: 60,

        LOGIN_REQUESTS_PER_MINUTE: 10
    },

    STORAGE: {

        ENCRYPTION_ENABLED: false,

        HASH_ALGORITHM: "SHA-256"
    },

    SANITIZATION: {

        TRIM_INPUTS: true,

        REMOVE_HTML: true,

        ESCAPE_OUTPUT: true
    },

    HEADERS: {

        X_FRAME_OPTIONS: "DENY",

        X_CONTENT_TYPE_OPTIONS: "nosniff",

        REFERRER_POLICY: "strict-origin-when-cross-origin"
    },

    ROLES: {

        ADMIN: "admin",

        MODERATOR: "moderator",

        USER: "user"
    },

    PERMISSIONS: {

        MANAGE_USERS: "manage_users",

        MANAGE_WALLETS: "manage_wallets",

        VIEW_ANALYTICS: "view_analytics",

        PLAY_GAMES: "play_games",

        ACCESS_ADMIN: "access_admin"
    }

});

export default SecurityConfig;
