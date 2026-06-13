import WalletService from "../services/WalletService.js";

class WalletController {

    getBalance(userId) {

        return WalletService.getBalance(userId);
    }

    deposit(userId, amount) {

        return WalletService.deposit(userId, amount);
    }

    withdraw(userId, amount) {

        return WalletService.withdraw(userId, amount);
    }

    bet(userId, amount) {

        return WalletService.bet(userId, amount);
    }

    win(userId, amount) {

        return WalletService.win(userId, amount);
    }

    loss(userId, amount) {

        return WalletService.loss(userId, amount);
    }

    history(userId) {

        return WalletService.history(userId);
    }
}

export default new WalletController();
