import mysql from '../node_modules/mysql/index.js';

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
    select: (sql)=>{
        pool.sqlpool.getConnection((err, conn)=> {
            if (err) {
                console.log('【SQL ERROR】: ', err.message);
                return;
            }
            conn.query(sql, (err, results)=> {
                console.log(sql + ";");
                results = JSON.parse(JSON.stringify(results));
                console.log(results);
                conn.release();
            })
        })
    }
}

let db = {
    name: 'db',
    type: 'Object',
    pool: pool,
}

export default db;
