let Db = require("../index.js");

test('get dbs', async ()=>{
    Db.quickConnConfig.database = "evanpatchouli_mysql_test";
    let rs = await Db.getDbs();
    console.log(rs);
});
