# DiceRolling

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Machine Setup
This project requires Node.js version 8.x and NPM version 5.x.  After both are installed, run
`npm install -g @angular/cli` to install Angular Command Line Interface if not already installed.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##Application Information

###Technology Justification
Requirements for this project stated `The application may be written in a relevant platform and language of your choice.`  I was aware that the company is interested in upgrading their existing AngularJS framework to Angular.IO vX.X.X in the near future, and also I lacked experience with this framework.  I decided to write the application in this framework as a demonstration of my enthusiasm for learning new technologies, as well as forward thinking should I find myself upgrading or building Angular.io X.X.X applications in the near future.

###Feature Descriptions

###Variable Dice Size
I decided to allow variable, but controlled, dice sizes.  The sizes chosen (4, 6, 8, 12, 20) were chosen because those five dice sizes are the five [Platonic Solids](https://en.wikipedia.org/wiki/Platonic_solid), which are regular polyhedrons that are equiprobable in outcomes.  These are not the only possible equiprobable dice, just the most elegant.  6 sides is the default.

###Number of Dice
I decided to allow any number of dice from 1 to 24.  Any more than 24 dice and the application risks becoming unwieldy for the user.  Default number of dice is 2.

###Animation
A simple animation (in which the number changes every 0.05 seconds to simulate rolling) can be disabled to deliver an instant outcome.  Default is enabled.

###Loaded Dice
The user can impact the rolls by the loaded dice feature.  The user has the ability to increase and decrease the probability of outcomes, and even eliminate the possibility of outcomes.  Default setting is for all outcomes to be equiprobable.  When user disables 'cheating', settings revert to default.  If the user decides to disable all possibilities (by setting their weight to zero) the application will treat the possibilities as equiprobable.
