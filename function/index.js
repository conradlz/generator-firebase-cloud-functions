'use strict';

const Generator = require('yeoman-generator');
const file = require('file');
const path = require('path');
const yosay = require('yosay');
const chalk = require('chalk');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    this.log(chalk.yellow('Provide information about the function'));
    let done = this.async();

    let prompts = [{
      type: 'text',
      name: 'name',
      message: 'What is the name of your new function?',
      default: _.kebabCase(this.appname),
    }];

    this.prompt(prompts).then((answers) => {
      this.options.nameCamelCase = _.camelCase(answers.name);
      this.options.nameKebabCase = _.kebabCase(answers.name);
      done();
    });
  }

  writing() {
      this.log(this.options.nameKebabCase, this.options.nameCamelCase);
    // builds index.js main script
    this.fs.copyTpl(
      this.templatePath('src/_name.js'),
      this.destinationPath('functions/src/' + this.options.nameKebabCase + '.js'), {
        nameKebabCase: this.options.nameKebabCase,
        nameCamelCase: this.options.nameCamelCase
      }
    );

    // builds mocha
    this.fs.copyTpl(
      this.templatePath('test/_test.js'),
      this.destinationPath('functions/test/' + this.options.nameKebabCase + '.js'), {
        nameKebabCase: this.options.nameKebabCase,
        nameCamelCase: this.options.nameCamelCase
      }
    );

  }

};