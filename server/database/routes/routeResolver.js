
const ROUTES = {
    "config" : {
        path : "/config",
        name : "config",
        /** @type {object} */
        data : [],
        /** @type {mongoose.Schema} */
        schema : require("../schemas/configSchema"),
        /** @type {function(app , connection, path) : Router} */
        start : require("./configRoute")
    }
}


async function setTableData( tableSchema, tableData ) {
    //as of now it always resets the data between provisions
    let oldData = await tableSchema.find(); //gets all old data
    try {
        await tableSchema.deleteMany({}); //deletes all existing data
        console.warn("data", tableData);
        await tableSchema.insertMany(tableData); //inserts all the data
    }
    catch(error) {
        console.error(error.message);
        await tableSchema.replaceMany(oldData, {upsert : true});
    }
}


/**
 * Description placeholder
 *
 * @param {*} app 
 * @param {*} [connection=null] 
 */
async function bindRoutes(app, connection = null) {
    for (let route of Object.values(ROUTES) ) {
        await setTableData(route.schema, route.data);
        route.start(app, connection, route.path);
    }
}

module.exports = bindRoutes;