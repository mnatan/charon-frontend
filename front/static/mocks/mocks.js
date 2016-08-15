(function (global) {
    var link = "#/login/registration";
    global.charon_global_mocks = {
        registrations: [
            {
                name: "Rejestracja 1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
                limit: "100",
                terms: [
                    {date: 1470692036, description: "Wypełnienie formularza", link: link},
                    {date: 1470700000, description: "Wysłanie zdjęcia", link: link},
                    {date: 1480700000, description: "Spotkania", link: link},
                    {date: 1490692036, description: "Egzaminy", link: link},
                    {date: 1497692036, description: "Ogłoszenie wyników", link: link}
                ]
            },
            {
                name: "Rejestracja 2",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra. Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.",
                limit: "10",
                terms: [
                    {date: 1470692036, description: "Wypełnienie formularza", link: link},
                    {date: 1480700000, description: "Spotkania", link: link},
                    {date: 1490692036, description: "Egzaminy", link: link},
                    {date: 1497692036, description: "Ogłoszenie wyników", link: link}
                ]
            }
        ],
        forms: {
            login: [
                {
                    label: "e-mail",
                    type: "STRING",
                    valid: "email",
                    name: "email"
                },
                {
                    label: "hasło",
                    type: "STRING",
                    valid: "password",
                    mods: "hidden",
                    name: "password"
                }
            ],
            register: {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            minLength: 2,
                            title: "Name",
                            description: "Name or alias"
                        },
                        title: {
                            type: "string",
                            enum: ['dr', 'jr', 'sir', 'mrs', 'mr', 'NaN', 'dj']
                        }
                    }
                },
                form: [
                    "*",
                    {
                        type: "submit",
                        title: "Save"
                    }
                ]
            }
        }
    }
})(window);
