FROM busybox as downloader

# from https://getmonero.org/downloads/#source
RUN wget https://downloads.getmonero.org/cli/linux64
RUN tar -xvjf linux64
RUN mv `ls | grep monero` binaries

FROM debian

COPY --from=downloader binaries .

# Make a directory on which to mount the persistent volume
RUN mkdir root/monerodata

# Create start script to check for PV mount
RUN echo "#!/bin/bash" > start.sh &&\
    echo "until mountpoint -q /root/monerodata/; do echo Waiting for persistent volume mount; sleep 1; done" >> start.sh &&\
    echo "./monerod --data-dir=/root/monerodata/ --config-file=/root/monerodata/bitmonero.conf --non-interactive" >> start.sh

EXPOSE 9998

CMD ["bash", "start.sh"]
# CMD ["bash"]

# docker run -p9998:9998 ds
# curl --user dashuser1:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://localhost:9998/