Frontend systemu CHARON
=======================

1. Lista potrzebnych modułów:
   - Dancer2
   - Dancer2::Plugin::Deferred
   - LWP::Simple::REST
   - JSON::XS
   - YAML::XS
   - CSS::LESSp
   - Dancer2::Session::Cookie
   - Template

2. Uruchamianie:

   - Serwer z użyciem backendu
   
   Pierwszy terminal z logami backendowymi:
   ```
   cd charon/backend
   
     # update do najnowszej wersji bazy
   perl bin/migrate.pl -a update 
  
     # frontent obecnie spodziewa się backendu na localhost:3000. Można to zmienić w config.yml
   plackup bin/charon.psgi --port 3000
   ```
   Drugi terminal z logami frontendowymi:
   ```
   cd charon/frontend
   plackup -R ./lib,./bin,./configs bin/app.psgi --port 5000
   ```

   - Serwer używający [pliku z mockami](https://github.com/PZCharon/charon-frontend/blob/develop/configs/mocks.yml) do symulacji backendu (ułatwia development)
   
   ```plackup -R ./lib,./bin,./configs bin/mock_backend.psgi --port 5000```
