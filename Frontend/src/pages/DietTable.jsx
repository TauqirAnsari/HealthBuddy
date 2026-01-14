import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DietTable = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.dietPlan) {
    return (
      <div className="p-10 text-center">
        <p>No diet data found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { bmi, bmr, dailyCalories, dietPlan } = state;

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          7-Day Diet Plan
        </h1>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-100 rounded">BMI: {bmi.bmi} ({bmi.category})</div>
          <div className="p-4 bg-blue-100 rounded">BMR: {bmr} kcal</div>
          <div className="p-4 bg-blue-100 rounded">
            Daily Calories: {dailyCalories} kcal
          </div>
        </div>

        {/* Diet Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border p-2">Day</th>
                <th className="border p-2">Breakfast</th>
                <th className="border p-2">Lunch</th>
                <th className="border p-2">Evening Snack</th>
                <th className="border p-2">Dinner</th>
                <th className="border p-2">Total Calories</th>
              </tr>
            </thead>

            <tbody>
              {dietPlan.daily_plan.map((dayPlan, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2 font-semibold">{dayPlan.day}</td>

                  <td className="border p-2">
                    {dayPlan.breakfast.meal_name}
                    <br />
                    <span className="text-gray-500">
                      ({dayPlan.breakfast.estimated_calories} kcal)
                    </span>
                  </td>

                  <td className="border p-2">
                    {dayPlan.lunch.meal_name}
                    <br />
                    <span className="text-gray-500">
                      ({dayPlan.lunch.estimated_calories} kcal)
                    </span>
                  </td>

                  <td className="border p-2">
                    {dayPlan.evening_snack.meal_name}
                    <br />
                    <span className="text-gray-500">
                      ({dayPlan.evening_snack.estimated_calories} kcal)
                    </span>
                  </td>

                  <td className="border p-2">
                    {dayPlan.dinner.meal_name}
                    <br />
                    <span className="text-gray-500">
                      ({dayPlan.dinner.estimated_calories} kcal)
                    </span>
                  </td>

                  <td className="border p-2 font-bold">
                    {dayPlan.calories} kcal
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Budget Note */}
        <div className="mt-6 p-4 bg-green-100 rounded">
          <strong>Budget Note:</strong> {dietPlan.budget_note}
        </div>
      </div>
    </div>
  );
};

export default DietTable;
export {DietTable};