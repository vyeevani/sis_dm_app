order_listener = function($scope, $timeout, callback) {
    database.ref().on("value", function (snapshot) {
        $timeout(function () {
            callback(snapshot);
        }, 0);
    });
};
