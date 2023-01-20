# evanpatchouli-mysql

evanpatchouli-mysql is js-tool for MySQL, whick can help you use MySQL easier in node.

This tool is at birth and it will grow up fastly in the future.

# Latest Version: 1.0.13

**v1.0.13**: 

**JsDoc** has been added!

**v1.0.12**: 

**Compiled into CommonJs:** since v1.0.11, the sql.js module will be compiled into commonjs by babel, and you can enjoy it with both of cjs and mjs. 

**Standardlize:** the function name in conn, pool and db. One of my friend told me that the name "get" confused him to think it as "get a connection", and this is just when I realized that I should make the names more clear and easy at the same time.

**One New Feature:** the db has mode! It has two options: "debug" and "non-debug", you can set it at db.mode, the "non-debug" mode only returns one of the entire mysql.js result, and "debug" mode returns entirely, with the sql str and some message printed in console working like sql log.

**One New Change:** under "non-debug" mode, the action like **update**, **insert**, **delete** will all return one number, and the meanings are a bit different between them: **upd**, return the result = affectedRows + changedRows - 1, and it's easy to understand the three value of it, 1 means success, 0 means the new is the same as new, -1 means the target record doesn't exist.**insert** and **delete** return affectedRows, 1 means success and 0 instead.

# Install

```shell
npm install evanpatchouli-mysql
```

# Code Resource
https://github.com/Evanpatchouli/evanpatchouli-mysql

# Useage

**Tip:** the sql-action is a packaged Promise, I suggest to use **'async / await'**, but raw Promise also works if you prefer it.

## Separate Introduction
type: "Moudle"  

```javascript
import db from "evanpatchouli-mysql/lib/sql.js";
```

type: "CommonJs"  

```javascript
let db = require("./dist/sql.js").default;
```


### quick sql

```javascript
let result = db.get('select * from user');
```

### sql in a quick persistent conn

```javascript
let conn = await db.conn("localhost", 3306, "root", "root", "springdemo");
let result = conn.get('select * from user');
```

### close a conn

```javascript
conn.close();
```

### init connection pool

```javascript
// example db.pool.init(host, port, user, password, database)
db.pool.init('localhost',3306,'root','root','springdemo');
```

### quick sql in pool

```javascript
let result = db.pool.select('select * from user')
```

### do sql in a certain conn in pool

```javascript
let conn = db.pool.conn();
let result = conn.select('select * from user')
```

### close pool

```javascript
db.pool.close();
```

## Complete example demos

these codes below are running in "non-debug" mode

```javascript
// example sql actions
// TEST0 does three things: 
// 1. Show the quick sql's conn' config
// 2. Do a quick sql: db.get(sql) means select. (get => select / fix => update / add => insert / del => delete)
// 3. Get a quick conn named 'conn0' and do quick sql in this conn, and close it after i finish my works.
async function tset() {
    console.log('======================================TEST0======================================')
    // db.mode = "debug";
    db.quickConnConfig.database = 'springdemo';
    console.log('the default config of db\'s quick connection:')
    console.log(db.quickConnConfig,'\n')

    let x = await db.sel('select * from user');
    console.log('under: your default config.database => springdemo')
    console.log('connection: random once')
    console.log(x,'\n');

    let conn0 = await db.conn("localhost", 3306, "root", "root", "springdemo");
    x = await conn0.sel('select * from userinfo');
    conn0.close();
    console.log('connection: random persistent')
    console.log(x);
// TEST1 three things:  
// 1. Init the pool without selected database
// 2. switch to a database named 'mysql'
// 3. do a quick sql in the pool and its conn will close automaticly.
    console.log('======================================TEST1======================================')

    db.pool.init("localhost", 3306, "root", "root", "");
    console.log('pool: init')

    db.pool.switch('mysql')
    console.log('pool: db switch to mysql')

    let res = await db.pool.sel("select User from db limit 1")

    console.log('under: mysql')
    console.log('connection: random in pool persistent')
    console.log(res)
// TEST2 three things:  
// 1. get a conn from the pool, and name it as 'conn1'
// 2. switch to a database named 'springdemo'
// 3. do a quick sql-select in this conn in the pool
    console.log('======================================TEST2======================================')

    let conn1 = await db.pool.conn();

    // switch db
    conn1.siwtch("springdemo");
    console.log('pool: db switch to springdemo')

    // select all tables' name in springdemo db
    let sql2 ='select TABLE_NAME AS \'name\' from information_schema.tables where table_schema=\'springdemo\'';
    res = await conn1.sel(sql2);

    console.log('under: springdemo')
    console.log('connection: conn1 in pool persistent')
    console.log(res);

    console.log('======================================TEST3======================================')

    // select user in springdemo
    let sql3 = 'select * from user'
    res = await conn1.sel(sql3);

    console.log('under: springdemo')
    console.log('connection: conn1 in pool persistent')
    console.log(res);

    console.log('======================================TEST4======================================')

    // update user in springdemo
    let sql4 = 'update user set name=\'user3\' where id=5'
    res = await conn1.upd(sql4);

    console.log('under: springdemo')
    console.log('connection: conn1 in pool persistent')
    console.log(res);

    console.log('======================================TEST5======================================')

    // insert user into springdemo
    let sql5 = 'insert into user (name,pwd) values (\'user3\',\'userpwd\')'
    res = await conn1.ins(sql5);

    console.log('under: springdemo')
    console.log('connection: conn1 in pool persistent')
    console.log(res);

    console.log('======================================TEST6======================================')
// TEST6 three things:  
// 1. do a quick sql-delete in this conn in the pool
// 2. close conn1
// 3. close pool
    // delete user from springdemo
    let sql6 = 'delete from user where name=\'user3\' or name=\'user4\''
    res = await conn1.del(sql6);

    console.log('under: springdemo')
    console.log('connection: conn1 in pool persistent')
    console.log(res);
    conn1.close();
    db.pool.close();
}
test();
```

