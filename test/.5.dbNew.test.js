let db = require("../index.js");

test('create a new database', async ()=>{
    db.quickConnConfig.database = "evanpatchouli_mysql_test";
    let rs = await db.newDb("testdb");
    console.log(rs);
    
});
