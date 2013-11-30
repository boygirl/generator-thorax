'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.files = function files() {
  this.template('view.js', path.join('js/views', this._.dasherize(this.name) + '.js'));
  this.write('js/templates/' + this._.dasherize(this.name) + '.hbs', '');
};
