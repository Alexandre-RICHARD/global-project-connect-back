export const regexTest = {
    "testMail": (mail: string) => {
        if (!mail.match(/.+@.+\..+/gm)) {
            return "format-mail";
        }
        return null;
    },
    "testMailConfirmation": (mail: string, mailConfirmation: string) => {
        if (mail !== mailConfirmation) {
            return "match-password";
        }
        return null;
    },
    "testNickname": (nickname: string) => {
        if (
            !(
                !nickname.match(/[^0-9a-zA-Z-_]/gm) &&
                nickname.length >= 3 &&
                nickname.length <= 25
            )
        ) {
            return "format-nickname";
        }
        return null;
    },
    "testPassword": (password: string) => {
        const passwordRegex =
            // eslint-disable-next-line @stylistic/max-len
            /^(?=(?:[^a-z]*[a-z]){2,})(?=(?:[^\d]*\d){2,})(?=(?:[^A-Z]*[A-Z]){2,})(?=(?:[^\W_]*[\W_]){1,})[a-zA-Z\d~!@#$%^&*()-_=+[\]{};:,.<>/?|]{8,60}$/;

        if (!passwordRegex.test(password)) {
            return "format-password";
        }
        return null;
    },
    "testPasswordConfirmation": (
        password: string,
        passwordConfirmation: string
    ) => {
        if (password !== passwordConfirmation) {
            return "match-password";
        }
        return null;
    },
};
