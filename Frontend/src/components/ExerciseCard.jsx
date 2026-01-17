import { useEffect, useState } from "react";
import API from "../config/AxiosDietApi";

export default function ExerciseCard() {
  const [today, setToday] = useState(null);
  const [weekly, setWeekly] = useState([]);

  useEffect(() => {
    API.get("/api/diet/exercise/today")
      .then(res => setToday(res.data))
      .catch(() => setToday(null));

    API.get("/api/diet/exercise/weekly")
      .then(res => setWeekly(res.data))
      .catch(() => setWeekly([]));
  }, []);

  if (!today) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[520px]">
        <h3 className="text-xl font-semibold mb-4">🏃‍♂️ Exercises</h3>
        <p className="text-slate-500">
          Generate your diet to unlock exercise plan.
        </p>
      </div>
    );
  }

  const exercises = [
    {
      id: "exercise",
      name: today.exercise_name,
      completed: today.exerciseCompleted
    },
    {
      id: "steps",
      name: "10,000 Steps",
      completed: today.stepsCompleted
    }
  ];

  const toggle = async (type) => {
    await API.patch(
      type === "exercise"
        ? "/api/diet/exercise/complete"
        : "/api/diet/steps/complete"
    );

    const updated = await API.get("/api/diet/exercise/today");
    setToday(updated.data);
  };

  const total = 2;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[520px] flex flex-col">
      <h3 className="text-xl font-semibold mb-6">🏃‍♂️ Exercises</h3>

      {/* Today */}
      <div className="bg-green-50 p-6 rounded-2xl space-y-4 mb-6">
        {exercises.map(ex => (
          <label key={ex.id} className="flex gap-4 items-center">
            <input
              type="checkbox"
              checked={ex.completed}
              onChange={() => toggle(ex.id)}
            />
            <span>{ex.name}</span>
          </label>
        ))}
      </div>

      {/* Weekly graph */}
      <div className="mt-auto">
        <p className="text-sm font-semibold mb-3">Weekly Exercise</p>
        <div className="flex items-end gap-3 h-36">
          {weekly.map(d => (
            <div
              key={d.day}
              className="w-full bg-gradient-to-t from-blue-600 to-emerald-400 rounded"
              style={{ height: `${(d.completed / total) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
