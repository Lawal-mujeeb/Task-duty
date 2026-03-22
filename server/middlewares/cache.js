import NodeCache from "node-cache";

//create cache
export const cache = new NodeCache({
    stdTTL: 3600, //cache data for 1 hour
    checkperiod: 620, // check for expired keys every 620sec
    useClones: false, // better performance for caching system
})

//cache function to save data
export const cacheMiddleware = (key, ttl = 600) => async(req, res, next)=> {
    //create unique key based on our userId, api routes and query parameters
    const userId = req.user.id || "anonymous"
    const cacheKey = `user_${userId}_${key}_${req.originalUrl}_${JSON.stringify
        (req.query)}`
        try {
            const cachedData = cache.get(cacheKey); //tetrieve data associated with cached key
            if (cachedData) {
                console.log(`Cache key found for: ${cacheKey}`);
                return res.json(cachedData); //send saved response to client
                
            }
            // try to save data from our response
            const originalJSON = res.json
            //overide res.json to cache the response
            res.json = function(data) {
                cache.set(cacheKey, data,ttl); //takes the key , data to be saved , and how long to be saved in cache as args
                console.log(`Cache set for key: ${cacheKey}`);
                return originalJSON.call(this, data ); //originalJson is the res.json first saved , the call is used to invoke the method so that the original res.json is seen with the help of this keyword, ensuring the data can be properly passed down to the original json
            }
            next() //call the next event supposed to happen
        } catch (error) {
            console.error("Cache error ", error);
            next (error)
        }
}

