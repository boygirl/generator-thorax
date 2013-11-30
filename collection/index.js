'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path'); // duplication

var CollectionGenerator = module.exports = function CollectionGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates')); // duplication
};

util.inherits(CollectionGenerator, yeoman.generators.NamedBase);

CollectionGenerator.prototype.files = function files() {
  this.template('collection.js', path.join('js/collections', this._.dasherize(this.name) + '.js')); // duplication
};
