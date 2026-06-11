const StorageService = {

    get(key){

        return JSON.parse(
            localStorage.getItem(key)
        );

    },

    set(key,value){

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    },

    remove(key){

        localStorage.removeItem(key);

    },

    clear(){

        localStorage.clear();

    },

    getUsers(){

        return this.get(
        APP_CONFIG.STORAGE_KEYS.USERS
        ) || [];

    },

    saveUsers(users){

        this.set(
        APP_CONFIG.STORAGE_KEYS.USERS,
        users
        );

    },

    getCurrentUser(){

        return this.get(
        APP_CONFIG.STORAGE_KEYS.CURRENT_USER
        );

    },

    setCurrentUser(user){

        this.set(
        APP_CONFIG.STORAGE_KEYS.CURRENT_USER,
        user
        );

    },

    logout(){

        this.remove(
        APP_CONFIG.STORAGE_KEYS.CURRENT_USER
        );

    }

};