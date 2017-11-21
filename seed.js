// First we must require our database
require('./config/database');
var User = require('./models/User');
require('dotenv').config();

// Import our Mongoose models
const Teacher = require('./models/User');

// Destroy all data in database
const seed = Promise.all([User.remove({})])


seed.then(() => {
    return User.create([
        { fullName: 'Jim', instructor: true },
        { fullName: 'Jon', instructor: true },
        { githubUserName: 'mchristenson5891', instructor: true }
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