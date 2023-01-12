import mysql from '../node_modules/mysql/index.js';

let doselect = (conn,sql)=>{
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

let poolselect = (sql)=>{
    return getConnFromPool()
    .then((conn=>{
        return doselect(conn,sql)
    }))
}

let pool = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'springdemo',
    sqlpool: undefined,
    init: (host, port, user, pwd, database)=>{
        pool.host = host;
        pool.port = port;
        pool.user = user;
        pool.password = pwd;
        pool.database = database;
        let p = mysql.createPool({
            host: host,
            port: port,
            user: user,
            password: pwd,
            database: database
        })
        pool.sqlpool = p;
    },
    select: poolselect,
}



let db = {
    name: 'db',
    type: 'Object',
    pool: pool,
    throw: (err)=>{
        console.log('【SQL ERROR】: ', err.message);
    }
}    

export default db;
