change_order_status = function (order_id, order_new_status) {
    database.ref(order_id).update({active_order: order_new_status});
};
