import mysql from "mysql";

// const mysql = require('mysql');
// let conn = mysql.createConnection();

let use = (conn, dbname) => {
  let sql = 'USE ' + dbname;
  conn.query(sql);
};
let doUpdate = (conn, sql, type) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, sqlres) => {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db.throw(err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        let data;
        // let affectedRows = sqlres.affectedRows;
        // let changedRows = sqlres.changedRows;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          data = sqlres.affectedRows + sqlres.changedRows - 1;
        }
        resolve(data);
      }
    });
  });
};
let doInsert = (conn, sql, type, hope) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, sqlres) => {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db.throw(err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        let data;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          if (hope == "autoid") {
            let sql2 = "SELECT LAST_INSERT_ID() as lastid";
            conn.query(sql2, (err2, sqlres2) => {
              if (err2) {
                reject(err2.message);
              } else {
                data = {
                  autoid: sqlres2.lastid,
                  affectedRows: sqlres.affectedRows
                };
              }
            });
          } else if (hope == "all") {
            data = sqlres;
          } else if (hope == "default" || hope == undefined || hope == null || hope == "") {
            data = sqlres.affectedRows;
          }
        }
        resolve(data);
      }
    });
  });
};
let doDelete = (conn, sql, type) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, sqlres) => {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db.throw(err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        let data;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          data = sqlres.affectedRows;
        }
        resolve(data);
      }
    });
  });
};
let doSelect = (conn, sql, type) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, sqlres) => {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db.throw(err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        let data;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          data = sqlres;
        }
        resolve(data);
      }
    });
  });
};
let doFreeSql = doSelect;
let showTbStruct = (conn, tbname, type) => {
  let sql = "show full columns from ??";
  return new Promise((resolve, reject) => {
    conn.query(sql, tbname, (err, sqlres) => {
      if (db.mode != "debug" && db.mode != "non-debug") {
        reject("unknown mode");
      }
      if (type == "once") {
        conn.destroy();
        if (db.mode == "debug") {
          console.log('Ok, this conn has been destroyed');
        }
      } else if (type == "lasting" || type == undefined || type == null || type == "") {
        // do nothing
      } else {
        reject("unkonwn conn type");
      }
      if (err) {
        db.throw(err);
        reject(err.message);
      } else {
        sqlres = JSON.parse(JSON.stringify(sqlres));
        let data;
        if (db.mode == "debug") {
          data = {
            sql: sql,
            res: sqlres
          };
          console.log('sql:', sql);
        } else {
          data = sqlres;
        }
        resolve(data);
      }
    });
  });
};
let getConnFromPool = () => {
  return new Promise((resolve, reject) => {
    pool.sqlpool.getConnection((err, conn) => {
      if (err) {
        db.throw(err);
        reject(err.message);
      }
      resolve(conn);
    });
  });
};
let poolDirectAction = async (actionfx, sql) => {
  const conn = await getConnFromPool();
  return actionfx(conn, sql, "once");
};

/**
 * @typedef {Object}
 * @property {!string} host
 * @property {!number} port
 * @property {!string} user
 * @property {!string} password
 * @property {string} database
 * @property {!number} connlimit - max of conn amount, default 10
 */
let poolConfig = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "evanpatchouli_mysql_test",
  /**
   * @type {number}
   * @default
   */
  connlimit: 10
};

/**
 * @typedef {Object}
 * @property {!string} host
 * @property {!number} port
 * @property {!string} user
 * @property {!string} password
 * @property {string} database
 */
let connConfig = {
  host: string,
  port: number,
  user: string,
  password: string,
  database: string
};

/**
 * an Object packaged with a poolConnection and some methods
 * @type {Object}
 * @property {poolConfig} config
 * @property {} sqlpool
 * @property {method} init
 * @property {method} switch
 * @property {method} sel       - async
 * @property {method} upd       - async
 * @property {method} ins       - async
 * @property {method} del       - async
 * @property {method} getDbs    - async
 * @property {method} getTbs    - async
 * @property {method} getTbStruct   - async
 * @property {method} close     - async
 * @property {method} conn      - async, get a lasting conn
 */
