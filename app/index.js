'use strict';

const Generator = require('yeoman-generator');
const file = require('file');
const path = require('path');
const yosay = require('yosay');
const chalk = require('chalk');
const _ = require('lodash');

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve(__dirname + '/../function'));
  }
    // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  prompting() {
    this.log(yosay(chalk.yellow('Welcome. Enjoy the Firebase Cloud Functions Generator')));
    const done = this.async();

    const prompts = [{
      type: 'text',
      name: 'projectName',
      message: 'What is the name of this Firebase project?',
      default: _.kebabCase(this.appname)
    }, {
      type: 'text',
      name: 'projectDescription',
      message: 'What is the description for this project?'
    }, {
      type: 'list',
      name: 'babel',
      message: 'Choose if you want to use new babel transpiling',
      choices: ['true', 'false'],
      default: 'true',
      when: !this.options.babel
    }, {
      type: 'list',
      name: 'uglify',
      message: 'Choose if you want to use uglify js compression',
      choices: ['true', 'false'],
      default: 'true',
      when: !this.options.uglify
    }];

    this.prompt(prompts).then(answers => {
      this.options.babel = (answers.babel == 'true');
      this.options.uglify = (answers.uglify == 'true');
      this.options.projectName = answers.projectName;
      this.options.projectDescription = answers.projectDescription;
      done();
    });
  }

  writing() {
    let self = this;
    let functionsDir = 'functions/';
    let src = this.sourceRoot();

    // builds main export
    this.fs.copy(
      this.templatePath('main.js'),
      functionsDir + 'src/index.js'
    );

    // builds main export
    this.fs.copyTpl(
      this.templatePath('README.md'),
      'README.md',
      {
        projectName: this.options.projectName,
        projectDescription: this.options.projectDescription
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      'package.json',
      {
        projectName: this.options.projectName,
        projectDescription: this.options.projectDescription
      }
    );

    // builds .gitignore
    this.fs.copy(
      this.templatePath('gitignore'),
      functionsDir + '.gitignore'
    );

    file.walkSync(src, (dirPath, dirs, files) => {
     let relativeDir = path.relative(src, dirPath);

     files.forEach((filename) => {
       if (!/main.js|README.md|gitignore|package.json/.test(filename)) {
         let target = path.join(relativeDir, filename);
         self.fs.copy(this.templatePath(target), path.join(functionsDir, target));
       }
     });
    });
  }

  install() {
    let dependencies = [
      'firebase-functions',
      'firebase-admin',
      'mocha',
      'chai',
      'chai-as-promised',
      'sinon'
    ];

    // install babel if desired
    if (this.options.babel) {
      dependencies.push('babel-runtime');

      let devDependencies = [
        'babel-cli',
        'babel-plugin-transform-runtime',
        'babel-preset-latest',
      ];
      this.npmInstall(devDependencies, {
        saveDev: true
      });
    }

    // install the test functions and firebase functions
    this.npmInstall(dependencies, {
      save: true,
      prefix: 'functions'
    });

    // install the global dependencies
    let globalDependencies = [
      'babel-eslint@7',
      'eslint@3.x'
    ];

    if (this.options.uglify) {
      globalDependencies.push('uglify-js');
      globalDependencies.push('uglifyjs-folder');
    }

    this.npmInstall(globalDependencies, {
      global: true
    });
  }

};