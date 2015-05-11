#!/bin/bash

# Nagios Plugin check_file_exists.sh
# This script checks to see if a file exists.
#
# greets to http://geekpeek.net/nagios-plugin-bash/


# Check for missing parameters
if [[ -z "${1}" ]]; then
        echo "Missing parameter! Syntax: ./check_file_exists.sh FILE"
        exit 2
fi

file="${1}"


# Check for file existance
if [[ -a "${file}" ]]; then
        echo "OK - File ${file} exists"
        exit 0
else
        echo "CRITICAL - File ${file} not found"
        exit 2
fi