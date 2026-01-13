import React, { useState } from 'react';

const Profile = () => {
  // State to handle form data
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    weight: '',
    height: '',
    fitnessGoal: 'weight_loss',
    profession: '',
    dietType: 'vegetarian',
    activityLevel: 'medium',
    foodAllergies: '',
    weeklyBudget: ''
  });

  // State to toggle between Edit and View mode
  // set to 'true' if you want it editable by default, 'false' if you want it locked initially
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile Updated Successfully!');
    setIsEditing(false); // Lock the form after saving
  };

  return (
   <div className="min-h-screen w-screen bg-blue-100 flex justify-center items-start sm:items-center py-6 sm:py-10 px-3 sm:px-6 font-sans">

      {/* Card Container */}
      <div className="bg-white w-screen max-w-2xl rounded-xl shadow-xl overflow-hidden p-4 sm:p-6 md:p-8 relative">

        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 border-b pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile</h1>
          
          {/* Edit Button (Top Right) */}
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-200 text-blue-700 px-4 py-2 rounded-md transition duration-200 text-sm font-medium w-full sm:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Edit
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Gender */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Gender:</label>
            <div className="col-span-2 flex gap-6">
              {['male', 'female', 'other'].map((type) => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={type}
                    checked={formData.gender === type}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 capitalize text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Age */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-2 w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"

            />
          </div>

          {/* Weight */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Weight (in kgs):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-2 w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Height */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Height (in cm):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-2 w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Fitness Goal */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Fitness Goal:</label>
            <select
              name="fitnessGoal"
              value={formData.fitnessGoal}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-2 w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="weight_loss">Weight Loss</option>
              <option value="weight_gain">Weight Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="muscle_gain">Muscle Gain</option>
            </select>
          </div>

          {/* Profession */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Profession:</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-2 w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Diet Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Diet Type:</label>
            <select
              name="dietType"
              value={formData.dietType}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-2 w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="eggetarian">Eggetarian</option>
              <option value="non_vegetarian">Non-Vegetarian</option>
            </select>
          </div>

          {/* Activity Level */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Activity Level:</label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              disabled={!isEditing}
              className="col-span-2 w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Food Allergies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="font-semibold text-gray-700 mt-2">Food Allergies:</label>
            <textarea
              name="foodAllergies"
              value={formData.foodAllergies}
              onChange={handleChange}
              disabled={!isEditing}
              rows="3"
              className="col-span-2 w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
            ></textarea>
          </div>

          {/* Weekly Budget */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Weekly Budget:</label>
            <div className="col-span-2 relative">
              <span className="absolute left-3 top-2 text-gray-500">₹</span>
              <input
                type="number"
                name="weeklyBudget"
                value={formData.weeklyBudget}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full pl-8 p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Update / Save Button */}
          {isEditing && (
            <div className="mt-8 pt-4">
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md shadow-md transition duration-200"
              >
                Update / Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
