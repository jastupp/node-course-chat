const moment = require('moment');

const date = moment();
date.add(1, 'year').subtract(9, 'months');

console.log(date.format('MMM Do YYYY'));
console.log(date.format('h:mm a'));
console.log(date.format('LT'));

const then = moment(1234);

console.log(then.format('MMM Do YYYY h:mm:ss a'));


//var date = new Date();

//console.log(date.getMonth());

