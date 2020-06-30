const path = require('path');
var mcache = require('memory-cache');
var flatCache = require('flat-cache');
const my_date = require('../utils/my_date');
///// configure cache middleware
let memCache = new mcache.Cache();
exports.cacheMiddleWare = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cacheContent = memCache.get(key);
        if (cacheContent) {
            res.send(cacheContent);
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                memCache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}



/////load new cache :
// console.log("////////loading the stattions cache/////////////");
let stationsCache = flatCache.load("stationsCache", path.resolve("../cache"));
exports.stationsFlatCacheMiddleWare = (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = stationsCache.getKey(key);
    //console.log("key :::::::::::: ");
    //console.log(key);
    //console.log("casheeeed:::::");
    //console.log(cacheContent);
    if (cacheContent) {
        // console.log("#*******************stattions cached happened**********************#");
        res.send(cacheContent);
        return;
    } else {
        // console.log("%%%%%%%%%%%%%%%%%%%stattions cached DID NOT happend %%%%%%%%%%%%%%%");
        res.sendResponse = res.send;
        res.send = body => {
            stationsCache.setKey(key, body);
            stationsCache.save(true);
            res.sendResponse(body);
        };
        next();
    }
};


/////load new cache :
// console.log("////////loading the rainValues cache/////////////");
let rainValuesCache = flatCache.load("rainValuesCache", path.resolve("../cache"));
exports.rainValuesFlatCacheMiddleWare = (req, res, next) => {
    rainValuesCache = flatCache.load("rainValuesCache", path.resolve("../cache"));
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = rainValuesCache.getKey(key);
    //console.log("key :::::::::::: ");
    //console.log(key);
    //console.log("casheeeed:::::");
    //console.log(cacheContent);
    if (cacheContent) {
         // console.log("*******************rainValues cached happened**********************");
        res.send(cacheContent);
        return;
    } else {
         // console.log("%%%%%%%%%%%%%%%%%%%rainValues cached DID NOT happend %%%%%%%%%%%%%%%");
        res.sendResponse = res.send;
        res.send = body => {
            rainValuesCache.setKey(key, body);
            rainValuesCache.save(true);
            res.sendResponse(body);
        };
        next();
    }
};
exports.clearRainValuesCache = () => {
    rainValuesCache = '';
    // console.log("%%%%%%%%%%%%%%%%%%%rainValues cached cleared %%%%%%%%%%%%%%%");
    // console.log(`at = ${my_date.jNow()}`);
}
/////load new cache :
// console.log("////////loading the rainTotalsMonths cache/////////////");
let rainTotalsMonthsCache = flatCache.load("rainTotalsMonthsCache", path.resolve("../cache"));
exports.rainTotalsMonthsFlatCacheMiddleWare = (req, res, next) => {
    rainTotalsMonthsCache = flatCache.load("rainTotalsMonthsCache", path.resolve("../cache"));
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = rainTotalsMonthsCache.getKey(key);
    //console.log("key :::::::::::: ");
    //console.log(key);
    //console.log("casheeeed:::::");
    //console.log(cacheContent);
    if (cacheContent) {
        // console.log("*******************rainTotalsMonths cached happened**********************");
        res.send(cacheContent);
        return;
    } else {
        // console.log("%%%%%%%%%%%%%%%%%%%rainTotalsMonths cached DID NOT happend %%%%%%%%%%%%%%%");
        res.sendResponse = res.send;
        res.send = body => {
            rainTotalsMonthsCache.setKey(key, body);
            rainTotalsMonthsCache.save(true);
            res.sendResponse(body);
        };
        next();
    }
};

exports.clearRainTotalsMonthsCache = () => {
    rainTotalsMonthsCache = '';
    // console.log("%%%%%%%%%%%%%%%%%%%rainTotalsMonths cached cleared %%%%%%%%%%%%%%%");
    // console.log(`at = ${my_date.jNow()}`);
}

