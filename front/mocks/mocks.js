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
            schema: {
                'type': 'object',
                'properties': {
                    'email': {
                        'title': 'Email',
                        'type': 'string',
                        'required': true,
                        "x-schema-form": {
                            "type": "email",
                            "placeholder": "Podaj swój adres email"
                        }
                    },
                    'password': {
                        'title': 'Hasło',
                        'type': 'string',
                        'required': true,
                        "x-schema-form": {
                            "type": "password",
                            "placeholder": "Wpisz hasło, którego chcesz używać"
                        }
                    },
                    'password_check': {
                        'title': 'Potwierdź hasło',
                        'type': 'string',
                        'required': true,
                        "x-schema-form": {
                            "type": "password",
                            "placeholder": "Wpisz raz jeszcze hasło podane powyżej"
                        }
                    },
                    'name': {
                        'title': 'Imię',
                        'type': 'string'
                    },
                    'lastname': {
                        'title': 'Nazwisko',
                        'type': 'string'
                    },
                    'gender': {
                        'title': 'Płeć',
                        'type': 'string',
                        'enum': [
                            'Mężczyzna',
                            'Kobieta'
                        ]
                    }
                }
            },
            register: {
                form: [
                    "email",
                    "password",
                    "password_check",
                    'name',
                    'lastname',
                    'gender',
                    {
                        type: "submit",
                        title: "Zarejestruj"
                    }
                ]
            },
            login: {
                form: [
                    "email",
                    "password",
                    {
                        type: "submit",
                        title: "Zaloguj"
                    }
                ]
            }
        },
        login: {
            login_response: {
                result: "OK",
                token: "dupadupa"
            },
            register_response: {
                result: "OK"
            }
        },
        faq: [
            1, 2, 3, 7
        ],
        kontakt: [
            {
                Description: "W sprawie dramy",
                name: "Wydział Matematyki i Informatyki UJ, sekretariat",
                addres: "Gdzieśtam",
                phone: "123 123 123",
                mail: "poczta@uj.com"
            },
            {
                Description: "W sprawie awarii",
                name: "Wydział Matematyki i Informatyki UJ, sekretariat",
                addres: "Gdzieśtam",
                phone: "123 123 123",
                mail: "poczta@uj.com"
            }
        ]
    }
})
(window);
