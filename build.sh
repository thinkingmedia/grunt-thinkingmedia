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

# Echo a heading
say() {
    echo -e "\e[36m$0: ===========================\e[0m" >&1;
    echo -e "\e[36m$0: $*\e[0m" >&1;
    echo -e "\e[36m$0: ===========================\e[0m" >&1;
}

# Echo an error
yell() {
    echo "$0: $*" >&2;
}

# Echo and exit
die() {
    yell "$*";
    exit 111;
}

# Execute command if failure then exit
try() {
    echo -e "\e[36m$*\e[0m";
    "$@" || die "cannot $*";
}

#
# Arguments
#
while getopts ":u:a:i:p:" opt; do
    case ${opt} in
        u)
            DEPLOY_USER=$OPTARG
            say "User: ${DEPLOY_USER}"
            ;;
        a)
            DEPLOY_ADDRESS=$OPTARG
            say "Address: ${DEPLOY_ADDRESS}"
            ;;
        i)
            DEPLOY_KEY=$OPTARG
            say "Private key file: ${DEPLOY_KEY}"
            ;;
        p)
            DEPLOY_PATH=$OPTARG
            say "Remote path: ${DEPLOY_PATH}"
            ;;
        \?)
            die "invalid option: -$OPTARG"
            ;;
        :)
            die "Option -$OPTARG requires an argument."
            ;;
    esac
done

#
# Deploy.sh
#
if [ -f deploy.sh ]; then
    say "Deployment mode enabled"

    if [ "${DEPLOY_USER}" == "" ]; then
        die "User for remote server not set."
    fi

    if [ "${DEPLOY_ADDRESS}" == "" ]; then
        die "Address for remote server not set."
    fi

    if [ "${DEPLOY_KEY}" == "" ]; then
        die "SSH private key is required."
    fi

    if [ "${DEPLOY_PATH}" == "" ]; then
        die "Path required for remote server."
    fi
fi

#say "Verify all dev tools are installed"
#try mysql --version
#try git --version

say "Creating build folder"
try rm -fr build
try mkdir build

#
# NodeJS
#
if [ -f package.json ]; then
    say "Install node_modules"
    try node --version
    try npm --version
    try npm install
fi

#
# Grunt
#
if [ -f Gruntfile.json ]; then
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
    try bower install --allow-root
fi

#
# PHP Composer
#
if [ -f composer.json ]; then
    say "Install vendor modules"
    try php --version
    try composer --version
    try composer install -n --profile

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
        try cp -r wwwroot build
    fi

    say "Copy vendor modules"
    try cp -r vendor build
fi

#
# Deploy.sh
#
if [ -f deploy.sh ]; then
    say "Copy deploy.sh to build"
    try cp deploy.sh build/deploy.sh
    try chmod +x build/deploy.sh
fi

FILENAME=build-`date '+%Y-%m-%d-%H-%M'`-`uuidgen -t`.tar.gz
say "Create deployment package: ${FILENAME}"
try tar -zcf ${FILENAME} build
try rm -fr build

#
# Do deployment
#
if [ -f deploy.sh ]; then
    say "Copying to other server"
    try scp ${FILENAME} ${DEPLOY_USER}@${DEPLOY_ADDRESS}:${DEPLOY_PATH}/${FILENAME}
fi
