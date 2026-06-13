/**
 * src/wallet/services/WalletService.js
 */

class WalletService {
    constructor() {
        this.storageKey = "vgp_wallets";
        this.transactionKey = "vgp_transactions";
    }

    getWallets() {
        return JSON.parse(
            localStorage.getItem(this.storageKey) || "[]"
        );
    }

    saveWallets(wallets) {
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(wallets)
        );
    }

    getTransactions() {
        return JSON.parse(
            localStorage.getItem(this.transactionKey) || "[]"
        );
    }

    saveTransactions(transactions) {
        localStorage.setItem(
            this.transactionKey,
            JSON.stringify(transactions)
        );
    }

    createWallet(userId) {
        const wallets = this.getWallets();

        const exists = wallets.find(
            wallet => wallet.userId === userId
        );

        if (exists) {
            return exists;
        }

        const wallet = {
            id: crypto.randomUUID(),
            userId,
            balance: 0,
            currency: "COIN",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        wallets.push(wallet);

        this.saveWallets(wallets);

        return wallet;
    }

    getWalletByUserId(userId) {
        const wallets = this.getWallets();

        return wallets.find(
            wallet => wallet.userId === userId
        );
    }

    getBalance(userId) {
        const wallet =
            this.getWalletByUserId(userId);

        return wallet ? wallet.balance : 0;
    }

    credit(userId, amount, reason = "CREDIT") {

        if (amount <= 0) {
            throw new Error(
                "Amount must be greater than zero"
            );
        }

        const wallets = this.getWallets();

        const wallet = wallets.find(
            wallet => wallet.userId === userId
        );

        if (!wallet) {
            throw new Error(
                "Wallet not found"
            );
        }

        wallet.balance += Number(amount);

        wallet.updatedAt =
            new Date().toISOString();

        this.saveWallets(wallets);

        this.recordTransaction({
            userId,
            type: "CREDIT",
            amount,
            reason
        });

        return wallet;
    }

    debit(userId, amount, reason = "DEBIT") {

        if (amount <= 0) {
            throw new Error(
                "Amount must be greater than zero"
            );
        }

        const wallets = this.getWallets();

        const wallet = wallets.find(
            wallet => wallet.userId === userId
        );

        if (!wallet) {
            throw new Error(
                "Wallet not found"
            );
        }

        if (wallet.balance < amount) {
            throw new Error(
                "Insufficient balance"
            );
        }

        wallet.balance -= Number(amount);

        wallet.updatedAt =
            new Date().toISOString();

        this.saveWallets(wallets);

        this.recordTransaction({
            userId,
            type: "DEBIT",
            amount,
            reason
        });

        return wallet;
    }

    transfer(
        senderId,
        receiverId,
        amount
    ) {

        if (senderId === receiverId) {
            throw new Error(
                "Cannot transfer to same wallet"
            );
        }

        this.debit(
            senderId,
            amount,
            "TRANSFER_OUT"
        );

        this.credit(
            receiverId,
            amount,
            "TRANSFER_IN"
        );

        return true;
    }

    recordTransaction(data) {

        const transactions =
            this.getTransactions();

        transactions.unshift({
            id: crypto.randomUUID(),
            userId: data.userId,
            type: data.type,
            amount: data.amount,
            reason: data.reason,
            timestamp:
                new Date().toISOString()
        });

        this.saveTransactions(
            transactions
        );
    }

    getUserTransactions(userId) {

        return this.getTransactions()
            .filter(
                transaction =>
                    transaction.userId === userId
            )
            .sort(
                (a, b) =>
                    new Date(b.timestamp) -
                    new Date(a.timestamp)
            );
    }

    resetWallet(userId) {

        const wallets =
            this.getWallets();

        const wallet =
            wallets.find(
                wallet =>
                    wallet.userId === userId
            );

        if (!wallet) {
            throw new Error(
                "Wallet not found"
            );
        }

        wallet.balance = 0;

        wallet.updatedAt =
            new Date().toISOString();

        this.saveWallets(wallets);

        return wallet;
    }

    walletExists(userId) {

        return Boolean(
            this.getWalletByUserId(userId)
        );
    }

    getWalletStatistics() {

        const wallets =
            this.getWallets();

        const totalBalance =
            wallets.reduce(
                (sum, wallet) =>
                    sum + wallet.balance,
                0
            );

        return {
            totalWallets:
                wallets.length,
            totalBalance,
            averageBalance:
                wallets.length
                    ? totalBalance /
                      wallets.length
                    : 0
        };
    }
}

const walletService =
    new WalletService();

export default walletService;
