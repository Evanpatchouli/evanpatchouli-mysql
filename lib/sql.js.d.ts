export module './lib/sql.js' {
    const content: any
    export = content
}

export interface PoolConfig {
   host: string;
   port: number;
   user: string;
   password: string;
   database: string;
   /**
    * @type {number}
    * @default
    */
   connlimit: 10;
}

export interface ConnConfig {
    host: string
    port: number
    user: string
    password: string
    database: string
}

export interface ConnInPool {
    /**
     * @type {import("mysql").Connection}
     */
     conn: import("mysql").Connection;
     /**
      * @type {ConnConfig}
      */
     config: ConnConfig;
     /**
      * do select with this persistent conn in pool
      * @async
      * @param {!string} sql  - select sql
      * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
      */
     async sel(sql: string): Promise<Array<Object>>;
 
     /**
      * do update with this persistent conn in pool
      * @async
      * @param {!string} sql - update sql
      * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
      */
     async upd(sql: string): Promise<number>;
 
     /**
      * do insert with this persistent conn in pool
      * @async
      * @param {!string} sql - insert sql
      * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
      */
     async ins(sql: string): Promise<number>;
 
     /**
      * de delete with this persistent conn in pool
      * @async
      * @param {!string} sql - delete sql
      * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
      */
     async del(sql: string): Promise<number>;
 
     async newDb(name: string, character: string, collation: string): Promise<T>;
 
     async delDb(name: string): Promise<T>;
 
     /**
      * get all db's name
      * @async
      * @returns {Promise<Array<Map<dbname,string>>} a promise, if success, it would be a list of db names and the key is "dbname"
      */
    async getDbs(): Promise<Array<Map<dbname,string>>>;
 
     /**
      * get tables' name from a db.
      * if dbname is not assigned clearly, it would be this conn default database
      * @async
      * @param {string|undefined|null|""} dbname 
      * @returns {Promise<Array<Map<tbname,string>>} a promise, if success, it would be a list of table names and the key is "tbname", like [{ tbname: "user" }]
      */
    async getTbs(dbname: string|undefined|null|""): Promise<Array<Map<tbname,string>>>;
 
     /**
      * get a tables' struct
      * @async
      * @param {string} tbname 
      * @returns {Promise<Array<Map<any,string>>} construction of a table
      */
    async getTbStruct(tbname: string): Promise<Array<Map<any,string>>>;
 
     /**
      * switch this conn to use another database
      * @param {!string} dbname - the database's name you want switch to use
      */
    siwtch(dbname: string): void;
 
     /**
      * Release this conn
      */
     free(): void;
 
    /**
      * Destroy this conn
      */
    close(): void;
}

/**
 * @type {connOutPool}
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
 export interface ConnOutPool {
    /**
     * @type {import("mysql").Connection}
     */
    conn: import("mysql").Connection,
    /**
     * @type {ConnConfig}
     */
    config: ConnConfig,
    /**
     * do select
     * @async
     * @param {!string} sql  - select sql
     * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
     */
    async sel(sql: string): Promise<Array<Object>>;
    /**
     * do update
     * @async
     * @param {!string} sql - update sql
     * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
     */
    async upd(sql: string): Promise<number>,
    /**
     * do insert
     * @async
     * @param {!string} sql - insert sql
     * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
     */
    async ins(sql:string): Promise<number>;
    /**
     * do delete
     * @async
     * @param {!string} sql - delete sql
     * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
     */
    async del(sql: string): Promise<number>;

    async newDb(name: string, character: string, collation: string): Promise<T>;

    async delDb(name: string): Promise<T>;

    /**
     * get all db's name
     * @async
     * @returns {Promise<Array<Map<dbname,string>>>} a promise, if success, it would be a list of db names and the key is "dbname"
     */
    async getDbs(): Promise<Array<Map<dbname,string>>>;

    /**
     * if dbname is not assigned clearly, it would be this conn default database
     * @async
     * @param {string|undefined|null|""} dbname 
     * @returns {Promise<Array<Map<tbname,string>>>} a promise, if success, it would be a list of table names and the key is "tbname", like [{ tbname: "user" }]
     */
    async getTbs(dbname: string): Promise<Array<Map<tbname,string>>>;

    /**
     * @async
     * @param {string} tbname 
     * @returns {Promise<Array<Map<any,string>>>} construction of a table
     */
    async getTbStruct(tbname: string): Promise<Array<Map<any,string>>>;

    /**
     * switch this conn to use another database
     * @param {!string} dbname - the database's name you want switch to use
     */
    siwtch(dbname: string): void;

    /**
     * destroy this conn
     */
    close(): void;
}

export interface Pool {
    /**
     * The config of pool conn
     */
    config: PoolConfig;
    
    /**
     * The pool
     * @type {import("mysql").Pool}
     */
    sqlpool: mysql.Pool;

    /**
     * to create a poolConnection
     */
    init(host: string, port: number, user: string, pwd: string, database: string, connlimit: number): void;

    /**
     * switch poolconn to use another database
     * @param {!string} dbname - the database's name you want switch to use
     */
    switch(dbname: string): void;

    /**
     * do select with a one-off conn in pool
     * @async
     * @param {!string} sql  - select sql
     * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
     */
    async sel(sql: string): Promise<Array<Object>>;
    
    /**
     * do update with a one-off conn in pool
     * @async
     * @param {!string} sql - update sql
     * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
     */
    async upd(sql: string): Promise<number>;

    /**
     * do insert with a one-off conn in pool
     * @async
     * @param {!string} sql - insert sql
     * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
     */
     async ins(sql: string): Promise<number>;

