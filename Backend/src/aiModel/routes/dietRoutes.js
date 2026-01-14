const express = require("express");
const { getWeeklyDiet } = require("../controllers/dietController");
const {authUser}=require("../../middlewares/auth.middleware")
const router = express.Router();

router.post("/weekly-diet",authUser,getWeeklyDiet);
module.exports = router;
