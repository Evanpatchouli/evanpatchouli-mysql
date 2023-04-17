let db = require("./dist/sql.js").default;

// async function test() {
//     db.quickConnConfig.database = "springdemo";
//     let rs = await db.sel("select * from user");
//     console.log(rs);
// }
// test();

module.exports = db;