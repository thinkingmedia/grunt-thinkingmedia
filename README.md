# grunt-thinkingmedia

[![Join the chat at https://gitter.im/thinkingmedia/grunt-thinkingmedia](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/thinkingmedia/grunt-thinkingmedia?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/thinkingmedia/grunt-thinkingmedia.png?branch=master)](http://travis-ci.org/thinkingmedia/grunt-thinkingmedia)

This grunt project is maintained by [ThinkingMedia](http://www.thinkingmedia.ca). It is the main build script used to compile the resources used by [ahTag.com](http://www.ahtag.com).

[![NPM](https://nodei.co/npm/grunt-thinkingmedia.png)](https://nodei.co/npm/grunt-thinkingmedia/)

## Jump to Section

* [Overview](#overview)
* [Usage](#usage)
* [Config](#config)
* [Tasks](#tasks)
* [Build](#build)
* [Index](#index)
* [SASS](#sass)
* [Watch](#watch)
* [Version](#version)
* [Increment](#increment)
* [Help](#help)
* [Bugs & Feedback](#bugs--feedback)
* [License](#license)

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

This is the folder that will be created when the `build.prod` task is executed. This is the main artifact created by the build script for deployments.

#### config.temp

A temp folder that is used to during the build process. It should not be used by any other process.

#### config.src

This is a list of directories that contain both SASS and JS files. These directories will be expanded by sub-directory order to control the loading sequence of files.

#### config.templates

This is the name of the AngularJS module used to load HTML templates. The HTML files are taken from the above `config.src` locations.

## Tasks
[[Back To Top]](#jump-to-section)

There are three main tasks associated with building files (`build`, `sass` and `index`). There are extra utility tasks like `version` that help you manage
a project, and you can read more details about those tasks below.

### Build
[[Back To Top]](#jump-to-section)

This is the default task that is executed when you run `grunt` without any parameters. It will execute the `build:prod` task to create the
build artifacts in the build folder. The build task can perform two types of builds, the `prod` (short for production) for output artifacts, and
the `dev` (short for development) for updating files used during development.

- The task `dev` is an alias for `build:dev`
- The task `prod` is an alias for `build:prod`
- The task `build` is an alias for `build:prod`

You can not execute both `build:dev` and `build:prod` at the same time, because there can be collision on files that
are updated by both. For example; `index.html` might be written differently for development and production.

Developers do not build artifacts but instead work from the webroot folder. They need to have SASS files compiled and the `index.html` file updated. To
update the webroot manually, you would execute `build:dev` like this.

```shell
grunt dev
```

To build the deployment artifacts to the build folder. You would execute `build:prod` like this.

```shell
grunt
```

### Index
[[Back To Top]](#jump-to-section)

The `index` task handles the updating of the `index.html` file. There are 4 pieces of data that are injected into the index template.

- Custom template variables
- A list of JavaScript files (usually vendor files)
- A list of CSS files (your compiled CSS file, plus vendor CSS files)
- A list of JavaScript files from the developers source code folder

Here is an example configuration:

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

Each task target uses grunt's file mapping to locate the source of the template and the output for the generated result. It's important to only define 1
file as the source and 1 file as the destination for each sub-task.

In the above example I've created two targets, one for *development* named `dev` and one for *production* named `build`. While these tasks will
create the `index.html` file for both environments. They often have different requirements. For example; we want the production version of `index.html`
to only load minified versions of the Javascript and CSS files. In the development version we want to load each vendor file separately, and also load the
source code to our AngularJS project.

When loading source code for AngularJS it's important to load each Javascript file in the correct order. Otherwise a file that defines a component for a
module might be loaded before the file that defined the module itself. We solve this problem by assuming directory tree depth also defines load priority.
Will Javascript files in a directory being loaded *before* files in a sub-directory.

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

### SASS
[[Back To Top]](#jump-to-section)

SASS files have to be located in the `config.src` directories. This task compiles those files into CSS files. It is executed as part of the `build` task.

To compile the SASS files to CSS folder in the webroot (as part of `build:dev`).

```shell
grunt sass
grunt sass:dev
```

To compile SASS files to the build directory (as part of `build:prod`).

```shell
grunt sass:build
```

### Watch
[[Back To Top]](#jump-to-section)

This is a developer utility task that watches for changes to files in the `config.src` directories. It watches for changes to SASS, JavaScript and
the `index.html` file. When a chance is detected to SASS files that `sass:dev` task is executed, and when changes to JavaScript files is detected
the `index:dev` task is executed.

```shell
grunt watch
```

> This task features a beep indicator that is sounded when compiling is finished.

### Version
[[Back To Top]](#jump-to-section)

To output the current project version.

```shell
grunt version
grunt ver
```

### Increment
[[Back To Top]](#jump-to-section)

To increment the current version.

```shell
grunt increment
grunt inc
```

### Help
[[Back To Top]](#jump-to-section)

There are many child tasks included in this project that perform a specific things, and some of those are outside the scope of the README. You can
list all tasks and a description of their usage by executing the `help` task.

```shell
grunt help
```

## Bugs & Feedback
[[Back To Top]](#jump-to-section)

http://github.com/thinkingmedia/grunt-thinkingmedia/issues

## License
[[Back To Top]](#jump-to-section)

Copyright (c) 2015, ThinkingMedia and licensed under [The MIT License](http://www.opensource.org/licenses/mit-license.php).
