order_added = function($scope, $timeout, callback) {
    database.ref().on("child_added", function (snapshot) {
        $timeout(function () {
            callback(snapshot);
        }, 0);
    });
};
