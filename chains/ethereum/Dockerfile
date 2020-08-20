FROM ubuntu

# Install dependencies
RUN apt-get update &&\
    apt-get install -y apt-transport-https software-properties-common &&\
    add-apt-repository -y ppa:ethereum/ethereum &&\
    apt-get update
    
# Instal geth
RUN apt-get install geth

# Make a directory on which to mount the persistent volume
RUN mkdir root/ethereumdata

# Create start script to check for PV mount
RUN echo "#!/bin/bash" > start.sh &&\
    echo "until mountpoint -q /root/ethereumdata/; do echo Waiting for persistent volume mount; sleep 1; done" >> start.sh &&\
    echo "geth -datadir=/root/ethereumdata" >> start.sh

EXPOSE 9998

CMD ["bash", "start.sh"]
