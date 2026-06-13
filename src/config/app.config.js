const AppConfig = Object.freeze({

    APP_NAME: "Virtual Gaming Platform",

    APP_VERSION: "1.0.0",

    ENVIRONMENT: "development",

    DEBUG: true,

    URL: window.location.origin,

    STORAGE_PREFIX: "vgp",

    DEFAULT_LANGUAGE: "en",

    TIMEZONE: "UTC",

    SESSION_TIMEOUT: 1000 * 60 * 60 * 24,

    AUTO_SAVE_INTERVAL: 1000 * 30,

    PAGINATION: {

        DEFAULT_LIMIT: 20,

        MAX_LIMIT: 100
    },

    WALLET: {

        STARTING_BALANCE: 1000,

        MAX_BALANCE: 100000000
    },

    XP: {

        STARTING_XP: 0,

        LEVEL_MULTIPLIER: 1.25
    },

    FEATURES: {

        REFERRALS: true,

        LEADERBOARD: true,

        REWARDS: true,

        VIP_SYSTEM: true,

        GAMES: true,

        PAYMENTS: false
    }

});

export default AppConfig;