let pool = {
  /**
   * the config of pool conn
   * @type {poolConfig}
   */
  config: {
    host: undefined,
    port: undefined,
    user: undefined,
    password: undefined,
    database: undefined,
    /**
     * @type {number}
     * @default
     */
    connlimit: 10
  },
  /**
   * @type {import("mysql").PoolConnection}
   */
  sqlpool: undefined,
  /**
   * to create a poolConnection
   * @param {!string} host 
   * @param {!number} port 
   * @param {!string} user 
   * @param {!string} pwd 
   * @param {string} database 
   * @param {number} connlimit 
   */
  init(host, port, user, pwd, database, connlimit) {
    this.config.host = host;
    this.config.port = port;
    this.config.user = user;
    this.config.password = pwd;
    this.config.database = database != null && database != '' ? database : undefined;
    this.config.connlimit = connlimit != null && connlimit != undefined ? database : 10;
    let p = mysql.createPool({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
      connectionLimit: this.config.connlimit
    });
    this.sqlpool = p;
  },
  /**
   * switch poolconn to use another database
   * @function
   * @param {!string} dbname - the database's name you want switch to use
   */
  switch(dbname) {
    this.sqlpool.config.connectionConfig.database = dbname;
    this.config.database = dbname;
  },
  /**
   * do select with a one-off conn in pool
   * @async
   * @function
   * @param {!string} sql  - select sql
   * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
   */
  sel: async sql => {
    return await poolDirectAction(doSelect, sql);
  },
  /**
   * do update with a one-off conn in pool
   * @async
   * @function
   * @param {!string} sql - update sql
   * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
   */
  upd: async sql => {
    return await poolDirectAction(doUpdate, sql);
  },
  /**
   * do insert with a one-off conn in pool
   * @async
   * @function
   * @param {!string} sql - insert sql
   * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
   */
  ins: async sql => {
    return await poolDirectAction(doInsert, sql);
  },
  /**
   * do delete with a one-off conn in pool
   * @async
   * @function
   * @param {!string} sql - delete sql
   * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
   */
  del: async sql => {
    return await poolDirectAction(doDelete, sql);
  },
  /**
   * get all db's name with a one-off conn in pool
   * @async
   * @function
   * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of db names and the key is "dbname"
   */
  async getDbs() {
    let sql = "select schema_name as dbname from information_schema.schemata";
    return await poolDirectAction(doSelect, sql);
  },
  /**
   * get all tb's name from a db with a one-off conn in pool.
   * if dbname is not assigned clearly, it would be this conn default database
   * @async
   * @function
   * @param {string|undefined|null|""} dbname 
   * @returns {Promise<Array<Map<tbname,string>>} a promise, if success, it would be a list of table names and the key is "tbname", like [{ tbname: "user" }]
   */
  async getTbs(dbname) {
    let sql;
    if (dbname == undefined || dbname == "" || dbname == null) {
      sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + this.config.database + '\'';
    } else {
      sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
    }
    return await poolDirectAction(doSelect, sql);
  },
  /**
   * get struct of a table with a one-off conn
   * @async
   * @function
   * @param string tbname 
   * @returns {Promise<Array<Map<any,string>>} construction of a table
   */
  getTbStruct: async tbname => {
    return await showTbStruct(showTbStruct, tbname);
  },
  /**
   * end this poolconn
   * @function
   */
  close() {
    this.sqlpool.end();
    console.log('Ok, this pool has been closed');
  },
  /**
   * get a lasting from this poolConnection
   * @returns {Object} an Object packaged with a conn in pool and some functions
   */
  conn: async () => {
    let newconn = await getConnFromPool();
    /**
     * @type {Object}
     * @property {import("mysql").Connection} conn  - mysql connection
     * @property {object} config                    - config of this mysql conn and it is changable
     * @property {function} sel                     - do select
     * @property {function} upd                     - do update
     * @property {function} ins                     - do insert
     * @property {function} del                     - do delete
     * @property {function} getDbs                  - select all databases' name
     * @property {function} getTbs                  - select all tables' name from a database
     * @property {function} getTbStruct             - get construction of one table
     * @property {function} switch                  - switch this conn to use another database
     * @property {function} free                    - release this conn
     * @property {function} close                   - destroy this conn
     */
    let conn = {
      /**
       * @type {import("mysql").Connection}
       */
      conn: newconn,
      /**
       * @type {connConfig}
       */
      config: {
        host: newconn.config.host,
        port: newconn.config.port,
        user: newconn.config.user,
        password: newconn.config.password,
        database: newconn.config.database
      },
      /**
       * do select
       * @async
       * @function
       * @param {!string} sql  - select sql
       * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
       */
      async sel(sql) {
        return await doSelect(this.conn, sql);
      },
      /**
       * do update
       * @async
       * @function
       * @param {!string} sql - update sql
       * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
       */
      async upd(sql) {
        return await doUpdate(this.conn, sql);
      },
      /**
       * do insert
       * @async
       * @function
       * @param {!string} sql - insert sql
       * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
       */
      async ins(sql) {
        return await doInsert(this.conn, sql);
      },
      /**
       * de delete
       * @async
       * @function
       * @param {!string} sql - delete sql
       * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
       */
      async del(sql) {
        return await doDelete(this.conn, sql);
      },
      /**
       * get all db's name
       * @async
       * @function
       * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of db names and the key is "dbname"
       */
      async getDbs() {
        let sql = "select schema_name as dbname from information_schema.schemata";
        return await doSelect(this.conn, sql);
      },
      /**
       * get tables' name from a db.
       * if dbname is not assigned clearly, it would be this conn default database
       * @async
       * @function
       * @param {string|undefined|null|""} dbname 
       * @returns {Promise<Array<Map<tbname,string>>} a promise, if success, it would be a list of table names and the key is "tbname", like [{ tbname: "user" }]
       */
      async getTbs(dbname) {
        let sql;
        if (dbname == undefined || dbname == "" || dbname == null) {
          sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + this.config.database + '\'';
        } else {
          sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
        }
        return await doSelect(this.conn, sql, "once");
      },
      /**
       * get a tables' struct
       * @async
       * @function
       * @param string tbname 
       * @returns {Promise<Array<Map<any,string>>} construction of a table
       */
      async getTbStruct(tbname) {
        return await showTbStruct(this.conn, tbname);
      },
      /**
       * switch this conn to use another database
       * @function
       * @param {!string} dbname - the database's name you want switch to use
       */
      siwtch(dbname) {
        use(this.conn, dbname);
        this.config.database = dbname;
      },
      /**
       * release this conn
       * @method
       */
      free() {
        this.conn.release();
        console.log('Ok, this conn has been released');
      },
      /**
       * destroy this conn
       * @function
       */
      close() {
        this.conn.destroy();
        console.log('Ok, this conn has been destroyed');
      }
    };
    return conn;
  }
};

