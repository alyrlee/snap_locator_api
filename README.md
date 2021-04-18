# 🚀 Welcome to SNAP App Locator API !

SNAP stands for the Supplemental Nutrition Assistance Program mandated by the Federal Government and supervised by states to help millions of individuals and families who need financial assistance to buy food. Formerly known as the Food Stamp Program, SNAP provides an economic benefit as well as serving to eliminate hunger. 

SNAP Store locator is an application that helps users find access to SNAP retailers and grocers.
Communities suffer disproportionately from illness related to lack of access to fresh and healthy foods.
SNAP Store Locator will allow the user to search for retailers and grocers nearby that accept SNAP benefits and also provide a list of food items that are sold.

Client: snap-client: https://github.com/alyrlee/snap-client

## Open Endpoints

Open endpoints require no Authentication.

* [Find](find.md) : `POST /api/find`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests in watch mode `npm test`

## Deploying

When your new project is ready for deployment, add a new heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
