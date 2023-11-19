# installing dependencies
Write-Host "Installing Dependencies..."
npm install -g dotenv-cli
npm i

# migrating database
Write-Host "Migrating Database..."
npx prisma generate
dotenv -e .env.local -- npx prisma migrate dev --name init

# generating types
Write-Host "Generating Types..."
npx supabase login
npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > types/supabase.ts
