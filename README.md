<p align="center">
  <img src="/public/favicon.png" alt="logo" />
</p>

<p align="center">
  <img src="/project-oreo.svg" alt="badge" />
</p>

## A Chat Application

An open-source chat application to learn real-time messaging.

[![SonarCloud analysis](https://github.com/lizardkingLK/project_oreo/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/lizardkingLK/project_oreo/actions/workflows/sonarcloud.yml)

## .env.local file to be added

```
NEXT_PUBLIC_MESSAGING=NEXT_PUBLIC_MESSAGING[local|cloud]
NEXT_PUBLIC_STORAGE=NEXT_PUBLIC_STORAGE[local|cloud]
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

### DB Migration

#### Windows

```
.\scripts\db.ps1
```

#### Linux

```
cd scripts
chmod +x db.sh
./db.sh
```


### Start Application

`npm run dev`
