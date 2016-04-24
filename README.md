# grunt-thinkingmedia

[![Join the chat at https://gitter.im/thinkingmedia/grunt-thinkingmedia](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/thinkingmedia/grunt-thinkingmedia?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/thinkingmedia/grunt-thinkingmedia.png?branch=master)](http://travis-ci.org/thinkingmedia/grunt-thinkingmedia)

> Build tools for working on AngularJS projects.

[![NPM](https://nodei.co/npm/grunt-thinkingmedia.png)](https://nodei.co/npm/grunt-thinkingmedia/)

## Jump to Section

* [Overview](#overview)
* [Usage](#usage)
* [Config](#config)
* [Task SASS](#task-sass)
* [Task Watch](#task-watch)
* [Task Version](#task-version)
* [Task Increment](#task-increment)
* [Task Build](#task-build)
* [Task Index](#task-index)

## Overview
[[Back To Top]](#jump-to-section)

The goal for this project is to create a grunt library that makes it easy to maintain build scripts across multiple projects, and reduce the effort required to start
new projects.

## Usage
[[Back To Top]](#jump-to-section)

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-thinkingmedia --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile:

```js
grunt.loadNpmTasks('grunt-thinkingmedia');
```

### Config
[[Back To Top]](#jump-to-section)

The majority of the tasks in this library can be controlled by setting the `config` grunt setting.

Here are the default settings for `config`:

```js
    grunt.initConfig({
        config: {
            webroot: './www',
            build: './build',
            temp: './temp',
            src: [
                './www/src'
            ],
            templates: 'templates'
        }
    });
```

#### config.webroot

This is the location of the public web server folder.

#### config.build

This is where to place packaged files for deployment or distribution.

#### config.temp

A temp folder that is used to process template files.

#### config.src

This is a list of directories that contain both SASS and JS files. These directories will be expanded by sub-directory order to control the loading sequence of files.

#### config.templates

This is the name of the AngularJS module used to load HTML templates.

### Task SASS
[[Back To Top]](#jump-to-section)

To compile SASS files to CSS.

```shell
grunt sass
grunt sass:dev
```

To compile SASS files to the build directory.

```shell
grunt sass:build
```

### Task Watch
[[Back To Top]](#jump-to-section)

To watch fo changes to `*.sass` and `*.scss` files, and for adding/deleting `*.js` files.

```shell
grunt watch
```

The above will execute the `sass:dev` task, and the `index:dev` tasks when changes are made.

### Task Version
[[Back To Top]](#jump-to-section)

To output the current project version.

```shell
grunt version
grunt ver
```

### Task Increment
[[Back To Top]](#jump-to-section)

To increment the current version.

```shell
grunt increment
grunt inc
```

### Task Build
[[Back To Top]](#jump-to-section)

To perform all tasks related to the development environment.

```shell
grunt dev
grunt build:dev
```

To perform all tasks related to building the production environment or packaging.

```shell
grunt build
grunt build:prod
```


### Task Index
[[Back To Top]](#jump-to-section)

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
                    '!**/*.test.js'
                ]
            },
        },
        src: './www/_index.html',
        dest: './www/index.html'
    },
    prod: {
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

An array of Javascript files to be included by the `index.html` file. This is where you load your Bower components and extra Javascript files. This array contains URLs and not file paths.

### options.css
Type: `string[]`

Default value: `[]`

An array of CSS file to be included by the `index.html`. There is where you load your style sheets for Bower components, and the generated CSS created by SASS or Composer. This array contains URLs and not file paths.

### options.include
Type: `glob`

Default value: `{}`

Used to define the name of the source code files that the `index.html` file should include. When the files are added to the `index.html` folder they are sorted by directory tree depth. With the shorter depth coming first in the list.

Most of my projects have the source code located in `www/src` and can be loaded using the following options. The `cwd` option is used so that the URLs generated are relative to that folder.

```
    include: {
        cwd: './www',
        src: [
            'src/**/*.js'
        ]
    }
```

You can define a prefix string that is added before each URL generated. In the next example the source files are loaded from localhost on a specific port.

```
    include: {
        prefix: 'http://localhost:8000/',
        cwd: './www',
        src: [
            'src/**/*.js'
        ]
    }
```

The `include` option can also be an array to include source files from multiple locations.

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
    prod: {
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
