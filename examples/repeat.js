var inject = require('..');

var a = inject('a <!-- snippet --> b', 'blah');
var b = inject('c <!-- snippet --> d', a);
var c = inject('e <!-- snippet --> f', b);
var d = inject('g <!-- snippet --> h', c);
var e = inject('i <!-- snippet --> j', d);
console.log(e);

// i
// <!-- snippet -->
// g
// e
// c
// a
// blah
// b
// d
// f
// h
// <!-- endsnippet -->
// j
