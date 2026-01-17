const express = require("express");
const router = express.Router();
const { authUser } = require("../../middlewares/auth.middleware");
const dietController = require("../controllers/dietController");

router.post("/weekly-diet", authUser, dietController.getWeeklyDiet);

router.get("/today", authUser, dietController.getTodayDiet);
router.patch("/meal-complete", authUser, dietController.markMealComplete);

router.get("/exercise/today", authUser, dietController.getTodayExercise);
router.patch("/exercise/complete", authUser, dietController.completeExercise);
router.patch("/steps/complete", authUser, dietController.completeSteps);
router.get("/exercise/weekly", authUser, dietController.getWeeklyExercise);
router.get("/latest", authUser, dietController.getLatestDiet);


module.exports = router;
