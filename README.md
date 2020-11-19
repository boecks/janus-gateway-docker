# janus-gateway-docker

This repo can be used to run the Janus-Gateway from meetecho/janus-gateway in a docker container.

You can either deploy it using the dockerfile or the compose file.

Base OS is Ubuntu 20.04LTS and Janus will be pulled from the github repo during build.

Current supported Janus version is: 0.10.8


A demo webserver (Apache) is accessible on port 10080.

The admin API is running on port 7088.

The Janus API is accessible via http on port 8088/janus and via websocket on port 8188.

By default, only http and ws transport and the streaming plugin are enabled.
