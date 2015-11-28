# grunt-thinkingmedia 
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
            src: [
                './www/src'
            ]
        }
    });
```

#### config.webroot

This is the location of the public web server folder.

#### config.build

This is where to place packaged files for deployment or distribution.

#### config.src

This is a list of directories that contain both SASS and JS files. These directories will be expanded by sub-directory order to control the loading sequence of files.

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