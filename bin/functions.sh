#!/bin/bash
#
# Echo a heading
#
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
