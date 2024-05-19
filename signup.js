const form = document.getElementById("registrationForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const otherNames = document.getElementById("otherNames");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");
const gender = document.getElementById("gender");

const firstNameErr = document.getElementById("firstNameError");
const lastNameErr = document.getElementById("lastNameError");
const otherNamesErr = document.getElementById("otherNamesError");
const emailErr = document.getElementById("emailError");
const phoneNumberErr = document.getElementById("phoneNumberError");
const genderErr = document.getElementById("genderError");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;

  // Clear error messages
  firstNameErr.textContent = "";
  lastNameErr.textContent = "";
  otherNamesErr.textContent = "";
  emailErr.textContent = "";
  phoneNumberErr.textContent = "";
  genderErr.textContent = "";

  // Validate first name
  if (firstName.value.trim().length < 1) {
    firstNameErr.textContent = "First name is required and must not be empty.";
    isValid = false;
  } else if (/\d/.test(firstName.value)) {
    firstNameErr.textContent = "First name cannot contain numbers.";
    isValid = false;
  }

  // Validate last name
  if (lastName.value.trim().length < 1) {
    lastNameErr.textContent = "Last name is required and must not be empty.";
    isValid = false;
  } else if (/\d/.test(lastName.value)) {
    lastNameErr.textContent = "Last name cannot contain numbers.";
    isValid = false;
  }

  // Validate other names
  if (otherNames.value.trim() !== "" && /\d/.test(otherNames.value)) {
    otherNamesErr.textContent = "Other names cannot contain numbers.";
    isValid = false;
  }

  // Validate email
  if (!/.+@.+\..+/.test(email.value)) {
    emailErr.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  // Validate phone number
  if (isNaN(phoneNumber.value) || phoneNumber.value.length < 10) {
    phoneNumberErr.textContent = "Phone number must be atleast 10 digits.";
    isValid = false;
  }

  // Validate gender
  if (gender.value === "") {
    genderErr.textContent = "Please select your gender.";
    isValid = false;
  }

  // If all checks out, save form data to 'database.json'
  if (isValid) {
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      otherNames: otherNames.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      gender: gender.value
    };

    // Save form data to 'database.json'
    saveToFile(formData);

    // Reset form
    form.reset();
  }
});

function saveToFile(formData) {
  // Convert object to JSON string
  const jsonData = JSON.stringify(formData, null, 2);

  // Create Blob with JSON data
  const blob = new Blob([jsonData], { type: "application/json" });

  // Create temporary URL for Blob
  const url = URL.createObjectURL(blob);

  // Create anchor element with temporary URL
  const link = document.createElement("a");
  link.href = url;
  link.download = "database.json";

  // Append anchor element to document and click it
  document.body.appendChild(link);
  link.click();

  // Remove temporary anchor element from document
  document.body.removeChild(link);

  // Release temporary URL
  URL.revokeObjectURL(url);
}
