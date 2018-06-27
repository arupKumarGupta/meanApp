const bcrypt = require('bcryptjs');
let pwd = 'abc124';
let hash = bcrypt.hashSync(pwd, 10);
console.log(hash);
bcrypt.compare('ass', hash, (e, m) => {
    console.log(e);
    console.log(m);
});