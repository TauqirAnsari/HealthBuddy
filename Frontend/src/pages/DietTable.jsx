import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/AxiosDietApi";

export const DietTable = () => {
  const navigate = useNavigate();
  const [diet, setDiet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/diet/latest")
      .then((res) => {
        setDiet(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/dashboard");
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading diet plan...
      </div>
    );
  }

  if (!diet) {
    return (
      <div className="p-10 text-center">
        <p>No diet data found</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          7-Day Diet Plan
        </h1>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-100 rounded">
            BMI: {diet.bmi?.bmi ?? "--"} ({diet.bmi?.category ?? "N/A"})
          </div>

          <div className="p-4 bg-blue-100 rounded">
            BMR: {diet.bmr ?? "--"} kcal
          </div>

          <div className="p-4 bg-blue-100 rounded">
            Daily Calories: {diet.dailyCalories} kcal
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
              {diet.daily_plan.map((dayPlan, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2 font-semibold">
                    {dayPlan.day}
                  </td>

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
                    {dayPlan.totalCalories} kcal
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};


