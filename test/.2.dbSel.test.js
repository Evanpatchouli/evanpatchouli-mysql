let db = require("../index.js");

test('select * from user', async ()=>{
    db.quickConnConfig.database = "evanpatchouli_mysql_test";
    let expt = [
        { id: 1, username: 'user1', password: '123456' },
    ]
    expt = JSON.parse(JSON.stringify(expt));
    let rs = await db.sel("select * from user");
    console.log('expect:\n',expt);
    console.log('result:\n',rs);
    expect(rs).toStrictEqual(expt);
    rs = storage.get("rs");
    console.log("test2: "+ rs);
    let all = storage.getAll();
    console.log("test2-all: ", all);
});