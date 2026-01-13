import { useState, useEffect } from "react"

export default function ExerciseCard() {
  /**
   * ==========================================
   * 🔴 BACKEND DATA (WILL COME FROM API)
   * ==========================================
   * Example API response:
   *
   * {
   *   exercises: [
   *     { id: 1, name: "30 min Jogging", completed: true },
   *     { id: 2, name: "20 min Strength Training", completed: true },
   *     { id: 3, name: "10,000 Steps", completed: false }
   *   ],
   *   weeklyProgress: {
   *     Mon: 2,
   *     Tue: 1,
   *     Wed: 2,
   *     Thu: 3,
   *     Fri: 2,
   *     Sat: 1,
   *     Sun: 0
   *   }
   * }
   */

  // 🔹 Mock exercises (replace with backend response)
  const [exercises, setExercises] = useState([
    { id: 1, name: "30 min Jogging", completed: true },
    { id: 2, name: "20 min Strength Training", completed: true },
    { id: 3, name: "10,000 Steps", completed: false },
  ])

  // 🔹 Mock weekly data (replace with backend response)
  const weeklyData = {
    Mon: 2,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 2,
    Sat: 1,
    Sun: 0,
  }

  /**
   * ==========================================
   * 📐 FRONTEND CALCULATION
   * ==========================================
   * Bars are calculated as:
   * (completed exercises / total exercises) * 100
   */

  const totalExercises = exercises.length

  const weeklyPercentages = Object.entries(weeklyData).map(
    ([day, completed]) => ({
      day,
      percentage:
        totalExercises === 0
          ? 0
          : Math.min((completed / totalExercises) * 100, 100),
    })
  )

  // 🔁 Toggle exercise completion (frontend only for now)
  const toggleExercise = (id) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id
          ? { ...ex, completed: !ex.completed }
          : ex
      )
    )
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[520px] flex flex-col">
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-2xl">🏃‍♂️</span>
        <h3 className="text-xl font-semibold text-slate-700">
          Exercises
        </h3>
      </div>

      {/* Exercise List */}
      <div className="bg-green-50 rounded-2xl p-6 space-y-5 text-base mb-10">
        {exercises.map((exercise) => (
          <label
            key={exercise.id}
            className="flex items-center gap-4 cursor-pointer"
          >
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={exercise.completed}
              onChange={() => toggleExercise(exercise.id)}
            />
            <span
              className={
                exercise.completed
                  ? ""
                  : "text-slate-500"
              }
            >
              {exercise.name}
            </span>
          </label>
        ))}
      </div>

      {/* Weekly Exercise Chart */}
      <div className="mt-auto">
        <p className="text-sm font-semibold text-slate-600 mb-3">
          Weekly Exercise
        </p>

        {/* Bars */}
        <div className="flex items-end gap-4 h-40 mb-2">
          {weeklyPercentages.map(({ day, percentage }) => (
            <div
              key={day}
              className="w-full rounded-xl bg-gradient-to-t from-blue-600 to-emerald-400"
              style={{ height: `${percentage}%` }}
              title={`${day}: ${Math.round(percentage)}%`}
            />
          ))}
        </div>

        {/* Weekdays */}
        <div className="flex justify-between text-xs text-slate-500 px-1">
          {weeklyPercentages.map(({ day }) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
