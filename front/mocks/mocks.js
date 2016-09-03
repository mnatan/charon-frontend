(function (global) {
    var link = "#/login/registration";
    global.charon_global_mocks = {
        registrations: [
            {
                id: 1,
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
                id: 2,
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
                    'login': {
                        'title': 'Email',
                        'type': 'string',
                        'required': true
                    },
                    'email': {
                        'title': 'Email',
                        'type': 'string',
                        'required': true
                    },
                    'password': {
                        'title': 'Hasło',
                        'type': 'string',
                        'required': true
                    },
                    'password_check': {
                        'title': 'Potwierdź hasło',
                        'type': 'string',
                        'required': true
                    },
                    'name': {
                        'title': 'Imię',
                        'type': 'string',
                        'required': true
                    },
                    'surname': {
                        'title': 'Nazwisko',
                        'type': 'string',
                        'required': true
                    },
                    'sex': {
                        'title': 'Płeć',
                        'type': 'string',
                        'required': true
                    },
                    'citizenship': {
                        'title': 'Obywatelstwo',
                        'type': 'string',
                        'required': true
                    },
                    'pesel': {
                        'title': 'PESEL',
                        'type': 'number',
                        'required': true
                    },
                    'phone_number': {
                        'title': 'Numer telefonu',
                        'type': 'number',
                        'required': true
                    }
                }
            },
            register: {
                form: [
                    {
                        "key": "name",
                        "placeholder": "Podaj swoje imię"
                    },
                    {
                        "key": "surname",
                        "placeholder": "Podaj swoje nazwisko"
                    },
                    {
                        "key": "email",
                        "type": "email",
                        "placeholder": "Podaj swój adres email"
                    },
                    {
                        "key": "sex",
                        "placeholder": "Wybierz",
                        "type": "select",
                        "titleMap": {
                            "male": "Mężczyzna",
                            "female": "Kobieta"
                        }
                    },
                    "citizenship",
                    "pesel",
                    "phone_number",
                    {
                        "key": "password",
                        "type": "password",
                        "placeholder": "Wpisz hasło, którego chcesz używać"
                    },
                    {
                        "key": "password_check",
                        "type": "password",
                        "placeholder": "Wpisz raz jeszcze hasło podane powyżej"
                    },
                    {
                        "type": "submit",
                        "title": "Zarejestruj"
                    }
                ]
            },
            login: {
                form: [
                    {
                        "key": "login",
                        "placeholder": "Adres email podany przy rejestracji",
                        "type": "email"
                    },
                    {
                        "key": "password",
                        "placeholder": "Hasło podane przy rejestracji",
                        "type": "password"
                    },
                    {
                        type: "actions",
                        items: [
                            {type: 'submit', style: 'btn-success', title: 'Zaloguj'},
                            {
                                type: 'button',
                                style: 'btn',
                                title: 'Zapomniałem hasła',
                                onClick: "$state.go('login.passwordReset')"
                            },
                            {
                                type: 'button',
                                style: 'btn',
                                title: 'Rejestruj',
                                onClick: "$state.go('login.signup')"
                            }
                        ]
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
        ],
        users: {
            natan: {
                id: 1,
                name: "Marcin",
                surname: "Natanek",
                email: "mnatan@openmailbox.org",
                sex: "male",
                citizenship: "Polskie",
                pesel: "23408934",
                login: "mnatan@openmailbox.org",
                role: "student"
            }
        }
    }
})
(window);
