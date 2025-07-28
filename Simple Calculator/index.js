const display = document.getElementById("display");
let calculated = false;

function appendToDisplay(input) {
    if (calculated && "0123456789".includes(input)) {
        display.value = "";
        calculated = false;
    }
    display.value += input;
}

function clearDisplay() {
    if (calculated) {
        display.value = "";
        calculated = false;
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        display.value = eval(display.value);
        calculated = true;
    } catch (error) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if ("0123456789+-*/.".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter" || key === "=") {
        calculate();    
    } else if (key === "Escape" || key === "c" || key === "C" || key === "Backspace") {
        clearDisplay();
    }
});