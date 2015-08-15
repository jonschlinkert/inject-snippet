var inject = require('..');

var layout1 = inject('a {{!< layout }} b', 'this is content\n', {
  stripPlaceholders: true,
  delims: ['{{!<', '}}'],
  marker: 'layout',
  action: 'replace'
});
var layout2 = inject('c {{!< layout }} d', layout1, {
  stripPlaceholders: true,
  delims: ['{{!<', '}}'],
  marker: 'layout',
  action: 'replace'
});

console.log(layout2);
