$images = @{
    "public/images/bharmour.jpg" = "https://tse1.mm.bing.net/th/id/OIP.2nQTN-dDhkVcAD3WqNm7JQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
    "public/images/kullu.jpg" = "https://images.unsplash.com/photo-1589205627586-b45353cc929d?q=80&w=1600&auto=format&fit=crop"
    "public/images/pangi.jpg" = "https://images.unsplash.com/photo-1626049989725-b10864319777?q=80&w=1600&auto=format&fit=crop"
    "public/images/narkanda.jpg" = "https://images.unsplash.com/photo-1616744887323-9524e98f0653?q=80&w=1600&auto=format&fit=crop"
}

# Create directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public/images"

foreach ($path in $images.Keys) {
    $url = $images[$path]
    Write-Host "Downloading $url to $path..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $path -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        Write-Host "Success!" -ForegroundColor Green
    } catch {
        Write-Host "Failed to download $url : $_" -ForegroundColor Red
    }
}
