/**
 * BMR Calculator using Mifflin-St Jeor Equation
 * @param {number} weight - in kg
 * @param {number} height - in cm
 * @param {number} age - in years
 * @param {string} gender - "male" | "female"
 */

function calculateBMR(weight, height, age, gender) {
  let bmr = 0;

  if (gender.toLowerCase() === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return Math.round(bmr);
}

module.exports = calculateBMR;
