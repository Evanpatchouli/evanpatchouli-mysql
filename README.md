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

```javascript
// example db.pool.init(host, port, user, password, database)
let SQL = 'select * from user';
db.pool.select(SQL);
```
Result: 
```javascript
// when db is doing sql-select, it will print the sql's str and then print the result of select.
select * from user;
[
  { id: 1, name: 'admin', pwd: 'ROOT' },
  { id: 2, name: 'user', pwd: 'ruanyi' },
  { id: 3, name: 'user2', pwd: '123456' }
]
```
