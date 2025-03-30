document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input, select");
    
    form.addEventListener("submit", function (event) {
      let isValid = true;
  
      inputs.forEach((input) => {
        const errorSpan = input.nextElementSibling;
        
        if (input.required && !input.value.trim()) {
          showError(input, errorSpan, "This field is required.");
          isValid = false;
        } else if (input.type === "email" && !isValidEmail(input.value)) {
          showError(input, errorSpan, "Email must be at least 8 characters, one uppercase letter, one lowercase letter, and one number.");
          isValid = false;
        } else if (input.type === "password" && input.value.length < 6) {
          showError(input, errorSpan, "Password must be at least 6 characters.");
          isValid = false;
        } else if (input.type === "tel" && !isValidPhone(input.value)) {
          showError(input, errorSpan, "Enter a valid phone number.");
          isValid = false;
        } else {
          hideError(input, errorSpan);
        }
      });
  
      if (!isValid) {
        event.preventDefault();
      }
    });
  
    function showError(input, errorSpan, message) {
      input.classList.add("invalid");
      if (errorSpan && errorSpan.classList.contains("error-message")) {
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
      }
    }
  
    function hideError(input, errorSpan) {
      input.classList.remove("invalid");
      if (errorSpan && errorSpan.classList.contains("error-message")) {
        errorSpan.style.display = "none";
      }
    }
  
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function isValidPhone(phone) {
      return /^\d{10}$/.test(phone.replace(/\D/g, ""));
    }
  });
  
  