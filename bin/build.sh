#!/bin/bash


######################################################################
#
# This is a generic build script that I use on my build servers. It
# allows me to share a common script among multiple projects.
#
# It can build the project, create a package, copy the package to
# a remote web server and deploy an update.
#
# Use at your own risk, because I might push updates to this script
# and that would impact your build process.
#
# This script was designed to be executed by a GitLab CI Runner.
#
######################################################################

source $(dirname $0)/functions.sh

#say "Verify all dev tools are installed"
#try mysql --version
#try git --version

say "Creating build folder"
if [ -d build ]; then
    try rm -fr build
fi
try mkdir build

#
# NodeJS
#
if [ -f package.json ]; then
    say "Install node_modules"
    try node --version
    try npm --version
    try rm -fr node_packages
    try npm install
fi

#
# Grunt
#
if [ -f Gruntfile.js ]; then
    say "Building grunt"
    try ruby -v
    try gem -v
    try sass --version
    try compass -v
    try grunt --version
    try grunt --verbose --debug dev
fi

#
# Bower
#
if [ -f bower.json ]; then
    say "Building bower"
    try bower --version
    try rm -fr www/bower
    try rm -fr webroot/bower
    try bower install --allow-root
fi

#
# PHP Composer
#
if [ -f composer.json ]; then
    say "Install composer"
    try php --version
    try composer --version
    try rm -fr vendor
    try composer install -n --profile

    say "Copy vendor modules"
    try cp -r vendor build

    #
    # CakePHP
    #
    if [ -d vendor/cakephp ]; then
        say "Copy CakePHP files to build"
        try cp -r config build
        try cp -r logs build
        try cp -r plugins build
        try cp -r src build
        try cp -r tmp build
    fi
fi

#
# Copy web
#
if [ -d www ]; then
    try cp -r www build
fi
if [ -d webroot ]; then
    try cp -r webroot build
fi
