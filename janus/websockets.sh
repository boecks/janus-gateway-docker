#!/bin/sh
cd ~
git clone https://libwebsockets.org/repo/libwebsockets
cd libwebsockets
# If you want the stable version of libwebsockets, uncomment the next line
git checkout v3.2-stable
mkdir build
cd build
# See https://github.com/meetecho/janus-gateway/issues/732 re: LWS_MAX_SMP
cmake -DLWS_MAX_SMP=1 -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_C_FLAGS="-fpic" ..
make && sudo make install