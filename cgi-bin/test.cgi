#!/bin/bash

echo `echo "select download from connection;" |psql pi -t| sed s:' ':',': `
