import { db } from "../core/db.js";
import { CONFIG } from "../core/config.js";

export const RewardService = {

    // Daily reward system (no initial money)
    claimDailyReward(userId) {

        const user = db.findUserById(userId);

        if (!user) return { success: false };

        const amount =
            Math.floor(
                Math.random() *
                (CONFIG.REWARDS.DAILY_REWARD_MAX -
                 CONFIG.REWARDS.DAILY_REWARD_MIN)
            ) + CONFIG.REWARDS.DAILY_REWARD_MIN;

        user.wallet += amount;

        db.addTransaction({
            type: "DAILY_REWARD",
            userId,
            amount,
            date: new Date()
        });

        return {
            success: true,
            reward: amount,
            balance: user.wallet
        };
    },

    // Task-based reward (future ads / offers)
    completeTask(userId, reward) {

        const user = db.findUserById(userId);

        user.wallet += reward;

        db.addTransaction({
            type: "TASK_REWARD",
            userId,
            reward,
            date: new Date()
        });

        return {
            success: true,
            reward,
            balance: user.wallet
        };
    }
};
