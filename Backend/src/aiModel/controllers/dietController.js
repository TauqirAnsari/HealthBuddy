const { generateDietPlan } = require("../services/geminiService");

exports.getWeeklyDiet = async (req, res) => {
  try {
    const result = await generateDietPlan(req.body);

    res.status(200).json({
      success: true,
      bmi: result.bmi,
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
