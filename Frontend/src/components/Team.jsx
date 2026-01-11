import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Anya Sharma",
      role: "Doctor",
      desc: "Specialist in sports medicine and preventive practice.",
      image: "https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg",
      icon: "🩺"
    },
    {
      name: "Mike Johnson",
      role: "Trainer",
      desc: "Certified personal trainer with 10 years experience.",
      image: "https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg",
      icon: "🏋️"
    },
    {
      name: "Sarah Lee",
      role: "Nutritionist",
      desc: "Expert in diet planning and nutritional needs.",
      image: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
      icon: "🍎"
    }
  ];

  return (
    <section className="w-screen py-16 bg-linear-to-b from-blue-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Team
        </h2>

        {/* Card Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group relative w-full max-w-xs bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out p-6 flex flex-col items-center"
            >
              
              {/* Icon (Absolute Positioned top-right) */}
              <div className="absolute top-4 right-4 text-3xl opacity-80 group-hover:scale-110 transition-transform">
                {member.icon}
              </div>

              {/* Profile Image */}
              <div className="w-32 h-32 mb-4 relative">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover rounded-full shadow-md border-4 border-blue-50" 
                />
              </div>

              {/* Content */}
              <div className="text-center">
                {/* Role (Boldest) */}
                <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                  {member.role}
                </h3>
                
                {/* Name */}
                <p className="text-lg font-medium text-blue-600 mb-3">
                  {member.name}
                </p>
                
                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed px-2">
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;
