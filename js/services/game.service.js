import { db } from "../core/db.js";

export const GameService = {

    playDice(userId, bet = 0) {

        const user = db.findUserById(userId);

        if (!user) return { success: false };

        // 🔥 FREE PLAY MODE
        if (bet === 0) {

            const roll = Math.floor(Math.random() * 6) + 1;

            let reward = 0;

            if (roll === 6) reward = 10;   // small free win
            if (roll === 5) reward = 5;

            user.wallet += reward;

            return {
                mode: "FREE",
                roll,
                reward,
                balance: user.wallet
            };
        }

        // PAID MODE
        if (user.wallet < bet) {
            return { success: false, message: "Not enough balance" };
        }

        const roll = Math.floor(Math.random() * 6) + 1;

        const win = roll >= 4;

        const result = win ? bet * 2 : -bet;

        user.wallet += result;

        db.addTransaction({
            type: "DICE_GAME",
            userId,
            bet,
            result,
            win
        });

        return {
            mode: "BET",
            roll,
            win,
            result,
            balance: user.wallet
        };
    }
};
