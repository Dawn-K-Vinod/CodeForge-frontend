// Initialize CodeMirror for Syntax Highlighting
        const editor = CodeMirror.fromTextArea(document.getElementById("c_code"), {
            mode: "text/x-csrc",
            lineNumbers: true,
            theme: "dracula",
            autoCloseBrackets: true,
            matchBrackets: true,
        });

        const response = await fetch('https://codeforge-backend-9fjd.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: cCode }),
        });

        // Show Pop-up on Page Load
        window.onload = function () {
            document.getElementById("popup").style.display = "block";
            document.getElementById("overlay").style.display = "block";
        };

        // Close Pop-up
        function closePopup() {
            document.getElementById("popup").style.display = "none";
            document.getElementById("overlay").style.display = "none";
        }

        // Dark Mode Toggle
        function toggleDarkMode() {
            const body = document.body;
            const darkModeToggle = document.querySelector('.dark-mode-toggle');

            //Toggle the theme
            body.dataset.theme = body.dataset.theme === "dark" ? "" : "dark";

            // Update the button text based on the current theme
            if (body.dataset.theme === "dark") {
                darkModeToggle.textContent = "Toggle Light Mode";
            } else {
                darkModeToggle.textContent = "Toggle Dark Mode";
            }
        }

        // Function to show the selected section
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });

            // Show the selected section
            document.getElementById(sectionId).classList.add('active');
        }

        // Function to simulate C to Assembly conversion
        async function convertCode() {
            const cCode = editor.getValue();

            try {
                // Send the C code to the backend for compilation
                const response = await fetch('http://localhost:3000/compile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: cCode }),
                });

                const data = await response.json();
                if (data.error) {
                    document.getElementById("assembly_output").textContent = `Error: ${data.error}`;
                } else {
                    document.getElementById("assembly_output").textContent = data.assembly;
                }
            } catch (error) {
                document.getElementById("assembly_output").textContent = `Error: ${error.message}`;
            }
        }

        // Function to convert text to binary
        function convertText() {
            const text = document.getElementById("text_input").value;

            // Check if the input is a number
            if (!isNaN(text)) {
                // Convert the number to binary
                const number = parseInt(text, 10);
                if (!isNaN(number)) {
                    const binaryOutput = number.toString(2);
                    document.getElementById("text_binary_output").textContent = binaryOutput;
                } else {
                    document.getElementById("text_binary_output").textContent = "Invalid number";
                }
            } else {
                // Convert text to binary
                let binaryOutput = "";
                for (let i = 0; i < text.length; i++) {
                    const charCode = text.charCodeAt(i); // Get Unicode value of the character
                    const binary = charCode.toString(2).padStart(8, "0"); // Convert to 8-bit binary
                    binaryOutput += binary + " "; // Add space between bytes
                }
                // Display binary output
                document.getElementById("text_binary_output").textContent = binaryOutput.trim();
            }
        }

        // Function to download output
        function downloadOutput(elementId, fileName) {
            const content = document.getElementById(elementId).textContent;
            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url);
        }

        // Function to load a random C program
        function loadRandomProgram() {
            const randomPrograms = [
//Random 1
`//Sum of two numbers
#include <stdio.h>
int main() {
    int a = 5;
    int b = 10;
    int sum = a + b;
    printf("Sum: %d\\n", sum);
    return 0;
}`,

//Random 2
`//Printing a string multiple times using loop.
#include <stdio.h>
int main() {
    for (int i = 1; i <= 5; i++) {
        printf("Hello, World! %d\\n", i);
    }
    return 0;
}`,

//Random 3
`//Read and display a number
#include <stdio.h>
int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    printf("You entered: %d\\n", num);
    return 0;
}`,

//Random 4
`//Factorial of 5
#include <stdio.h>
int main() {
    int factorial = 1;
    for (int i = 1; i <= 5; i++) {
        factorial *= i;
    }
    printf("Factorial of 5: %d\\n", factorial);
    return 0;
}`,

//Random 5
`#include <stdio.h>
int main() {
    printf("Hello, Welcome to CodeForge World!\\n");
    return 0;
}`,

//Random 6
`//Even or Odd
#include <stdio.h>
int main() {
    int num = 7;
    printf(num % 2 == 0 ? "Even\\n" : "Odd\\n");
    return 0;
}`,

//Random 7
`//Swap two numbers
#include <stdio.h>
int main() {
    int a = 3, b = 5;
    a = a + b; b = a - b; a = a - b;
    printf("a: %d, b: %d\\n", a, b);
    return 0;
}`,

//Random 8
`//Prime or not
#include <stdio.h>
int main() {
    int n = 13, i, flag = 1;
    for (i = 2; i <= n / 2; i++) if (n % i == 0) { flag = 0; break; }
    printf(flag ? "Prime\\n" : "Not Prime\\n");
    return 0;
}`,

//Random 9
`//Fibonacci
#include <stdio.h>
int main() {
    int n = 5, a = 0, b = 1;
    for (int i = 0; i < n; i++) { printf("%d ", a); int temp = a; a = b; b = temp + b; }
    return 0;
}`,

//Random 10
`//Reverse a number
#include <stdio.h>
int main() {
    int num = 1234, rev = 0;
    while (num > 0) { rev = rev * 10 + num % 10; num /= 10; }
    printf("Reversed: %d\\n", rev);
    return 0;
}`

            ];

            // Select a random program
            const randomIndex = Math.floor(Math.random() * randomPrograms.length);
            const randomProgram = randomPrograms[randomIndex];

            // Update the CodeMirror editor
            editor.setValue(randomProgram);
        }
