require("dotenv").config();
const migrateEdition = require("./edition");
const migrateOrder = require("./order");
const migrateReview = require("./review");

async function migrate() {
    console.log("\n");

    await migrateOrder();
    await migrateEdition();
    await migrateReview();

    console.log("-> DONE MIGRATION\n");
}

migrate();
