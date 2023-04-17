let db = require("../index.js");

test('drop a database', async ()=>{
    db.quickConnConfig.database = "evanpatchouli_mysql_test";
    let rs = await db.delDb("testdb");
    console.log(rs);
});
