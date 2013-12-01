/* global describe, beforeEach, it, before */
var path    = require('path');
var chai = require('chai');
var expect = chai.expect;
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var sharedExamples = require('./shared-examples');

var assert = chai.assert;

helpers.assertNoFile = function (file, reg) {
  var here = fs.existsSync(file);
  assert.ok(!here, file + ' DOES exist, something is wrong');

  if (!reg) {
    return assert.ok(!here);
  }

  var body = fs.readFileSync(file, 'utf8');
  assert.ok(!reg.test(body), file + ' DID MATCH, HOLD THE PHONE: match \'' + reg + '\'.');
};


helpers.assertFileHasNoContent = function(file, reg) {
  var here = fs.existsSync(file);
  assert.ok(here, file + ' does exist, we expected that');

  if (!reg) {
    return assert.fail('You must provide content via regex for this helper');
  }

  var body = fs.readFileSync(file, 'utf8');
  assert.ok(!reg.test(body), file + ' DID MATCH, STAHP!, control flow the following content or fix the test: match \'' + reg + '\'.');
};

function requireOption(option, message) {
  if (typeof option === 'undefined') { throw new Error(message); }
  return option;
};

// TODO: refactor all the above noise into test-setup.js, use for all test files


describe('Test testing setup for generated applications', function () {

  sharedExamples.create('files included with js or cs apps', function () {
    it('generates an app that supports testing with karma', function () {
      helpers.assertFiles([
        'karma.conf.js',
        'tasks/options/karma.js',
        ['package.json', /"karma"/],
        ['package.json', /"karma-mocha"/],
        ['package.json', /"grunt-karma"/],
        ['package.json', /"karma-safari-launcher"/]
      ]);
    });
    it('generates an app that supports testing with phantomjs', function () {
      helpers.assertFiles([
        'tasks/options/mocha_phantomjs.js',
        ['package.json', /"mocha-phantomjs"/],
        ['package.json', /"phantomjs"/],
        ['package.json', /"grunt-mocha-phantomjs"/]
      ]);
    });
    it('generates a test directory setup with requirejs', function () {
      helpers.assertFiles([
        'test/index.html',
        'test/main.js',
        'test/main.karma.js',
        'test/collections/.gitkeep',
        'test/fixtures/.gitkeep',
        'test/helpers/.gitkeep',
        'test/models/.gitkeep',
        'test/routers/.gitkeep',
        'test/utils/.gitkeep',
        'test/views/.gitkeep'
      ]);
    });
    it('generates bower with right dependencies', function () {
      helpers.assertFiles([
        ['bower.json', /"fixtures"/],
        ['bower.json', /"mocha"/],
        ['bower.json', /"chai"/],
        ['bower.json', /"sinon"/],
        ['bower.json', /"sinon-chai"/]
      ]);
    });
    it('provides support for travis ci out of the box', function () {
      helpers.assertFile('.travis.yml');
    });
    it('provides example fixtures', function () {
      helpers.assertFiles([
        'test/fixtures/adding-machine.hbs',
        'test/fixtures/get-excited.hbs'
      ]);
    });
    it('generates setup files', function () {
      helpers.assertFiles([
        'test/test-setup-all.js',
        'test/test-setup-browser.js'
      ]);
    });
  });

  beforeEach(function (done){
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) { return done(err); }

      this.app = helpers.createGenerator('thorax:app', ['../../app'], 'test');
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'newDirectory': false,
        'starterApp': "None",
        'styleProcessor': "none",
        'features': this.features || [],
      });

      this.app.run({}, done);
    }.bind(this));
  });

  describe('when choosing javascript', function () {
    before(function() { this.features = []; });

    sharedExamples.invoke('files included with js or cs apps');

    it('generates some example tests to help when getting started', function () {
      helpers.assertFiles([
        'test/app.spec.js',
        ['test/views/root.spec.js', /\['views\/root'\]/]
      ]);
    });

    it('shows examples of how to use helpers with fixtures', function () {
      helpers.assertFiles([
        'test/helpers/helpers.spec.js',
        'test/helpers/view-helpers.spec.js',
      ]);
    });

    it('generates test/test-setup-browser to require js spec files', function () {
      var file = 'test/test-setup-browser.js';

      helpers.assertFiles([
        [file, /'.\/app\.spec'/],
        [file, /'.\/views\/root.spec'/],
        [file, /'.\/helpers\/helpers.spec'/],
        [file, /'.\/helpers\/view-helpers.spec'/],
      ]);
    });
  });

  describe('when choosing CS', function () {
    before(function() { this.features = ['includeCoffeeScript']; });
    sharedExamples.invoke('files included with js or cs apps');

    it('generates example tests to help when getting started', function () {
      helpers.assertFiles([
        'test/app.spec.coffee',
        ['test/views/root.spec.coffee', /'cs!views\/root'/]
      ]);
    });

    it('generates examples of how to use helpers with fixures', function () {
      helpers.assertFiles([
        'test/helpers/helpers.spec.coffee',
        'test/helpers/view-helpers.spec.coffee',
      ]);
    });

    it('generates test/test-setup-browser to require coffee spec files', function () {
      var file = 'test/test-setup-browser.js';

      helpers.assertFiles([
        [file, /'cs!.\/app\.spec'/],
        [file, /'cs!.\/views\/root.spec'/],
        [file, /'cs!.\/helpers\/helpers.spec'/],
        [file, /'cs!.\/helpers\/view-helpers.spec'/],
      ]);
    });

  });
});

describe('Test testing setup for sub generator output', function () {
  // TODO
});