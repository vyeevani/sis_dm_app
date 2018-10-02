fetch_orders = function($scope, $timeout, callback) {
    database.ref().once("value").then(function(snapshot) {
        $timeout(function() {
            callback(snapshot);
        }, 0);
    });
};
