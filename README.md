Charon Frontend
---------------

Użyte technologie:
* NodeJS:
    * Express - serwowanie plików statycznych i proxowanie zapytań do backendu
    * Protractor - automatyczcne testy E2E przy użyciu Selenium
* AngularJS

Instalacja i uruchamianie:

1. Sklonuj repozytorium
2. Zainstaluj nodejs (4.x.x lub wyżej) oraz npm (2.x.x lub wyżej)
3. `$ cd charon-frontend`
4. `$ npm install` - pierwsza instalacja może trochę potrwać
5. `$ ./node_modules/grunt/bin/grunt dev-server`

Uruchamianie testów:

1. Wykonaj wszystkie kroki instalacji
2. `$ ./node_modules/grunt/bin/grunt e2e-tests`


Środowisko integracyjne

* `mnatan.pl:3306` - integracyjny mariadb
* `mnatan.pl:3000` - integracyjny server backendu

Serwery znajdują się w kontenerach dockera. Jak dokończę automatyzować procedurę uruchamiania, napiszę jak ustawić takie kontenery lokalnie.
