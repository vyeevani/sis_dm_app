// DEPENDENCIES
const router = require("express").Router();
var firebase = require("../utils/firebase.js");
var db = firebase.database();
var ref = db.ref("current_orders");

// ROUTES
router.get("/get_current_orders", (req, res) => {
    return get_current_order();
});

get_current_order = () => {
    ref.on("value", () => {
	console.log(snapshot.val());
	return snapshot.val();
    }, () => {
	console.log("A read error occured");
	return {
	    error: "Reading currently active orders failed"
	};
    });
};
