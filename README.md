# Node.js Tool for MySQL

evanpatchouli-mysql is js-tool for MySQL, whick can help you use MySQL easier in node.
This tool is at birth and it will grow up fastly in the future.

# Latest Version: 1.0.5

**v1.0.5**:  
realize **quick sql** with a new random connection which has a modifiable default conn config () is destroyed at once
realize **quick conn** with parameters for a new conn config directly without a pool
realize **pool conn** you can use a random conn in the pool or an exactly conn in the pool
**notice:** when using **quick conn** and **pool conn**, you must manually close the conn and the pool

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

## do sql in pool

**Tip:** the sql-action is a packaged Promise, I suggest to use **'async / await'**, but raw Promise also works if you prefer it.

```javascript
// example sql actions
// TEST0 does three things: 
// 1. Show the quick sql's conn' config
// 2. Do a quick sql: db.get(sql) means select. (get => select / fix => update / add => insert / del => delete)
// 3. Get a quick conn named 'conn0' and do quick sql in this conn, and close it after i finish my works.
async function tset() {
    console.log('======================================TEST0======================================')
    db.quickConnConfig.database = 'springdemo';
    console.log('the default config of db\'s quick connection:')
    console.log(db.quickConnConfig,'\n')

    let x = await db.get('select * from user');
    console.log('under: your default config.database => springdemo')
    console.log('connection: random once')
    console.log(x,'\n');

    let conn0 = await db.conn("localhost", 3306, "root", "root", "springdemo");
    x = await conn0.get('select * from userinfo');
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

    let res = await db.pool.select("select User from db limit 1")

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
    res = await conn1.select(sql2);

    console.log('under: springdemo')
    console.log('connection: conn1 in pool persistent')
    console.log(res);

    console.log('======================================TEST3======================================')

    // select user in springdemo
    let sql3 = 'select * from user'
    res = await conn1.select(sql3);

    console.log('under: springdemo')
    console.log('connection: conn1 in pool persistent')
    console.log(res);

    console.log('======================================TEST4======================================')

    // update user in springdemo
    let sql4 = 'update user set name=\'user3\' where id=5'
    res = await conn1.update(sql4);

    console.log('under: springdemo')
    console.log('connection: conn1 in pool persistent')
    console.log(res);

    console.log('======================================TEST5======================================')

    // insert user into springdemo
    let sql5 = 'insert into user (name,pwd) values (\'user3\',\'userpwd\')'
    res = await conn1.insert(sql5);

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
    res = await conn1.delete(sql6);

    console.log('under: springdemo')
    console.log('connection: conn1 in pool persistent')
    console.log(res);
    conn1.close();
    db.pool.close();
}
```

### Result : Output

exit in 0.327 seconds, so it looks so bad.

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

Ok, this conn has been destroyed
under: your default config.database => springdemo
connection: random once
{
  sql: 'select * from user',
  res: [
    { id: 1, name: 'admin', pwd: 'ROOT' },
    { id: 2, name: 'user', pwd: 'ruanyi' },
    { id: 3, name: 'user2', pwd: '123456' }
  ]
} 

Ok, this conn has been destroyed
connection: random persistent
{
  sql: 'select * from userinfo',
  res: [
    { id: 1, nick: 'evanpatchouli', phone: '19999999999' },
    { id: 2, nick: 'ruanyi', phone: '19999999998' },
    { id: 3, nick: '默认昵称', phone: '00000000000' }
  ]
}
======================================TEST1======================================
pool: init
pool: db switch to mysql
Ok, this conn has been destroyed
under: mysql
connection: random in pool persistent
{
  sql: 'select User from db limit 1',
  res: [ { User: 'mysql.session' } ]
}
======================================TEST2======================================
pool: db switch to springdemo
under: springdemo
connection: conn1 in pool persistent
{
  sql: "select TABLE_NAME AS 'name' from information_schema.tables where table_schema='springdemo'",
  res: [ { name: 'user' }, { name: 'userinfo' } ]
}
======================================TEST3======================================
under: springdemo
connection: conn1 in pool persistent
{
  sql: 'select * from user',
  res: [
    { id: 1, name: 'admin', pwd: 'ROOT' },
    { id: 2, name: 'user', pwd: 'ruanyi' },
    { id: 3, name: 'user2', pwd: '123456' }
  ]
}
======================================TEST4======================================
under: springdemo
connection: conn1 in pool persistent
{ sql: "update user set name='user3' where id=5", res: 0 }
======================================TEST5======================================
under: springdemo
connection: conn1 in pool persistent
{
  sql: "insert into user (name,pwd) values ('user3','userpwd')",
  res: 1
}
======================================TEST6======================================
under: springdemo
connection: conn1 in pool persistent
{ sql: "delete from user where name='user3' or name='user4'", res: 1 }
Ok, this conn has been destroyed
Ok, this pool has been closed

[Done] exited with code=0 in 0.327 seconds
```
