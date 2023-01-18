import mysql from "mysql";
// const mysql = require('mysql');

// let conn = mysql.createConnection();

let use = (conn, dbname)=>{
    let sql = 'USE ' + dbname;
    conn.query(sql)
}

let doUpdate = (conn,sql,type)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            if (db.mode != "debug" && db.mode != "non-debug") {
                reject("unknown mode");
            }
            if (type == "once") {
                conn.destroy();
                if(db.mode == "debug") {
                    console.log('Ok, this conn has been destroyed')
                }
            } else if (type == "lasting" || type == undefined || type == null || type == "") {
                // do nothing
            } else {
                reject("unkonwn conn type");
            }
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data;
                // let affectedRows = sqlres.affectedRows;
                // let changedRows = sqlres.changedRows;
                if(db.mode == "debug") {
                    data = {
                        sql: sql,
                        res: sqlres
                    };
                    console.log('sql:',sql)
                } else {
                    data = sqlres.affectedRows + sqlres.changedRows - 1;
                }
                resolve(data);
            }
        })
    })
}

let doInsert = (conn,sql,type,hope)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            if (db.mode != "debug" && db.mode != "non-debug") {
                reject("unknown mode");
            }
            if (type == "once") {
                conn.destroy();
                if(db.mode == "debug") {
                    console.log('Ok, this conn has been destroyed')
                }
            } else if (type == "lasting" || type == undefined || type == null || type == "") {
                // do nothing
            } else {
                reject("unkonwn conn type");
            }
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data;
                if(db.mode == "debug") {
                    data = {
                        sql: sql,
                        res: sqlres
                    };
                    console.log('sql:',sql)
                } else {
                    if (hope == "autoid") {
                        let sql2 = "SELECT LAST_INSERT_ID() as lastid"
                        conn.query(sql2,(err2,sqlres2)=>{
                            if(err2){
                                reject(err2.message);
                            } else {
                                data = {
                                    autoid : sqlres2.lastid,
                                    affectedRows: sqlres.affectedRows
                                }
                            }
                        })
                    } else if (hope == "all") {
                        data = sqlres
                    }else if (hope == "default" || hope == undefined || hope == null || hope == ""){
                        data = sqlres.affectedRows
                    }
                }
                resolve(data);
            }
        })
    })
}

let doDelete = (conn,sql,type)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            if (db.mode != "debug" && db.mode != "non-debug") {
                reject("unknown mode");
            }
            if (type == "once") {
                conn.destroy();
                if(db.mode == "debug") {
                    console.log('Ok, this conn has been destroyed')
                }
            } else if (type == "lasting" || type == undefined || type == null || type == "") {
                // do nothing
            } else {
                reject("unkonwn conn type");
            }
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data;
                if(db.mode == "debug") {
                    data = {
                        sql: sql,
                        res: sqlres
                    };
                    console.log('sql:',sql)
                } else {
                    data = sqlres.affectedRows
                }
                resolve(data);
            }
        })
    })
}

let doSelect = (conn,sql,type)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            if (db.mode != "debug" && db.mode != "non-debug") {
                reject("unknown mode");
            }
            if (type == "once") {
                conn.destroy();
                if(db.mode == "debug") {
                    console.log('Ok, this conn has been destroyed')
                }
            } else if (type == "lasting" || type == undefined || type == null || type == "") {
                // do nothing
            } else {
                reject("unkonwn conn type");
            }
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data;
                if(db.mode == "debug") {
                    data = {
                        sql: sql,
                        res: sqlres
                    };
                    console.log('sql:',sql)
                } else {
                    data = sqlres
                }
                resolve(data);
            }
        })
    })
}

let doFreeSql = doSelect;

let showTbStruct = (conn,tbname,type)=>{
    let sql = "show full columns from ??";
    return new Promise((resolve, reject) => {
        conn.query(sql,tbname,(err,sqlres)=>{
            if (db.mode != "debug" && db.mode != "non-debug") {
                reject("unknown mode");
            }
            if (type == "once") {
                conn.destroy();
                if(db.mode == "debug") {
                    console.log('Ok, this conn has been destroyed')
                }
            } else if (type == "lasting" || type == undefined || type == null || type == "") {
                // do nothing
            } else {
                reject("unkonwn conn type");
            }
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data;
                if(db.mode == "debug") {
                    data = {
                        sql: sql,
                        res: sqlres
                    };
                    console.log('sql:',sql)
                } else {
                    data = sqlres
                }
                resolve(data);
            }
        })
    })
}

let getConnFromPool = ()=>{
    return new Promise((resolve, reject) => {
        pool.sqlpool.getConnection((err, conn)=> {
            if(err) {
                db.throw(err);
                reject(err.message);
            }
            resolve(conn);
        })
    });
}

let poolDirectAction = async (actionfx,sql)=>{
    const conn = await getConnFromPool();
    return actionfx(conn, sql,"once");
}

