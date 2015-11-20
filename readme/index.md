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
