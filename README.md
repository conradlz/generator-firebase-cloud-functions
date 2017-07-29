# generator-firebase-cloud-functions

The Firebase Google Cloud Functions generator for [Yeoman](http://yeoman.io). This generator is intended to aid development within the [Firebase Google Cloud Functions](https://firebase.google.com/docs/functions/) project. It is designed to work within the top-level directory.


## Installation

First and foremost, you must have [Node.js](http://nodejs.org) and npm installed. If you don't have Node.js installed, please download and install the latest version.

You must also install Yeoman, if you don't have it installed already. To install Yeoman, you can run this command:

```
npm i -g yo
```

With Node.js and Yeoman installed, you can run this command:

```
npm i -g generator-firebase-cloud-functions
```

You must also install firebase tools and firebase-functions as per [Getting Started](https://firebase.google.com/docs/functions/get-started)

```
npm install firebase-functions@latest --save
npm install -g firebase-tools
```

Then you must initialize your project.

To initialize your project:

Run:

```
firebase login
```

Which will log you in via the browser and authenticate the firebase tool.

Then, go to your Firebase project directory.

Run:

```
firebase init functions
```

The tool gives you an option to install dependencies with npm. It is safe to decline if you want to manage dependencies in another way.

## Usage

The Yeoman generator currently supports the following commands:

### firebase-cloud-functions

If you want to create a new Firebase Google Cloud Functions Project, make sure you're in the top-level directory :

```
$ yo firebase-cloud-functions
```

You'll be prompted for information about your plugin and it will generate a `package.json` file, README, and source code for a stub project.

### firebase-cloud-functions:function

If you want to create a new Firebase Google Cloud Function, make sure you're in the top-level directory of an ESLint repo clone or an ESLint plugin and type:

```
$ yo firebase-cloud-functions:function
```

You'll be prompted for some information and then it will generate the files necessary for a new function, including the source file, a test file.

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
