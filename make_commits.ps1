$files = @(
    ".vscode/settings.json",
    "API/api/debug-ai/route.ts",
    "Java/.mvn/wrapper/maven-wrapper.properties",
    "Java/mvnw.cmd",
    "Java/pom.xml",
    "Java/run_backend.ps1",
    "Java/src/main/java/com/travelplanner/backend/controller/WeatherController.java",
    "Java/src/main/java/com/travelplanner/backend/model/WeatherResponse.java",
    "Java/src/main/java/com/travelplanner/backend/service/WeatherService.java",
    "Java/src/main/java/com/travelplanner/pdf/ItineraryDay.java",
    "Java/src/main/java/com/travelplanner/pdf/ItineraryRequest.java",
    "Java/src/main/java/com/travelplanner/pdf/PdfApplication.java",
    "Java/src/main/java/com/travelplanner/pdf/PdfController.java",
    "Java/src/main/java/com/travelplanner/pdf/PdfService.java",
    "Java/src/main/resources/application.properties",
    "Java/target/classes/application.properties",
    "Java/target/classes/com/travelplanner/backend/controller/WeatherController.class",
    "Java/target/classes/com/travelplanner/backend/model/WeatherResponse.class",
    "Java/target/classes/com/travelplanner/backend/service/WeatherService.class",
    "Java/target/classes/com/travelplanner/pdf/ItineraryDay.class",
    "Java/target/classes/com/travelplanner/pdf/ItineraryRequest.class",
    "Java/target/classes/com/travelplanner/pdf/PdfApplication.class",
    "Java/target/classes/com/travelplanner/pdf/PdfController.class",
    "Java/target/classes/com/travelplanner/pdf/PdfService.class",
    "build_error.txt",
    "build_error_utf8.txt",
    "build_log.txt",
    "build_output.txt",
    "build_output_utf8.txt",
    "git_log.txt",
    "git_log_final.txt",
    "git_status.txt"
)

$git = "C:\Program Files\Git\cmd\git.exe"
foreach ($file in $files) {
    if (Test-Path $file -Or (& $git ls-files --deleted $file)) {
        Write-Host "Committing $file..."
        & $git add $file
        $fileName = Split-Path $file -Leaf
        $msg = "refactor: sync changes for $fileName"
        if ($file -like "*.java") { $msg = "feat(backend): update $fileName" }
        elseif ($file -like "*.ts") { $msg = "feat(api): update $fileName" }
        elseif ($file -like "*.txt") { $msg = "chore: cleanup $fileName" }
        elseif ($file -like "Java/*") { $msg = "chore(maven): update $fileName" }
        
        & $git commit -m "$msg"
    } else {
        Write-Warning "File $file not found!"
    }
}