### Result : Output

exit in 0.363 seconds, so it looks not so bad.

**non-debug mode:**

```javascript
======================================TEST0======================================
the default config of db's quick connection:
{
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'springdemo'
} 

under: your default config.database => springdemo
connection: random once
[
  { id: 1, name: 'admin', pwd: 'ROOT' },
  { id: 2, name: 'user', pwd: 'ruanyi' },
  { id: 3, name: 'user2', pwd: '123456' },
  { id: 6, name: 'user5', pwd: '123456' },
  { id: 7, name: 'user6', pwd: '123456' },
  { id: 8, name: 'user7', pwd: '123456' },
  { id: 9, name: 'user8', pwd: '123456' },
  { id: 10, name: 'user9', pwd: '123456' }
] 

Ok, this conn has been destroyed
connection: random persistent
[
  { id: 1, nick: 'evanpatchouli', phone: '19999999999' },
  { id: 2, nick: 'ruanyi', phone: '19999999998' },
  { id: 3, nick: '默认昵称', phone: '00000000000' }
]
======================================TEST1======================================
pool: init
pool: db switch to mysql
under: mysql
connection: random in pool persistent
[ { User: 'mysql.session' } ]
======================================TEST2======================================
pool: db switch to springdemo
under: springdemo
connection: conn1 in pool persistent
[ { name: 'user' }, { name: 'userinfo' } ]
======================================TEST3======================================
under: springdemo
connection: conn1 in pool persistent
[
  { id: 1, name: 'admin', pwd: 'ROOT' },
  { id: 2, name: 'user', pwd: 'ruanyi' },
  { id: 3, name: 'user2', pwd: '123456' },
  { id: 6, name: 'user5', pwd: '123456' },
  { id: 7, name: 'user6', pwd: '123456' },
  { id: 8, name: 'user7', pwd: '123456' },
  { id: 9, name: 'user8', pwd: '123456' },
  { id: 10, name: 'user9', pwd: '123456' }
]
======================================TEST4======================================
under: springdemo
connection: conn1 in pool persistent
-1
======================================TEST5======================================
under: springdemo
connection: conn1 in pool persistent
1
======================================TEST6======================================
under: springdemo
connection: conn1 in pool persistent
1
Ok, this conn has been destroyed
Ok, this pool has been closed

[Done] exited with code=0 in 0.363 seconds
```

**debug mode:**

```javascript
sql: insert into user (name,pwd) values ('user3','userpwd')
under: springdemo
connection: conn1 in pool persistent
{
  sql: "insert into user (name,pwd) values ('user3','userpwd')",
  res: {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 17,
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
  }
}
```