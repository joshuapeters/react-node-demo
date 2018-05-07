
export class FilterFactory{

    /** validProperties = Array containing strings representing property names within documents **/
    constructor(validProperties){
        this._validProperties = [];
        if (!validProperties) return;

        this._validProperties = validProperties;
    }

    /*** build a mongoose filter object from an express req.query object ***/
    buildFilterFromURLObject(urlObj){
        try{
            let filter = {};

            // populate our filter with only properties that we have in our validProperties member
            Object.keys(urlObj).forEach((key) =>{
                if (this._validProperties.indexOf(key) < 0) return;
                filter[key] = urlObj[key];
            });

            return filter;
        } catch (err){
            console.error("error generating mongoose filter: " + err);
            return {};
        }
    }
}