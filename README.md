# grunt-thinkingmedia 
[![Build Status](https://secure.travis-ci.org/thinkingmedia/grunt-thinkingmedia.png?branch=master)](http://travis-ci.org/thinkingmedia/grunt-thinkingmedia)

> Build tools for working on AngularJS projects.

[![NPM](https://nodei.co/npm/grunt-thinkingmedia.png)](https://nodei.co/npm/grunt-thinkingmedia/)

## Jump to Section

* [Overview](#overview)
* [Usage](#usage)

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

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-thinkingmedia');
```

You can start using this build tool with it's default settings by creating a Gruntfile that doesn't contain any config options.

```js
    module.exports = function (grunt) {
        grunt.loadNpmTasks('grunt-thinkingmedia');
    };
```
