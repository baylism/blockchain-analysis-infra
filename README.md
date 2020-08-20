# chain-dock
Blockchain clients in docker

TODO: this file contains general notes from a university project in 2018. Needs tidying up. 

## Command QR

```bash
kubectl get nodes

kubectl describe service
kubectl describe deployment

az aks browse --resource-group chain-dock --name chain-dock-cluster
```


## Create a docker image

### Client build

### Configuration
- a single configuration file format should be consistent across all blockchain clients (utils/client-config.yaml and utils/update-configfile.sh)
- client-specific config files are generated from this

Fields:
- data directory
- rpc username
- rpc password
- rpc port
- rpc accept IP

### Expose ports in the container to the host
- rest 

## Running the container
### zcash 
``` bash
docker build -t zd .
docker run -p4321:8232 zd


curl --user zcashuser1:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawtransaction", "params": ["851bf6fbf7a976327817c738c489d7fa657752445430922d94c983c0b9ed4609", 1] }' -H 'content-type: text/plain;' http://127.0.0.1:9998/

curl --user zcashuser1:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getrawmempool", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9998/

curl --user zcashuser1:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getmempoolinfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9998/

curl --user zcashuser1:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9998/

curl --user zcashuser1:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getbestblockhash", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:9998/

curl --user zcashuser1:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockhash", "params": [1] }' -H 'content-type: text/plain;' http://127.0.0.1:9998/

```

### dash

``` bash
docker build -t ds .
docker run -p9998:9998 ds
curl --user dashuser1:password --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://localhost:9998/
```

## Deployment

Eventually, this project aims to support multiple deployment routes:
1. Local dev e.g. mikikube
2. Azure/GKE container instances with no external storage (for testing)
3. Azure/GKE container instances with Azure file share to persist data


### Deploying in Kubernetes

#### Background on persistent storage
Blockchains store a lot of data on disk. Initial downloading and validation of blockchain data is both slow and resource heavy, meaning any deployment of blockchain clients must have a way of persisting blockchain data across client updates and crashes. 

`Volumes` act as resources in a cluster and can be mounted in a container. Normally, their lifespan is tied to the pod. 

`Persistent volumes` provide an abstraction over volumes to help the deployment of stateful applications. They are not tied to a particular deployment and must be declared separately accessed with *claims*. Deployments using the persistent volume should not care about the implementation, meaning it can be customised (to optimise for speed, replication etc) with a *storage class*.

Persistent volume usage:
1. Provisioning
With *dynamic provisioning*, a claim is made using a storage class the the volume is created when needed. *Static provisioning* means the storage is allocated ahead of time and available to be claimed. 

2. Binding
A *master* keeps track of volume and listens for new claims. If a persistent volume matches the claim, the amount of storage requested is bound exclusively to the claimer with the permissions requested. 

3. Mounting
Volumes are mounted in the specified location and for deployments in the pod. 

4. Deleting
When a deployment is finished with the volume it deleted the PVC and the *reclaim policy* is activated to delete, recycle or retain the data. This is dependent on the type of storage backing the volume and the configuration options available for it. 

#### Storage
We use dynamic creation based on a Storage Class. This introduces some flexibility in choice of hardware/service backing the persistent volume. 


Create a storage account:

```bash
$ az resource show --resource-group chain-dock --name chain-dock-cluster --resource-type Microsoft.ContainerService/managedClusters --query properties.nodeResourceGroup -o tsv
MC_chain-dock_chain-dock-cluster_northeurope
```


Create a storage account associated with the resource group:

```bash
$ az storage account create --resource-group MC_chain-dock_chain-dock-cluster_northeurope --name chaindockstorage --location northeurope --sku Standard_LRS
``` 

Create storage class:

```bash
$ kubectl apply -f azure-file-storageClass.yaml
storageclass.storage.k8s.io/azurefile created
```

Mount an azure file share for that image
https://docs.microsoft.com/en-us/azure/container-instances/container-instances-volume-azure-files

Dynamic creation Azure files PV:
https://github.com/MicrosoftDocs/azure-docs/blob/master/articles/aks/azure-files-dynamic-pv.md

Static creation Azure files PV:
https://github.com/MicrosoftDocs/azure-docs/blob/master/articles/aks/azure-files-dynamic-pv.md


#### StatefulSets
A StatefulSet consists of three components:
1. a headless service
2. a StatefulSet describing deployment of the pods
3. a persistent volume template


### API

``` bash
kubectl delete configmaps rpc-config

kubectl create configmap rpc-config --from-env-file=rpc-config.properties

kubectl describe configmaps rpc-config

kubectl create configmap rpc-config --from-env-file=rpc-config.properties --dry-run -o yaml | kubectl replace -f -

```

Restarting pods on a change of configmap. Issue on github: https://github.com/kubernetes/kubernetes/issues/22368

Pods don't automatically restart when a configmap is changed. For testing purposes a restart can be forced by scaling the deployment to 0 and then back up. In production, the best approach will probably be to create a new configmap such as `kubectl create configmap rpc-config-1 --from-env-file=rpc-config.properties` and update the deployment `configMapRef` to the new configuration. This maintains uptime and means that if the new config is broken Kubernetes will prevent the update. 


### Design
StatefulSets:
1. zcash
2. dash

Headless services:
1. zcash-service
2. dash-service

Deployments:
1. bcmonitor
2. database

Services:
1. bcmonitor-service


# kafka

use kafka connect?