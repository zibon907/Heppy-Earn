class PasswordService {

    constructor() {

        this.MIN_LENGTH = 8;
    }

    validate(password) {

        const errors = [];

        if (!password) {

            errors.push(
                "Password is required"
            );

            return {
                valid: false,
                errors
            };
        }

        if (
            password.length <
            this.MIN_LENGTH
        ) {

            errors.push(
                `Password must be at least ${this.MIN_LENGTH} characters`
            );
        }

        if (
            !/[A-Z]/.test(password)
        ) {

            errors.push(
                "Password must contain an uppercase letter"
            );
        }

        if (
            !/[a-z]/.test(password)
        ) {

            errors.push(
                "Password must contain a lowercase letter"
            );
        }

        if (
            !/[0-9]/.test(password)
        ) {

            errors.push(
                "Password must contain a number"
            );
        }

        return {

            valid:
                errors.length === 0,

            errors
        };
    }

    async hash(password) {

        const encoder =
            new TextEncoder();

        const data =
            encoder.encode(
                password
            );

        const hashBuffer =
            await crypto.subtle.digest(
                "SHA-256",
                data
            );

        const hashArray =
            Array.from(
                new Uint8Array(
                    hashBuffer
                )
            );

        return hashArray
            .map(
                byte =>
                    byte
                        .toString(16)
                        .padStart(2, "0")
            )
            .join("");
    }

    async verify(
        password,
        storedHash
    ) {

        if (
            !password ||
            !storedHash
        ) {

            return false;
        }

        const generatedHash =
            await this.hash(
                password
            );

        return (
            generatedHash ===
            storedHash
        );
    }

    generateRandomPassword(
        length = 12
    ) {

        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let password = "";

        for (
            let i = 0;
            i < length;
            i++
        ) {

            password +=
                chars.charAt(
                    Math.floor(
                        Math.random() *
                        chars.length
                    )
                );
        }

        return password;
    }
}

const passwordService =
    new PasswordService();

export default passwordService;
