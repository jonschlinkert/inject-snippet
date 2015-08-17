var inject = require('..');

// var layout1 = inject('a {{!< layout }} b', 'this is content\n', {
//   delims: ['{{!<', '}}'],
//   marker: 'layout',
//   action: 'append'
// });
// var layout2 = inject('c {{!< layout }} d', layout1, {
//   delims: ['{{!<', '}}'],
//   marker: 'layout',
//   action: 'append'
// });
// var layout3 = inject('d {{!< layout }} e', layout2, {
//   stripPlaceholders: true,
//   delims: ['{{!<', '}}'],
//   marker: 'layout',
//   action: 'append'
// });

// d
// c
// a
// this is content
// b
// d
// e

var opts = { delimiters: ['{{!<', '}}'], marker: 'layout', action: 'append' };
opts.newlines = true;

var layout1 = inject('a {{!< layout }} b', 'this is content', opts);
var layout2 = inject('c {{!< layout }} d', layout1, opts);
var layout3 = inject('d {{!< layout }} e', layout2, opts);

var res = inject.stripTags(layout3, opts);
console.log(res);
