# evanpatchouli-mysql

evanpatchouli-mysql is js-tool for MySQL, whick can help you use MySQL easier in node.

This tool is at birth and it will grow up fastly in the future.

# Latest Version: 1.0.22

**v1.0.22**:
- now you can create and use more connection pool rather than only the one default pool.
- improve the HELP.md.
- improve the type hint.

**v1.0.21**: a patch

**v1.0.20**:
- Intelligent Hint
Type declared with typescript so that the intelligent coding hint is supported.
- 1 Bug Fixed
The bug of lifetime of conn is fixed.

**v1.0.18**: add two functions: **newDb** and **delDb**

**v1.0.17**: a patch, export bug has been fixed

**v1.0.16**: a patch

**v1.0.15**: a patch

**v1.0.14**: a patch

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
let db = require("../index.js");
```


### quick sql

```javascript
let result = db.sel('select * from user');
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
let result = db.pool.sel('select * from user')
```

### do sql in a certain conn in pool

```javascript
let conn = db.pool.conn();
let result = conn.sel('select * from user')
```

### close pool

```javascript
db.pool.close();
```

### Result : Output

**debug mode output:**

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

## More

More usage can be saw in HELP.md