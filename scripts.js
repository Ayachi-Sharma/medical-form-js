document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.querySelector(".save-btn");

    saveBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Clear old errors
        document.querySelectorAll(".error-message").forEach(el => el.remove());
        document.querySelectorAll("input, select").forEach(el => el.classList.remove("invalid"));

        let isValid = true;

        const allInputs = document.querySelectorAll("input, select");

        allInputs.forEach((input) => {
            const value = input.value.trim();
            const type = input.getAttribute("type");
            const label = input.previousElementSibling?.innerText.toLowerCase();

            if ((type === "text" || type === "email" || type === "number" || type === "date") && value === "") {
                showError(input, "This field is required.");
                isValid = false;
            }

            // Name validation: No numbers allowed
            if (label && label.includes("full name")) {
                if (/\d/.test(value)) {
                    showError(input, "Name cannot contain numbers.");
                    isValid = false;
                }
            }

            // Contact number: Must be 10 digits
            if (label && label.includes("phone number")) {
                if (!/^\d{10}$/.test(value)) {
                    showError(input, "Phone number must be exactly 10 digits.");
                    isValid = false;
                }
            }

            // Email validation
            if (type === "email" && value !== "") {
                if (!value.endsWith("@gmail.com")) {
                    showError(input, "Email must end with @gmail.com.");
                    isValid = false;
                } else {
                    const namePart = value.split("@")[0];
                    if (namePart.length < 3 || /[^a-zA-Z0-9.]/.test(namePart)) {
                        showError(input, "Invalid email username. Use at least 3 letters/numbers.");
                        isValid = false;
                    }
                }
            }

            // Select validation
            if (input.tagName === "SELECT" && value === "") {
                showError(input, "Please select an option.");
                isValid = false;
            }
        });

        // Gender check
        const genderInputs = document.querySelectorAll("input[name='gender']");
        const genderGroup = genderInputs[0]?.closest(".gender-group");
        const genderChecked = [...genderInputs].some(input => input.checked);
        if (!genderChecked && genderGroup) {
            showError(genderGroup, "Please select gender.");
            isValid = false;
        }

        if (isValid) {
            alert("✅ Form submitted successfully!");
        }
    });

    function showError(input, message) {
        const error = document.createElement("div");
        error.classList.add("error-message");
        error.innerText = message;

        input.classList.add("invalid");

        if (input.classList.contains("gender-group")) {
            input.appendChild(error);
        } else {
            input.parentElement.appendChild(error);
        }
    }
});
