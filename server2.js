const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskManager = require('./utils/taskManager');
// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

dotenv.config({ path: './config.env' });
const app = require('./app2');


//const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
const DB = process.env.DATABASE_LOCAL;
mongoose
    .connect(DB, {
        auth: {
            user: process.env.DB_USER,
            password: process.env.DATABASE_PASSWORD,
            port: process.env.DB_PORT
        },
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connection successful!'));

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

//taskManager.detectAlarms();


