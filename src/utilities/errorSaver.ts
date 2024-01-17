export const errorSaver = async (context: string, errorMessage: string) => {
    const errorApiUrl = process.env.ERROR_API_URL;

    await fetch(errorApiUrl + "/error", {
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        "method": "POST",
        "body": JSON.stringify({
            "projectName": process.env.PROJECT_NAME,
            "context": context,
            "errorMessage": errorMessage,
        }),
    });
};