    /**
     * do delete with a one-off conn in pool
     * @async
     * @param {!string} sql - delete sql
     * @return {Promise<number>} a promise, if success, it would be this sql result's affectedRows
     */
    async del(sql: string): Promise<number>;
    
    /**
     * do create a new db with a one-off conn in pool
     * @async
     * @param {string} name - the name of new db
     * @param {string} character - the character of new db
     * @param {string} collation - the collation of new db
     * @return {Promise} Promise
     */
    async newDb(name: string, character: string, collation: string): Promise<T>;

    /**
     * do create a new db with a one-off conn in pool
     * @async
     * @param name - the name of db being deleted
     * @return Promise
     */
    async delDb(name: string): Promise<T>;

    /**
     * get all db's name with a one-off conn in pool
     * @async
     * @return Promise, if success, it would be a list of db names and the key is "dbname"
     */
    async getDbs(): Promise<Array<Map<dbname,string>>>;

    /**
     * get all tb's name from a db with a one-off conn in pool.
     * if dbname is not assigned clearly, it would be this conn default database
     * @async
     * @param {string|undefined|null|""} dbname 
     * @returns Promise, if success, it would be a list of table names and the key is "tbname", like [{ tbname: "user" }]
     */
    async getTbs(dbname: string|undefined|null|""): Promise<Array<Map<tbname,string>>>;

    /**
     * get struct of a table with a one-off conn
     * @async
     * @param {string} tbname 
     * @returns Construction of a table
     */
    async getTbStruct(tbname: string): Promise<Array<Map<any,string>>>;

    /**
     * End this poolconn
     */
    close(): void;

    /**
     * get a lasting from this poolConnection
     * @returns {ConnInPool} an Object packaged with a conn in pool and some functions
     */
    async conn(): ConnInPool;
}

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
export interface Db {
    /**
     * @default
     */
    name: string = 'db',
    /**
     * @default
     */
    type: string = 'Object',
    
    /**
     * db running mode, it's value must be "non-debug" or "debug", and default is "non-debug", under "debug" mode, the result will be complete and sql will be printed out. 
     * db 运行模式，它的值必须是"non-debug"或者"debug"，前者是初始默认值，在"debug"模式下，返回的结果将变得完整，并且sql语句将被打印出来
     * @type {string} "non-debug" | "debug"
     */
    mode: string = 'non-debug',

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
     * @type {Pool}
     */
    pool: Pool,

    /**
     * a function to print the sql error in console
     * @param err {Error}
     */
    throw(err: Error): void;

    /**
     * this is a method to get a raw conn from mysql.js with db's quickConnConfig
     * @returns {import("mysql").Connection}
     */
    newconn(): import("mysql").Connection;

    /**
     * Method to create a a lasting connection in db
     * @param {string} host 
     * @param {number} port 
     * @param {string} user 
     * @param {string} pwd 
     * @param {string} database 
     * @returns {ConnOutPool} an object contains a lasting connection and some packaged functions
     */
     async conn(host: string, port: number, user: string, pwd: string, database: string): ConnOutPool;

    /**
     * do select in a random one-off conn with quickConnConfig
     * @async
     * @param {!string} sql  - select sql
     * @returns {Promise<Array<Object>>} a promise, if success, it would be this sql result (records)
     */
    async sel(sql: string): Promise<Array<Object>>;

    /**
     * do update in a random one-off conn with quickConnConfig
     * @async
     * @param {!string} sql - update sql
     * @returns {Promise<number>} a promise, if success, it would be = this sql result's affectedRows + changedRows - 1
     */
    async upd(sql: string): Promise<number>;

    /**
     * do insert in a random one-off conn with quickConnConfig
     * @async
     * @param {!string} sql - insert sql
     * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
     */
    async ins(sql: string): Promise<number>;

    /**
     * do delete in a random one-off conn with quickConnConfig
     * @async
     * @param {!string} sql - delete sql
     * @returns {Promise<number>} a promise, if success, it would be this sql result's affectedRows
     */
    async del(sql: string): Promise<number>;

    /**
     * you can put any sql into it, running with a random one-off conn
     * @async
     * @param {!string} sql - free sql
     * @returns {Promise<T>} Promise
     */
    async sql(sql: string): Promise<T>;

    /**
     * you can put any sql into it, running with a random one-off conn
     * @async
     * @param {string} name 库名字
     * @param {string} character 字符编码
     * @param {string} collation 字符集
     * @returns {Promise<T>} Promise
     */
    async newDb(name: string, character: string, collation: string): Promise<T>;

    async delDb(name: string): Promise<T>;

    /**
     * get all db's name
     * @async
     * @returns {Promise<Array<Map<dbname,string>>>} a promise, if success, it would be a list of dbnames and the key is "dbname"
     */
    async getDbs(): Promise<Array<Map<dbname,string>>>;

    /**
     * get tables' name from a db, running with a random one-off conn
     * @async
     * @param {string|undefined|null|""} dbname - the name of the db you want to get all tables' name from. If you assign it with undefined, null, "" or don't pass it, the function will use this conn's default database
     * @returns {Promise<Array<Map<tbname,string>>>} a promise, if success, it would be a list of tbnames and the key is "tbname"
     */
    async getTbs(dbname: string|undefined|null|""): Promise<Array<Map<tbname,string>>>;

    /**
     * get a tables' struct, running with a random one-off conn
     * @async
     * @param {!string} tbname - the name of the that you want to its construction
     * @returns {Promise<Array<Map<dbname,string>>>} a promise, if success, it would be a list of db names and the key is "dbname"
     */
    async getTbStruct(tbname: string): Promise<Array<Map<dbname,string>>>;

}



