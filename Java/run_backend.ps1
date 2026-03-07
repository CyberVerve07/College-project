# This script downloads a portable Maven and runs the Spring Boot application
# Usage: .\run_backend.ps1

$MavenVersion = "3.9.6"
$MavenDir = "$PSScriptRoot\maven"
$MavenBin = "$MavenDir\apache-maven-$MavenVersion\bin\mvn.cmd"

# Enable TLS 1.2 for downloads
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# 1. Check for Java
try {
    $javaVersion = java -version 2>&1
    Write-Host "Java found!" -ForegroundColor Green
}
catch {
    Write-Error "Java is not installed or not in PATH. Please install JDK 17+."
    exit 1
}

# 2. Check for Maven
$GlobalMaven = Get-Command "mvn" -ErrorAction SilentlyContinue

if ($GlobalMaven) {
    Write-Host "Found global Maven." -ForegroundColor Green
    $MavenCmd = "mvn"
}
elseif (Test-Path $MavenBin) {
    Write-Host "Found portable Maven." -ForegroundColor Green
    $MavenCmd = $MavenBin
}
else {
    Write-Host "Maven not found. Downloading..." -ForegroundColor Yellow

    if (-not (Test-Path $MavenDir)) {
        New-Item -ItemType Directory -Force -Path $MavenDir | Out-Null
    }

    $ZipPath = "$MavenDir\maven.zip"
    
    # Try multiple mirrors
    $mirrors = @(
        "https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/$MavenVersion/apache-maven-$MavenVersion-bin.zip",
        "https://dlcdn.apache.org/maven/maven-3/$MavenVersion/binaries/apache-maven-$MavenVersion-bin.zip",
        "https://archive.apache.org/dist/maven/maven-3/$MavenVersion/binaries/apache-maven-$MavenVersion-bin.zip"
    )

    $downloaded = $false
    foreach ($url in $mirrors) {
        try {
            Write-Host "Trying: $url" -ForegroundColor Gray
            Invoke-WebRequest -Uri $url -OutFile $ZipPath -UseBasicParsing
            $downloaded = $true
            break
        }
        catch {
            Write-Host "Mirror failed, trying next..." -ForegroundColor Yellow
        }
    }

    if (-not $downloaded) {
        Write-Error "Could not download Maven from any mirror. Please install Maven manually: https://maven.apache.org/download.cgi"
        exit 1
    }

    Write-Host "Extracting Maven..." -ForegroundColor Yellow
    Expand-Archive -Path $ZipPath -DestinationPath $MavenDir -Force
    Remove-Item $ZipPath -ErrorAction SilentlyContinue
    Write-Host "Maven ready!" -ForegroundColor Green
    $MavenCmd = $MavenBin
}

# 3. Run the Application
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Java Backend on port 8080"     -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot
& $MavenCmd spring-boot:run
