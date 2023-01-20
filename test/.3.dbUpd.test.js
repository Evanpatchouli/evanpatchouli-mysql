let db = require("../dist/sql.js").default;

test('update user', async ()=>{
    db.quickConnConfig.database = "evanpatchouli_mysql_test";
    let expt = 1;
    // expt = JSON.parse(JSON.stringify(expt));
    let rs = await db.upd("update  user set password='root' where id=1");
    console.log(expt);
    console.log(rs);
    expect(rs).toStrictEqual(expt);
});