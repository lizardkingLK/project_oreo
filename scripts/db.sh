# installing dependencies
echo "Installing Dependencies..."
npm install -g dotenv-cli
npm i

# migrating database
echo "Migrating Database..."
npx prisma generate
dotenv -e .env.local -- npx prisma migrate dev --name init