var first_angular_cycle = 1;

angular.module('app.controllers.home', []).controller('homePageController', function($scope, $q, $timeout) {
    $scope.active_orders = {};
    $scope.ready_orders = {};

    $scope.plain_dosa = 0;
    $scope.onion_dosa = 0;
    $scope.masala_dosa = 0;
    $scope.spring_dosa = 0;
    $scope.andhra_spicy_dosa = 0;
    $scope.madurai_masala_dosa = 0;
    $scope.mysore_masala_dosa = 0;
    $scope.cheese_dosa = 0;
    $scope.chocolate_dosa = 0;
    $scope.plain_uthappam = 0;
    $scope.onion_uthappam = 0;
    $scope.chilli_uthappam = 0;
    $scope.podi_uthappam = 0;
    $scope.tomato_uthappam = 0;
    $scope.kara_uthappam = 0;

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
        var timestamp = (new Date()).getTime();
        add_order({table_id:"Table: 13", order_list:["dosa q: 10", "vada q: 14"], special_requests:"No onions", active_order:true, timestamp: timestamp});
    };

    $scope.add_order = function() {
        var order_list = [];
        // Add all orders to order list
        var timestamp = (new Date()).getTime();
        order_list = add_order_list($scope.plain_dosa, order_list, "Plain Dosa");
        order_list = add_order_list($scope.onion_dosa, order_list, "Onion Dosa");
        order_list = add_order_list($scope.masala_dosa, order_list, "Masala Dosa");
        order_list = add_order_list($scope.spring_dosa, order_list, "Spring Dosa");
        order_list = add_order_list($scope.andhra_spicy_dosa, order_list, "Andhra Spicy Dosa");
        order_list = add_order_list($scope.madurai_masala_dosa, order_list, "Madurai Masala Dosa");
        order_list = add_order_list($scope.mysore_masala_dosa, order_list, "Mysore Masala Dosa");
        order_list = add_order_list($scope.cheese_dosa, order_list, "Cheese Dosa");
        order_list = add_order_list($scope.chocolate_dosa, order_list, "Chocolate Dosa");
        order_list = add_order_list($scope.plain_uthappam, order_list, "Plain Uthappam");
        order_list = add_order_list($scope.onion_uthappam, order_list, "Onion Uthappam");
        order_list = add_order_list($scope.chilli_uthappam, order_list, "Chilli Uthappam");
        order_list = add_order_list($scope.podi_uthappam, order_list, "Podi Uthappam");
        order_list = add_order_list($scope.tomato_uthappam, order_list, "Tomato Uthappam");
        order_list = add_order_list($scope.kara_uthappam, order_list, "kara_uthappam");
        console.log(order_list);
        add_order({table_id: "Table: " + $scope.table_id, order_list: order_list,
                special_requests: $scope.special_requests + "", active_order:true, timestamp: timestamp});

                

        $scope.plain_dosa = 0;
        $scope.onion_dosa = 0;
        $scope.masala_dosa = 0;
        $scope.spring_dosa = 0;
        $scope.andhra_spicy_dosa = 0;
        $scope.madurai_masala_dosa = 0;
        $scope.mysore_masala_dosa = 0;
        $scope.cheese_dosa = 0;
        $scope.chocolate_dosa = 0;
        $scope.plain_uthappam = 0;
        $scope.onion_uthappam = 0;
        $scope.chilli_uthappam = 0;
        $scope.podi_uthappam = 0;
        $scope.tomato_uthappam = 0;
        $scope.kara_uthappam = 0;
    };





    $scope.textColorClass = function(timestamp_order) {
        var timestamp_now = (new Date()).getTime();
        if (timestamp_now - timestamp_order > 1) {
            console.log("hm");
            return("green");
        } else if (timestamp_now - timestamp_order > 1) {
            return("yellow");
        } else {
            return("red");
        }
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
    var priority = 1;
    for (var key in orders) {
        if (orders[key].active_order == status) {
            return_dict[key] = orders[key];
            return_dict[key]["priority"] = priority;
            priority = priority + 1;
        }
    }


    return return_dict;
}
