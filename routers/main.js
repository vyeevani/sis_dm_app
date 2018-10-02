// DEPENDENCIES
const router = require("express").Router();
const subRouters = [
    "./home.js",
];

// HELPERS
let handleErrorCode = (code, msg) => {
    return (req, res, next) => {
	res.status(code);
	res.type('txt').send(msg);
    }
}

// ROUTES
subRouters.forEach(subRouter => {
    router.use(require(subRouter));
});

router.use(handleErrorCode(404, "NOT FOUND"));
router.use(handleErrorCode(500, "SOMETHING WENT WRONG"));

module.exports = router;
