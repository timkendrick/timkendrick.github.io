'use strict';

var fs = require('fs');
var util = require('util');
var Transform = require('stream').Transform;
var marked = require('marked');
var hljs = require('highlight.js');

module.exports = function(config) {
	if (!config.source) { throw new Error('No source specified'); }
	if (!config.destination) { throw new Error('No destination specified'); }
	var options = config.options || {};
	var markdownOptions = options.markdown || {};
	var htmlOptions = options.html || {};
	return fs.createReadStream(config.source, { encoding: 'utf8' })
		.pipe(markedStream(markdownOptions))
		.pipe(htmlWrapper(htmlOptions))
		.pipe(fs.createWriteStream(config.destination));
};

module.exports.description = 'Convert Markdown to HTML';


function markedStream(options) {
	options = options || {};
	if (options.highlight === true) {
		options.highlight = function(code) {
			return hljs.highlightAuto(code).value;
		};
	}
	return createMarkedStream(options);


	function createMarkedStream(options) {
		function MarkedStream(options) {
			Transform.call(this, {
				decodeStrings: false
			});
			this.options = options;
		}

		util.inherits(MarkedStream, Transform);

		MarkedStream.prototype._transform = function(data, encoding, callback) {
			var html = marked(data, this.options);
			callback(null, html);
		};

		return new MarkedStream(options);
	}
}

function htmlWrapper(options) {
	options = options || {};
	return createHtmlWrapperStream(options);


	function createHtmlWrapperStream(options) {
		function HtmlWrapperStream(options) {
			Transform.call(this, {
				decodeStrings: false
			});
			this.options = options;
		}

		util.inherits(HtmlWrapperStream, Transform);

		HtmlWrapperStream.prototype._transform = function(data, encoding, callback) {
			var html = getHtmlHeader(this.options) + data + getHtmlFooter(this.options);
			callback(null, html);
		};

		return new HtmlWrapperStream(options);


		function getHtmlHeader(options) {
			return '<!doctype html><html><head><meta charset="utf-8"/>' +
				(options.title ? '<title>' + options.title + '</title>' : '') +
				(options.stylesheets ? options.stylesheets.map(function(stylesheet) {
					return '<link rel="stylesheet" href="' + stylesheet + '"/>';
				}).join('') : '') +
				'</head><body' + (options.bodyClass ? ' class="' + options.bodyClass + '"' : '') + '>';
		}

		function getHtmlFooter(options) {
			return (options.scripts ? options.scripts.map(function(script) {
					return '<script src="' + script + '"></script>';
				}).join('') : '') +
				'</body></html>';
		}
	}
}
