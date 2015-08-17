var inject = require('..');

var layout1 = inject('a {{!< layout }} b', 'this is content\n', {
  newlines: true,
  delimiters: ['{{!<', '}}'],
  tag: 'layout',
  action: 'replace'
});
var layout2 = inject('c {{!< layout }} d', layout1, {
  stripTags: true,
  newlines: true,
  delimiters: ['{{!<', '}}'],
  tag: 'layout',
  action: 'replace'
});

console.log(layout2);
