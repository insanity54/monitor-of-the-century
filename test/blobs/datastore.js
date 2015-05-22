var store = {
    tasks: {
        enabledTasks: {
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
        disabledTasks: {
            disabledGood: {
                enabled: false,
                description: "example showing a task that is valid but disabled",
                check: "centurylink",
                schedule: "48 * * * *"
            }
        }
    },
    users: {
        enabledUsers: {
            admin: {
                fullname: "Chris Grimmett",
                email: "chris@grimtech.net",
                phone: "1234561234",
                method: "email"
            }
        },
        disabledUsers: {
            
        }
    }
};