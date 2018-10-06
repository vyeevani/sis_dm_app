delete_order = function(order_id) {
    console.log("Removing order");
    database.ref(order_id).remove();
};
