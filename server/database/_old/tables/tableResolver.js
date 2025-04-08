const bindFileRouter = require("./Old_fileRouter");


async function setTableData(data, table) {

}

async function createTables(app, connection) {
    await bindFileRouter(app, connection);
}

module.exports = createTables;