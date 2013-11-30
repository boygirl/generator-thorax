'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var CollectionViewGenerator = module.exports = function CollectionViewGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));
};

util.inherits(CollectionViewGenerator, yeoman.generators.NamedBase);

CollectionViewGenerator.prototype.files = function files() {
  // next line same as view/index.js but prefer minimal duplication over inheritance
  this.write('js/templates/' + this._.dasherize(this.name) + '.hbs', '');

  // files specific to collection view
  this.template('collection-view.js', path.join('js/views', this._.dasherize(this.name) + '.js'));
  this.write('js/templates/' + this._.dasherize(this.name) + '-item.hbs', '');
  this.write('js/templates/' + this._.dasherize(this.name) + '-empty.hbs', '');
};
