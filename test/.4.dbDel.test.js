let db = require("../index.js");

test('delete user', async ()=>{
    db.quickConnConfig.database = "evanpatchouli_mysql_test";
    let expt = 1;
    // expt = JSON.parse(JSON.stringify(expt));
    let rs = await db.del("delete from user where id=1");
    console.log(expt);
    console.log(rs);
    expect(rs).toStrictEqual(expt);
});