'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.files = function files() {
  // next line same as view/index.js but prefer minimal duplication over inheritance
  this.write('js/templates/' + this._.dasherize(this.name) + '.hbs', '');

  // files specific to collection view
  this.appTemplate('collection-view', 'views');
  this.write('js/templates/' + this._.dasherize(this.name) + '-item.hbs', '');
  this.write('js/templates/' + this._.dasherize(this.name) + '-empty.hbs', '');
};
