FROM ubuntu

# Add bitcoin repo to manager and update packages
RUN apt-get update &&\
    apt-get install -y software-properties-common apt-utils &&\
    add-apt-repository ppa:bitcoin/bitcoin &&\
    apt update -y &&\
    apt upgrade -y

# Install dependencies
RUN apt install -y build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils git libdb4.8-dev libdb4.8++-dev &&\
    apt install -y libboost-system-dev libboost-filesystem-dev libboost-chrono-dev libboost-program-options-dev libboost-test-dev libboost-thread-dev libzmq3-dev

# Create directory in which to clone/build
WORKDIR dashbuild

# Clone source
RUN git clone https://github.com/dashpay/dash.git
WORKDIR dash

# Build source
RUN ./autogen.sh &&\
    ./configure &&\
    make

# Install   
RUN make install

# Leave dash source folder
WORKDIR /root

# Make a directory on which to mount the persistent volume
RUN mkdir dashdata

# Create start script to check for PV mount
RUN echo "#!/bin/bash" > start.sh &&\
    echo "until mountpoint -q /root/dashdata/; do echo Waiting for persistent volume mount; sleep 1; done" >> start.sh &&\
    echo "dashd -datadir=/root/dashdata/" >> start.sh

EXPOSE 9998

CMD ["bash", "start.sh"]

# docker run -p9998:9998 ds
# curl --user dashuser1:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://localhost:9998/