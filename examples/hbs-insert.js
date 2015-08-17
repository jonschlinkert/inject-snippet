var inject = require('..');

var one = inject('a {{!< layout }} b', 'this is content\n', {newlines: true, delimiters: ['{{!<', '}}'], marker: 'layout'});

var two = inject(one, 'foo', {stripTags: true, newlines: true, delimiters: ['{{!<', '}}'], marker: 'layout', action: 'append'});

console.log(two);
