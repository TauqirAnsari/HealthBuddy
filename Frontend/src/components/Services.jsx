import React from "react";
import {
  Dumbbell,
  Brain,
  Activity,
  Scale,
  Clock,
  HeartPulse,
} from "lucide-react";

const Services = () => {
  const features = [
    {
      title: "Get Stronger",
      description: "Build muscle with adaptive strength training plans.",
      icon: Dumbbell,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Boost Mental Health",
      description: "Improve focus, mood, and mindfulness with guided support.",
      icon: Brain,
      bg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Improve Endurance",
      description: "Increase stamina with smart cardio and endurance workouts.",
      icon: Activity,
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Support Weight Goals",
      description: "Achieve healthy weight goals with personalized guidance.",
      icon: Scale,
      bg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Build a Routine",
      description: "Create consistent habits that fit your daily lifestyle.",
      icon: Clock,
      bg: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      title: "Healthy Aging",
      description: "Stay active, strong, and mobile as you grow older.",
      icon: HeartPulse,
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <section className="w-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Everything You Need for a Healthier You
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Smart features designed to support your body and mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className={`
                  group
                  relative
                  rounded-2xl
                  p-8
                  ${feature.bg}
                  shadow-md
                  hover:shadow-2xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  cursor-pointer
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    w-14 h-14
                    flex items-center justify-center
                    rounded-xl
                    bg-white
                    shadow-sm
                    mb-6
                    ${feature.iconColor}
                  `}
                >
                  <Icon size={28} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>

                {/* Description (appears on hover) */}
                <p
                  className="
                    text-gray-600
                    text-xl
                  "
                >
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div
                  className="
                    absolute inset-0
                    rounded-2xl
                    ring-1 ring-transparent
                    group-hover:ring-gray-200
                    transition
                  "
                ></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Services;

