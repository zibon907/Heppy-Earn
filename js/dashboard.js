// ================================
// Dashboard Controller
// ================================

class DashboardController {

    constructor() {
        this.currentUser = null;

        this.elements = {
            navUserName: document.getElementById("navUserName"),

            userName: document.getElementById("userName"),
            userEmail: document.getElementById("userEmail"),

            userPoints: document.getElementById("userPoints"),
            totalPoints: document.getElementById("totalPoints"),

            vipLevel: document.getElementById("vipLevel"),
            userVip: document.getElementById("userVip"),

            referralCode: document.getElementById("referralCode"),
            referralCount: document.getElementById("referralCount"),

            activityCount: document.getElementById("activityCount"),
            activityList: document.getElementById("activityList"),

            copyReferralBtn: document.getElementById("copyReferralBtn")
        };
    }

    // ================================
    // Init
    // ================================

    init() {

        this.loadUser();

        this.renderDashboard();

        this.bindEvents();
    }

    // ================================
    // Load Current User
    // ================================

    loadUser() {

        const currentUser =
            JSON.parse(
                localStorage.getItem("currentUser")
            );

        if (!currentUser) {

            window.location.href = "index.html";

            return;
        }

        this.currentUser = currentUser;
    }

    // ================================
    // Render Dashboard
    // ================================

    renderDashboard() {

        this.renderHeader();

        this.renderWallet();

        this.renderVip();

        this.renderReferral();

        this.renderActivities();
    }

    // ================================
    // Header
    // ================================

    renderHeader() {

        this.elements.userName.textContent =
            this.currentUser.fullName;

        this.elements.navUserName.textContent =
            this.currentUser.fullName;

        this.elements.userEmail.textContent =
            this.currentUser.email;
    }

    // ================================
    // Wallet
    // ================================

    renderWallet() {

        const points =
            this.currentUser.wallet?.points || 0;

        this.elements.userPoints.textContent =
            points.toLocaleString();

        this.elements.totalPoints.textContent =
            points.toLocaleString();
    }

    // ================================
    // VIP
    // ================================

    renderVip() {

        const vipTitle =
            this.currentUser.vip?.title ||
            "Bronze";

        this.elements.vipLevel.textContent =
            vipTitle;

        this.elements.userVip.textContent =
            vipTitle;
    }

    // ================================
    // Referral
    // ================================

    renderReferral() {

        const referralCode =
            this.currentUser.referral?.code ||
            "NO-CODE";

        const referrals =
            this.currentUser.referral?.referredUsers?.length ||
            0;

        this.elements.referralCode.textContent =
            referralCode;

        this.elements.referralCount.textContent =
            referrals;
    }

    // ================================
    // Activities
    // ================================

    renderActivities() {

        const activities =
            this.currentUser.activities || [];

        this.elements.activityCount.textContent =
            activities.length;

        this.elements.activityList.innerHTML = "";

        if (!activities.length) {

            this.elements.activityList.innerHTML = `
                <div class="activity-item">
                    <div class="activity-icon">
                        ✓
                    </div>

                    <div>
                        No activity found
                    </div>
                </div>
            `;

            return;
        }

        activities
            .slice()
            .reverse()
            .forEach(activity => {

                const item =
                document.createElement("div");

                item.className =
                    "activity-item";

                item.innerHTML = `
                    <div class="activity-icon">
                        ✓
                    </div>

                    <div>

                        <strong>
                            ${activity.title || "Activity"}
                        </strong>

                        <br>

                        <small>
                            ${activity.description || ""}
                        </small>

                    </div>
                `;

                this.elements.activityList
                    .appendChild(item);
            });
    }

    // ================================
    // Events
    // ================================

    bindEvents() {

        if (this.elements.copyReferralBtn) {

            this.elements.copyReferralBtn
                .addEventListener(
                    "click",
                    () => this.copyReferralCode()
                );
        }
    }

    // ================================
    // Copy Referral
    // ================================

    copyReferralCode() {

        const code =
            this.currentUser.referral?.code;

        if (!code) return;

        navigator.clipboard
            .writeText(code)
            .then(() => {

                const btn =
                    this.elements.copyReferralBtn;

                const oldText =
                    btn.textContent;

                btn.textContent =
                    "Copied";

                setTimeout(() => {

                    btn.textContent =
                        oldText;

                }, 1500);
            });
    }
}

// ================================
// Logout
// ================================

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "index.html";
}

// ================================
// Start Application
// ================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const dashboard =
            new DashboardController();

        dashboard.init();
    }
);
