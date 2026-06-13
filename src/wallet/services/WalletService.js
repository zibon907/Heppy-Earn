import TransactionService from "./TransactionService.js";

class WalletService {

    getBalance(userId) {

        const wallet =
            TransactionService.getWallet(userId);

        return wallet.balance;
    }

    deposit(userId, amount) {

        return TransactionService.createTransaction({

            userId,
            type: "deposit",
            amount
        });
    }

    withdraw(userId, amount) {

        return TransactionService.createTransaction({

            userId,
            type: "withdraw",
            amount
        });
    }

    bet(userId, amount) {

        return TransactionService.createTransaction({

            userId,
            type: "bet",
            amount
        });
    }

    win(userId, amount) {

        return TransactionService.createTransaction({

            userId,
            type: "win",
            amount
        });
    }

    loss(userId, amount) {

        return TransactionService.createTransaction({

            userId,
            type: "loss",
            amount
        });
    }

    history(userId) {

        return TransactionService.getTransactions(userId);
    }
}

export default new WalletService();
