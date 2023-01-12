import db from "./lib/sql.js";

db.pool.init("localhost", 3306, "root", "root", "springdemo");
db.pool.select("show databases like 'springdemo'")
    .then((result) => {
        console.log("====================BEGIN====================");
        console.log("sql:", result.sql);
        console.log(result.res);
        console.log("sql has done");
        console.log("====================ENDUP====================");
        let sql =
            "select TABLE_NAME from information_schema.tables where table_schema='springdemo'";
        return db.pool.select(sql);
    })
    .then((result) => {
        console.log("====================BEGIN====================");
        console.log("sql:", result.sql);
        console.log(result.res);
        console.log("sql has done");
        console.log("====================ENDUP====================");
        let table = result.res[0]["TABLE_NAME"];
        return db.pool.select("select * from " + table);
    })
    .then((result) => {
        console.log("====================BEGIN====================");
        console.log("sql:", result.sql);
        console.log(result.res);
        console.log("sql has done");
        console.log("====================ENDUP====================");
    })
    .catch((reason) => {
        console.log(reason);
    });
