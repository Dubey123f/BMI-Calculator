const height = document.getElementById("height");
const weight = document.getElementById("weight");
 
const bmiElem = document.querySelector(".bmi");
const remarkElem = document.querySelector(".remark");
 
const heightUnit = document.getElementById("height-unit");
const weightUnit = document.getElementById("weight-unit");
 
const heightValue = document.getElementById("height-value");
const weightValue = document.getElementById("weight-value");
 
let textColor = "green";
let remark = "Normal";
let bmi = 0;
 
bmiElem.innerHTML = bmi;
 
function resetDefault(height, weight) {
  if (height !== null) {
    height.value = height;
  }
  if (weight !== null) {
    weight.value = weight;
  }
}
 
function updateValue(bmi, remark, textColor) {
  bmiElem.innerHTML = `${bmi.toPrecision(4)}`;
  remarkElem.innerHTML = remark;
  remarkElem.style.color = textColor;
}
 
function calculateBMI(height, weight) {
  const heightUnit = document.getElementById("height-unit").value;
  const weightUnit = document.getElementById("weight-unit").value;
 
  // Convert height to meter
 
  if (heightUnit === "cm") {
    height /= 100;
  } else if (heightUnit === "in") {
    height /= 39.37;
  } else if (heightUnit === "ft") {
    height /= 3.281;
  }
 
  // Convert weight to kg
 
  if (weightUnit === "g") {
    weight /= 1000;
  } else if (weightUnit === "lbs") {
    weight /= 2.205;
  } else if (weightUnit === "oz") {
    weight /= 35.274;
  }
 
  // calculate bmi from height in meter and weight in kg
  bmi = weight / (height * height);
 
  if (bmi < 18.5) {
    remark = "Underweight";
    textColor = "red";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    remark = "Normal";
    textColor = "green";
  } else if (bmi >= 25 && bmi <= 29.9) {
    remark = "Overweight";
    textColor = "orange";
  } else if (bmi >= 30) {
    remark = "Obese";
    textColor = "red";
  }
 
  updateValue(bmi, remark, textColor);
}
 
// Adjust the min and max attribute of the height and weight input range
heightUnit.addEventListener("change", () => {
  const heightUnitValue = heightUnit.value;
  if (heightUnitValue === "cm") {
    height.min = 1;
    height.max = 300;
    resetDefault(1, null);
  } else if (heightUnitValue === "m") {
    height.min = 1;
    height.max = 5;
    resetDefault(1, null);
  } else if (heightUnitValue === "in") {
    height.min = 1;
    height.max = 118;
    resetDefault(1, null);
  } else if (heightUnitValue === "ft") {
    height.min = 1;
    height.max = 9;
    resetDefault(1, null);
  }
  calculateBMI(height.value, weight.value);
});
 
weightUnit.addEventListener("change", () => {
  const weightUnitValue = weightUnit.value;
  if (weightUnitValue === "kg") {
    weight.min = 1;
    weight.max = 300;
    resetDefault(null, 1);
  } else if (weightUnitValue === "g") {
    weight.min = 1000;
    weight.max = 300000;
    resetDefault(null, 1);
  } else if (weightUnitValue === "lbs") {
    weight.min = 2;
    weight.max = 661;
    resetDefault(null, 1);
  } else if (weightUnitValue === "oz") {
    weight.min = 35;
    weight.max = 10582;
    resetDefault(null, 1);
  }
  calculateBMI(height.value, weight.value);
});
 
height.addEventListener("input", () => {
  heightValue.innerHTML = height.value;
  calculateBMI(height.value, weight.value);
});
weight.addEventListener("input", () => {
  weightValue.innerHTML = weight.value;
  calculateBMI(height.value, weight.value);
});