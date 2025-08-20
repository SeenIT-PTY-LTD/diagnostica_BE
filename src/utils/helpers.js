const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  const strVal = String(value).trim().toLowerCase();
  return strVal !== "" && strVal !== "null" && strVal !== "undefined";
};

function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return { category : "" }; // handle invalid input

  let heightM = heightCm / 100; // convert cm → meters
  let bmi = weightKg / (heightM * heightM);

  // Round to 2 decimal places
  bmi = parseFloat(bmi.toFixed(2));

  // Determine category
  let category = "";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi >= 18.5 && bmi <= 24.9) category = "Normal weight";
  else if (bmi >= 25 && bmi <= 29.9) category = "Overweight";
  else category = "Obese";

  return { bmi, category };
}

module.exports = { isNotEmpty , calculateBMI };