/** 
 * @namespace db
 * @property {string} name                  - this object's default name is "db"
 * @property {string} type                  - db's type
 * @property {string} mode                  - db's running mode
 * @property {Object} quickConnConfig       - db's config of quick one connection
 * @property {Object} pool                  - db's connection pool tool
 * @property {function} throw
 * @property {function} newconn             - [warning: you shoundn't use] get a raw conn from mysql.js with quickConnConfig
 * @property {function} conn                - get a Object packaged a lasting conn and some methods
 * @property {function} sel                 - do select one-off
 * @property {function} upd                 - do update one-off
 * @property {function} ins                 - do insert one-off
 * @property {function} del                 - do delete one-off
 * @property {function} sql                 - do any sql one-off
 * @property {function} getDbs              - get all db's name
 * @property {function} getTbs              - get all tables' name from a db one-off
 * @property {function} getTbStruct         - get the struct of a table one-off
 * 
*/
let db = {
  name: 'db',
  type: 'Object',
  /**
   * db running mode, it's value must be "non-debug" or "debug", and default is "non-debug", under "debug" mode, the result will be complete and sql will be printed out. 
   * db 运行模式，它的值必须是"non-debug"或者"debug"，前者是初始默认值，在"debug"模式下，返回的结果将变得完整，并且sql语句将被打印出来
   * @type {string} "non-debug" | "debug"
   */
  mode: 'non-debug',
  /** 
   * @type {Object} default connection config
   * @property {string} host
   * @property {number} port
   * @property {string} user
   * @property {string} password
   * @property {string|undefined|null} database
  */
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
  /** 
   * @type {import("mysql").PoolConnection}
  */
  pool: pool,
  /**
   * a function to print the sql error in console
   * @function
   * @param {error} err 
   */
  throw: err => {
    console.log('【SQL ERROR】: ', err.message);
  },
  /**
   * this is a method to get a raw conn from mysql.js with db's quickConnConfig
   * @method
   * @returns {import("mysql").Connection}
   */
  newconn() {
    return mysql.createConnection({
      host: this.quickConnConfig.host,
      port: this.quickConnConfig.port,
      user: this.quickConnConfig.user,
      password: this.quickConnConfig.password,
      database: this.quickConnConfig.database != null || this.quickConnConfig.database != '' ? this.quickConnConfig.database : undefined
    });
  },
  /**
   * @function conn
   * @param {string} host 
   * @param {number} port 
   * @param {string} user 
   * @param {string} pwd 
   * @param {string} database 
   * @returns {object} conntmp    - an object contains a lasting connection and some packaged functions
   */
  conn: async (host, port, user, pwd, database) => {
    let newconn = mysql.createConnection({
      host: host,
      port: port,
      user: user,
      password: pwd,
      database: database
    });
    /**
     * @type {Object} conntmp
     * @property {import("mysql").Connection} conn  - mysql connection
     * @property {object} config                    - config of this mysql conn and it is changable
     * @property {function} sel                     - do select
     * @property {function} upd                     - do update
     * @property {function} ins                     - do insert
     * @property {function} del                     - do delete
     * @property {function} getDbs                  - select all databases' name
     * @property {function} getTbs                  - select all tables' name from a database
     * @property {function} getTbStruct             - get construction of one table
     * @property {function} switch                  - switch this conn to use another database
     * @property {function} close                   - destroy this conn
     */
    let conntmp = {
      /**
       * @type {import("mysql").Connection}
       */
      conn: newconn,
      /**
       * @type {connConfig}
       */
      config: {
        host: host,
        port: port,
        user: user,
        password: pwd,
        database: database
      },
      /**
       * do select
       * @async
       * @function
       * @param {!string} sql  - select sql
       * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
       */
      async sel(sql) {
        return await doSelect(this.conn, sql);
      },
      /**
       * do update
       * @async
       * @function
       * @param {!string} sql - update sql
       * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
       */
      async upd(sql) {
        return await doUpdate(this.conn, sql);
      },
      /**
       * do insert
       * @async
       * @function
       * @param {!string} sql - insert sql
       * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
       */
      async ins(sql) {
        return await doInsert(this.conn, sql);
      },
      /**
       * do delete
       * @async
       * @function
       * @param {!string} sql - delete sql
       * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
       */
      async del(sql) {
        return await doDelete(this.conn, sql);
      },
      /**
       * get all db's name
       * @async
       * @function
       * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of db names and the key is "dbname"
       */
      async getDbs() {
        let sql = "select schema_name as dbname from information_schema.schemata";
        return await doSelect(this.conn, sql);
      },
      /**
       * if dbname is not assigned clearly, it would be this conn default database
       * @async
       * @function
       * @param {string|undefined|null|""} dbname 
       * @returns {Promise<Array<Map<tbname,string>>} a promise, if success, it would be a list of table names and the key is "tbname", like [{ tbname: "user" }]
       */
      async getTbs(dbname) {
        let sql;
        if (dbname == undefined || dbname == "" || dbname == null) {
          sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + this.config.database + '\'';
        } else {
          sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
        }
        return await doSelect(this.conn, sql);
      },
      /**
       * @async
       * @function
       * @param string tbname 
       * @returns {Promise<Array<Map<any,string>>} construction of a table
       */
      async getTbStruct(tbname) {
        return await showTbStruct(this.conn, tbname);
      },
      /**
       * switch this conn to use another database
       * @function
       * @param {!string} dbname - the database's name you want switch to use
       */
      siwtch(dbname) {
        use(this.conn, dbname);
        this.config.database = dbname;
      },
      /**
       * destroy this conn
       * @function
       */
      close() {
        this.conn.destroy();
        console.log('Ok, this conn has been destroyed');
      }
    };
    return conntmp;
  },
  /**
   * do select in a random one-off conn with quickConnConfig
   * @async
   * @function
   * @param {!string} sql  - select sql
   * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
   */
  async sel(sql) {
    let newconn = this.newconn();
    return await doSelect(newconn, sql, "once");
  },
  /**
   * do update in a random one-off conn with quickConnConfig
   * @async
   * @function
   * @param {!string} sql - update sql
   * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
   */
  async upd(sql) {
    let newconn = this.newconn();
    return await doUpdate(newconn, sql, "once");
  },
  /**
   * do insert in a random one-off conn with quickConnConfig
   * @async
   * @function
   * @param {!string} sql - insert sql
   * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
   */
  async ins(sql) {
    let newconn = this.newconn();
    return await doInsert(newconn, sql, "once");
  },
  /**
   * do delete in a random one-off conn with quickConnConfig
   * @async
   * @function
   * @param {!string} sql - delete sql
   * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
   */
  async del(sql) {
    let newconn = this.newconn();
    return await doDelete(newconn, sql, "once");
  },
  /**
   * you can put any sql into it, running with a random one-off conn
   * @param {!string} sql - free sql
   * @returns 
   */
  async sql(sql) {
    let newconn = this.newconn();
    return await doFreeSql(newconn, sql, "once");
  },
  /**
   * get all db's name
   * @async
   * @function
   * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of dbnames and the key is "dbname"
   */
  async getDbs() {
    let sql = "select schema_name as dbname from information_schema.schemata";
    return await doSelect(this.conn, sql);
  },
  /**
   * get tables' name from a db, running with a random one-off conn
   * @async
   * @function
   * @param {string|undefined|null|""} dbname - the name of the db you want to get all tables' name from. If you assign it with undefined, null, "" or don't pass it, the function will use this conn's default database
   * @returns {Promise<Array<Map<tbname,string>>} a promise, if success, it would be a list of tbnames and the key is "tbname"
   */
  async getTbs(dbname) {
    let sql;
    if (dbname == undefined || dbname == "" || dbname == null) {
      sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + this.quickConnConfig.database + '\'';
    } else {
      sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
    }
    return await doSelect(this.newconn(), sql, "once");
  },
  /**
   * get a tables' struct, running with a random one-off conn
   * @async
   * @function
   * @param {!string} tbname - the name of the that you want to its construction
   * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of db names and the key is "dbname"
   */
  async getTbStruct(tbname) {
    let newconn = this.newconn();
    return await showTbStruct(newconn, tbname, "once");
  }
};
// db.mode = "debug";

// db.quickConnConfig.database = 'SPRINGDEMO';

// let rs;

// rs = await db.getTbs();

// let conn = await db.conn("localhost",3306,"root","root","onlinemall");
// rs = await conn.getTbs();

// db.pool.init("localhost",3306,"root","root","onlinemall")
// rs = await db.pool.getTbs();

// let conn = await db.pool.conn();
// conn.siwtch("springdemo");
// rs = await conn.getTbs();

// console.log(rs);
// conn.close();

export default db;