import mysql from '../node_modules/mysql/index.js';
// const mysql = require('mysql');

// let conn = mysql.createConnection();



let use = (conn, dbname)=>{
    let sql = 'USE ' + dbname;
    conn.query(sql)
}

let doUpdate = (conn,sql)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data = {
                    sql: sql,
                    res: sqlres.affectedRows
                };
                resolve(data);
            }
        })
    })
}

let doUpdateOnce = (conn,sql)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            conn.destroy();
            console.log('Ok, this conn has been destroyed')
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data = {
                    sql: sql,
                    res: sqlres.affectedRows
                };
                resolve(data);
            }
        })
    })
}

let doInsert = (conn,sql)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data = {
                    sql: sql,
                    res: sqlres.affectedRows
                };
                resolve(data);
            }
        })
    })
}

let doInsertOnce = (conn,sql)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            conn.destroy();
            console.log('Ok, this conn has been destroyed')
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data = {
                    sql: sql,
                    res: sqlres.affectedRows
                };
                resolve(data);
            }
        })
    })
}

let doDelete = (conn,sql)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data = {
                    sql: sql,
                    res: sqlres.affectedRows
                };
                resolve(data);
            }
        })
    })
}

let doDeleteOnce = (conn,sql)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            conn.destroy();
            console.log('Ok, this conn has been destroyed')
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data = {
                    sql: sql,
                    res: sqlres.affectedRows
                };
                resolve(data);
            }
        })
    })
}

let doSelect = (conn,sql)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data = {
                    sql: sql,
                    res: sqlres
                };
                resolve(data);
            }
        })
    })
}

let doSelectOnce = (conn,sql)=>{
    return new Promise((resolve, reject) => {
        conn.query(sql,(err,sqlres)=>{
            conn.destroy();
            console.log('Ok, this conn has been destroyed')
            if(err){
                db.throw(err);
                reject(err.message);
            }else{
                sqlres = JSON.parse(JSON.stringify(sqlres));
                let data = {
                    sql: sql,
                    res: sqlres
                };
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

// let poolselect = (sql)=>{
//     return getConnFromPool()
//     .then((conn=>{
//         return doSelect(conn,sql)
//     }))
// }

let poolDirectAction = async (actionfx,sql)=>{
    const conn = await getConnFromPool();
    return actionfx(conn, sql);
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
    select: async (sql)=>{
        return await poolDirectAction(doSelectOnce,sql)
    },
    update: async (sql)=>{
        return await poolDirectAction(doUpdateOnce,sql)
    },
    insert: async (sql)=>{
        return await poolDirectAction(doInsertOnce,sql)
    },
    delete: async (sql)=>{
        return await poolDirectAction(doDeleteOnce,sql)
    },
    close(){
        this.sqlpool.end();
        console.log('Ok, this pool has been closed')
    },
    conn: async ()=>{
        let newconn = await getConnFromPool();
        let conn = {
            conn: newconn,
            async select(sql){
                return await doSelect(this.conn,sql);
            },
            async update(sql){
                return await doUpdate(this.conn,sql);
            },
            async insert(sql){
                return await doInsert(this.conn,sql);
            },
            async delete(sql){
                return await doDelete(this.conn,sql);
            },
            siwtch(dbname) {
                use(this.conn, dbname)
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
            async get(sql){
                return await doSelect(this.conn,sql)
            },
            async fix(sql){
                return await doUpdate(this.conn,sql)
            },
            async add(sql){
                return await doInsert(this.conn,sql)
            },
            async del(sql){
                return await doDelete(this.conn,sql)
            },
            siwtch(dbname) {
                use(this.conn, dbname)
            },
            close(){
                this.conn.destroy();
                console.log('Ok, this conn has been destroyed')
            }
        }
        return conntmp;
    },
    async get(sql){
        let newconn = this.newconn();
        return await doSelectOnce(newconn,sql)
    },
    async fix(sql){
        let newconn = this.newconn();
        return await doUpdateOnce(newconn,sql)
    },
    async add(sql){
        let newconn = this.newconn();
        return await doInsertOnce(newconn,sql)
    },
    async del(sql){
        let newconn = this.newconn();
        return await doDeleteOnce(newconn,sql)
    }

}    

export default db;
