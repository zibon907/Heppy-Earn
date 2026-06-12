// =========================================
// PROFILE CONTROLLER - SAAS v2
// =========================================

class ProfileController {
    
    constructor() {
        this.user = null;
        this.init();
    }

    // ================================
    // INIT
    // ================================
    init() {
        this.loadUser();
        this.bindUI();
        this.render();
        this.animateUI();
    }

    // ================================
    // LOAD USER
    // ================================
    loadUser() {
        this.user = StorageService.getCurrentUser();

        if (!this.user) {
            window.location.href = "index.html";
        }
    }

    // ================================
    // BIND UI ELEMENTS
    // ================================
    bindUI() {
        this.ui = {
            fullName: document.getElementById("fullName"),
            username: document.getElementById("username"),
            email: document.getElementById("accountEmail"),
            points: document.getElementById("totalPoints"),
            vip: document.getElementById("accountVip"),
            referral: document.getElementById("referralCode"),
            activityCount: document.getElementById("activityCount"),
            securityScore: document.getElementById("securityScore"),
            vipProgress: document.getElementById("vipProgressFill"),
            vipText: document.getElementById("vipProgressText")
        };
    }

    // ================================
    // RENDER DATA
    // ================================
    render() {
        const u = this.user;

        if (this.ui.fullName) this.ui.fullName.textContent = u.fullName;
        if (this.ui.username) this.ui.username.textContent = "@" + u.username;
        if (this.ui.email) this.ui.email.textContent = u.email;
        if (this.ui.points) this.ui.points.textContent = u.points;
        if (this.ui.vip) this.ui.vip.textContent = this.getVipName(u.vipLevel);
        if (this.ui.referral) this.ui.referral.textContent = u.referralCode;
        if (this.ui.activityCount) this.ui.activityCount.textContent = u.activities.length;
        if (this.ui.securityScore) this.ui.securityScore.textContent = u.securityScore || 100;

        this.renderVipProgress();
    }

    // ================================
    // VIP NAME
    // ================================
    getVipName(level) {
        const map = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
        return map[level] || "Bronze";
    }

    // ================================
    // VIP PROGRESS CALC
    // ================================
    renderVipProgress() {
        const level = this.user.vipLevel || 0;
        const progress = (level / 4) * 100;

        if (this.ui.vipProgress) {
            this.ui.vipProgress.style.width = progress + "%";
        }

        if (this.ui.vipText) {
            this.ui.vipText.textContent = Math.round(progress) + "%";
        }
    }

    // ================================
    // UI ANIMATIONS
    // ================================
    animateUI() {
        document.querySelectorAll(".card, .stat-card")
            .forEach((el, i) => {
                setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, i * 80);
            });
    }
}

// =========================================
// INIT
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    new ProfileController();
});
