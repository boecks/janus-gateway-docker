#!/bin/sh
service apache2 start
cd /opt/janus/bin
./janus --config=/opt/janus/etc/janus/janus.jcfg
