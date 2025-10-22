# PowerShell script to help setup MongoDB Atlas connection
Write-Host "MongoDB Atlas Setup Helper" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green

Write-Host "`n1. Go to: https://www.mongodb.com/cloud/atlas" -ForegroundColor Yellow
Write-Host "2. Sign up and create a free cluster" -ForegroundColor Yellow
Write-Host "3. Create database user (username: airportuser)" -ForegroundColor Yellow
Write-Host "4. Allow access from anywhere" -ForegroundColor Yellow
Write-Host "5. Get connection string" -ForegroundColor Yellow

$connectionString = Read-Host "`nEnter your MongoDB Atlas connection string"
$jwtSecret = Read-Host "Enter JWT secret (or press Enter for default)"

if ([string]::IsNullOrEmpty($jwtSecret)) {
    $jwtSecret = "please-change-me"
}

$envContent = @"
PORT=4000
MONGO_URI=$connectionString
JWT_SECRET=$jwtSecret
"@

$envFile = "server\.env"
Set-Content -Path $envFile -Value $envContent
Write-Host "`nCreated $envFile with your MongoDB Atlas connection!" -ForegroundColor Green

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. npm run server:seed" -ForegroundColor White
Write-Host "2. npm run server:dev" -ForegroundColor White
Write-Host "3. cd client && npm start" -ForegroundColor White
