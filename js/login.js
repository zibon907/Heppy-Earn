document.getElementById("loginForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = AuthService.login({
        email,
        password
    });

    if (result.success) {

        // save session
        localStorage.setItem(
            "currentUser",
            JSON.stringify(result.user)
        );

        window.location.href = "dashboard.html";

    } else {
        alert(result.message);
    }
});
