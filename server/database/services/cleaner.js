

function cleanMongoQuery(query) {
    let prop;
    for (let field of Object.keys(query) ) {
        prop = query[field];
        if (Array.isArray(prop) && prop[0].search(/$(where|function)/i) ) {
            query[field] = prop[1]
        }
        else if (typeof prop === "object" ) {
            query[field] = cleanMongoQuery(prop);
        }
    }
    return query;
}

module.exports = cleanMongoQuery; 