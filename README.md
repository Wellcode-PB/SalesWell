# SalesWell

# Running the project
Create a new file named `.env` in the root directory with the following structure:
DATABASE_URL="postgresql://db_user@localhost:5432/db_name?schema=ycbm_sync"

# Testing
Create a new file named `.env.test` in the root directory with the following structure:
DATABASE_URL="postgresql://db_user@localhost:5432/saleswell_test?schema=ycbm_sync"

Run `createdb saleswell_test` and `psql saleswell_test -c 'CREATE SCHEMA ycbm_sync'`

Then run `npm run cypress`. You'll have to run `npm run test` on each test run.