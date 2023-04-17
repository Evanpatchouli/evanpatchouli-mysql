let db = require("../index.js");

test('get dbs', async ()=>{
    db.quickConnConfig.database = "evanpatchouli_mysql_test";
    let rs = await db.getDbs();
    console.log(rs);
});