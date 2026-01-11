import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample Data matching the vibe of your screenshot
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
      title: "Running Goals",
      desc: "Track your progress daily"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop", // Yoga/Gym
      title: "Health Poster",
      desc: "Join our new sessions"
    },
    {
      id: 3,
      image: "https://www.ashleytreatment.org/wp-content/uploads/2020/02/AdobeStock_245653305-scaled.jpeg?q=80&w=2000&auto=format&fit=crop", // 3D/Abstract health
      title: "Mental Wellness",
      desc: "Find your inner peace"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop", // Fitness
      title: "Strength Training",
      desc: "Build muscle effectively"
    }
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-slide functionality (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    // Main Container with Blue Gradient Background
    <div className="w-screen bg-linear-to-r from-blue-400 to-blue-600 py-10 md:py-16 relative overflow-hidden">
      
      {/* Content Container */}
      <div className="max-w-350 mx-auto h-75 md:h-112.5 relative flex items-center justify-center perspective-1000">
        
        {/* Slides Logic */}
        {slides.map((slide, index) => {
          // Determine position relative to current index
          let position = 'hidden'; // Default
          
          if (index === currentIndex) {
            position = 'active'; // Center
          } else if (
            index === currentIndex - 1 ||
            (currentIndex === 0 && index === slides.length - 1)
          ) {
            position = 'prev'; // Left
          } else if (
            index === currentIndex + 1 ||
            (currentIndex === slides.length - 1 && index === 0)
          ) {
            position = 'next'; // Right
          }

          // Styles based on position
          let transformClass = '';
          let zIndex = 'z-0';
          let opacity = 'opacity-0';

          if (position === 'active') {
            transformClass = 'translate-x-0 scale-100 opacity-100';
            zIndex = 'z-20';
            opacity = 'opacity-100';
          } else if (position === 'prev') {
            // Move left and scale down
            transformClass = '-translate-x-[60%] md:-translate-x-[70%] scale-80 opacity-60 blur-[1px]';
            zIndex = 'z-10';
            opacity = 'opacity-50';
          } else if (position === 'next') {
            // Move right and scale down
            transformClass = 'translate-x-[60%] md:translate-x-[70%] scale-80 opacity-60 blur-[1px]';
            zIndex = 'z-10';
            opacity = 'opacity-50';
          }

          return (
            <div
              key={slide.id}
              className={`absolute top-0 w-[85%] md:w-[60%] h-full transition-all duration-500 ease-in-out rounded-2xl shadow-2xl overflow-hidden ${transformClass} ${zIndex} ${opacity}`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Optional Text Overlay for Active Slide */}
              {position === 'active' && (
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6 text-white text-left">
                  <h2 className="text-2xl md:text-3xl font-bold">{slide.title}</h2>
                  <p className="text-sm md:text-base text-gray-200">{slide.desc}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* --- Navigation Arrows (Visible on Desktop) --- */}
        <button 
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 md:left-10 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <button 
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 md:right-10 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

      </div>

      {/* --- Pagination Dots --- */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
          ></button>
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;
