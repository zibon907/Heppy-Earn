import authService from "../services/AuthService.js";

class AuthController {

    constructor() {

        this.currentUser = null;
    }

    async register(formData) {

        try {

            const result =
                await authService.register({

                    username:
                        formData.username,

                    email:
                        formData.email,

                    password:
                        formData.password,

                    referralCode:
                        formData.referralCode
                });

            this.showSuccess(
                "Account created successfully"
            );

            setTimeout(() => {

                window.location.href =
                    "/login.html";

            }, 1500);

            return result;

        } catch (error) {

            this.showError(
                error.message
            );

            throw error;
        }
    }

    async login(formData) {

        try {

            const result =
                await authService.login(

                    formData.email,

                    formData.password,

                    formData.rememberMe
                );

            this.currentUser =
                result.user;

            this.showSuccess(
                "Login successful"
            );

            setTimeout(() => {

                window.location.href =
                    "/dashboard.html";

            }, 1000);

            return result;

        } catch (error) {

            this.showError(
                error.message
            );

            throw error;
        }
    }

    logout() {

        authService.logout();

        this.showSuccess(
            "Logged out"
        );

        setTimeout(() => {

            window.location.href =
                "/login.html";

        }, 500);
    }

    restoreSession() {

        const user =
            authService.getCurrentUser();

        if (!user)
            return null;

        this.currentUser =
            user;

        return user;
    }

    protectRoute() {

        const loggedIn =
            authService.isLoggedIn();

        if (!loggedIn) {

            window.location.href =
                "/login.html";

            return false;
        }

        return true;
    }

    protectGuestRoute() {

        const loggedIn =
            authService.isLoggedIn();

        if (loggedIn) {

            window.location.href =
                "/dashboard.html";

            return false;
        }

        return true;
    }

    requireRole(role) {

        const user =
            authService.getCurrentUser();

        if (!user) {

            window.location.href =
                "/login.html";

            return false;
        }

        if (
            user.role !== role
        ) {

            window.location.href =
                "/dashboard.html";

            return false;
        }

        return true;
    }

    requireAdmin() {

        return this.requireRole(
            "admin"
        );
    }

    bindLoginForm(
        selector =
            "#loginForm"
    ) {

        const form =
            document.querySelector(
                selector
            );

        if (!form)
            return;

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const email =
                    form.email.value.trim();

                const password =
                    form.password.value;

                const rememberMe =
                    form.rememberMe
                        ? form.rememberMe.checked
                        : false;

                await this.login({

                    email,

                    password,

                    rememberMe
                });
            }
        );
    }

    bindRegisterForm(
        selector =
            "#registerForm"
    ) {

        const form =
            document.querySelector(
                selector
            );

        if (!form)
            return;

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                await this.register({

                    username:
                        form.username.value.trim(),

                    email:
                        form.email.value.trim(),

                    password:
                        form.password.value,

                    referralCode:
                        form.referralCode
                            ?.value
                            ?.trim() || null
                });
            }
        );
    }

    bindLogoutButtons() {

        const buttons =
            document.querySelectorAll(
                "[data-logout]"
            );

        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.logout();
                    }
                );
            }
        );
    }

    displayUserProfile(
        selector
    ) {

        const container =
            document.querySelector(
                selector
            );

        if (
            !container
        )
            return;

        const user =
            authService.getCurrentUser();

        if (!user)
            return;

        container.innerHTML = `

            <div class="user-profile">

                <h3>${user.username}</h3>

                <p>${user.email}</p>

                <p>Level: ${user.level}</p>

                <p>XP: ${user.xp}</p>

                <p>VIP: ${user.vipLevel}</p>

                <p>Role: ${user.role}</p>

            </div>

        `;
    }

    showSuccess(message) {

        console.log(
            "[SUCCESS]",
            message
        );

        this.showToast(
            message,
            "success"
        );
    }

    showError(message) {

        console.error(
            "[ERROR]",
            message
        );

        this.showToast(
            message,
            "error"
        );
    }

    showToast(
        message,
        type = "info"
    ) {

        const toast =
            document.createElement(
                "div"
            );

        toast.className =
            `toast toast-${type}`;

        toast.innerText =
            message;

        document.body.appendChild(
            toast
        );

        setTimeout(() => {

            toast.classList.add(
                "show"
            );

        }, 10);

        setTimeout(() => {

            toast.remove();

        }, 4000);
    }

    initialize() {

        this.restoreSession();

        this.bindLogoutButtons();
    }
}

const authController =
    new AuthController();

export default authController;
