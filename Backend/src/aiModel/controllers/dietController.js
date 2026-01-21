const { generateDietPlan } = require("../services/geminiService");
const Diet = require("../../model/diet.model");

/**
 * Day index helper (changes after 12 PM)
 */
const getTodayIndex = (createdAt) => {
  const now = new Date();
  const start = new Date(createdAt);

  if (now.getHours() >= 12) {
    start.setDate(start.getDate() + 1);
  }

  const diff = Math.floor(
    (now - start) / (1000 * 60 * 60 * 24)
  );

  return Math.min(diff, 6);
};

/**
 * Normalize meal (AI safety)
 */
const normalizeMeal = (meal) => ({
  meal_name: meal?.meal_name || "Not provided",
  estimated_calories: Number(meal?.estimated_calories) || 0,
  completed: false
});

// =====================================================
// 🔹 GENERATE WEEKLY DIET
// =====================================================
exports.getWeeklyDiet = async (req, res) => {
  try {
    const userId = req.user._id;
    const profileData = req.body;

    const result = await generateDietPlan(profileData);

    const daily_plan = result.dietPlan.daily_plan.map((day, index) => ({
      day: day.day || `Day ${index + 1}`,
      date: new Date(Date.now() + index * 86400000),

      exercise_name: day.exercise_name || "30 min walking",
      exerciseCompleted: false,
      stepsCompleted: false,

      breakfast: normalizeMeal(day.breakfast),
      lunch: normalizeMeal(day.lunch),
      evening_snack: normalizeMeal(day.evening_snack),
      dinner: normalizeMeal(day.dinner),

      totalCalories: Number(day.calories) || 0
    }));

    const diet = await Diet.create({
      user: userId,
      bmi: result.bmi,
      bmr: result.bmr,
      dailyCalories: Number(result.dailyCalories) || 0,
      daily_plan
    });

    res.status(200).json({
      success: true,
      dietId: diet._id
    });
  } catch (error) {
    console.error("Diet generation error:", error);
    res.status(500).json({
      success: false,
      message: "Diet generation failed"
    });
  }
};

// =====================================================
// 🔹 DIET CARD – TODAY
// =====================================================
exports.getTodayDiet = async (req, res) => {
  // USER ID: req.user._id (remove debug log in production)
  const diet = await Diet.findOne({ user: req.user._id })
    .sort({ createdAt: -1 });

  if (!diet || !diet.daily_plan) {
    return res.status(404).json({
      message: "No diet found"
    });
  }

  const index = getTodayIndex(diet.createdAt);
  const today = diet.daily_plan[index];

  if (!today) {
    return res.status(404).json({
      message: "No diet for today"
    });
  }

  const meals = ["breakfast", "lunch", "evening_snack", "dinner"];

  const caloriesConsumed = meals.reduce((sum, meal) => {
    return today[meal]?.completed
      ? sum + today[meal].estimated_calories
      : sum;
  }, 0);

  res.json({
    todayPlan: today,
    caloriesConsumed,
    calorieGoal: diet.dailyCalories
  });
};


// =====================================================
// 🔹 MARK MEAL COMPLETE
// =====================================================
exports.markMealComplete = async (req, res) => {
  const { mealType } = req.body;

  const diet = await Diet.findOne({ user: req.user._id })
    .sort({ createdAt: -1 });

  if (!diet) {
    return res.status(404).json({ message: "No diet found" });
  }

  const index = getTodayIndex(diet.createdAt);

  if (!diet.daily_plan[index]?.[mealType]) {
    return res.status(400).json({ message: "Invalid meal type" });
  }

  diet.daily_plan[index][mealType].completed = !diet.daily_plan[index][mealType].completed;
  await diet.save();

  res.json({ success: true });
};

// =====================================================
// 🔹 EXERCISE CARD – TODAY
// =====================================================
exports.getTodayExercise = async (req, res) => {
  const diet = await Diet.findOne({ user: req.user._id })
    .sort({ createdAt: -1 });

  if (!diet || !diet.daily_plan) {
    return res.status(404).json({
      message: "No diet found"
    });
  }

  const index = getTodayIndex(diet.createdAt);
  const today = diet.daily_plan[index];

  if (!today) {
    return res.status(404).json({
      message: "No exercise for today"
    });
  }

  res.json({
    exercise_name: today.exercise_name || "30 min walking",
    exerciseCompleted: today.exerciseCompleted,
    stepsCompleted: today.stepsCompleted
  });
};

// =====================================================
// 🔹 COMPLETE EXERCISE
// =====================================================
exports.completeExercise = async (req, res) => {
  const diet = await Diet.findOne({ user: req.user._id })
    .sort({ createdAt: -1 });

  if (!diet || !diet.daily_plan) {
    return res.status(404).json({ message: "No diet found" });
  }

  const index = getTodayIndex(diet.createdAt);
  diet.daily_plan[index].exerciseCompleted = true;

  await diet.save();
  res.json({ success: true });
};


// =====================================================
// 🔹 COMPLETE STEPS
// =====================================================
exports.completeSteps = async (req, res) => {
  const diet = await Diet.findOne({ user: req.user._id })
    .sort({ createdAt: -1 });

  if (!diet || !diet.daily_plan) {
    return res.status(404).json({ message: "No diet found" });
  }

  const index = getTodayIndex(diet.createdAt);
  diet.daily_plan[index].stepsCompleted = true;

  await diet.save();
  res.json({ success: true });
};


// =====================================================
// 🔹 WEEKLY EXERCISE GRAPH
// =====================================================
exports.getWeeklyExercise = async (req, res) => {
  const diet = await Diet.findOne({ user: req.user._id })
    .sort({ createdAt: -1 });

  // 🔐 IMPORTANT GUARD
  if (!diet || !diet.daily_plan) {
    return res.status(404).json([]);
  }

  const weekly = diet.daily_plan.map(day => ({
    day: day.day.replace("Day ", ""),
    completed:
      (day.exerciseCompleted ? 1 : 0) +
      (day.stepsCompleted ? 1 : 0)
  }));

  res.json(weekly);
};



// =====================================================
// 🔹 GET LATEST DIET (OPTIONAL)
// =====================================================
exports.getLatestDiet = async (req, res) => {
  const diet = await Diet.findOne({ user: req.user._id })
    .sort({ createdAt: -1 });

  if (!diet) {
    return res.status(404).json({ message: "No diet found" });
  }

  res.json(diet);
};
