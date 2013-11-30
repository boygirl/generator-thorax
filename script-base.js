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

  if (typeof this.options.coffee === 'undefined') {
    if (this.expandFiles('js/**/*.coffee').length > 0) { // choose cs if any cs files exist in js/
      this.options.coffee = true;
    }
    if (this.options.js) {
      this.options.coffee = false;
    }
  }
  this.env.options.coffee = this.options.coffee;

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

  // set the appPath where generated app files will be output to
  this.env.options.appPath = path.join(process.cwd(), 'js');
  // set the testPath, where generated test files will be output to
  this.env.options.testPath = path.join(process.cwd(), 'test');

  // TODO: write a test for this and then uncomment, also manually check it works
    // get appPath inside package.json, set when app was generated, useful
    // making sure the user is running generator from current working
    // directory(but not a perfect solution)
    // this.appName = JSON.parse(this.readFileAsString('package.json')).appName;
    // Check that appName and process.cwd() match to avoid errors when generating
    // outside the root of the app
    // if (this.appName != process.cwd()) {
    //   throw new Error('When using a sub generator, please make sure your in the root of your app\n' +
    //                   'If you are in the root of your app, please make sure the appName setting inside
    //                   package.json matches the name of your apps root directory\n' +
    //                   'or manually pass --skip-appPath-check to override');
    // }
};

util.inherits(Generator, yeoman.generators.NamedBase);

/**
 * Abstraction for `this.template(src, dest)` for use in sub generators
 *
 * - src is relative to templates/javascript or templates/coffeescript
 *   depedning on what is being output
 * - dest is relative to your-app-name/js/ and should not contain the
 *   .js or .coffee
 *
 */
Generator.prototype.appTemplate = function (src, dest) {
  // calculate the destination file, without extension via name given to generator
  var abstractDest = path.join(dest, this._.dasherize(this.name));

  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    path.join(this.env.options.appPath, abstractDest) + this.scriptSuffix
  ]);
};

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
