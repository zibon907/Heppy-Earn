import tokenService from "./TokenService.js";

class SessionService {

    constructor() {

        this.STORAGE_KEY =
            "active_session";

        this.ACTIVITY_KEY =
            "last_activity";

        this.AUDIT_KEY =
            "session_audit_log";

        this.DEFAULT_TIMEOUT =
            1000 * 60 * 30;

        this.CHECK_INTERVAL =
            1000 * 30;

        this.timer = null;
    }

    create(user) {

        const session = {

            sessionId:
                crypto.randomUUID(),

            userId:
                user.id,

            username:
                user.username,

            role:
                user.role,

            device:
                navigator.userAgent,

            loginAt:
                Date.now(),

            lastActivity:
                Date.now(),

            status:
                "active"
        };

        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(
                session
            )
        );

        localStorage.setItem(
            this.ACTIVITY_KEY,
            Date.now()
        );

        this.audit(
            "SESSION_CREATED",
            session
        );

        return session;
    }

    getCurrent() {

        const data =
            localStorage.getItem(
                this.STORAGE_KEY
            );

        if (!data)
            return null;

        try {

            return JSON.parse(
                data
            );

        } catch {

            return null;
        }
    }

    updateActivity() {

        const session =
            this.getCurrent();

        if (!session)
            return;

        session.lastActivity =
            Date.now();

        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(
                session
            )
        );

        localStorage.setItem(
            this.ACTIVITY_KEY,
            Date.now()
        );
    }

    getIdleTime() {

        const last =
            Number(
                localStorage.getItem(
                    this.ACTIVITY_KEY
                )
            );

        if (!last)
            return 0;

        return (
            Date.now() -
            last
        );
    }

    isExpired() {

        return (
            this.getIdleTime() >
            this.DEFAULT_TIMEOUT
        );
    }

    logout() {

        const session =
            this.getCurrent();

        if (session) {

            this.audit(
                "SESSION_LOGOUT",
                session
            );
        }

        tokenService.clearTokens();

        localStorage.removeItem(
            this.STORAGE_KEY
        );

        localStorage.removeItem(
            this.ACTIVITY_KEY
        );
    }

    forceLogout() {

        this.audit(
            "SESSION_FORCE_LOGOUT",
            {}
        );

        this.logout();
    }

    restore() {

        const session =
            this.getCurrent();

        if (!session)
            return null;

        if (
            this.isExpired()
        ) {

            this.logout();

            return null;
        }

        return session;
    }

    startMonitoring() {

        if (
            this.timer
        ) {
            clearInterval(
                this.timer
            );
        }

        this.timer =
            setInterval(
                () => {

                    if (
                        this.isExpired()
                    ) {

                        this.forceLogout();

                        window.location.href =
                            "/login.html";
                    }

                },
                this.CHECK_INTERVAL
            );

        [
            "click",
            "mousemove",
            "keydown",
            "scroll",
            "touchstart"
        ].forEach(
            (event) => {

                window.addEventListener(
                    event,
                    () =>
                        this.updateActivity()
                );
            }
        );
    }

    stopMonitoring() {

        if (
            this.timer
        ) {

            clearInterval(
                this.timer
            );

            this.timer =
                null;
        }
    }

    getDeviceFingerprint() {

        return btoa(
            [
                navigator.userAgent,
                navigator.language,
                screen.width,
                screen.height,
                navigator.platform
            ].join("|")
        );
    }

    getAuditLog() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    this.AUDIT_KEY
                ) || "[]"
            );

        } catch {

            return [];
        }
    }

    audit(
        action,
        data = {}
    ) {

        const logs =
            this.getAuditLog();

        logs.unshift({

            id:
                crypto.randomUUID(),

            action,

            timestamp:
                new Date()
                    .toISOString(),

            device:
                this.getDeviceFingerprint(),

            data
        });

        const trimmed =
            logs.slice(
                0,
                500
            );

        localStorage.setItem(
            this.AUDIT_KEY,
            JSON.stringify(
                trimmed
            )
        );
    }

    clearAuditLog() {

        localStorage.removeItem(
            this.AUDIT_KEY
        );
    }

    getSessionDuration() {

        const session =
            this.getCurrent();

        if (!session)
            return 0;

        return Math.floor(
            (
                Date.now() -
                session.loginAt
            ) / 1000
        );
    }

    isAuthenticated() {

        return (
            tokenService.isLoggedIn() &&
            !!this.restore()
        );
    }
}

const sessionService =
    new SessionService();

export default sessionService;
