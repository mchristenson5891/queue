// First we must require our database
require('dotenv').config();
require('./config/database');
var User = require('./models/User');


// Destroy all data in database
const seed = Promise.all([User.remove({})])


seed.then(() => {
    return User.create([
        { fullName: 'Jim', instructor: true },
        { fullName: 'Jon', instructor: true },
        { githubUserName: 'pfinazzo', instructor: true},
        { githubUserName: 'mchristenson5891', instructor: true, cohort: "44" },
        { githubUserName: 'anessaa', instructor: false}
    ])
})

.then((users) => {
    console.log(users);
    require('mongoose').connection.close();
    process.exit();
})
