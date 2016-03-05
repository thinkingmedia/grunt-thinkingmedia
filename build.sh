#!/bin/bash

######################################################################
# This is a generic build script that I use on my build servers. It
# allows me to share a common script among multiple projects.
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
# This will trigger a build failure if a command is missing.
#
say "Verify all dev tools are installed"
try mysql --version
try php --version
try composer --version
try node --version
try npm --version
try bower --version
try grunt --version
try sass --version
try compass -v
try git --version