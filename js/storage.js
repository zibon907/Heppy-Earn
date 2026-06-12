const Storage = {

    getUsers() {
        return JSON.parse(localStorage.getItem("users")) || [];
    },

    saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    },

    setCurrentUser(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }
};
