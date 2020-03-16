const path = require('path');
var mcache = require('memory-cache');
var flatCache = require('flat-cache');
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


/////load new cache :
// console.log("////////loading the rainTotalsMonths cache/////////////");
let rainTotalsMonthsCache = flatCache.load("rainTotalsMonthsCache", path.resolve("../cache"));
exports.rainTotalsMonthsFlatCacheMiddleWare = (req, res, next) => {
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



/////load new cache :
// console.log("////////loading the levelValue cache/////////////");
let levelValueCache = flatCache.load("levelValueCache", path.resolve("../cache"));
exports.levelValueFlatCacheMiddleWare = (req, res, next) => {
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

/////load new cache :
// console.log("////////loading the levelLastHours cache/////////////");
let levelLastHoursCache = flatCache.load("levelLastHoursCache", path.resolve("../cache"));
exports.levelLastHoursFlatCacheMiddleWare = (req, res, next) => {
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
/////load new cache :
// console.log("////////loading the climaLastHours cache/////////////");
let climaLastHoursCache = flatCache.load("climaLastHoursCache", path.resolve("../cache"));
exports.climaLastHoursFlatCacheMiddleWare = (req, res, next) => {
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
/////load new cache :
// console.log("////////loading the climaValues cache/////////////");
let climaValuesCache = flatCache.load("ClimaValuesCache", path.resolve("../cache"));
exports.climaValuesFlatCacheMiddleWare = (req, res, next) => {
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

/////how to use:
/////     app.get('/products', flatCacheMiddleware, function(req, res){