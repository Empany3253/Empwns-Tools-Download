$repo = "C:\Users\phili\Desktop\tools.empwns.uk Downloads"
$site = "$repo\site"

# Create all folders
$folders = @(
    "$site\css",
    "$site\js",
    "$site\assets",
    "$site\downloads\shone-box",
    "$site\downloads\shone-os",
    "$site\downloads\xex-decompiler",
    "$repo\downloads\shone-box",
    "$repo\downloads\shone-os",
    "$repo\downloads\xex-decompiler"
)

foreach ($f in $folders) {
    if (-not (Test-Path $f)) {
        New-Item -ItemType Directory -Path $f -Force | Out-Null
        Write-Host "Created: $f"
    } else {
        Write-Host "Already exists: $f"
    }
}

Write-Host ""
Write-Host "Folder structure ready." -ForegroundColor Green
Write-Host "Now dropping in the site files..."

# Create placeholder style.css
@"
/* styles go here - replace with your actual style.css */
"@ | Set-Content "$site\css\style.css" -Encoding UTF8

# Create placeholder tools.js  
@"
/* tools.js goes here - replace with your actual tools.js */
"@ | Set-Content "$site\js\tools.js" -Encoding UTF8

# Create .gitkeep files so empty folders are tracked by git
".gitkeep" | Set-Content "$repo\downloads\shone-box\.gitkeep"
".gitkeep" | Set-Content "$repo\downloads\shone-os\.gitkeep"
".gitkeep" | Set-Content "$repo\downloads\xex-decompiler\.gitkeep"

Write-Host ""
Write-Host "Done. Now run:" -ForegroundColor Cyan
Write-Host "  git add ."
Write-Host "  git commit -m 'Setup site structure'"
Write-Host "  git push origin main"