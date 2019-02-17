# janus-gateway-docker

This repo can be used to run the Janus-Gateway from meetecho/janus-gateway in a docker container.

You can either deploy it using the dockerfile or the compose file.

Base OS is Ubuntu 16.04 and Janus will be pulled from the github repo during build.

Current supported Janus version is: 0.6.2


A demo webserver will be accessible on port 10080.

The admin API is running on port 7088.

The Janus API is accessible via http on port 8088/janus and via websocket on port 8188.
