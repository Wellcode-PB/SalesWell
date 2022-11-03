# SalesWell

# Known issues that need fixing ASAP

- [ ] Navbar has some white space around it

- [ ] Bad alignment for notification on user/generate

# Installing the project
1. `git clone https://github.com/Wellcode-PB/SalesWell.git`
2. Install PostgreSQL (if not installed)
3. Create database: `CREATE DATABASE saleswell;`
4. Create schema: `CREATE SCHEMA ycbm_sync;`
5. Change directory to the project folder: `cd SalesWell/`
6. Create a new file named `.env` with the following structure:

```
DATABASE_URL="postgresql://db_user@localhost:5432/saleswell?schema=ycbm_sync"
JWT_SECRET="RANDOM_STRING"
NEXTAUTH_SECRET="RANDOM_STRING_2"
NEXTAUTH_URL="http://localhost:3000"
SITE_URL="http://localhost:3000"
```
use `DATABASE_URL="postgresql://db_user:password@localhost:5432/saleswell?schema=ycbm_sync"` 
if you have a password for the database user

7. Create a new file named `.env.test` with the following structure:

```
DATABASE_URL="postgresql://db_user@localhost:5432/saleswell_test?schema=ycbm_sync"
JWT_SECRET="TEST_JWT"
NEXTAUTH_SECRET="TEST_SECRET"
NEXTAUTH_URL="http://localhost:3000"
```

use `DATABASE_URL="postgresql://db_user:password@localhost:5432/saleswell_test?schema=ycbm_sync"` 
if you have a password for the database user

8. Install Node.js
9. Install Next.js: `npm i next`
10. Install Dotenv-cli: `npm install -g dotenv-cli`
11. Install prisma: `npm install prisma --save-dev`
12. Migrate: `npx prisma migrate dev`
13. Reset the database: `dotenv -e .env npx prisma migrate reset --force`

# Running the project
1. Run: `npm run dev` from the root directory (SalesWell)
2. You can log in using "admin@example.com" with password: "password"

# Testing
1. Reset the database: `dotenv -e .env.test npx prisma migrate reset --force`
2. Run the project: `npm run test`
3. Run all tests together: `npm run cy:run` or run each test separately: 
`npm run cypress`