let pool = {
    config: {
        host: undefined,
        port: undefined,
        user: undefined,
        password: undefined,
        database: undefined,
        connlimit: 10,
    },
    sqlpool: undefined,
    init(host, port, user, pwd, database){
        this.config.host = host;
        this.config.port = port;
        this.config.user = user;
        this.config.password = pwd;
        this.config.database = ((database != null || database != '') ? database : undefined);
        let p = mysql.createPool({
            host: this.config.host,
            port: this.config.port,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database
        })
        this.sqlpool = p;
    },
    switch(dbname){
        this.sqlpool.config.connectionConfig.database = dbname;
    },
    sel: async (sql)=>{
        return await poolDirectAction(doSelect,sql)
    },
    upd: async (sql)=>{
        return await poolDirectAction(doUpdate,sql)
    },
    ins: async (sql)=>{
        return await poolDirectAction(doInsert,sql)
    },
    del: async (sql)=>{
        return await poolDirectAction(doDelete,sql)
    },
    async getDbs(){
        let sql = "select schema_name as dbname from information_schema.schemata"
        return await poolDirectAction(doSelect, sql)
    },
    async getTbs(dbname){
        let sql;
                if(dbname == undefined || dbname == "" || dbname == null) {
                    sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + this.config.database + '\'';
                } else {
                    sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
                }
        return await poolDirectAction(doSelect, sql)
    },
    getTbStruct: async (tbname)=>{
        return await showTbStruct(showTbStruct,tbname)
    },
    close(){
        this.sqlpool.end();
        console.log('Ok, this pool has been closed')
    },
    conn: async ()=>{
        let newconn = await getConnFromPool();
        let conn = {
            conn: newconn,
            config: {
                host: newconn.config.host,
                port: newconn.config.port,
                user: newconn.config.user,
                password: newconn.config.password,
                database: newconn.config.database
            },
            async sel(sql){
                return await doSelect(this.conn,sql);
            },
            async upd(sql){
                return await doUpdate(this.conn,sql);
            },
            async ins(sql){
                return await doInsert(this.conn,sql);
            },
            async del(sql){
                return await doDelete(this.conn,sql);
            },
            async getDbs(){
                let sql = "select schema_name as dbname from information_schema.schemata"
                return await doSelect(this.conn, sql)
            },
            async getTbs(dbname){
                let sql;
                if(dbname == undefined || dbname == "" || dbname == null) {
                    sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + this.config.database + '\'';
                } else {
                    sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
                }
                return await doSelect(this.conn, sql, "once")
            },
            async getTbStruct(tbname){
                return await showTbStruct(this.conn,tbname)
            },
            siwtch(dbname) {
                use(this.conn, dbname)
                this.config.database = dbname
            },
            free(){
                this.conn.release();
                console.log('Ok, this conn has been released')
            },
            close(){
                this.conn.destroy();
                console.log('Ok, this conn has been destroyed')
            }
        }
        return conn;
    }
}

let db = {
    name: 'db',
    type: 'Object',
    mode: 'non-debug',
    pool: pool,
    throw: (err)=>{
        console.log('【SQL ERROR】: ', err.message);
    },
    quickConnConfig: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: undefined
    },
    newconn(){
        return mysql.createConnection({
            host: this.quickConnConfig.host,
            port: this.quickConnConfig.port,
            user: this.quickConnConfig.user,
            password:this.quickConnConfig.password,
            database: ((this.quickConnConfig.database != null || this.quickConnConfig.database != '') ? this.quickConnConfig.database : undefined)
        })
    },
    conn: async (host, port, user, pwd, database)=>{
        let newconn = mysql.createConnection({
            host: host,
            port: port,
            user: user,
            password: pwd,
            database: database
        })
        let conntmp = {
            conn: newconn,
            config: {
                host: host,
                port: port,
                user: user,
                password: pwd,
                database: database
            },
            async sel(sql){
                return await doSelect(this.conn,sql)
            },
            async upd(sql){
                return await doUpdate(this.conn,sql)
            },
            async ins(sql){
                return await doInsert(this.conn,sql)
            },
            async del(sql){
                return await doDelete(this.conn,sql)
            },
            async getDbs(){
                let sql = "select schema_name as dbname from information_schema.schemata"
                return await doSelect(this.conn, sql)
            },
            async getTbs(dbname){
                let sql;
                if(dbname == undefined || dbname == "" || dbname == null) {
                    sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + this.config.database + '\'';
                } else {
                    sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
                }
                return await doSelect(this.conn, sql)
            },
            async getTbStruct(tbname){
                return await showTbStruct(this.conn,tbname)
            },
            siwtch(dbname) {
                use(this.conn, dbname)
                this.config.database = dbname
            },
            close(){
                this.conn.destroy();
                console.log('Ok, this conn has been destroyed')
            }
        }
        return conntmp;
    },
    async sel(sql){
        let newconn = this.newconn();
        return await doSelect(newconn,sql,"once")
    },
    async upd(sql){
        let newconn = this.newconn();
        return await doUpdate(newconn,sql,"once")
    },
    async ins(sql){
        let newconn = this.newconn();
        return await doInsert(newconn,sql,"once")
    },
    async del(sql){
        let newconn = this.newconn();
        return await doDelete(newconn,sql,"once")
    },
    async sql(sql){
        let newconn = this.newconn();
        return await doFreeSql(newconn,sql,"once")
    },
    async getTbs(dbname){
        let sql;
        if(dbname == undefined || dbname == "" || dbname == null) {
            sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + this.quickConnConfig.database + '\'';
        } else {
            sql = 'select table_name as tbname from information_schema.tables Where table_schema = ' + '\'' + dbname + '\'';
        }
        return await doSelect(this.newconn(), sql, "once")
    },
    async getTbStruct(tbname){
        let newconn = this.newconn();
        return await showTbStruct(newconn,tbname,"once")
    },


}    

// db.mode = "debug";

// db.quickConnConfig.database = 'SPRINGDEMO';

// let rs;

// // rs = await db.getTbs();

// // let conn = await db.conn("localhost",3306,"root","root","onlinemall");
// // rs = await conn.getTbs();

// db.pool.init("localhost",3306,"root","root","onlinemall")
// // rs = await db.pool.getTbs();

// let conn = await db.pool.conn();
// conn.siwtch("springdemo");
// rs = await conn.getTbs();

// console.log(rs);
// conn.close();

export default db;
