let Db = require("../index.js");

test('insert into user', async ()=>{
    Db.quickConnConfig.database = "evanpatchouli_mysql_test";
    let expt = 1;
    // expt = JSON.parse(JSON.stringify(expt));
    let rs = await Db.ins("insert into user (id,username) values(1,'user1')");
    console.log(expt);
    console.log(rs);
    expect(rs).toStrictEqual(expt);
    
});
