var store = {
    tasks: {
        enabled: {
            good: {
                enabled: true,
                description: "an example showing a task that is valid and enabled",
                check: "centurylink",
                schedule: "48 * * * *"
            },
            minimumGood: {
                check: "centurylink",
                schedule: "48 * * * *"
            }
        },
        disabled: {
            disabledGood: {
                enabled: false,
                description: "example showing a task that is valid but disabled",
                check: "centurylink",
                schedule: "48 * * * *"
            }
        }
    }
};