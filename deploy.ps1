# SAT Put — deploy na Vercel (besplatno, ~2 minute)
# Pokreni u PowerShellu:  cd C:\UPWRK\sat-put-web  then  .\deploy.ps1

Set-Location $PSScriptRoot

Write-Host "Deploying SAT Put to Vercel..." -ForegroundColor Cyan
npx vercel deploy --prod

Write-Host ""
Write-Host "Gotovo! URL ce biti ispisan iznad (Production: https://...)" -ForegroundColor Green
