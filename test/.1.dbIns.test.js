let db = require("../dist/sql.js").default;

test('insert into user', async ()=>{
    db.quickConnConfig.database = "evanpatchouli_mysql_test";
    let expt = 1;
    // expt = JSON.parse(JSON.stringify(expt));
    let rs = await db.ins("insert into user (id,username) values(1,'user1')");
    console.log(expt);
    console.log(rs);
    expect(rs).toStrictEqual(expt);
});