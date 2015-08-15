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
  var delims = opts.delims || ['<!--', '-->'];
  var name = opts.marker || 'snippet';
  var regex = opts.regex || toRegex(name, delims);
  var open = opts.open || openDelim(name, delims);
  var close = opts.close || closeDelim(name, delims);
  var strip = stripMarkers(name, delims);

  // get any existing sections
  var sections = split(str, regex);
  var contents = toSnippet(snippet, strip);

  // no snippet markers, so just append the string
  if (sections.length === 1 && opts.append !== false) {
    return str + contents;
  }

  var a = sections.shift();
  var b = sections.pop();
  var len = sections.length;
  var inner;

  if (len > 1 && opts.multiple !== false) {
    inner = sections.join(contents);
  } else if (len > 1) {
    inner = sections.shift();
    inner += contents;
    inner += sections.join('\n');
  }

  if (len === 1) {
    inner = update(sections[0], contents, opts);
  } else if (!len) {
    inner = contents;
  }

  var middle = open + inner + close;
  if (opts.stripPlaceholders === true) {
    middle = inner;
  }

  return a + middle + b;
}

/**
 * Snippet utils
 */

function emit(str, fn) {
  return toString(str).trim() + '\n';
}

function toSnippet(str, fn) {
  return emit(fn(str));
}

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

function split(str, re) {
  return toString(str).split(re).map(emit);
}

/**
 * Delimiter-related utils
 */

function toRegex(name, delims) {
  return cache[name] || (cache[name] = new RegExp(toMarker(name, delims), 'g'));
}

function toMarker(name, delims) {
  return '(?:' + delims[0] + '\\s*(?:end)?' + name + '\\s*' + delims[1] + ')';
}

function stripMarkers(name, delims) {
  var re = toRegex(name, delims);
  return function(str) {
    return emit(split(str, re).join(''));
  };
}

function openDelim(name, delims) {
  return emit(delims[0] + ' ' + name + ' ' + delims[1]);
}

function closeDelim(name, delims) {
  return emit(delims[0] + ' end' + name + ' ' + delims[1]);
}

/**
 * Expose `inject`
 */

module.exports = inject;
