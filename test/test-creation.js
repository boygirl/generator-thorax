/* global describe, beforeEach, it */
var path    = require('path');
var chai = require('chai');
var expect = chai.expect;
var helpers = require('yeoman-generator').test;

describe('thorax generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': false,
        'starterApp': "None",
        'styleProcessor': "none",
        'includeBootstrap': false,
        'includeCoffeeScript': false
      });

      this.app.run({}, done);
    }.bind(this));
  });

  it('every generator can be required without throwing', function () {
    require('../app');
    require('../collection');
    require('../collection-view');
    require('../helper');
    require('../model');
    require('../router');
    require('../view');
    require('../view-helper');
  });

  it('creates expected files', function (done) {
    var expected = [
      '.jshintrc',
      '.editorconfig',
      ['bower.json', /"name": "test"/g],
      ['package.json', /"name": "test"/g],
      'Gruntfile.js',
      'js/views',
      'js/models',
      'js/collections',
      ['js/view.js', /Thorax.View.extend\(\{/],
      ['js/model.js', /Thorax.Model.extend\(\{/],
      ['js/collection.js', /Thorax.Collection.extend\(\{/],
      'public/index.html',
      'css/base.css',
      'tasks/ensure-installed.js'
    ];

    helpers.assertFiles(expected);
    done();
  });

  describe('Thorax Router', function () {
    it('generates a Backbone router', function (done) {
      var router = helpers.createGenerator('thorax:router', ['../../router'], ['foo']);

      helpers.mockPrompt(router, {
        'useStubMethods': false
      });

      router.run([], function () {
        helpers.assertFiles([
          ['js/routers/foo.js', /Backbone.Router.extend\(\{/]
        ]);
        done();
      });
    });

    it('generates a Backbone router with stubbed methods', function (done) {
      var router = helpers.createGenerator('thorax:router', ['../../router'], ['foo']);

      helpers.mockPrompt(router, {
        'useStubMethods': true
      });

      router.run([], function () {
        helpers.assertFiles([
          ['js/routers/foo.js', /initialize: function/]
        ]);
        done();
      });
    });
  });

  describe('Thorax View', function () {
    it('generates a Thorax view', function (done) {
      var view = helpers.createGenerator('thorax:view', ['../../view'], ['foo']);

      helpers.mockPrompt(view, {
        'useStubMethods': false
      });

      view.run([], function () {
        helpers.assertFiles([
          ['js/views/foo.js', /View.extend\(\{/],
          ['js/views/foo.js', /name: 'foo'/],
          'js/templates/foo.handlebars'
        ]);
        done();
      });
    });

    it('generates a Thorax view with stubbed methods', function (done) {
      var view = helpers.createGenerator('thorax:view', ['../../view'], ['foo']);

      helpers.mockPrompt(view, {
        'useStubMethods': true
      });

      view.run([], function () {
        helpers.assertFiles([
          ['js/views/foo.js', /initialize: function/]
        ]);
        done();
      });
    });
  });

  describe('Thorax Model', function () {
    it('generates a Thorax model', function (done) {
      var model = helpers.createGenerator('thorax:model', ['../../model'], ['foo']);

      helpers.mockPrompt(model, {
        'useStubMethods': false
      });

      model.run([], function () {
        helpers.assertFiles([
          ['js/models/foo.js', /Model.extend\(\{/],
          ['js/models/foo.js', /name: 'foo'/]
        ]);
        done();
      });
    });

    it('generates a Thorax model with stubbed methods', function (done) {
      var model = helpers.createGenerator('thorax:model', ['../../model'], ['foo']);

      helpers.mockPrompt(model, {
        'useStubMethods': true
      });

      model.run([], function () {
        helpers.assertFiles([
          ['js/models/foo.js', /initialize: function/]
        ]);
        done();
      });
    });
  });

  describe('Thorax Collection', function () {
    it('generates a Thorax collection', function (done) {
      var collection = helpers.createGenerator('thorax:collection', ['../../collection'], ['foo']);

      helpers.mockPrompt(collection, {
        'useStubMethods': false
      });

      collection.run([], function () {
        helpers.assertFiles([
          ['js/collections/foo.js', /Collection.extend\(\{/],
          ['js/collections/foo.js', /name: 'foo'/]
        ]);
        done();
      });
    });

    it('generates a Thorax collection with stubbed methods', function (done) {
      var collection = helpers.createGenerator('thorax:collection', ['../../collection'], ['foo']);

      helpers.mockPrompt(collection, {
        'useStubMethods': true
      });

      collection.run([], function () {
        helpers.assertFiles([
          ['js/collections/foo.js', /initialize: function/]
        ]);
        done();
      });
    });
  });

  describe('Thorax Collection View', function () {
    it('generates a Thorax collection view', function (done) {
      var collectionView = helpers.createGenerator('thorax:collection-view', ['../../collection-view'], ['fooBar']);

      helpers.mockPrompt(collectionView, {
        'useStubMethods': false
      });

      collectionView.run([], function () {
        helpers.assertFiles([
          ['js/views/foo-bar.js', /CollectionView.extend\(\{/],
          ['js/views/foo-bar.js', /name: 'fooBar'/],
          'js/templates/foo-bar.handlebars',
          'js/templates/foo-bar-item.handlebars',
          'js/templates/foo-bar-empty.handlebars'
        ]);
        done();
      });
    });
  });

  describe('Thorax Helper', function () {
    it('generates a Handlebars helper', function (done) {
      var helper = helpers.createGenerator('thorax:helper', ['../../helper'], ['foo']);

      helper.run([], function () {
        helpers.assertFiles([
          ['js/templates/helpers/foo.js', /Handlebars.registerHelper\('foo', foo/]
        ]);
        done();
      });
    });
  });

  describe('Thorax View Helper', function () {
    it('generates a Handlebars view helper', function (done) {
      var viewHelper = helpers.createGenerator('thorax:view-helper', ['../../view-helper'], ['foo']);

      viewHelper.run([], function () {
        helpers.assertFiles([
          ['js/helpers/foo.js', /Handlebars.registerViewHelper\('foo', function/]
        ]);
        done();
      });
    });
  });

  describe('CoffeeScript', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': true,
          'starterApp': "None",
          'styleProcessor': "none",
          'includeBootstrap': false,
          'includeCoffeeScript': true
        });

        this.app.run({}, done);
      }.bind(this));
    });

    it('generates CoffeeScript templates when requested', function (done) {
      helpers.assertFiles([
        'js/views',
        'js/models',
        'js/collections',
        'js/views/root.coffee',
        ['js/view.coffee', /class View extends Thorax.View/],
        ['js/model.coffee', /class Model extends Thorax.Model/],
        ['js/collection.coffee', /class Collection extends Thorax.Collection/],
        ['js/collection-view.coffee', /class CollectionView extends Thorax.CollectionView/],
        ['js/layout-view.coffee', /class LayoutView extends Thorax.LayoutView/]
      ]);
      done();
    });
  });

  describe('CoffeeScript - HelloWorld', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': true,
          'starterApp': "Hello World",
          'styleProcessor': "none",
          'includeBootstrap': false,
          'includeCoffeeScript': true
        });

        this.app.run({}, done);
      }.bind(this));
    });

    it('generates CoffeeScript templates when requested', function (done) {
      helpers.assertFiles([
        'js/views',
        'js/models',
        'js/collections',
        'js/views/root.coffee',
        'js/routers/hello-world.coffee',
        'js/views/hello-world/index.coffee',
        ['js/view.coffee', /class View extends Thorax.View/],
        ['js/model.coffee', /class Model extends Thorax.Model/],
        ['js/collection.coffee', /class Collection extends Thorax.Collection/],
        ['js/collection-view.coffee', /class CollectionView extends Thorax.CollectionView/],
        ['js/layout-view.coffee', /class LayoutView extends Thorax.LayoutView/]
      ]);
      done();
    });
  });

  describe('CoffeeScript - Todo List', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': true,
          'starterApp': "Todo List",
          'styleProcessor': "none",
          'includeBootstrap': false,
          'includeCoffeeScript': true
        });

        this.app.run({}, done);
      }.bind(this));
    });

    it('generates CoffeeScript templates when requested', function (done) {
      helpers.assertFiles([
        'js/views',
        'js/models',
        'js/collections',
        'js/views/root.coffee',
        'js/routers/todo-list.coffee',
        'js/views/todo-list/index.coffee',
        ['js/view.coffee', /class View extends Thorax.View/],
        ['js/model.coffee', /class Model extends Thorax.Model/],
        ['js/collection.coffee', /class Collection extends Thorax.Collection/],
        ['js/collection-view.coffee', /class CollectionView extends Thorax.CollectionView/],
        ['js/layout-view.coffee', /class LayoutView extends Thorax.LayoutView/]
      ]);
      done();
    });
  });

  describe('Style Processors', function(){

    beforeEach(function (done){
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) { return done(err); }

        this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
        this.app.options['skip-install'] = true;

        helpers.mockPrompt(this.app, {
          'newDirectory': false,
          'starterApp': "None",
          'styleProcessor': this.styleOption,
          'includeBootstrap': false,
          'includeCoffeeScript': false
        });

        this.app.run({}, done);
      }.bind(this));
    });

    describe('SASS', function () {
      before(function () {
        this.styleOption = "sass";
      });

      it('is included when selected in the prompt', function (done) {
        helpers.assertFiles([
          ['Gruntfile.js', /sass: \{/],
          ['package.json', /grunt-contrib-sass/]
        ]);
        done();
      });
    });

    describe('LESS', function () {
      before(function () {
        this.styleOption = "less";
      });

      it('is included when selected in the prompt', function (done) {
        helpers.assertFiles([
          ['Gruntfile.js', /less: \{/],
          ['package.json', /grunt-contrib-less/]
        ]);
        done();
      });
    });

    describe('Stylus', function () {
      before(function () {
        this.styleOption = "stylus";
      });

      it('is included when selected in the prompt', function (done) {
        helpers.assertFiles([
          ['Gruntfile.js', /stylus: \{/],
          ['package.json', /grunt-contrib-stylus/]
        ]);
        done();
      });
    });
  });
});