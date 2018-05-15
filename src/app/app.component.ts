import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Roll the Dice';
  number_of_dice = 2;
  size_of_dice = 6;
  dice_options = [4, 6, 8, 12, 20];
  submitted = false;
  dice = [];
  animate = true;
  cheat = false;
  weights = [
    {outcome: 1, weight: 1},
    {outcome: 2, weight: 1},
    {outcome: 3, weight: 1},
    {outcome: 4, weight: 1},
    {outcome: 5, weight: 1},
    {outcome: 6, weight: 1}
  ];

  changeSize () {
    // //Changing weights size to account for change in dice size, while preserving any weights
    // //that have been already changed
    //
    // //temporary array to hold information
    // var new_weights = [];
    // var found = false;
    // for (var i = 1; i <= this.size_of_dice; i++) {
    //   //'found' variable to test if the outcome already exists in weights
    //   found = false;
    //   //Find the item in weights where that outcome matches that die roll.
    //   for (var j = 0; j < this.weights.length; j++) {
    //     if (this.weights[j].outcome === i) {
    //       //Preserve the existing weight and send it to the placeholder variable
    //       new_weights.push(this.weights[j]);
    //       //tell the loop that this outcome has been found
    //       found = true;
    //     }
    //   }
    //   //if the outcome i wasn't found in the j loop, create a new object for it
    //   if (found === false) {
    //     new_weights.push({outcome: i, weight: 1});
    //   }
    // }
    // //Finally, take the placeholder and replace it
    // this.weights = new_weights;


    //REFACTOR: I am leaving the above intact but commented out for reference
    //One of two things will happen, but never both: Either

    //we will be adding new weights (if the new size is larger), or
    if (this.size_of_dice > this.weights.length) {
      var old_size = this.weights.length;
      var difference = this.size_of_dice - old_size;
      for (var i = 1; i <= difference; i++) {
        this.weights.push({outcome: old_size + i, weight: 1});
      }
    }
    //we will be removing extraneous weights (if the size is smaller).
    else {
      for (var i = 0; i < this.weights.length; i++) {
        if (this.weights[i].outcome > this.size_of_dice) {
          this.weights.splice(i, 1);
          i--;
        }
      }
    }
  }

  roll () {
    this.submitted = true;
    //If animate checkbox is selected, show animation.
    if (this.animate === true) {
      var rolling = setInterval(() => this.set_roll_values(), 50);
      var interval = setTimeout(function() {
        clearInterval(rolling);
      }, 2000);
    }
    //If animate checkbox is not selected, just pick a number.
    else {
      this.set_roll_values();
    }
  }

  set_roll_values () {
    this.dice = [];
    for (var i = 0; i < this.number_of_dice; i++) {
      this.dice.push({size: this.size_of_dice, value: this.calc_value()});
    }
  }

  calc_value () {
    // Step 1: Create an array with each side of the die in the array once for
    // every weight that it gets. i.e. [1, 1, 1, 2, 3, 4] if it's a four sided
    // die with a weight of 3 for outcome 1 and a weight of 1 everywhere else.
    var roll_array = [];
    for (var i = 1; i <= this.size_of_dice; i++) {
      for (var j = 0; j < this.weights.length; j++) {
        if (this.weights[j].outcome === i) {
          for (var k = 0; k < this.weights[j].weight; k++) {
            roll_array.push(i);
          }
        }
      }
    }
    //Step 2: In the event that all weights were set to 0 (user error), we will
    //give each outcome an equal possibility by pushing each outcome to the array once.
    if (roll_array.length === 0) {
      for (i = 1; i <= this.size_of_dice; i++) {
        roll_array.push(i);
      }
    }
    //Step 3: Random number multiplied by the length of the roll_array, rounded
    //down.  Then use that number to index roll_array, and return the value at that index.
    return roll_array[Math.floor(Math.random() * roll_array.length)];
  }

  toggleCheating () {
    if (this.cheat) {
      for (var i = 0; i < this.weights.length; i++) {
        this.weights[i].weight = 1;
      }
    }
  }

  validateNumberOfDice () {
    this.number_of_dice = Math.min(parseInt(this.number_of_dice.toString().replace(/\D/g,'') || '1'), 24);
  }
}
