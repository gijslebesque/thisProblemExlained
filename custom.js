// The this keyword refers to the current execution context of a function.

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    console.log(`${this.firstName}'s last name is: ${this.lastName}`);
  }
}

var tonySoprano = new Person("Tony", "Soprano");
tonySoprano.sayName(); // Tony's last name is: Soprano
// CORRECT as the sayName method is being called with tonySoprano as
// the context (context is "what's to the left" of the function being called)
// so "this" in the sayName function refers to the tonySoprano object

// ----------------------------------------------------------------------------------------
// Problem - Calling the sayName() function in a different context
// ----------------------------------------------------------------------------------------

// E.g. We want to run the sayName function when we press a BUTTON

var paulie = new Person("Paulie", "Gualtieri");

// Pass the sayName function to a button
document.getElementById("btn-paulie").addEventListener("click", paulie.sayName); // 's height is: undefined
// INCORRECT as the "this" in sayName now
// refers to the button (not the paulie object)

// ----------------------------------------------------------------------------------------
// Solution 1: create a new context
// ----------------------------------------------------------------------------------------

document.getElementById("btn-tony", function() {
  //inside the function here the lexical scope of this is the button.
  //However when we call a method here a new context is created.
  // In this function call this is as we'd expect (belonging to the tonySoprano object).
  tonySoprano.sayName();
});

// ----------------------------------------------------------------------------------------
// Solution 2: self = this (NOT RECOMMENDED)
// ----------------------------------------------------------------------------------------

class Dog {
  constructor(name, height) {
    self = this; // When creating the object, assign the object permanently to a variable (called "self" in this case, could be anything) (NB: needs to be in the constructor)
    this.name = name;
    this.height = height;
  }

  logHeight() {
    console.log(`${self.name}'s height is: ${self.height}`); // Use "self" here instead of "this"
  }
}

var roger = new Dog("Roger", 80);
document
  .getElementById("btn-get-size-dog")
  .addEventListener("click", roger.logHeight); // Roger's height is: 80
// CORRECT!

// ----------------------------------------------------------------------------------------
// Solution 3: Bind
// ----------------------------------------------------------------------------------------

class Cat {
  constructor(name, height) {
    this.name = name;
    this.height = height;
    this.logHeight = this.logHeight.bind(this); // When using someCat.logHeight, it's always "bound" to the someCat object
  }

  logHeight() {
    console.log(`${this.name}'s height is: ${this.height}`);
  }
}

var millie = new Cat("Millie", 40);
document
  .getElementById("btn-get-size-cat")
  .addEventListener("click", millie.logHeight); // Millie's height is: 40
// CORRECT!

// ----------------------------------------------------------------------------------------
// Solution 3: Arrow functions
// ----------------------------------------------------------------------------------------

class Fish {
  constructor(name, height) {
    this.name = name;
    this.height = height;
  }

  logHeight = () => {
    // Use an arrow function instead - arrow functions within classes always have the context of their class instance
    console.log(`${this.name}'s height is: ${this.height}`);
  };
}

var fishy = new Fish("Fishy", 10);
document
  .getElementById("btn-get-size-fish")
  .addEventListener("click", fishy.logHeight); // Fishy's height is: 10
// CORRECT!

//Why do arrow functions bind?
//When the class here is compiled. JavaScript moves arrow functions inside the contructor function.

class Weapon {
  constructor(name, material) {
    this.name = name;
    this.material = material;
  }

  tellMaterial = () => {
    console.log(`The ${this.name} is made out of ${this.material}`);
  };

  sayName() {
    console.l(`This is a ${this.name}`);
  }
}

const woodenSword = new Weapon("Sword", "Wood");

/*
    After compilation woodenSword will look like:
    const woodenSword = {
        material: "Wood"
        name: "Sword"
        tellMaterial: () => {…}
    }

    the sayName weapon is to be found in the prototype property of woodenSword and can loose it's context.

    I recommend this article if you'd like to know more
    https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1
*/
