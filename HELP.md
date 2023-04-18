# evanpatchouli-mysql

evanpatchouli-mysql is js-tool for MySQL, whick can help you use MySQL easier in node.

This tool is at birth and it will grow up fastly in the future.

## Useage

**Tip:** now we only support raw sql so you need to write raw sql string.

**Tip:** the sql-action is a packaged Promise, I suggest to use **'async / await'**, but raw Promise also works if you prefer it.

## Examples

**Tip:** in this doc:

- conn means connection
- db means db(Object) or database
- Db means Db/db(Oject)
- tb means table
- quick sql: the quick means the conn used is once-
- tmp means temporary

### Db

The root object to provide this package sql services

#### Db.quickConnConfig

This is the default `quickConnConfig` of Db.
```js
quickConnConfig: {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  /**
  * @type {string|undefined|null}
  */
  database: undefined
},
```
You should init it before use it to sql.
```js
Db.quickConnConfig.database = "speingdemo";
```
Everytime you do a quick sql in Db, Db will use this config to create a tmp conn to sql and close this conn then.

#### Db.mode

The default mode is `"non-debug"`, you can change it to `"debug"`.  
**Notice**: under `"debug"` mode ,the struct of result returned by sql method will be different.

### Db quick sql

#### `async` Db.ins(sql: string) => Promise<number>

It will return the affected rows amount, the sql following returns 1 if success.
```js
let rs = await Db.ins("insert into user (id,username) values(1,'user1')");
```

#### `async` Db.upd(sql: string) => Promise<number>

It will return the affected rows amount, the sql following returns 1 if success.
```js
let rs = await Db.upd("update user set password='root' where id=1");
```

#### `async` Db.sel(sql: string) => Promise<[{k,v}]>

It will return the record list
```js
let rs = await db.sel("select * from user");
```
rs just like:
```shell
[
  { id: 1, name: 'user1', pwd: 'root' },
] 
```

#### `async` Db.newDb(name: string, character: string, collation: string) => Promise<?>

It will return the result of creating the new database
```js
let rs = await Db.newDb("tmpdb", "utf8", "utf8_general_ci");
```

#### `async` Db.delDb(name: string) => Promise<?>

It will return the result of deleting the database
```js
let rs = await Db.delDb("tmpdb");
```

#### `async` Db.sql(sql: string) => Promise<?>

It will do this sql and return the raw result without dealing
```js
let rs = await Db.sql("select * from user");
```

#### `async` Db.getDbs() => Promise<[{k:'dbname',v:string}]>

It will return all db name as dbname
```js
let rs = await Db.getDbs();
```

#### `async` Db.getTbs() => Promise<[{k:'tbname',v:string}]>

It will return all tb name as tbname
```js
let rs = await Db.getTbs();
```

#### `async` Db.getTbStruct(tbname: string) => Promise<[{k:'tbname',v:string}]>

It will return this table struct.
```js
let rs = await Db.getTbStruct("user");
```

#### Db.conn() => 'sql.js'.ConnOutPool

you will get an object containing a persistent conn.
```js
let conn = Db.conn();
```

#### Db.pool => 'sql.js'.Pool

The default Pool object in Db, and you can use it to do sql after initlization.  
More information will be introduced following.

#### Db.newPool() => 'sql.js'.Pool

you will get a new Pool object containing a connection pool in Db.  
before you use it should you init the pool conn.
```js
let pool = Db.newPool();
```

### Conn

The sql action is just same as Db, the difference is that you should **not forget to close/release** the conn if you have finished all you affairs.

And there are some more method:

#### Conn.switch(dbname: string) => void

switch this conn to use another database
```js
let conn = Db.conn();
conn.switch("tmpdb2");
```

#### Conn.free() => void

**release** this conn
```js
conn.free();
```

#### Conn.close() => void

**destroy** this conn
```js
conn.close();
```

### Pool

The sql action is just same as Db and Conn, and you should **not forget to close/release** the conn in pool if you have finished all you affairs.

#### Pool.init(options: PoolConfig) => void

Before you use any Pool, you should init it at first.
```js
Db.pool.init(
  host: "localhost",
  port: 3306,
  user: "root",
  pwd: "root",
  database: "springdemo",
  connlimit: 10
);
```
If you don't give the database and connlimit or gives them as `null` or `""` or `undefined`, the database will be `undefined` and connlimit will be `10`.

#### Pool.switch(tbname: string) => void

switch this pool to use another database as default databse
```js
let conn = await Db.conn();
conn.switch("tmpdb2");
```

#### Pool.close() => void

Close the conn pool.
```js
Db.pool.close();
```
If you want to reconnect the default or separate conn Pool, you can init it again.

#### Pool.conn() => ConnInPool

you can use this method to get a conn from a Pool with the similar config as Pool's.
```js
let pool_conn = Db.pool.conn();
```
This conn is a Conn and its usages are same as above.