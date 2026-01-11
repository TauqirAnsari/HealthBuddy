
import { useState } from "react";
import {
  Check,
  Dumbbell,
  Brain,
  Activity,
  Scale,
  Clock,
  HeartPulse,
  Sparkles,
} from "lucide-react";

const Membership = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="w-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Choose the Plan That Fits Your Fitness Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start free. Upgrade anytime.
          </p>

          {/* Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-full p-1 shadow-md flex">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                  billing === "monthly"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                  billing === "yearly"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                Yearly (Save more)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

          {/* FREE PLAN */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Free</h3>

            <p className="text-4xl font-extrabold text-gray-900 mb-1">₹0</p>
            <p className="text-sm text-gray-500 mb-6">
              No credit card required
            </p>

            <ul className="space-y-4 text-gray-600 mb-8">
              <li className="flex items-center gap-3">
                <Check className="text-blue-600" size={18} />
                Basic tracking & insights
              </li>
              <li className="flex items-center gap-3">
                <Activity className="text-blue-600" size={18} />
                Limited workouts
              </li>
              <li className="flex items-center gap-3">
                <Brain className="text-blue-600" size={18} />
                Mental wellness tips
              </li>
            </ul>

            <button className="mt-auto w-full py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
              Try Free
            </button>
          </div>

          {/* BASIC PLAN — MOST POPULAR */}
          <div className="relative bg-[#0f172a] text-white rounded-2xl shadow-2xl p-8 flex flex-col scale-105">

            {/* Badge */}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
              Most Popular
            </span>

            <h3 className="text-2xl font-bold mb-4">Basic</h3>

            <p className="text-4xl font-extrabold mb-1">
              ₹{billing === "monthly" ? "149" : "1499"}
            </p>
            <p className="text-sm text-gray-300 mb-6">
              Billed {billing} · Cancel anytime
            </p>

            <ul className="space-y-4 text-gray-200 mb-8">
              <li className="flex items-center gap-3">
                <Dumbbell size={18} />
                Personalized workout plans
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} />
                Habit & routine builder
              </li>
              <li className="flex items-center gap-3">
                <HeartPulse size={18} />
                Healthy aging guidance
              </li>
              <li className="flex items-center gap-3">
                <Brain size={18} />
                AI-powered insights
              </li>
            </ul>

            <button className="mt-auto w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-semibold transition">
              Sign Up
            </button>
          </div>

          {/* PREMIUM PLAN — BEST VALUE */}
          <div className="relative bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl p-8 flex flex-col">

            {/* Badge */}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-blue-700 px-4 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1">
              <Sparkles size={14} /> Best Value
            </span>

            <h3 className="text-2xl font-bold mb-4">Premium</h3>

            <p className="text-4xl font-extrabold mb-1">
              ₹{billing === "monthly" ? "749" : "7499"}
            </p>
            <p className="text-sm text-blue-100 mb-1 line-through">
              ₹999
            </p>
            <p className="text-sm text-blue-100 mb-6">
              Save ₹250 (25%) · Billed {billing}
            </p>

            <ul className="space-y-4 text-blue-50 mb-8">
              <li className="flex items-center gap-3">
                <Dumbbell size={18} />
                Advanced strength programs
              </li>
              <li className="flex items-center gap-3">
                <Scale size={18} />
                Weight & nutrition guidance
              </li>
              <li className="flex items-center gap-3">
                <Activity size={18} />
                Endurance & cardio tracking
              </li>
              <li className="flex items-center gap-3">
                <Brain size={18} />
                Full AI health insights
              </li>
            </ul>

            <button className="mt-auto w-full py-3 rounded-full bg-white text-blue-700 font-bold hover:bg-blue-50 transition">
              Get Started
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Membership;
