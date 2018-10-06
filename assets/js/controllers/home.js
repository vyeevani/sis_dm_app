var first_angular_cycle = 1;

angular.module('app.controllers.home', []).controller('homePageController', function($scope, $q, $timeout) {
    $scope.active_orders = {};
    $scope.ready_orders = {};

    // Register firebase autoupdate functions and prevent reloading faults
    if (first_angular_cycle) {
        first_angular_cycle = 0;
        console.log("Registering Firebase listener functions");
        order_listener($scope, $timeout, function(snapshot) {
            fetch_orders($scope, $timeout, function(snapshot) {
                $scope.active_orders = sort(snapshot.val(), true);
                $scope.ready_orders = sort(snapshot.val(), false);
            })
        })
        console.log("Firebase listener functions registration completed");
    }

    $scope.delete_order = function(order_id) {
        delete_order(order_id);
    };

    $scope.order_ready = function(order_id) {
        change_order_status(order_id, false);
    };

    $scope.order_not_ready = function(order_id) {
        change_order_status(order_id, true);
    };

    $scope.add_order_test = function() {
        add_order({table_id:"Table: 13", order_list:["dosa q: 10", "vada q: 14"], special_requests:"No onions", active_order:true});
    };

    $scope.add_order = function() {
        var order_list = [];
        // Add all orders to order list
        order_list = add_order_list($scope.plain_dosa, order_list, "plain dosa");
        order_list = add_order_list($scope.onion_dosa, order_list, "onion_dosa");
        order_list = add_order_list($scope.vada, order_list, "vada");
        add_order({table_id: "Table: " + $scope.table_id, order_list: order_list,
                special_requests: $scope.special_requests, active_order:true});
    };

});


var add_order_list = function(variable, arr, type) {
    if (variable != undefined && variable > 0) {
        arr.push(type + ": " + variable);
    }
    return arr;
}

var sort = function(orders, status) {
    var return_dict = {};
    for (var key in orders) {
        if (orders[key].active_order == status) {
            return_dict[key] = orders[key];
        }
    }

    return return_dict;
}
