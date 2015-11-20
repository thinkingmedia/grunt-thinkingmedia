# grunt-thinkingmedia 
[![Build Status](https://secure.travis-ci.org/thinkingmedia/grunt-thinkingmedia.png?branch=master)](http://travis-ci.org/thinkingmedia/grunt-thinkingmedia)

> Build tools for working on AngularJS projects.

## Jump to Section

* [Overview](#overview)
* [Usage](#usage)
* [Index Task](#index-task)
* [Package Task](#package-task)

## Overview
[[Back To Top]](#jump-to-section)

The goal for this project is to create a grunt library that makes it easy to maintain build scripts across multiple projects, and reduce the effort required to start
new projects.

## Objectives

When you include this grunt library in your project it will handle the following build tasks for you, but it does require that you follow my preferences for folder
structures and file names. Which will be explained in more detail in the tasks sections.

Here is a short list of tasks this library automates:

- Generates the `index.html` file that imports the vendor JS/CSS files and your project's JS source code in the proper order.
- Pre-defined tasks for watching SASS/Composer source files for changes, and updating `index.html` when JS files are added/deleted.
- *Generate HTML documentation from your AngularJS source code.
- *Pre-defined tasks for unit test runners.
- *Incrementing version numbers and pushing releases to Git
- *Handle the updating of GitHub pages when a release is made.
- Handles the minifing of JavaScript, CSS and HTML templates.
- Simplifies the process of building the production ready release.

> * means not yet been implemented, but I'm working on it.

## Usage
[[Back To Top]](#jump-to-section)

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-thinkingmedia --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-thinkingmedia');
```


## Index Task
[[Back To Top]](#jump-to-section)

### Overview
In your project's Gruntfile, add a section named `thinkingmedia` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  thinkingmedia: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  thinkingmedia: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  thinkingmedia: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```


## Package Task
[[Back To Top]](#jump-to-section)

### Overview
In your project's Gruntfile, add a section named `thinkingmedia` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  thinkingmedia: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  thinkingmedia: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  thinkingmedia: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```




--------
<small>_This readme has been automatically generated by [readme generator](https://github.com/aponxi/grunt-readme-generator) on Fri Nov 20 2015 12:38:48 GMT-0500 (Eastern Standard Time)._</small>