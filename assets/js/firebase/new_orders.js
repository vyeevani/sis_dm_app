add_order = function(order) {
    console.log("Order being placed: ");
    console.log(order);
    database.ref().push().set(order);
};
