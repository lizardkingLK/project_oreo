![project_oreo by lizardkingLK](/project-oreo.svg)

## A Chat Application

An open-source chat application to learn real-time messaging.

## .env.local file to be added

```
NEXT_PUBLIC_ABLY_API_KEY=YOUR_NEXT_PUBLIC_ABLY_API_KEY
NEXT_PUBLIC_LOCAL_STORAGE=YOUR_NEXT_PUBLIC_LOCAL_STORAGE
NEXT_PUBLIC_SUPABASE_URL=YOUR_NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_DATABASE_URL=YOUR_NEXT_PUBLIC_DATABASE_URL
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=YOUR_NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL=YOUR_NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=YOUR_NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=YOUR_NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
```

## Commands to run

### Generate ORM

```
npx prisma generate
```

### Install dotenv package

```
npm install -g dotenv-cli
```

### DB Migrate

```
dotenv -e .env.local -- npx prisma migrate dev --name init
```

### Start server

```
npm run dev
```
