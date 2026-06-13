class SpinWheelGame {
    constructor() {
        this.GAME_TYPE = "SPIN_WHEEL";

        this.SEGMENTS = [
            { id: 1, label: "LOSE", multiplier: 0 },
            { id: 2, label: "1.2X", multiplier: 1.2 },
            { id: 3, label: "1.5X", multiplier: 1.5 },
            { id: 4, label: "2X", multiplier: 2 },
            { id: 5, label: "3X", multiplier: 3 },
            { id: 6, label: "5X", multiplier: 5 },
            { id: 7, label: "10X", multiplier: 10 },
            { id: 8, label: "LOSE", multiplier: 0 }
        ];
    }

    spin() {
        const index = Math.floor(
            Math.random() * this.SEGMENTS.length
        );

        return this.SEGMENTS[index];
    }

    async play({ userId, betAmount }) {
        const result = this.spin();

        return {
            gameType: this.GAME_TYPE,
            userId,
            betAmount,
            result,
            isWin: result.multiplier > 0,
            payout:
                result.multiplier > 0
                    ? betAmount *
                      result.multiplier
                    : 0
        };
    }
}

const spinWheelGame =
    new SpinWheelGame();

export default spinWheelGame;
