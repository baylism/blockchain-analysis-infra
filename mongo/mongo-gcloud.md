
# Size estimate

1000 blocks loaded into bitcoinBlock test collection. 

bitcoinBlock collection is indexed by both hash (the document ID) and height. 

Sizes are in KB

```
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.bitcoinBlock.stats(1024)
{
        "ns" : "test.bitcoinBlock",
        "size" : 99851,
        "count" : 1001,
        "avgObjSize" : 102146,
        "storageSize" : 92848,
        "capped" : false,
        "nindexes" : 2,
        "totalIndexSize" : 160,
        "indexSizes" : {
                "_id_" : 136,
                "height_1" : 24
        },
        "ok" : 1,
        "operationTime" : Timestamp(1535488386, 6),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1535488386, 6),
                "signature" : {
                        "hash" : BinData(0,"ts5/Hp9CyEMsiD8TDJAkJ7zUv2I="),
                        "keyId" : NumberLong("6570418953418440705")
                }
        }
}
```

~ 1KB per document. 
~ 50GB database size
~ 80 MB index


For corresponding transactions database. Transactions database is indexed by hash only. 


```
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.bitcoinTransaction.stats(1024)
{
        "ns" : "test.bitcoinTransaction",
        "size" : 42890,
        "count" : 67126,
        "avgObjSize" : 654,
        "storageSize" : 21124,
        "capped" : false,
        "nindexes" : 1,
        "totalIndexSize" : 9912,
        "indexSizes" : {
                "_id_" : 9912
        },
        "ok" : 1,
        "operationTime" : Timestamp(1535482541, 4),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1535482541, 4),
                "signature" : {
                        "hash" : BinData(0,"UN4O13LZf5BMgNdqxJiSSu4fn2I="),
                        "keyId" : NumberLong("6570418953418440705")
                }
        }
}
```

Q; slowing down because of forward?


```
./extractblock.sh bitcoin 537940 538940
4 minutes and 24 seconds elapsed.
```

## Dash
1000 recent transactions

```
MongoDB Enterprise Cluster0-shard-0:PRIMARY> db.dashBlock.stats(1024)
{
        "ns" : "test.dashBlock",
        "size" : 1366,
        "count" : 1001,
        "avgObjSize" : 1397,
        "storageSize" : 1176,
        "capped" : false,
        "nindexes" : 1,
        "totalIndexSize" : 128,
        "indexSizes" : {
                "_id_" : 128
        },
        "ok" : 1,
        "operationTime" : Timestamp(1535486530, 8),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1535486530, 8),
                "signature" : {
                        "hash" : BinData(0,"JFHNOiWOXCA4SJFfBiSsogwc7Qk="),
                        "keyId" : NumberLong("6570418953418440705")
                }
        }
}
```