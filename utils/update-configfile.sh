#!/bin/bash
kubectl create configmap $1 --from-env-file=$2 --dry-run -o yaml | kubectl replace -f -