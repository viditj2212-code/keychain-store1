# Bulk font replacement script
# Replace font-poppins → font-sans (body) or font-display (headings)
# Replace font-space → font-display (display/headings)
# Replace font-outfit → font-sans (body/labels)

$srcPath = "c:\Users\admin\Desktop\keychain-ecommerce\src"
$files = Get-ChildItem -Path $srcPath -Recurse -Include "*.js" -ErrorAction SilentlyContinue

$replacements = @(
    # For display/heading contexts - replace with font-display
    @{ Pattern = 'font-poppins\s+text-\d+xl\s+.*?font-bold\s+.*?tracking-tighter\s+uppercase\s+italic'; Replace = 'font-display text-2xl font-bold tracking-tighter' },
    
   # For body/regular text - replace with font-sans
    @{ Pattern = 'font-poppins(?=\s+(text-\w+|font-semibold|font-medium)\s+text-gray)'; Replace = 'font-sans' },
    
    # General font-poppins → font-sans
    @{ Pattern = 'font-poppins'; Replace = 'font-sans' },
    
    # font-space → font-display
    @{ Pattern = 'font-space'; Replace = 'font-display' },
    
    # font-outfit → font-sans
    @{ Pattern = 'font-outfit'; Replace = 'font-sans' },
)

$fileCount = 0
$replaceCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    foreach ($replacement in $replacements) {
        $content = $content -replace $replacement.Pattern, $replacement.Replace
    }
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        $replaceCount++
        Write-Host "Updated: $($file.Name)"
    }
}

Write-Host "`nReplacement complete. Updated $replaceCount files."
