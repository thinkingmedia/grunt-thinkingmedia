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

### Objectives

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
- Handle the generating of the `README.md` file and other such files.

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

The *index* task handles the creation of the `index.html` file. For most of my AngularJS projects this file is a static resource on the web server, but if you are generating your `index.html` file dynamically. This task can be skipped.

In your project's Gruntfile add a section named `index` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  index: {
    options: {
        data: {
            // custom template data
        },
    },
    dev: {
        options: {
            js: [
               // vendor files
            ],
            css: [
               // vendor CSS files
            ],
            // the source code for your AngularJS project
            include: {
                cwd: './www',
                src: [
                    'src/**/*.js',
                    '!**/*.Test.js',
                    '!**/*_test.js'
                ]
            },
        },
        src: './www/_index.html',
        dest: './www/index.html'
    },
    build: {
        options: {
            js: [
                '/js/my_app.min.js'
            ],
            css: [
                '/css/my_app.min.css'
            ],
        },
        src: './www/_index.html',
        dest: './build/index.html'
    }
  },
});
```

Each task target uses grunt's file mapping to locate the source of the template and the output for the generated result. It's important to only define 1 file as the source and 1 file as the destination for each sub-task. 

In the above example I've created two targets, one for *development* named `dev` and one for *production* named `build`. While these tasks will create the `index.html` file for both environments. They often have different requirements. For example; we want the production version of `index.html` to only load minified versions of the Javascript and CSS files. In the development version we want to load each vendor file separately, and also load the source code to our AngularJS project.
 
 When loading source code for AngularJS it's important to load each Javascript file in the correct order. Otherwise a file that defines a component for a module might be loaded before the file that defined the module itself. We solve this problem by assuming directory tree depth also defines load priority. Will Javascript files in a directory being loaded *before* files in a sub-directory.

### Options

#### options.data
Type: `Object`
Default value: `{}`

A list of key/value pairs that will be available as variables during template generations.

#### options.version
Type: `string|function|boolean`
Default value: `auto`

Adds a variable named `version` that can be used during template generation. By default, the variable reads the value found in `package.json`. Assign the value `false` to disable this feature, or use a custom function that returns the version value. 

#### options.js
Type: `string[]`
Default value: `[]`

An array of Javascript files to be included by the `index.html` file. This is where you load your Bower components and extra Javascript files.

### options.css
Type: `string[]`
Default value: `[]`

An array of CSS file to be included by the `index.html`. There is where you load your style sheets for Bower components, and the generated CSS created by SASS or Composer.

### options.include
Type: `glob`
Default value: `{}`

Used to define the name of the source code files that the `index.html` file should include. When the files are added to the `index.html` folder they are sorted by directory tree depth. With the shorter depth coming first in the list.

For more information of file matching in grunt: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically

### Usage Examples

#### Common Usage

Let's take the following project directory structure as an example, and note that many files are missing to keep the example simple.

```
    project
    |   Gruntfile.js
    |
    +---build
    |   |   index.html
    |   |
    |   +---js
    |   |   |   app.min.js
    |   |
    |   +---css
    |       |   normalize.min.css
    |       |   app.min.css
    |
    +---www
        |   _index.html
        |   index.html
        |
        +---bower_components
        |   |   jquery.js
        |   |   angular.js
        |   |   normalize.css
        |
        |---+css
        |   |
        |   +---App
        |       | app.css
        |
        +---src
            |
            +---App
                | app.js
                | app_test.js
                | app.scss
```

I've shown the location of the `index.html` files that will be generated, and the template file is named `project/www/_index.html`. The `app.css`, `app.min.css` and `app.min.js` files were created using other tasks.

In below example minified files are loaded from a CDN for the production environment, but full sources are loaded for development. All the Javascript files in the `project/www/src` folder are loaded using the `include` option only for development, but the minified `app.min.js` file is loaded for production.

```js
grunt.initConfig({
  index: {
    dev: {
        options: {
            js: [
                'bower_components/jquery.js',
                'bower_components/angular.js'
            ],
            css: [
                'bower_components/normalize.css',
                'css/App/app.css'
            ],
            include: {
                cwd: './www',
                src: [
                    'src/**/*.js',
                    '!**/*_test.js'
                ]
            },
        },
        src: './www/_index.html',
        dest: './www/index.html'
    },
    build: {
        options: {
            js: [
                'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
                'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js',
                'js/app.min.js'
            ],
            css: [
                'css/app.min.css'
            ]
        },
        src: './www/_index.html',
        dest: './build/index.html'
    }
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
<small>_This readme has been automatically generated by [readme generator](https://github.com/aponxi/grunt-readme-generator) on Fri Nov 20 2015 13:43:30 GMT-0500 (Eastern Standard Time)._</small>