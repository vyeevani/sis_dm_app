var first_angular_cycle = 1;

angular.module('app.controllers.home', []).controller('homePageController', function($scope, $q, $timeout) {
    $scope.orders = {};

    // Register firebase autoupdate functions and prevent reloading faults
    if (first_angular_cycle) {
        first_angular_cycle = 0;
        console.log("Registering Firebase listener functions")
        order_added($scope, $timeout, function(snapshot) {
            // There is a new order. See it with snapshot.val()
            console.log("New order found");

            fetch_orders($scope, $timeout, function(snapshot) {
                    $scope.orders = snapshot.val();
            });
        });

        order_completed($scope, $timeout, function(snapshot) {
            // An order was completed. See it with snapshot.val()
            console.log("Order completed");
            fetch_orders($scope, $timeout, function(snapshot) {
                    $scope.orders = snapshot.val();
            });
            // Reload order list
        });
        console.log("Firebase listener functions registration completed");
    }

    $scope.add_order_test = function() {
        add_order({table_id:"Table: 13", list:["order 1", "order 2", "order 3"]});
    };

});
