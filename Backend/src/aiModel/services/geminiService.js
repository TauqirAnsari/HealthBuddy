const { GoogleGenerativeAI } = require("@google/generative-ai");
const calculateBMI = require("../utils/bmiCalculator");
const calculateBMR = require("../utils/bmrCalculator");
const calculateTDEE = require("../utils/tdeeCalculator");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function extractJSON(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

async function generateDietPlan(userData) {
  const {
    age,
    gender,
    height,
    weight,
    profession,
    goal,
    dietType,
    activityLevel,
    foodAllergies,
    weeklyBudget
  } = userData;

  // ✅ Calculations
  const bmiData = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, gender);
  const dailyCalories = calculateTDEE(bmr, activityLevel);

  const allergies =
    foodAllergies && foodAllergies.length > 0
      ? foodAllergies.join(", ")
      : "None";

  const prompt = `
You are an experienced Indian nutritionist.

User details:
Age: ${age}
Gender: ${gender}
Height: ${height} cm
Weight: ${weight} kg
BMI: ${bmiData.bmi} (${bmiData.category})
BMR: ${bmr} kcal/day
Daily Calorie Requirement (TDEE): ${dailyCalories} kcal/day
Profession: ${profession}
Goal: ${goal}
Diet Type: ${dietType}
Activity Level: ${activityLevel}
Food Allergies: ${allergies}
Weekly Budget: ₹${weeklyBudget}

Rules:
- Indian home-style food only
- Avoid allergic foods strictly
- Meals must fit the budget
- Mention portion sizes
- No junk food
- Diet that supports their profession and activity level
- Respond ONLY in valid JSON (no markdown, no backticks)

Create a 7-day Indian diet plan in STRICT JSON.

For each meal:
- Use ONLY these keys:
  - meal_name
  - estimated_calories

Rules for hole_day_calories_need:
- Use the calculated daily calorie requirement (${dailyCalories} kcal/day)
- Do not add explanation text

Rules for meal_name:
- Combine meal name + description + portion size into ONE sentence
- Include quantity in grams/ml
- No separate description or portion keys

The "day" field MUST be exactly: 
"Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"

Rule for Exercise:
- Suggest exercise based on profession, activity level, and goal

JSON structure must be:
hole_day_calories_need
daily_plan [ day, exercise_name, breakfast, lunch, evening_snack, dinner, calories ]
budget_note

Respond ONLY with valid JSON.
`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();
  const cleanJSON = extractJSON(rawText);

  let parsedDiet;
  try {
    parsedDiet = JSON.parse(cleanJSON);
  } catch (err) {
    console.error("Gemini JSON Error:", cleanJSON);
    throw new Error("Invalid AI response format");
  }

  return {
    bmi: bmiData,
    bmr,
    dailyCalories,
    dietPlan: parsedDiet
  };

}

module.exports = { generateDietPlan };
