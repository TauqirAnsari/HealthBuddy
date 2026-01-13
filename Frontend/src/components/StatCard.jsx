export default function StatCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-sm font-semibold text-slate-600 mb-4">
        {title}
      </h3>
      {children}
    </div>
  )
}
