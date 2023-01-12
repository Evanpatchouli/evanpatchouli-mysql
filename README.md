# Node.js Tool for MySQL

evanpatchouli-mysql is js-tool for MySQL, whick can help you use MySQL easier in node.
This tool is at birth and it will grow up fastly in the future.

# Install

```shell
npm install evanpatchouli-mysql
```

# Code Resource
https://github.com/Evanpatchouli/evanpatchouli-mysql

# Useage

```javascript
import db from "evanpatchouli-mysql/lib/sql.js";
```

## create connection pool

```javascript
// example db.pool.init(host, port, user, password, database)
db.pool.init('localhost',3306,'root','root','springdemo');
```

## do select in pool

### the select is a packaged Promise, u should use it by chains

```javascript
// example db.pool.init(host, port, user, password, database)
// first, grab a database named springdemo, and select all tables'name in it
db.pool.select("show databases like 'springdemo'")
    .then((result) => {
        console.log("====================BEGIN====================");
        console.log("sql:", result.sql);
        console.log(result.res);
        console.log("sql has done");
        console.log("====================ENDUP====================");
        let sql =
            "select TABLE_NAME from information_schema.tables where table_schema='springdemo'";
        return db.pool.select(sql);
    })  // second, we've get all the tables'name in springdemo db, then select * from the first table (which named user)
    .then((result) => {
        console.log("====================BEGIN====================");
        console.log("sql:", result.sql);
        console.log(result.res);
        console.log("sql has done");
        console.log("====================ENDUP====================");
        let table = result.res[0]["TABLE_NAME"];
        return db.pool.select("select * from " + table);
    })  // now, we get all userinfos
    .then((result) => {
        console.log("====================BEGIN====================");
        console.log("sql:", result.sql);
        console.log(result.res);
        console.log("sql has done");
        console.log("====================ENDUP====================");
    })
    .catch((reason) => {
        console.log(reason);
    });
```

### Result : Output

```javascript
====================BEGIN====================
sql: show databases like 'springdemo'
[ { 'Database (springdemo)': 'springdemo' } ]
sql has done
====================ENDUP====================
====================BEGIN====================
sql: select TABLE_NAME from information_schema.tables where table_schema='springdemo'
[ { TABLE_NAME: 'user' }, { TABLE_NAME: 'userinfo' } ]
sql has done
====================ENDUP====================
====================BEGIN====================
sql: select * from user
[
  { id: 1, name: 'admin', pwd: 'ROOT' },
  { id: 2, name: 'user', pwd: 'ruanyi' },
  { id: 3, name: 'user2', pwd: '123456' }
]
sql has done
====================ENDUP====================
```
