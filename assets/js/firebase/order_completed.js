order_completed = function($scope, $timeout, callback) {
    database.ref().on("child_removed", function (snapshot) {
        $timeout(function () {
            callback(snapshot);
        }, 0);
    });
};
