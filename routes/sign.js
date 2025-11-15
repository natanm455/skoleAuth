const bcrypt = require("bcrypt");
const { Router } = require("express");
const User = require("../models/User.js");
const router = Router();
// signup route

router.get("/sign", (_, res) => res.render("sign"));

router.post("/sign", async (req, res) => {
	try {
		const body = req.body;

		if (!(body.Email && body.Password)) {
			req.flash("errorMessage", "Make sure you fill both input fields!");
			res.redirect("/sign");
		} else {
			const user = new User(body);
			const salt = await bcrypt.genSalt(10);
			user.Salt = salt;
			user.Password = await bcrypt.hash(body.Password, salt);
			await user.save();
			req.flash("successMessage", "User Created Succsessfully");
			res.redirect("/login");
		}
	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});

module.exports = router;
