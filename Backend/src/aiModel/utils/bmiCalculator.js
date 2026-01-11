function calculateBMI(weight, heightCm) {
  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 23) category = "Normal";
  else if (bmi < 25) category = "Overweight";
  else category = "Obese";

  return {
    bmi: parseFloat(bmi.toFixed(2)),
    category
  };
}

module.exports = calculateBMI;
