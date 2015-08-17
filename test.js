'use strict';

/* deps: mocha */
var should = require('should');
var inject = require('./');

describe('inject snippet', function () {
  describe('errors', function () {
    it('should throw an error when invalid arguments are passed:', function () {
      (function () {
        inject();
      }).should.throw('expected a string as the first argument.');
    });
  });

  describe('inject', function () {
    it('should inject a snippet into a string with one placeholder:', function () {
      var str = 'a <!-- snippet --> b';
      var actual = inject(str, 'foo');
      actual.should.equal('a <!-- snippet -->foo<!-- endsnippet --> b');
    });

    it('should inject a snippet into a string with before/after placeholders:', function () {
      var str = 'a <!-- snippet -->\nfoo\n<!-- endsnippet --> b';
      var actual = inject(str, 'bar\n');
      actual.should.equal('a <!-- snippet -->\nfoo\nbar\n<!-- endsnippet --> b');
    });
  });

  describe('options', function () {
    it('should inject a snippet into a string without placeholders:', function () {
      var str = 'a <!-- snippet --> b';
      inject(str, 'foo', {stripTags: true}).should.equal('a foo b');
    });

    it('should add normalized newlines around snippets:', function () {
      var str = 'a <!-- snippet --> b';
      var actual = inject(str, 'foo', {newlines: true});
      actual.should.equal('a\n<!-- snippet -->\nfoo\n<!-- endsnippet -->\nb');
    });

    it('should use custom delimiters:', function () {
      var str = 'a {{!snippet}} b';
      var actual = inject(str, 'foo', {delimiters: ['{{!', '}}']});
      actual.should.equal('a {{! snippet }}foo{{! endsnippet }} b');
    });

    it('should use custom delimiters:', function () {
      var str = 'a {{!snippet}} b';
      var actual = inject(str, 'foo', {delimiters: ['{{!', '}}']});
      actual.should.equal('a {{! snippet }}foo{{! endsnippet }} b');
    });
  });
});
