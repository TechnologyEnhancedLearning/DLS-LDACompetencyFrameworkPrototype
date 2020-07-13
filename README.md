# HEE Prototype

This is the prototype for the Digital Learning Solutions (DLS) system.

## Zero to Hero

You will need
* Git
* Visual Studio Code
* npm

Clone into this repository and open it in VS Code.

Copy the `.env.template` file and rename it to `.env`. Fill out the value of `DATABASE_URL` with the connection string for your Postgres database (if you're on Heroku, you can copy the URI from the database Settings page).

In the root of this directory, run
```
npm install
npm run watch
```

You should now be able to navigate to http://localhost:2000 and see the homepage.
