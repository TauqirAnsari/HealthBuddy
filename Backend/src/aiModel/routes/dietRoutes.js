const express = require("express");
const { getWeeklyDiet } = require("../controllers/dietController");

const router = express.Router();

router.post("/weekly-diet", getWeeklyDiet);
module.exports = router;
