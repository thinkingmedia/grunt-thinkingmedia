#!/bin/bash

source $(dirname $0)/functions.sh

if [ ! -d build ]; then
    die "Build folder does not exist."
fi

#
# Arguments
#
while getopts ":u:a:i:p:f:" opt; do
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
        f)
            FILE_PREFIX=$OPTARG
            say "File prefix: ${FILE_PREFIX}"
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

    if [ "${FILE_PREFIX}" == "" ]; then
        FILE_PREFIX = 'build'
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

FILENAME=${FILE_PREFIX}-`date '+%Y%m%d%H%M%S'`
say "Create deployment package: ${FILENAME}.tar.gz"
try tar -zcf ${FILENAME}.tar.gz build
try rm -fr build
try du -h ${FILENAME}.tar.gz

#
# Do deployment
#
if [ -f deploy.sh ]; then
    say "Copying to other server"
    try scp -i ${DEPLOY_KEY} ${FILENAME}.tar.gz ${DEPLOY_USER}@${DEPLOY_ADDRESS}:${DEPLOY_PATH}/${FILENAME}.tar.gz

    say "CONNECT::SSH -> ${DEPLOY_USER}@${DEPLOY_ADDRESS}"

    #try ssh -i ${DEPLOY_KEY} ${DEPLOY_USER}@${DEPLOY_ADDRESS} "tar -xf ${FILENAME}.tar.gz -C ${FILENAME} && cd ${FILENAME} && sudo ./deploy.sh"
    try ssh -i ${DEPLOY_KEY} ${DEPLOY_USER}@${DEPLOY_ADDRESS} << EOF
        tar -xvf ${FILENAME}.tar.gz -C ${FILENAME};
        cd ${FILENAME};
        ls -lah;
EOF
    say "DISCONNECT::SSH -> ${DEPLOY_USER}@${DEPLOY_ADDRESS}"
else
    say "Missing deploy.sh"
fi

say "Build script has finished"
