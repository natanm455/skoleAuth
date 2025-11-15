const { Router } = require("express");
const Kitten = require("../models/Kitten");

const router = Router();

router.get("/kittens", async (req, res) => {
	const kittens = await Kitten.find();

	res.json(kittens);
});

module.exports = router;