/////load new cache :
// console.log("////////loading the levelValue cache/////////////");
let levelValueCache = flatCache.load("levelValueCache", path.resolve("../cache"));
exports.levelValueFlatCacheMiddleWare = (req, res, next) => {
    levelValueCache = flatCache.load("levelValueCache", path.resolve("../cache"));
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = levelValueCache.getKey(key);
    //console.log("key :::::::::::: ");
    //console.log(key);
    //console.log("casheeeed:::::");
    //console.log(levelValueCache);
    if (cacheContent) {
        // console.log("*******************levelValue cached happened**********************");
        res.send(cacheContent);
        return;
    } else {
        // console.log("%%%%%%%%%%%%%%%%%%%levelValue cached DID NOT happend %%%%%%%%%%%%%%%");
        res.sendResponse = res.send;
        res.send = body => {
            levelValueCache.setKey(key, body);
            levelValueCache.save(true);
            res.sendResponse(body);
        };
        next();
    }
};
exports.clearLevelValueCache = () => {
    levelValueCache = '';
    // console.log("%%%%%%%%%%%%%%%%%%%levelValue cached cleared %%%%%%%%%%%%%%%");
    // console.log(`at = ${my_date.jNow()}`);
}
/////load new cache :
// console.log("////////loading the levelLastHours cache/////////////");
let levelLastHoursCache = flatCache.load("levelLastHoursCache", path.resolve("../cache"));
exports.levelLastHoursFlatCacheMiddleWare = (req, res, next) => {
    levelLastHoursCache = flatCache.load("levelLastHoursCache", path.resolve("../cache"));
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = levelLastHoursCache.getKey(key);
    //console.log("key :::::::::::: ");
    //console.log(key);
    //console.log("casheeeed:::::");
    //console.log(cacheContent);
    if (cacheContent) {
         // console.log("*******************levelLastHours cached happened**********************");
        res.send(cacheContent);
        return;
    } else {
         // console.log("%%%%%%%%%%%%%%%%%%%levelLastHours cached DID NOT happend %%%%%%%%%%%%%%%");
        res.sendResponse = res.send;
        res.send = body => {
            levelLastHoursCache.setKey(key, body);
            levelLastHoursCache.save(true);
            res.sendResponse(body);
        };
        next();
    }
};
exports.clearlevelLastHoursCache=()=>{
    levelLastHoursCache ='';
    // console.log("%%%%%%%%%%%%%%%%%%%levelLastHours cached cleared %%%%%%%%%%%%%%%");
    // console.log(`at = ${my_date.jNow()}`);
}
/////load new cache :
// console.log("////////loading the climaValues cache/////////////");
let climaValuesCache = flatCache.load("climaValuesCache", path.resolve("../cache"));
exports.climaValuesFlatCacheMiddleWare = (req, res, next) => {
    climaValuesCache = flatCache.load("climaValuesCache", path.resolve("../cache"));
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = climaValuesCache.getKey(key);
    //console.log("key :::::::::::: ");
    //console.log(key);
    //console.log("casheeeed:::::");
    //console.log(cacheContent);
    if (cacheContent) {
        // console.log("*******************climaValues cached happened**********************");
        res.send(cacheContent);
        return;
    } else {
        // console.log("%%%%%%%%%%%%%%%%%%%climaValues cached DID NOT happend %%%%%%%%%%%%%%%");
        res.sendResponse = res.send;
        res.send = body => {
            climaValuesCache.setKey(key, body);
            climaValuesCache.save(true);
            res.sendResponse(body);
        };
        next();
    }
};
exports.clearClimaValuesCache = () => {
    climaValuesCache = '';
    // console.log("%%%%%%%%%%%%%%%%%%%climaValues cached cleared %%%%%%%%%%%%%%%");
    // console.log(`at = ${my_date.jNow()}`);
}
/////load new cache :
// console.log("////////loading the climaLastHours cache/////////////");
let climaLastHoursCache = flatCache.load("climaLastHoursCache", path.resolve("../cache"));
exports.climaLastHoursFlatCacheMiddleWare = (req, res, next) => {
    climaLastHoursCache = flatCache.load("climaLastHoursCache", path.resolve("../cache"));
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = climaLastHoursCache.getKey(key);
    //console.log("key :::::::::::: ");
    //console.log(key);
    //console.log("casheeeed:::::");
    //console.log(cacheContent);
    if (cacheContent) {
        // console.log("*******************climaLastHours cached happened**********************");
        res.send(cacheContent);
        return;
    } else {
        // console.log("%%%%%%%%%%%%%%%%%%%climaLastHours cached DID NOT happend %%%%%%%%%%%%%%%");
        res.sendResponse = res.send;
        res.send = body => {
            climaLastHoursCache.setKey(key, body);
            climaLastHoursCache.save(true);
            res.sendResponse(body);
        };
        next();
    }
};
exports.clearClimaLastHoursCache=()=>{
    climaLastHoursCache ='';
    // console.log("%%%%%%%%%%%%%%%%%%%climaLastHours cached cleared %%%%%%%%%%%%%%%");
    // console.log(`at = ${my_date.jNow()}`);
}

/////load new cache :
// console.log("////////loading the climaRainLastHours cache/////////////");
let climaRainTotalsMonthsCache = flatCache.load("climaRainTotalsMonthsCache", path.resolve("../cache"));
exports.climaRainTotalsMonthsFlatCacheMiddleWare = (req, res, next) => {
    climaRainTotalsMonthsCache = flatCache.load("climaRainTotalsMonthsCache", path.resolve("../cache"));
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = climaRainTotalsMonthsCache.getKey(key);
    //console.log("key :::::::::::: ");
    //console.log(key);
    //console.log("casheeeed:::::");
    //console.log(cacheContent);
    if (cacheContent) {
        // console.log("*******************climaRainTotalsMonthsCache cached happened**********************");
        res.send(cacheContent);
        return;
    } else {
        // console.log("%%%%%%%%%%%%%%%%%%%climaRainTotalsMonthsCache cached DID NOT happend %%%%%%%%%%%%%%%");
        res.sendResponse = res.send;
        res.send = body => {
            climaRainTotalsMonthsCache.setKey(key, body);
            climaRainTotalsMonthsCache.save(true);
            res.sendResponse(body);
        };
        next();
    }
};
exports.clearClimaRainTotalsMonthsCache=()=>{
    climaRainTotalsMonthsCache ='';
    // console.log("%%%%%%%%%%%%%%%%%%%climaRainTotalsMonthsCache cleared %%%%%%%%%%%%%%%");
    // console.log(`at = ${my_date.jNow()}`);
}
/////load new cache :
// console.log("////////loading the ConfigForm cache/////////////");
let configFormCache = flatCache.load("configFormCache", path.resolve("../cache"));
exports.configFormFlatCacheMiddleWare = (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = configFormCache.getKey(key);
    //console.log("key :::::::::::: ");
    //console.log(key);
    //console.log("casheeeed:::::");
    //console.log(cacheContent);
    if (cacheContent) {
        //console.log("*******************ConfigForm cached happened**********************");
        res.send(cacheContent);
        return;
    } else {
        //console.log("%%%%%%%%%%%%%%%%%%%ConfigForm cached DID NOT happend %%%%%%%%%%%%%%%");
        res.sendResponse = res.send;
        res.send = body => {
            configFormCache.setKey(key, body);
            configFormCache.save(true);
            res.sendResponse(body);
        };
        next();
    }
};



/////how to use:
/////     app.get('/products', flatCacheMiddleware, function(req, res){