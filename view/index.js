'use strict';
var util = require('util');
var path = require('path');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.files = function files() {
  this.template('view.js', path.join('js/views', this._.dasherize(this.name) + '.js'));
  this.write('js/templates/' + this._.dasherize(this.name) + '.hbs', '');
};
