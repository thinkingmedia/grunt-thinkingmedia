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