const { generateDietPlan } = require("../services/geminiService");

exports.getWeeklyDiet = async (req, res) => {
  try {

    const profileData = req.body;
    console.log("Received profile data:", profileData);
    
    const result = await generateDietPlan(profileData);

    res.status(200).json({
      success: true,
      bmi: result.bmi,
      bmr: result.bmr,
      dailyCalories: result.dailyCalories,
      dietPlan: result.dietPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Diet generation failed",
      error: error.message
    });
  }
};
