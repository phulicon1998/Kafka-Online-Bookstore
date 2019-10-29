require("dotenv").config();
const newMigrateEdition = require("./edition");
const migrateOrder = require("./order");
const migrateReview = require("./review");

async function migrate() {
    console.log("\n");

    await migrateOrder();
    await newMigrateEdition();
    await migrateReview();

    console.log("-> DONE MIGRATION\n");
}

migrate();
