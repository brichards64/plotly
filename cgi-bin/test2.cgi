#!/bin/bash

echo `\'`
#echo `echo "select 'a'  || TO_CHAR(time, 'yyyy-mm-dd') ||'a' , null from connection;" |psql pi -t | sed s:a:\':g`
echo `echo "select TO_CHAR(time, 'yyyy-mm-dd hh24:mi:ss')  , null from connection order by time ASC;" |psql pi -t | sed s:a:\':g`
echo '@'
echo `echo "select latency, null from connection;" |psql pi -t`
echo '@'
echo `echo "select download, null from connection;" |psql pi -t`
echo '@'
echo `echo "select upload, null from connection;" |psql pi -t`
echo `\'`
