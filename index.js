let db = require("./dist/sql.js").default;

async function tset() {
  console.log(
    "======================================TEST0======================================"
  );
  db.quickConnConfig.database = "springdemo";
  console.log("the default config of db's quick connection:");
  console.log(db.quickConnConfig, "\n");

  let x = await db.sel("select * from user");
  console.log("under: your default config.database => springdemo");
  console.log("connection: random once");
  console.log(x, "\n");

  let conn0 = await db.conn("localhost", 3306, "root", "root", "springdemo");
  x = await conn0.sel("select * from userinfo");
  conn0.close();
  console.log("connection: random persistent");
  console.log(x);

  console.log(
    "======================================TEST1======================================"
  );

  db.pool.init("localhost", 3306, "root", "root", "");
  console.log("pool: init");

  db.pool.switch("mysql");
  console.log("pool: db switch to mysql");

  let res = await db.pool.sel("select User from db limit 1");

  console.log("under: mysql");
  console.log("connection: random in pool persistent");
  console.log(res);

  console.log(
    "======================================TEST2======================================"
  );

  let conn1 = await db.pool.conn();

  // switch db
  conn1.siwtch("springdemo");
  console.log("pool: db switch to springdemo");

  let sql2 =
    "select TABLE_NAME AS 'name' from information_schema.tables where table_schema='springdemo'";
  res = await conn1.sel(sql2);

  console.log("under: springdemo");
  console.log("connection: conn1 in pool persistent");
  console.log(res);

  console.log(
    "======================================TEST3======================================"
  );

  // select user in springdemo
  let sql3 = "select * from user";
  res = await conn1.sel(sql3);

  console.log("under: springdemo");
  console.log("connection: conn1 in pool persistent");
  console.log(res);

  console.log(
    "======================================TEST4======================================"
  );

  // update user in springdemo
  let sql4 = "update user set name='user3' where id=5";
  res = await conn1.upd(sql4);

  console.log("under: springdemo");
  console.log("connection: conn1 in pool persistent");
  console.log(res);

  console.log(
    "======================================TEST5======================================"
  );

  // insert user in springdemo
  let sql5 = "insert into user (name,pwd) values ('user3','userpwd')";
  res = await conn1.ins(sql5);

  console.log("under: springdemo");
  console.log("connection: conn1 in pool persistent");
  console.log(res);

  console.log(
    "======================================TEST6======================================"
  );

  // delete user in springdemo
  let sql6 = "delete from user where name='user3' or name='user4'";
  res = await conn1.del(sql6);

  console.log("under: springdemo");
  console.log("connection: conn1 in pool persistent");
  console.log(res);
  conn1.close();
  db.pool.close();
}

tset();
