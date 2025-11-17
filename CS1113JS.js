let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}

// Display the result in the HTML element with id="result"
document.getElementById("result").textContent = "The sum of numbers 1 to 10 is: " + sum;