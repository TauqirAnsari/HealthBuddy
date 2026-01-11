import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const reviews = [
    {
      text: "The right roots are extremely essential even environmental meaning our healthy security builds our life.",
      author: "Sharal Dewum",
      rating: 5,
    },
    {
      text: "The one soy scale is more we successful, best big environment, and smart bit porconcile.",
      author: "Mike Johnson",
      rating: 5,
    },
    {
      text: "My love now top solution for and opine mem is tentative healthy travel tion ouevtonal slireu.",
      author: "Asnin",
      rating: 5,
    },
    {
      text: "I lost 10kg in 3 months using the nutrition plan. The doctors are incredibly responsive.",
      author: "Sarah Jenkins",
      rating: 5,
    },
    {
      text: "The best investment I've made. The trainers really understand your limits and push you safely.",
      author: "David Chen",
      rating: 4,
    },
    {
      text: "Finally an app that combines mental health with physical training. The yoga sessions are pure gold.",
      author: "Elena Rodriguez",
      rating: 5,
    },
    {
      text: "Customer support is top-notch. I had an issue with my subscription and they fixed it in minutes.",
      author: "James Wilson",
      rating: 4,
    },
    {
      text: "The meal prep ideas have saved me so much time. Highly recommend the premium plan!",
      author: "Priya Patel",
      rating: 5,
    },
  ];

  // --- Mobile Slider Logic ---
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // --- Helper: Render Stars ---
  const renderStars = (count) => {
    return Array(5).fill(0).map((_, i) => (
      <svg 
        key={i} 
        className={`w-4 h-4 ${i < count ? 'text-yellow-400 fill-current' : 'text-blue-300/50'}`} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ));
  };

  return (
    <section className="w-screen py-10 bg-linear-to-r from-blue-600 to-blue-500 overflow-hidden relative">
      
      {/* Inject custom keyframes for the continuous slider */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        /* Pause on hover for better readability */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What our users say</h2>
        <p className="text-blue-100 max-w-2xl mx-auto">Join thousands of users who have transformed their lives with HealthBuddy.</p>
      </div>

      {/* =======================
          MOBILE VIEW (Slider + Tracker)
          Visible only on small screens (< md)
         ======================= */}
      <div className="md:hidden max-w-sm mx-auto px-4">
        <div className="relative overflow-hidden min-h-75 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <div 
            className="flex transition-transform duration-500 ease-out h-full"
            style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div key={index} className="w-full shrink-0 flex flex-col items-center justify-center text-center">
                <p className="text-white text-lg italic mb-6 leading-relaxed font-light">"{review.text}"</p>
                <h4 className="font-bold text-white text-lg">{review.author}</h4>
                <div className="flex gap-1 mt-2">{renderStars(review.rating)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Tracker Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {reviews.map((_, index) => (
            <button 
              key={index}
              onClick={() => setMobileIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === mobileIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* =======================
          DESKTOP VIEW (Infinite Marquee)
          Visible only on medium screens and up (>= md)
         ======================= */}
      <div className="hidden md:flex w-full overflow-hidden mask-fade-sides">
        {/* The track width is set to fit two sets of reviews.
            We render the reviews list TWICE. The animation moves -50% (the length of one set)
            and then instantly snaps back to 0, creating a perfect loop.
        */}
        <div className="flex animate-scroll hover:cursor-pointer w-max">
          {[...reviews, ...reviews].map((review, index) => (
            <div 
              key={index} 
              className="w-87.5 mx-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-3">{renderStars(review.rating)}</div>
                <p className="text-gray-600 italic mb-4 leading-relaxed">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-3 border-t pt-4 border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{review.author}</h4>
                  <p className="text-xs text-gray-400">Verified User</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Reviews;