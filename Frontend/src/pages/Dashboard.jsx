import {DietCard, ExerciseCard, MentalHealthCard} from "../components/Index";

export default function Dashboard() {
  return (
    <>
      <main className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <DietCard />
        <ExerciseCard />
        <MentalHealthCard />
      </main>
    </>
  )
}
