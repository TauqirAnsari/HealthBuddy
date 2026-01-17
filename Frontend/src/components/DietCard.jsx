import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/AxiosDietApi";

export default function DietCard() {
  const navigate = useNavigate();
  const [diet, setDiet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/diet/today")
      .then(res => setDiet(res.data))
      .catch(() => setDiet(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  if (!diet) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[520px]">
        <h3 className="text-xl font-semibold text-slate-700 mb-4">Diet</h3>
        <p className="text-slate-500 mb-6">
          No diet found. Please generate your diet first.
        </p>
        <button
          onClick={() => navigate("/profileform")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Generate Diet
        </button>
      </div>
    );
  }

  const { todayPlan, caloriesConsumed, calorieGoal } = diet;

  const percentage = Math.min(
    (caloriesConsumed / calorieGoal) * 100,
    100
  );

  const toggleMeal = async (meal) => {
    await API.patch("/api/diet/meal-complete", { mealType: meal });
    const updated = await API.get("/api/diet/today");
    setDiet(updated.data);
  };

  const meals = ["breakfast", "lunch", "evening_snack", "dinner"];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[520px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h3 className="text-xl font-semibold">🍚 Diet</h3>
        <button
          onClick={() => navigate("/diettable")}
          className="text-orange-600 border border-orange-400 px-4 py-1 rounded-full"
        >
          DietList
        </button>
      </div>

      {/* Progress */}
      <div className="flex justify-center mb-6">
        <div
          className="w-44 h-44 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(#fb923c ${percentage}%, #e5e7eb ${percentage}%)`,
          }}
        >
          <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold">{caloriesConsumed}</p>
              <p className="text-sm text-slate-500">
                / {calorieGoal} kcal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-4 mt-auto">
        {meals.map(meal => (
          <div key={meal} className="flex justify-between items-center">
            <span className="capitalize">
              {meal.replace("_", " ")}
            </span>
            <div className="flex gap-3 items-center">
              <span>{todayPlan[meal].estimated_calories} kcal</span>
              <input
                type="checkbox"
                checked={todayPlan[meal].completed}
                onChange={() => toggleMeal(meal)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
