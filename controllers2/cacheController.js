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
    let key = "__express__" + req.url;
    let cacheContent = stationsCache.getKey(key);
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
    let key = "__express__" + req.url;
    let cacheContent = rainValuesCache.getKey(key);
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
    rainValuesCache = flatCache.load("rainValuesCache", path.resolve("../cache"));
}
exports.clearRainValuesCacheByClientID = (req, res, next) => {
    let key = "__express__" + req.url;
    let cacheContent = rainValuesCache.getKey(key);
    if (cacheContent) {
        rainValuesCache.removeKey(key);
        rainValuesCache.save(true);
        res.end();
    }else {
        res.status(404).json({"error":"not found"});
        return;
    }
}
/////load new cache :
// console.log("////////loading the rainTotalsMonths cache/////////////");
let rainTotalsMonthsCache = flatCache.load("rainTotalsMonthsCache", path.resolve("../cache"));
exports.rainTotalsMonthsFlatCacheMiddleWare = (req, res, next) => {
    rainTotalsMonthsCache = flatCache.load("rainTotalsMonthsCache", path.resolve("../cache"));
    let key = "__express__" + req.url;
    let cacheContent = rainTotalsMonthsCache.getKey(key);
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
    rainTotalsMonthsCache = flatCache.load("rainTotalsMonthsCache", path.resolve("../cache"));
}
exports.clearRainTotalsMonthsCacheByClientID = (req, res, next) => {
    let key = "__express__" + req.url;
    let cacheContent = rainTotalsMonthsCache.getKey(key);
    if (cacheContent) {
        rainTotalsMonthsCache.removeKey(key);
        rainTotalsMonthsCache.save(true);
        res.end();
    }else {
        res.status(404).json({"error":"not found"});
        return;
    }
}
/////load new cache :
// console.log("////////loading the levelValue cache/////////////");
let levelValueCache = flatCache.load("levelValueCache", path.resolve("../cache"));
exports.levelValueFlatCacheMiddleWare = (req, res, next) => {
    levelValueCache = flatCache.load("levelValueCache", path.resolve("../cache"));
    let key = "__express__" + req.url;
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
    levelValueCache = flatCache.load("levelValueCache", path.resolve("../cache"));
    // console.log("%%%%%%%%%%%%%%%%%%%levelValue cached cleared %%%%%%%%%%%%%%%");
    // console.log(`at = ${my_date.jNow()}`);
}
exports.clearLevelValueCacheByClientID = (req, res, next) => {
    let key = "__express__" + req.url;
    let cacheContent = levelValueCache.getKey(key);
    if (cacheContent) {
        levelValueCache.removeKey(key);
        levelValueCache.save(true);
        res.end();
    }else {
        res.status(404).json({"error":"not found"});
        return;
    }
}
/////load new cache :
// console.log("////////loading the levelLastHours cache/////////////");
let levelLastHoursCache = flatCache.load("levelLastHoursCache", path.resolve("../cache"));
exports.levelLastHoursFlatCacheMiddleWare = (req, res, next) => {
    levelLastHoursCache = flatCache.load("levelLastHoursCache", path.resolve("../cache"));
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = levelLastHoursCache.getKey(key);
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
    levelLastHoursCache = flatCache.load("levelLastHoursCache", path.resolve("../cache"));
}
exports.clearlevelLastHoursCacheByClientID = (req, res, next) => {
    let key = "__express__" + req.url;
    let cacheContent = levelLastHoursCache.getKey(key);
    if (cacheContent) {
        levelLastHoursCache.removeKey(key);
        levelLastHoursCache.save(true);
        res.end();
    }else {
        res.status(404).json({"error":"not found"});
        return;
    }
}
/////load new cache :
// console.log("////////loading the climaValues cache/////////////");
let climaValuesCache = flatCache.load("climaValuesCache", path.resolve("../cache"));
exports.climaValuesFlatCacheMiddleWare = (req, res, next) => {
    climaValuesCache = flatCache.load("climaValuesCache", path.resolve("../cache"));
    let key = "__express__" + req.url;
    let cacheContent = climaValuesCache.getKey(key);
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
    climaValuesCache = flatCache.load("climaValuesCache", path.resolve("../cache"));
}
exports.clearClimaValuesCacheByClientID = (req, res, next) => {
    let key = "__express__" + req.url;
    let cacheContent = climaValuesCache.getKey(key);
    if (cacheContent) {
        climaValuesCache.removeKey(key);
        climaValuesCache.save(true);
        res.end();
    }else {
        res.status(404).json({"error":"not found"});
        return;
    }
}
/////load new cache :
// console.log("////////loading the climaLastHours cache/////////////");
let climaLastHoursCache = flatCache.load("climaLastHoursCache", path.resolve("../cache"));
exports.climaLastHoursFlatCacheMiddleWare = (req, res, next) => {
    climaLastHoursCache = flatCache.load("climaLastHoursCache", path.resolve("../cache"));
    let key = "__express__" + req.url;
    let cacheContent = climaLastHoursCache.getKey(key);
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
    climaLastHoursCache = flatCache.load("climaLastHoursCache", path.resolve("../cache"));
}
exports.clearClimaLastHoursCacheByClientID = (req, res, next) => {
    let key = "__express__" + req.url;
    let cacheContent = climaLastHoursCache.getKey(key);
    if (cacheContent) {
        climaLastHoursCache.removeKey(key);
        climaLastHoursCache.save(true);
        res.end();
    }else {
        res.status(404).json({"error":"not found"});
        return;
    }
}
/////load new cache :
// console.log("////////loading the climaRainLastHours cache/////////////");
let climaRainTotalsMonthsCache = flatCache.load("climaRainTotalsMonthsCache", path.resolve("../cache"));
exports.climaRainTotalsMonthsFlatCacheMiddleWare = (req, res, next) => {
    climaRainTotalsMonthsCache = flatCache.load("climaRainTotalsMonthsCache", path.resolve("../cache"));
    let key = "__express__" + req.url;
    let cacheContent = climaRainTotalsMonthsCache.getKey(key);
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
    climaRainTotalsMonthsCache = flatCache.load("climaRainTotalsMonthsCache", path.resolve("../cache"));
    // console.log("%%%%%%%%%%%%%%%%%%%climaRainTotalsMonthsCache cleared %%%%%%%%%%%%%%%");
    // console.log(`at = ${my_date.jNow()}`);
}
exports.clearClimaRainTotalsMonthsCacheByClientID = (req, res, next) => {
    let key = "__express__" + req.url;
    let cacheContent = climaRainTotalsMonthsCache.getKey(key);
    if (cacheContent) {
        climaRainTotalsMonthsCache.removeKey(key);
        climaRainTotalsMonthsCache.save(true);
        res.end();
    }else {
        res.status(404).json({"error":"not found"});
        return;
    }
}

/////how to use:
/////     app.get('/products', flatCacheMiddleware, function(req, res){