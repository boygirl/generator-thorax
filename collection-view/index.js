var util          = require('util');
var path          = require('path');
var ViewGenerator = require('../old-view');

var CollectionViewGenerator = module.exports = function () {
  ViewGenerator.apply(this, arguments);
};

util.inherits(CollectionViewGenerator, ViewGenerator);

CollectionViewGenerator.prototype._name  = 'collection view';
CollectionViewGenerator.prototype.askFor = ViewGenerator.prototype.askFor;

CollectionViewGenerator.prototype.createCollectionView = function () {
  this.createView();
  this.write('js/templates/' + this._.dasherize(this.name) + '-item.hbs', '');
  this.write('js/templates/' + this._.dasherize(this.name) + '-empty.hbs', '');
};
