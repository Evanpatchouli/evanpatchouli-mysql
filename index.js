import db from './lib/sql.js'

let x = myadd(1,2);
console.log(x);

db.pool.init('localhost',3306,'root','root','springdemo');
let SQL = [
    'select * from user'
]
db.pool.select(SQL[0]);

