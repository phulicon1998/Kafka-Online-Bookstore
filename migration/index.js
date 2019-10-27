const migrateEdition = require("./edition");
const migrateOrder = require("./order");

async function migrate(run) {
    if(run) {
        console.log("\n");

        await migrateOrder();
        await migrateEdition();

        console.log("-> DONE MIGRATION\n");
    }
}

module.exports = migrate;
