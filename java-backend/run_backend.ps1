# This script downloads a portable Maven and runs the Spring Boot application
# Usage: .\run_backend.ps1

$MavenVersion = "3.9.6"
$MavenUrl = "https://dlcdn.apache.org/maven/maven-3/$MavenVersion/binaries/apache-maven-$MavenVersion-bin.zip"
$MavenDir = "$PSScriptRoot\maven"
$MavenBin = "$MavenDir\apache-maven-$MavenVersion\bin\mvn.cmd"

# 1. Check for Java
try {
    $javaVersion = java -version 2>&1
    Write-Host "Java found: $javaVersion" -ForegroundColor Green
}
catch {
    Write-Error "Java is not installed or not in PATH. Please install JDK 17+."
    exit 1
}

# 2. Check/Download Maven
if (-not (Test-Path $MavenBin)) {
    Write-Host "Maven not found. Downloading portable version..." -ForegroundColor Yellow
    
    if (-not (Test-Path $MavenDir)) {
        New-Item -ItemType Directory -Force -Path $MavenDir | Out-Null
    }

    $ZipPath = "$MavenDir\maven.zip"
    Invoke-WebRequest -Uri $MavenUrl -OutFile $ZipPath
    
    Write-Host "Extracting Maven..." -ForegroundColor Yellow
    Expand-Archive -Path $ZipPath -DestinationPath $MavenDir -Force
    
    Remove-Item $ZipPath
    Write-Host "Maven installed successfully!" -ForegroundColor Green
}
else {
    Write-Host "Using portable Maven from $MavenBin" -ForegroundColor Green
}

# 3. Run the Application
Write-Host "Starting Java Backend..." -ForegroundColor Cyan
& $MavenBin spring-boot:run
