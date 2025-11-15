const { Router } = require("express");
const authControll = require("../controllers/authControll.js");

const router = Router();

router
	.route("/login")
	.get((_, res) => {
		res.render("login");
	})
	.post((req, res, next) => {
		authControll.login(req, res, next);
	});

module.exports = router;
