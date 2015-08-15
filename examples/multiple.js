var inject = require('..');

var multi = inject('a <!-- snippet --> b <!-- snippet --> c <!-- snippet --> d <!-- snippet --> e <!-- endsnippet --> f', 'blah\n');
console.log(multi);

// a
// <!-- snippet -->
// b
// blah
// c
// blah
// d
// blah
// e
// <!-- endsnippet -->
// f
