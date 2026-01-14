export default function DietCard() {
  // 🔢 These values will later come from backend
  const caloriesConsumed = 1850
  const calorieGoal = 2200

  // 📐 Calculate percentage
  const percentage = Math.min(
    (caloriesConsumed / calorieGoal) * 100,
    100
  )

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg min-h-520px flex flex-col">
      {/* Title with emoji */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-2xl">🍚</span>
        <h3 className="text-xl font-semibold text-slate-700">
          Diet
        </h3>
      </div>

      {/* 🔵 Calculated Circular Progress */}
      <div className="flex justify-center mb-5">
        <div
          className="w-44 h-44 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(
              #fb923c ${percentage}%,
              #e5e7eb ${percentage}%
            )`,
          }}
        >
          {/* Inner circle */}
          <div className="bg-white w-32 h-32 rounded-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold">
                {caloriesConsumed}
              </p>
              <p className="text-sm text-slate-500">
                / {calorieGoal} kcal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Breakdown */}
      <div className="space-y-5 text-base mt-10">
        <div className="flex justify-between">
          <span>Breakfast</span>
          <span className="font-medium">350 kcal</span>
        </div>

        <div className="flex justify-between">
          <span>Lunch</span>
          <span className="font-medium">550 kcal</span>
        </div>

        <div className="flex justify-between">
          <span>Snacks</span>
          <span className="font-medium">150 kcal</span>
        </div>

        <div className="flex justify-between">
          <span>Dinner</span>
          <span className="font-medium">150 kcal</span>
        </div>
      </div>
    </div>
  )
}
