const chai = require('chai');
const expect = chai.expect;
const <%= nameCamelCase %> = require('../dist/<%= nameKebabCase%>.js');

describe('<%= nameCamelCase %> works', function () {
  describe('maybe a bit more context here', function () {
    it('should run here few assertions', function () {

    });
  });
});
