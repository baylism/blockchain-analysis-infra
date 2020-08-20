#!/bin/bash

echo "Note: this doesn't stop everything properly yet... remember to kill any stagglers individually";

KAFKA=kafka_2.11-1.1.0

$KAFKA/bin/kafka-server-stop.sh config/server.properties;
$KAFKA/bin/zookeeper-server-stop.sh config/zookeeper.properties;

# tmux kill-session -t kafka-start
