function addToOutput(value) {
  document.getElementById("output").value += value;
}

function clearOutput() {
  document.getElementById("output").value = '';
}

function calculate() {
  const outputField = document.getElementById("output");
  try {
    outputField.value = Function('"use strict";return (' + outputField.value + ')')();
  } catch (error) {
    outputField.value = "Error";
  }
}
