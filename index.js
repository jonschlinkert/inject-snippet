/*!
 * inject-snippet <https://github.com/jonschlinkert/inject-snippet>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';


function inject(existing, snippet, opts) {
  if (typeof existing !== 'string') {
    throw new TypeError('expected a string as the first argument.');
  }
  if (typeof snippet !== 'string') {
    return existing;
  }

  opts = opts || {};
  if (typeof opts.placeholders === 'undefined') {
    opts.placeholders = true;
  }

  var action = opts.action || 'add';
  var marker = opts.marker || 'snippet';
  var markers = arrayify(marker);
  markers = markers.map(function (ele) {
    return createMarkers(ele);
  });

  var start = markers[0];
  var end = markers[1] || createMarkers('end' + marker);

  var i = existing.indexOf(start);
  if (i === -1) return existing;

  var e = end ? existing.indexOf(end, i + 1) : -1;
  if (i !== -1 && e !== -1) {
    var slen = start.length;
    if (!opts.placeholders) {
      slen = 0;
    }
    var head = trimRight(existing.slice(0, i + slen));
    var inner = trimLeft(existing.slice(i + slen, e));

    existing = action === 'add' ? inner : '';
    var tail = existing.slice(e);

    return head + '\n' + existing + snippet + '\n' + tail;
  }

  var res = snippet;

  if (opts.placeholders) {
    res = '';
    res += end ? (start + '\n') : '';
    res += snippet;
    res += end ? ('\n' + end) : '';
  }
  return existing.split(start).join(res);
};

function createMarkers(name) {
  return '<!-- ' + name + ' -->';
}

function trimLeft(str) {
  return str.replace(/^\n+/, '');
}

function trimRight(str) {
  return str.replace(/\n+$/, '');
}

function arrayify(val) {
  return Array.isArray(val) ? val : [val];
}

/**
 * Expose `inject`
 */

module.exports = inject;
