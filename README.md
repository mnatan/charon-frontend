Frontend systemu CHARON
=======================

1. Lista potrzebnych modułów:
   - Dancer2
   - Dancer2::Plugin::Deferred
   - LWP::Simple::REST
   - JSON::XS
   - YAML::XS
   - CSS::LESSp

2. Uruchamianie:

   - Serwer z użyciem backendu
   
   `plackup -R ./lib,./bin,./configs bin/app.psgi --port 5000`

   - Serwer używający [pliku z mockami](https://github.com/PZCharon/charon-frontend/blob/develop/configs/mocks.yml) do symulacji backendu (ułatwia development)
   
   ```plackup -R ./lib,./bin,./configs bin/mock_backend.psgi --port 5000```
