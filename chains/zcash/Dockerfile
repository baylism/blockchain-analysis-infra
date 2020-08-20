FROM debian

# Install dependencies
RUN apt-get update &&\
    apt-get install -y apt-transport-https \
        wget \
        gnupg \
        apt-utils

# Install ZCash binary for 64bit debian distributions
RUN wget -qO - https://apt.z.cash/zcash.asc | apt-key add - &&\
    echo "deb [arch=amd64] https://apt.z.cash/ jessie main" |  tee /etc/apt/sources.list.d/zcash.list &&\
    apt-get update && apt-get install -y zcash

# Fetch params
RUN zcash-fetch-params

# Make a directory on which to mount the persistent volume
RUN mkdir /root/zcashdata

# Create start script to check for PV mount
RUN echo "#!/bin/bash" > start.sh &&\
    echo "until mountpoint -q /root/zcashdata/; do echo Waiting for persistent volume mount; sleep 1; done" >> start.sh &&\
    echo "zcashd -datadir=/root/zcashdata" >> start.sh

EXPOSE 9998

CMD ["bash", "start.sh"]
