'use strict'

function Dish(type) {
    this.type = type;
}

Dish.prototype.getType = function () {
    return this.type;
}

Object.freeze(Dish);

function Hamburger(type, stuffing) {
    Dish.call(this, type, stuffing);
    this.stuffing = stuffing;
    this.info = {
        small: { price: 50, cal: 20 },
        large: { price: 100, cal: 40 },
        cheese: { price: 10, cal: 20 },
        salad: { price: 20, cal: 5 },
        potato: { price: 15, cal: 10 },
    };
}

Hamburger.prototype = Object.create(Dish.prototype);

Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}

Hamburger.prototype.calculatePrice = function () {
    return this.info[this.type].price + this.info[this.stuffing].price;
}

Hamburger.prototype.calculateCalories = function () {
    return this.info[this.type].cal + this.info[this.stuffing].cal;
}

Object.freeze(Hamburger);

function Salad(type, size) {
    Dish.call(this, type, size);
    this.size = size;
    this.info = {
        caesar: { price: 100, cal: 20 },
        olivier: { price: 50, cal: 80 },
    }
}

Salad.prototype = Object.create(Dish.prototype);

Salad.prototype.getSize = function () {
    return this.size;
}

Salad.prototype.calculatePrice = function () {
    return this.info[this.type].price / 100 * this.size;
}

Salad.prototype.calculateCalories = function () {
    return this.info[this.type].cal / 100 * this.size;
}

Object.freeze(Salad);

function Drink(type) {
    Dish.call(this, type);
    this.info = {
        coke: { price: 50, cal: 40 },
        coffee: { price: 80, cal: 20 },
    }
}

Drink.prototype = Object.create(Dish.prototype);

Drink.prototype.calculatePrice = function () {
    return this.info[this.type].price;
}

Drink.prototype.calculateCalories = function () {
    return this.info[this.type].cal;
}

Object.freeze(Drink);

function Order() {
    this.closed = false;
    this.dishes = [];
    for(var i = 0; i < arguments.length; i++) {
        this.dishes.push(arguments[i]);
    }
}

Order.prototype.getOrder = function () {
    return this.dishes;
}

Order.prototype.calculatePrice = function () {
    var price = 0;
    for(var i = 0; i < this.dishes.length; i++) {
        price = price + this.dishes[i].calculatePrice();
    }
    return price;
}

Order.prototype.calculateCalories = function () {
    var cal = 0;
    for(var i = 0; i < this.dishes.length; i++) {
        cal = cal + this.dishes[i].calculateCalories();
    }
    return cal;
}

Order.prototype.addDish = function (newDish) {
    if(!this.closed) {
        this.dishes.push(newDish);
    } else {
        console.log("Order can't be edited");
    }
}

Order.prototype.removeDish = function () {
    if(this.dishes.length > 0 && !this.closed) {
        this.dishes.pop();
    } else {
        console.log("Order can't be edited");
    }
}

Order.prototype.payOrder = function () {
    this.closed = true;
}

Object.freeze(Order);


var HAMBURGER_SIZE_SMALL = 'small';
var HAMBURGER_SIZE_LARGE = 'large';
var HAMBURGER_STUFFING_CHEESE = 'cheese';
var HAMBURGER_STUFFING_SALAD = 'salad';
var HAMBURGER_STUFFING_POTATO = 'potato';

var SALAD_CAESAR = 'caesar';
var SALAD_OLIVIER = 'olivier';

var DRINK_COKE = 'coke';
var DRINK_COFFEE = 'coffee';


var ham_small_cheese = new Hamburger(HAMBURGER_SIZE_SMALL, HAMBURGER_STUFFING_CHEESE);
var ham_big_potato = new Hamburger(HAMBURGER_SIZE_LARGE, HAMBURGER_STUFFING_POTATO);
var caesar_200 = new Salad(SALAD_CAESAR, 200);
var coke = new Drink(DRINK_COKE);
var coffee = new Drink(DRINK_COFFEE);

var order = new Order(ham_small_cheese, caesar_200, coke, coke);

console.log(order.getOrder());
order.addDish(ham_big_potato);
console.log(order.calculatePrice());
console.log(order.calculateCalories());

order.removeDish();
console.log(order.calculatePrice());
console.log(order.calculateCalories());

order.payOrder();
order.addDish(coffee);
