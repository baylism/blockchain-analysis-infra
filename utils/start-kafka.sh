#!/bin/bash

KAFKA=kafka_2.11-1.1.0
TOPIC=blocks


tmux kill-session -t kafka-start
tmux new-session -d -s "kafka-start"
#tmux rename-window -t 1 kafka-start

# Setup a panes to run the zookeeper and kafka servers
tmux split-window -h
tmux split-window -v
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v

# Start zookeeper
tmux select-pane -t 3
tmux send-keys "$KAFKA/bin/zookeeper-server-start.sh $KAFKA/config/zookeeper.properties" C-m

# Start kafka server
tmux select-pane -t 4
tmux send-keys "$KAFKA/bin/kafka-server-start.sh $KAFKA/config/server.properties" C-m

# Create topics and verify
tmux select-pane -t 2
tmux send-keys "$KAFKA/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 6 --topic $TOPIC" C-m

tmux send-keys "$KAFKA/bin/kafka-topics.sh --list --zookeeper localhost:2181" C-m


# Create a command line consumer
tmux select-pane -t 1
tmux send-keys "$KAFKA/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic $TOPIC --from-beginning" C-m

# Create a command line producer
tmux select-pane -t 0
# tmux send-keys "$KAFKA/bin/kafka-verifiable-producer.sh --topic $TOPIC --max-messages 200000 --broker-list localhost:9092" C-m
tmux send-keys "$KAFKA/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic $TOPIC" C-m

tmux attach-session -t kafka-start

