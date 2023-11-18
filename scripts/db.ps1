# installing dependencies
Write-Host "Installing Dependencies..."
npm install -g dotenv-cli
npm i

# migrating database
Write-Host "Migrating Database..."
npx prisma generate
dotenv -e .env.local -- npx prisma migrate dev --name init
