'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.files = function files() {
  this.template('model.js', path.join('js/models', this._.dasherize(this.name) + '.js'));
};
