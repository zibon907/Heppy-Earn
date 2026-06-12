// =========================================
// VIRTUAL REWARDS - DASHBOARD CONTROLLER
// ENTERPRISE SAAS ARCHITECTURE v1
// =========================================

class DashboardController {

    constructor() {

        // Core state
        this.user = null;

        // UI cache
        this.ui = {};

        // config
        this.config = {
            vipLevels: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"]
        };

        this.init();
    }

    // =========================================
    // INIT PIPELINE
    // =========================================
    init() {

        this.loadUser();

        this.cacheDOM();

        this.validateUser();

        this.renderDashboard();

        this.bindEvents();

        this.runPostInit();
    }

    // =========================================
    // LOAD USER FROM STORAGE
    // =========================================
    loadUser() {

        this.user = StorageService.getCurrentUser();
    }

    // =========================================
    // USER VALIDATION
    // =========================================
    validateUser() {

        if (!this.user) {

            console.warn("No user found. Redirecting...");

            window.location.href = "index.html";

            return;
        }
    }

    // =========================================
    // CACHE ALL DOM ELEMENTS
    // =========================================
    cacheDOM() {

        this.ui = {

            // USER INFO
            userName: document.getElementById("userName"),
            userEmail: document.getElementById("userEmail"),

            // WALLET
            userPoints: document.getElementById("userPoints"),
            totalPoints: document.getElementById("totalPoints"),

            // VIP
            userVip: document.getElementById("userVip"),

            // REFERRAL
            referralCode: document.getElementById("referralCode"),
            referralCount: document.getElementById("referralCount"),

            // ACTIVITY
            activityList: document.getElementById("activityList"),

            // ACTIONS
            copyBtn: document.getElementById("copyReferralBtn"),
            logoutBtn: document.getElementById("logoutBtn"),
            notificationBtn: document.getElementById("notificationBtn"),

            // EXTRA FUTURE ELEMENTS
            headerTitle: document.querySelector(".topbar h1")
        };
    }

    // =========================================
    // MAIN RENDER PIPELINE
    // =========================================
    renderDashboard() {

        this.renderUserSection();

        this.renderWalletSection();

        this.renderVipSection();

        this.renderReferralSection();

        this.renderActivitySection();

        this.renderHeaderUI();
    }

    // =========================================
    // USER SECTION
    // =========================================
    renderUserSection() {

        const u = this.user;

        if (this.ui.userName) {
            this.ui.userName.textContent = u.fullName || "Unknown User";
        }

        if (this.ui.userEmail) {
            this.ui.userEmail.textContent = u.email || "No Email";
        }
    }

    // =========================================
    // WALLET ENGINE
    // =========================================
    renderWalletSection() {

        const points = this.user.points || 0;

        const formatted = points.toLocaleString();

        if (this.ui.userPoints) {
            this.ui.userPoints.textContent = formatted;
        }

        if (this.ui.totalPoints) {
            this.ui.totalPoints.textContent = formatted;
        }
    }

    // =========================================
    // VIP ENGINE
    // =========================================
    renderVipSection() {

        const level = this.user.vipLevel || 0;

        const vipName = this.config.vipLevels[level] || "Bronze";

        if (this.ui.userVip) {
            this.ui.userVip.textContent = vipName;
        }
    }

    // =========================================
    // REFERRAL ENGINE
    // =========================================
    renderReferralSection() {

        const code = this.user.referralCode || "N/A";

        const count = this.user.totalReferrals || 0;

        if (this.ui.referralCode) {
            this.ui.referralCode.textContent = code;
        }

        if (this.ui.referralCount) {
            this.ui.referralCount.textContent = count;
        }
    }

    // =========================================
    // ACTIVITY ENGINE (ADVANCED)
    // =========================================
    renderActivitySection() {

        const container = this.ui.activityList;

        if (!container) return;

        const activities = this.user.activities || [];

        container.innerHTML = "";

        if (activities.length === 0) {

            container.innerHTML = `
                <div class="activity-item empty">
                    <span>No activity found</span>
                </div>
            `;

            return;
        }

        activities
            .slice()
            .reverse()
            .forEach((activity, index) => {

                const item = document.createElement("div");

                item.className = "activity-item";

                item.innerHTML = `
                    <div class="activity-index">${index + 1}</div>

                    <div class="activity-content">
                        <strong>${activity.title || "Activity"}</strong>
                        <small>${activity.description || "No description"}</small>
                    </div>

                    <div class="activity-time">
                        ${activity.time || "Just now"}
                    </div>
                `;

                container.appendChild(item);
            });
    }

    // =========================================
    // HEADER UI
    // =========================================
    renderHeaderUI() {

        if (this.ui.headerTitle) {

            this.ui.headerTitle.textContent =
                `Welcome back, ${this.user.fullName}`;
        }
    }

    // =========================================
    // EVENT SYSTEM
    // =========================================
    bindEvents() {

        this.bindCopyReferral();

        this.bindLogout();

        this.bindNotification();

        this.bindKeyboardShortcuts();
    }

    // COPY REFERRAL
    bindCopyReferral() {

        if (!this.ui.copyBtn) return;

        this.ui.copyBtn.addEventListener("click", () => {

            this.copyToClipboard(this.user.referralCode);
        });
    }

    // LOGOUT
    bindLogout() {

        if (!this.ui.logoutBtn) return;

        this.ui.logoutBtn.addEventListener("click", () => {

            this.logout();
        });
    }

    // NOTIFICATION
    bindNotification() {

        if (!this.ui.notificationBtn) return;

        this.ui.notificationBtn.addEventListener("click", () => {

            this.showNotificationPanel();
        });
    }

    // KEYBOARD SHORTCUTS (SaaS touch)
    bindKeyboardShortcuts() {

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {
                this.hidePanels();
            }
        });
    }

    // =========================================
    // UTIL: COPY
    // =========================================
    copyToClipboard(text) {

        if (!text) return;

        navigator.clipboard.writeText(text);

        this.toast("Copied to clipboard!");
    }

    // =========================================
    // LOGOUT
    // =========================================
    logout() {

        StorageService.logout();

        window.location.href = "index.html";
    }

    // =========================================
    // NOTIFICATION PANEL (BASIC MOCK)
    // =========================================
    showNotificationPanel() {

        this.toast("Notifications opened (demo)");
    }

    hidePanels() {

        // future modal system
    }

    // =========================================
    // TOAST SYSTEM (UI FEEDBACK)
    // =========================================
    toast(message) {

        const el = document.createElement("div");

        el.className = "toast";

        el.textContent = message;

        document.body.appendChild(el);

        setTimeout(() => el.remove(), 2000);
    }

    // =========================================
    // POST INIT HOOK
    // =========================================
    runPostInit() {

        console.log("Dashboard initialized successfully");

        // future: analytics, tracking, etc
    }
}

// =========================================
// BOOTSTRAP APP
// =========================================
document.addEventListener("DOMContentLoaded", () => {

    new DashboardController();
});
