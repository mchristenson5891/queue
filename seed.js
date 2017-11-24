// First we must require our database
require('dotenv').config();
require('./config/database');
var User = require('./models/User');

// Import our Mongoose models
// const Teacher = require('./models/User');

// Destroy all data in database
const seed = Promise.all([User.remove({})])


seed.then(() => {
    return User.create([
        { fullName: 'Jim', instructor: true },
        { fullName: 'Jon', instructor: true },
<<<<<<< HEAD
        { githubUserName: 'mchristenson5891', instructor: true},
        { githubUserName: 'pfinazzo', instructor: false},
        { githubUserName: 'anessaa', instructor: true},
        { githubUserName: 'prancy', instructor: true }
=======
        { githubUserName: 'Bobby', instructor: false},
        { githubUserName: 'mchristenson5891', instructor: true, cohort: "44" },
        { githubUserName: 'Time', instructor: false},
        { githubUserName: 'Dani', instructor: false, cohort: "45"},
        { githubUserName: 'prancy', instructor: true }

>>>>>>> ed24c51e12e6c4e47a24ca35d1380a49c2b23eab
    ])
})

// Let's log out all students and add add 2 teachers
// .then((users) => {
//     console.log(users);
//     return User.create([
//         { name: "Jay", age: 34, class: 'UXDI', students: [ students[0]._id, students[1]._id ] },
//         { name: "Jon", age: 7, class: 'WDI', students: [ students[2]._id, students[3]._id ] },
//     ])
// })

// Let's log out teachers and close the connection to our Mongoose database
.then((users) => {
    console.log(users);
    require('mongoose').connection.close();
    process.exit();
})
