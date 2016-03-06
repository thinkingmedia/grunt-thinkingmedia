#!/bin/bash

source $(dirname $0)/functions.sh

if [ ! -d build ]; then
    die "Build folder does not exist."
fi

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
