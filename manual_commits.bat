@echo off
set GIT="C:\Program Files\Git\cmd\git.exe"
%GIT% add .vscode/settings.json
%GIT% commit -m "chore: update vscode settings"
%GIT% add API/api/debug-ai/route.ts
%GIT% commit -m "feat(api): update debug-ai route"
%GIT% add Java/.mvn/wrapper/maven-wrapper.properties
%GIT% commit -m "chore(maven): update maven-wrapper.properties"
%GIT% add Java/mvnw.cmd
%GIT% commit -m "chore(maven): update mvnw.cmd"
%GIT% add Java/pom.xml
%GIT% commit -m "chore(maven): update pom.xml"
%GIT% add Java/run_backend.ps1
%GIT% commit -m "chore(backend): update run_backend.ps1"
%GIT% add Java/src/main/java/com/travelplanner/backend/controller/WeatherController.java
%GIT% commit -m "feat(backend): update WeatherController.java"
%GIT% add Java/src/main/java/com/travelplanner/backend/model/WeatherResponse.java
%GIT% commit -m "feat(backend): update WeatherResponse.java"
%GIT% add Java/src/main/java/com/travelplanner/backend/service/WeatherService.java
%GIT% commit -m "feat(backend): update WeatherService.java"
%GIT% add Java/src/main/java/com/travelplanner/pdf/ItineraryDay.java
%GIT% commit -m "feat(pdf): update ItineraryDay.java"
%GIT% add Java/src/main/java/com/travelplanner/pdf/ItineraryRequest.java
%GIT% commit -m "feat(pdf): update ItineraryRequest.java"
%GIT% add Java/src/main/java/com/travelplanner/pdf/PdfApplication.java
%GIT% commit -m "feat(pdf): update PdfApplication.java"
%GIT% add Java/src/main/java/com/travelplanner/pdf/PdfController.java
%GIT% commit -m "feat(pdf): update PdfController.java"
%GIT% add Java/src/main/java/com/travelplanner/pdf/PdfService.java
%GIT% commit -m "feat(pdf): update PdfService.java"
%GIT% add Java/src/main/resources/application.properties
%GIT% commit -m "chore(backend): update application.properties"
%GIT% add Java/target/classes/application.properties
%GIT% commit -m "chore(backend): update compiled application.properties"
%GIT% add Java/target/classes/com/travelplanner/backend/controller/WeatherController.class
%GIT% commit -m "chore(backend): update WeatherController.class"
%GIT% add Java/target/classes/com/travelplanner/backend/model/WeatherResponse.class
%GIT% commit -m "chore(backend): update WeatherResponse.class"
%GIT% add Java/target/classes/com/travelplanner/backend/service/WeatherService.class
%GIT% commit -m "chore(backend): update WeatherService.class"
%GIT% add Java/target/classes/com/travelplanner/pdf/ItineraryDay.class
%GIT% commit -m "chore(pdf): update ItineraryDay.class"
%GIT% add Java/target/classes/com/travelplanner/pdf/ItineraryRequest.class
%GIT% commit -m "chore(pdf): update ItineraryRequest.class"
%GIT% add Java/target/classes/com/travelplanner/pdf/PdfApplication.class
%GIT% commit -m "chore(pdf): update PdfApplication.class"
%GIT% add Java/target/classes/com/travelplanner/pdf/PdfController.class
%GIT% commit -m "chore(pdf): update PdfController.class"
%GIT% add Java/target/classes/com/travelplanner/pdf/PdfService.class
%GIT% commit -m "chore(pdf): update PdfService.class"
%GIT% add build_error.txt
%GIT% commit -m "chore: cleanup build_error.txt"
%GIT% add build_error_utf8.txt
%GIT% commit -m "chore: cleanup build_error_utf8.txt"
%GIT% add build_log.txt
%GIT% commit -m "chore: cleanup build_log.txt"
%GIT% add build_output.txt
%GIT% commit -m "chore: cleanup build_output.txt"
%GIT% add build_output_utf8.txt
%GIT% commit -m "chore: cleanup build_output_utf8.txt"
%GIT% add git_log.txt
%GIT% commit -m "chore: cleanup git_log.txt"
%GIT% add git_log_final.txt
%GIT% commit -m "chore: cleanup git_log_final.txt"
%GIT% add git_status.txt
%GIT% commit -m "chore: cleanup git_status.txt"
