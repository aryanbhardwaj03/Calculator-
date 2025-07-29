const display = document.getElementById("display");
let calculated = false;

function appendToDisplay(input) {
    if (calculated) {
        // If it's a number, start fresh
        if ("0123456789".includes(input)) {
            display.value = "";
            calculated = false;
        }
        // If it's an operator, keep the result and continue
        else if ("+-*/.".includes(input)) {
            calculated = false; // Reset the flag to allow normal input
        }
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
    calculated = false;
}

function backspace() {
    if (calculated) {
        // After calculation, backspace acts like clear
        display.value = "";
        calculated = false;
    } else {
        // During input, remove last character
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        let result = eval(display.value);
        
        // Handle very large or very small numbers with scientific notation
        if (Math.abs(result) >= 1e15 || (Math.abs(result) < 1e-6 && result !== 0)) {
            display.value = result.toExponential(6);
        } else {
            // Round to remove floating point precision errors
            // Keep up to 10 decimal places, but remove trailing zeros
            result = Math.round(result * 1e10) / 1e10;
            display.value = result.toString();
        }
        
        calculated = true;
    } catch (error) {
        display.value = "Error";
        calculated = false; // Reset flag on error
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if ("0123456789+-*/.".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Escape" || key === "c" || key === "C") {
        clearDisplay(); // Clear all
    } else if (key === "Backspace") {
        backspace(); // Backspace functionality
    }
});
