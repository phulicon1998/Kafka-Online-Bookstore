const db = require("../models");
const {docToData, docsToData} = require("./helpers");

async function migrateOrder() {
    try {
        console.log("- MIGRATING ORDER...");

        let orders = await db.Order.find().lean().exec();

        for(let order of orders) {
            // Get all the edition data inside each order and convert to POJO
            let orderEditions = await db.OrderEdition.find({order_id: order._id}).lean().exec();
            let orderEditionData = docsToData(orderEditions);

            // Remove all old order's editions data
            const orderEditionIds = orderEditions.map(v => v._id);
            await db.OrderEdition.deleteMany({"_id": { $in: orderEditionIds }});

            // Convert order doc to POJO and recreate order data
            let orderData = docToData(order);
            let newOrder = await db.Order.create(orderData);

            // Recreate order edition data
            orderEditionData.forEach(v => v.order_id = newOrder._id);
            await db.OrderEdition.insertMany(orderEditionData);
        }

        // Remove old order data
        let orderIds = orders.map(v => v._id);
        await db.Order.deleteMany({"_id": {$in: orderIds}});
    } catch (e) {
        console.log(e);
    }
}

module.exports = migrateOrder;
