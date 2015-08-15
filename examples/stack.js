var inject = require('..');

var a = inject('a <!-- snippet --> b', 'blah\n');
var b = inject(a, 'foo\n');
var c = inject(b, 'bar\n');
var d = inject(c, 'baz\n');
var e = inject(d, 'fez\n');
console.log(e);

// a
// <!-- snippet -->
// blah
// foo
// bar
// baz
// fez
// <!-- endsnippet -->
// b
