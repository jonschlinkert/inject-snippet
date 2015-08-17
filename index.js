'use strict';

var cache = {};

/**
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {String} Get the same string back with a snippet inserted
 */

function inject(str, snippet, opts) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string as the first argument.');
  }

  opts = opts || {};
  var delims = opts.delimiters || ['<!--', '-->'];
  var name = opts.marker || 'snippet';
  var regex = opts.regex || toRegex(name, delims);
  var open = openDelim(name, delims, opts);
  var close = closeDelim(name, delims, opts);
  var trailing = /(\n+)$/.exec(str);

  // get any existing sections
  var sections = split(str, regex, opts);
  var contents = stripTags(snippet, regex, opts);

  // no snippet markers, so just append the string
  if (sections.length === 1 && opts.append !== false) {
    return str + contents;
  }

  var start = emit(sections.shift(), opts);
  var end = emit(sections.pop(), opts);
  var len = sections.length;

  var inner;
  if (len > 1 && opts.multiple !== false) {
    inner = sections.join(emit(contents, opts));
  } else if (len > 1) {
    inner = emit(sections.shift(), opts);
    inner += emit(contents, opts);
    inner += emit(sections.join('\n'), opts);

  } else if (len === 1) {
    inner = update(sections[0], contents, opts);

  } else if (!len) {
    inner = emit(contents, opts);
  }

  var middle = open + inner + close;
  if (opts.stripTags === true) {
    middle = inner;
  }

  var res = start + middle + end;
  return trimRight(res) + (trailing ? trailing[0] : '');
}

/**
 * Snippet utils
 */

function update(str, snippet, opts) {
  switch(opts.action) {
    case 'prepend':
      return snippet + str;
    case 'append':
      return str + snippet;
    case 'replace':
      return snippet;
    default: {
      return str + snippet;
    }
  }
  return str;
}

/**
 * String utils
 */

function toString(str) {
  return str == null ? '' : str;
}

function trimRight(str) {
  return str.replace(/\s+$/, '');
}

function split(str, re, opts) {
  return toString(str).split(re).map(function (seg) {
    return emit(seg, opts);
  });
}

function emit(str, opts) {
  return opts.newlines
    ? toString(str).trim() + '\n'
    : toString(str);
}

/**
 * Delimiter-related utils
 */

function memoize(key, val) {
  if (cache.hasOwnProperty(key)) {
    return cache[key];
  }
  return (cache[key] = val);
}

function toRegex(name, delims) {
  var key = name + delims.join('_');
  return memoize(key, new RegExp(toMarker(name, delims), 'g'));
}

function escape(str) {
  return str.replace(/(\W)/g, '\\$1');
}

function toMarker(name, delims) {
  return '(?:' + escape(delims[0]) + '\\s*(?:end)?' + name + '\\s*' + escape(delims[1]) + ')';
}

function stripTags(str, re, opts) {
  return emit(split(str, re, opts).join(''), opts);
}

function openDelim(name, delims, opts) {
  return emit(delims[0] + ' ' + name + ' ' + delims[1], opts);
}

function closeDelim(name, delims, opts) {
  return emit(delims[0] + ' end' + name + ' ' + delims[1], opts);
}

/**
 * Expose `inject`
 */

module.exports = inject;

/**
 * Expose `stripTags`
 */

module.exports.stripTags = function (str, opts) {
  opts = opts || {};
  var delims = opts.delimiters || ['<!--', '-->'];
  var name = opts.marker || 'snippet';
  var regex = opts.regex || toRegex(name, delims);
  return stripTags(str, regex, opts);
};
