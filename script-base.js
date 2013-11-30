/**
 * This class is inherited by all sub-generators.
 *
 * Inspired by similar file of the same name found in generator-angular
 *
 */

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  /**
   * Tell a sub generator being used in an existing application whether or not
   * to output js or .coffee files based on whether any .coffee files already
   * exist
   *
   * Override the auto detection if --js or --coffee are provided on command
   * line
   */

  // if (typeof this.options.coffee === 'undefined') {
  //   if (this.expandFiles('js/**/*.coffee').length > 0) { // choose cs if any cs files exist in js/
  //     this.options.coffee = true;
  //   }
  //   if (this.options.js) {
  //     this.options.coffee = false;
  //   }
  // }
  // this.env.options.coffee = this.options.coffee;

  /**
   * set path where templates will be looked for when using this.template,
   * this.copy or this.read
   */
  var sourceRoot = '/templates/javascript';
  var scriptSuffix = '.js';

  // sourceRoot and scriptSuffix modified when generating .coffee files
  if (this.env.options.coffee) {
   sourceRoot = '/templates/coffeescript';
   scriptSuffix = '.coffee';
  }

  this.scriptSuffix = scriptSuffix;
  this.sourceRoot(path.join(__dirname, sourceRoot));

  /**
   * Set the appame, appPath and testPath for all sub generators.
   */

  // try {
  //   this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  // } catch (e) {
  //   this.appname = path.basename(process.cwd());
  // }
  // this.appname = this._.slugify(this._.humanize(this.appname));

  // if (typeof this.env.options.appPath === 'undefined') {
  //   try {
  //     this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
  //   } catch (e) {}
  //   this.env.options.appPath = this.env.options.appPath || 'app';
  // }

  // if (typeof this.env.options.testPath === 'undefined') {
  //   try {
  //     this.env.options.testPath = require(path.join(process.cwd(), 'bower.json')).testPath;
  //   } catch (e) {}
  //   this.env.options.testPath = this.env.options.testPath || 'test/spec';
  // }

};

util.inherits(Generator, yeoman.generators.NamedBase);

//
// Generator.prototype.appTemplate = function (src, dest) {
//   yeoman.generators.Base.prototype.template.apply(this, [
//     src + this.scriptSuffix,
//     path.join(this.env.options.appPath, dest) + this.scriptSuffix
//   ]);
// };

// Generator.prototype.testTemplate = function (src, dest) {
//   yeoman.generators.Base.prototype.template.apply(this, [
//     src + this.scriptSuffix,
//     path.join(this.env.options.testPath, dest) + this.scriptSuffix
//   ]);
// };

// // a new method for generating test and source file at the same time
// Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, targetDirectory) {
//   this.appTemplate(appTemplate, path.join('js', targetDirectory, this.name));
//   this.testTemplate(testTemplate, path.join(targetDirectory, this.name));
// };
