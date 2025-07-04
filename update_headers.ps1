# PowerShell script to update header in HTML files in subfolders
# This replaces the existing header with a new one

Write-Host "Updating header in HTML files in subfolders..." -ForegroundColor Green

$folders = @("blogs", "news", "help")
$totalUpdated = 0

# Define the new header HTML
$newHeader = @'
<div id="vmls-header">
        <div class="sticky top-0 z-10 bg-white">
          <div class="bg-white relative z-0 py-2" id="topbar">
            <div class="container flex items-center justify-between">
              <p class="text-[12px] md:text-base">
                <a class="text-[#262626]" href="tel:+917358201234"
                  >+91 7358201234</a
                >
                |
                <a class="text-[#262626]" href="mailto:admissions@vmls.edu.in"
                  >admissions@vmls.edu.in</a
                >
              </p>
              <div
                class="topbar-right-img flex items-center cursor-pointer gap-2"
                id="right-menu"
              >
                <img class="h-2" src="../public/new-menu.svg" alt="image" />
                <p class="text-[12px] md:text-sm font-[600]">MENU</p>
              </div>
            </div>
          </div>
          <header class="relative z-0 bg-[#eaeaea] py-2" id="vmls-header-inner">
            <div class="container flex justify-between items-center">
              <div class="flex items-center justify-center">
                <img
                  class="h-10 md:h-14"
                  src="../public/Group-533.webp"
                  alt="image"
                />
              </div>
              <a href="../index.html" class="flex items-center justify-center">
                <img
                  class="h-10 md:h-12"
                  src="../public/asset-44x-1@2x.webp"
                  alt="image"
                />
              </a>
            </div>
          </header>
        </div>
      </div>
'@

foreach ($folder in $folders) {
    $folderPath = ".\$folder"
    
    if (Test-Path $folderPath) {
        Write-Host "`nProcessing folder: $folder" -ForegroundColor Yellow
        
        # Get all HTML files in the folder
        $htmlFiles = Get-ChildItem -Path $folderPath -Filter "*.html"
        
        foreach ($file in $htmlFiles) {
            $content = Get-Content $file.FullName -Raw
            
            # Check if the file contains the vmls-header div
            if ($content -match '<div id="vmls-header">') {
                Write-Host "  Updating: $($file.Name)" -ForegroundColor Cyan
                
                # Replace the entire vmls-header div and its content
                # This regex matches from <div id="vmls-header"> to its closing </div>
                $pattern = '(?s)<div id="vmls-header">.*?</div>\s*</div>'
                
                if ($content -match $pattern) {
                    $content = $content -replace $pattern, $newHeader
                    
                    # Save the updated content
                    Set-Content $file.FullName -Value $content -NoNewline
                    $totalUpdated++
                } else {
                    Write-Host "    Warning: Could not find complete vmls-header structure in $($file.Name)" -ForegroundColor Red
                }
            } else {
                Write-Host "  Skipped: $($file.Name) (no vmls-header found)" -ForegroundColor Gray
            }
        }
        
        Write-Host "  Files processed in $folder`: $($htmlFiles.Count)" -ForegroundColor Green
    } else {
        Write-Host "Folder not found: $folder" -ForegroundColor Red
    }
}

Write-Host "`n✅ Script completed!" -ForegroundColor Green
Write-Host "Total files updated: $totalUpdated" -ForegroundColor Cyan
