const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    meal_name: String,
    estimated_calories: Number,
    completed: {
      type: Boolean,
      default: false
    }
  },
  
  { _id: false }
);

const dailyPlanSchema = new mongoose.Schema(
  {
    day: String, // Day 1 - Day 7
    date: Date,

    exercise_name: String,
    exerciseCompleted: {
      type: Boolean,
      default: false
    },

    stepsCompleted: {
      type: Boolean,
      default: false
    },

    breakfast: mealSchema,
    lunch: mealSchema,
    evening_snack: mealSchema,
    dinner: mealSchema,

    totalCalories: Number
  },
  { _id: false }
);

const dietSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    bmi: {
      bmi: Number,
      category: String
    },
    bmr: Number,
    dailyCalories: Number,
    daily_plan: [dailyPlanSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Diet", dietSchema);
