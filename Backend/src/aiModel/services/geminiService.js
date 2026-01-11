const { GoogleGenerativeAI } = require("@google/generative-ai");
const calculateBMI = require("../utils/bmiCalculator");

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

  const bmiData = calculateBMI(weight, height);

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
- Diet that supports their proffession and activity level
- Respond ONLY in valid JSON (no markdown, no backticks)

Create a 7-day Indian diet plan in STRICT JSON.

For each meal:
- Use ONLY these keys:
  - meal_name
  - estimated_calories

Rules for hole_day_calories_need:
- Only show calorie needs based on BMI, age, gender, activity level, profession and goal do not add description

Rules for meal_name:
- Combine meal name + description + portion size into ONE single sentence
- Include quantity and grams/ml inside meal_name
- DO NOT use separate description or portion_size keys

Example format:
"breakfast": {
  "meal_name": "2 medium Aloo Paratha (100g each) with 1 small bowl plain curd (150g) and 1 tsp pickle",
  "estimated_calories": "450-480 kcal"
}

The "day" field MUST be exactly:
"Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"

Rule for Exercise:
 - Excercise that perform based on user's activity level and profession and goal

JSON structure must be:
hole_day_calories_need
daily_plan [ day, exercise_name, breakfast, lunch, evening_snack, dinner, calories ]
budget_note

Respond ONLY with valid JSON (no markdown, no backticks).
`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  const cleanJSON = extractJSON(rawText);

  return {
    bmi: bmiData,
    dietPlan: JSON.parse(cleanJSON)
  };
}

module.exports = { generateDietPlan };
