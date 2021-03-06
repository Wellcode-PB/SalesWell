# SalesWell

# Known issues that need fixing ASAP
- [ ] Can't rerun tests without restarting server

- [ ] Tests need a better arhitecture

- [ ] Add CI tests

- [ ] Navbar has some white space around it

- [ ] Bad alignment for notification on user/generate

# Running the project
Create a new file named `.env` in the root directory with the following structure:
```
DATABASE_URL="postgresql://db_user@localhost:5432/db_name?schema=ycbm_sync"
JWT_SECRET="YOUR_RANDOM_STRING"
NEXTAUTH_SECRET="YOUR_RANDOM_STRING_2"
NEXTAUTH_URL="http://localhost:3000"
SITE_URL="http://localhost:3000"
```

# Testing
Create a new file named `.env.test` in the root directory with the following structure:
```
DATABASE_URL="postgresql://db_user@localhost:5432/saleswell_test?schema=ycbm_sync"
JWT_SECRET="TEST_JWT"
NEXTAUTH_SECRET="TEST_SECRET"
NEXTAUTH_URL="http://localhost:3000"
```

Seed the database if you need:
`dotenv -e .env.test npx prisma migrate reset --force`
Run `createdb saleswell_test` and `psql saleswell_test -c 'CREATE SCHEMA ycbm_sync'`.

Then run `npm run cypress`. You'll have to run `npm run test` on each test run.
