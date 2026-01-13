function calculateTDEE(bmr, activityLevel) {
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    super_active: 1.9
  };

  const multiplier =
    activityMultipliers[activityLevel] || activityMultipliers.sedentary;

  return Math.round(bmr * multiplier);
}

module.exports = calculateTDEE;
