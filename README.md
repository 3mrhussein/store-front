## This is a started Express-Postgres-Typescript-Jasmin project

### Installation

1- run npx express-postgres-typescript-template <project_name>

2- cd <project_name>

3- delete unneded functions routes and handlers this is just for structure preview;

4-reconfigure database.json,config.ts to match your .env variables

### scripts

`npm run migrate` : db-migrate up

`npm run test` : to migrate up the test database and run tests

`npm run test-reset` : //to reset the database and migrate down

`npm run lint` : check errors

`npm run lint:fix` : // fix errors

`npm run dev` : //run project in dev mode

`npm run start` : // npx tsc && node dist/src/index.js
