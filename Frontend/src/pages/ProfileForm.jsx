import { getWeeklyDietApi } from '../Api/dietApi';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    profession: '',
    goal: 'weight_loss',
    dietType: 'vegetarian',
    activityLevel: 'medium',
    foodAllergies: '',
    weeklyBudget: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Number(formData.age) <= 0 ||
      Number(formData.height) <= 0 ||
      Number(formData.weight) <= 0 ||
      !formData.profession ||
      Number(formData.weeklyBudget) <= 0
    ) {
      alert("Please fill all required fields");
      return;
    }

    const activityMap = {
      low: "sedentary",
      medium: "moderately_active",
      high: "very_active"
    };

    const payload = {
      gender: formData.gender,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      profession: formData.profession,
      goal: formData.goal,
      dietType: formData.dietType,
      activityLevel: activityMap[formData.activityLevel] || "moderately_active",
      foodAllergies: formData.foodAllergies
        ? formData.foodAllergies.split(",").map(i => i.trim()).filter(Boolean)
        : [],
      weeklyBudget: Number(formData.weeklyBudget)
    };

    try {
      setLoading(true);
      const res = await getWeeklyDietApi(payload);

      alert("Profile saved & diet generated successfully!");
      navigate("/diettable", { state: res.data });

    } catch (error) {
      if (error.response?.status === 401) {
        alert(error.response.data.message || "Please login first");
        navigate("/login");
      } else {
        alert("Failed to generate diet plan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-blue-100 flex justify-center items-start sm:items-center py-6 sm:py-10 px-3 sm:px-6 font-sans">

      <div className="bg-white w-screen max-w-2xl rounded-xl shadow-xl overflow-hidden p-4 sm:p-6 md:p-8 relative">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 border-b pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Profile</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Gender */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Gender:</label>
            <div className="col-span-2 flex gap-6">
              {['male', 'female', 'other'].map(type => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={type}
                    checked={formData.gender === type}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
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
              className="col-span-2 w-full p-3 border rounded-md"
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
              className="col-span-2 w-full p-3 border rounded-md"
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
              className="col-span-2 w-full p-3 border rounded-md"
            />
          </div>

          {/* Fitness Goal */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Fitness Goal:</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="col-span-2 w-full p-3 border rounded-md"
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
              className="col-span-2 w-full p-3 border rounded-md"
            />
          </div>

          {/* Diet Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:items-center gap-4">
            <label className="font-semibold text-gray-700">Diet Type:</label>
            <select
              name="dietType"
              value={formData.dietType}
              onChange={handleChange}
              className="col-span-2 w-full p-3 border rounded-md"
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
              className="col-span-2 w-full p-3 border rounded-md"
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
              rows="3"
              placeholder="If there is no food allergy, write No"
              className="col-span-2 w-full p-3 border rounded-md resize-none"
            />
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
                className="w-full pl-10 p-3 border rounded-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-8 rounded-md shadow-md"
            >
              {loading ? 'Generating Diet...' : 'Generate Diet'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
