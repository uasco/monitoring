const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const scheduler = require('./scheduler');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
//const tourRouter = require('./routes/tourRoutes');
//const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');
/////
const stationRouter = require('./routes2/stationRoutes');
const valueRouter = require('./routes2/valueRoutes');

const viewRouter2 = require('./routes2/viewRoutes');

const statusRouter = require('./routes2/statusRoutes');
const stnRouter = require('./routes2/stnRoutes');
const userRouter = require('./routes2/userRoutes');

const cacheRouter = require('./routes2/cacheRoutes');

var helpers = require('./utils/helpers.js');


const app = express();

app.set('view engine', 'pug');
/////app.set('views', path.join(__dirname, 'views'));
/////
app.set('views', path.join(__dirname, 'views2'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
/////app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price',
//       'codeview'
//     ]
//   })
// );

app.locals.range = helpers.range;
// Test middleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   console.log("from test middleware: ");
//   console.log(req.cookies);
//   next();
// });




// 3) ROUTES
/////app.use('/', viewRouter);
/////
app.use('/', viewRouter2);
//app.use('/api/v1/tours', tourRouter);
//app.use('/api/v1/reviews', reviewRouter);



//app.use('/api/stations',cacheMiddleWare(30), stationRouter);//with memory cache


app.use('/api/stations', stationRouter);


app.use('/api/values', valueRouter);


app.use('/api/status', statusRouter);

app.use('/api/stns', stnRouter);

app.use('/api/users', userRouter);

app.use('/api/caches', cacheRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);








const util = require('util');
const Station = require('./models2/stationModel');



// const Stn = require('./models/stnModel');
// async function stns() {
//     const stations = await Station.getStationsNamesAndIDs('all');
//     var resultJson = JSON.stringify(stations);
//     resultJson = JSON.parse(resultJson);
//
//     Stn.deleteMany({}, function(err) {})
//     if(resultJson.length>0){
//         resultJson.map(async el  => {
//             await Stn.create({
//                 station_name: el.position,
//                 client_id: el.id
//             });
//         })
//     }
// }
// s=util.promisify(stns);
// s();


setTimeout(function() {
  scheduler.clearRainValuesCache();
  scheduler.clearLevelValueCache();
  scheduler.clearClimaValuesCache();
  scheduler.clearRainTotalsMonthsCache();
  scheduler.clearLevelLastHoursCache();
  scheduler.clearClimaLastHoursCache();
  scheduler.clearClimaRainTotalsMonthsCache();
}, 30000);


require('events').EventEmitter.defaultMaxListeners = 60;

module.exports = app;
