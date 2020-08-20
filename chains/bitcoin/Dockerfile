FROM busybox as downloader

# from https://bitcoin.org/en/download
RUN wget https://bitcoin.org/bin/bitcoin-core-0.16.2/bitcoin-0.16.2-x86_64-linux-gnu.tar.gz
RUN mkdir extract &&\
    tar -xvzf `ls | grep bitcoin` -C extract
RUN mv extract/* extract/bitcoin-source

FROM debian

COPY --from=downloader extract .

# Make a directory on which to mount the persistent volume
RUN mkdir root/bitcoindata

# Create start script to check for PV mount
RUN echo "#!/bin/bash" > start.sh &&\
    echo "until mountpoint -q /root/bitcoindata/; do echo Waiting for persistent volume mount; sleep 1; done" >> start.sh &&\
    echo "./bitcoin-source/bin/bitcoind -datadir=/root/bitcoindata" >> start.sh

EXPOSE 9998

CMD ["bash", "start.sh"]
