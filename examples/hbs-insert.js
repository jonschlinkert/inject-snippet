var inject = require('..');

var one = inject('a {{!< layout }} b', 'this is content\n', {newlines: true, delimiters: ['{{!<', '}}'], tag: 'layout'});

var two = inject(one, 'foo', {stripTags: true, newlines: true, delimiters: ['{{!<', '}}'], tag: 'layout', action: 'append'});

console.log(two);
