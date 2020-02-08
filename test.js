const bcrypt = require('bcryptjs');

const Station = require('./models2/stationModel');
var pool = require('./database');


//const enpass =  bcrypt.hash('pass123456', 12);
//console.log("password:::::");
//console.log(enpass);


async function run() {
    const enpass =  await bcrypt.hash('pass123456', 12);
    
    console.log("password:::::");
    console.log(enpass);
}

// async function getall() {
//     const all =  await Station.getAllStations();
    
//     console.log("STATIONS:::::");
//     console.log(all);
// }
// //run();
// getall();





var getAllStations = async function() {
    
    let result = await Station.getAllStations();
    
    console.log("out function result: " + result);
};

getAllStations();