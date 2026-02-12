# Fast controlled font replacement script
# This script safely replaces font classes while preserving context

$srcPath = "c:\Users\admin\Desktop\keychain-ecommerce\src"

# Files to process (all .js files)
$files = @(
    "app\about\page.js"
    "app\auth\page.js"
    "app\contact\page.js"
    "app\cart\page.js"
    "app\checkout\page.js"
    "app\faq\page.js"
"app\returns\page.js"
    "app\shipping\page.js"
    "app\terms\page.js"
    "app\admin\dashboard\page.js"
    "app\admin\login\page.js"
    "app\admin\orders\page.js"
    "app\admin\products\page.js"
    "components\layout\Footer.js"
    "components\layout\MobileMenu.js"
    "components\cart\CartItem.js"
    "components\cart\CartSummary.js"
    "components\checkout\CheckoutForm.js"
    "components\checkout\OrderSummary.js"
    "components\common\Badge.js"
    "components\common\Button.js"
    "components\common\CustomDropdown.js"
    "components\common\Input.js"
    "components\common\Loading.js"
    "components\home\AboutGist.js"
    "components\home\Categories.js"
    "components\home\FeaturedProducts.js"
    "components\home\Testimonials.js"
    "components\products\ProductCard.js"
    "components\products\ProductFilter.js"
)

$successCount = 0

foreach ($relPath in $files) {
    $fullPath = Join-Path $srcPath $relPath
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        $originalContent = $content
        
        # Simple string replacements (safe for JSX)
        $content = $content -replace '\bfont-poppins\b', 'font-sans'
        $content = $content -replace '\bfont-space\b', 'font-display'
        $content = $content -replace '\bfont-outfit\b', 'font-sans'
        
        if ($content -ne $originalContent) {
            Set-Content -Path $fullPath -Value $content -Encoding UTF8 -NoNewline
            $successCount++
            Write-Host "✓ $relPath"
        }
    }
}

Write-Host "✓ Updated $successCount files"
