import React from "react";
import { Brain, Zap, Handshake } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="w-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headline Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Smarter Fitness.
            <span className="block text-blue-600">Backed by Science.</span>
            Powered by AI.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            HealthBuddy helps you build sustainable fitness habits with intelligent,
            personalized guidance.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* Cards Section */}
          <div className="w-full lg:w-1/2 grid gap-6">

            {/* Card 1 */}
            <div className="bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <Brain size={26} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Why We Started
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We created HealthBuddy to bridge the gap between medical advice
                and everyday fitness routines.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-purple-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <Zap size={26} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  What Makes Us Different
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                AI-powered personalization combined with medical expertise,
                adapting to your health in real time.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                  <Handshake size={26} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To help people build consistent, science-backed fitness habits
                that last a lifetime.
              </p>
            </div>

          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100 rounded-3xl rotate-2"></div>
              <img
                src="https://www.monarchsco.com/cdn/shop/files/Gemini_Generated_Image_phb84gphb84gphb8_c2fd14a7-c2b5-42fe-9f93-6ce8224f1f26.png?v=1759759871&width=3840"
                alt="People working out together"
                className="relative rounded-3xl shadow-xl w-full h-80 md:h-105 object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
