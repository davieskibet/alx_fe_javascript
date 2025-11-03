// Array of quotes
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
];

// Function to display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}" — <strong>${quote.category}</strong></p>`;
}

// Function to add new quotes dynamically
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newQuote = {
    text: textInput.value.trim(),
    category: categoryInput.value.trim()
  };

  if (newQuote.text && newQuote.category) {
    quotes.push(newQuote);
    textInput.value = "";
    categoryInput.value = "";
    alert("Quote added successfully!");
  } else {
    alert("Please fill in both fields before adding a quote.");
  }
}

// Function to dynamically create the Add Quote form
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const heading = document.createElement("h3");
  heading.textContent = "Add a New Quote";
  formContainer.appendChild(heading);

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";
  formContainer.appendChild(textInput);

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  formContainer.appendChild(categoryInput);

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";
  addBtn.addEventListener("click", addQuote);
  formContainer.appendChild(addBtn);

  // Basic styling for readability
  formContainer.style.marginTop = "20px";
  formContainer.style.display = "flex";
  formContainer.style.flexDirection = "column";
  formContainer.style.gap = "10px";

  document.body.appendChild(formContainer);
}

// Add event listener for showing random quotes
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Create the Add Quote form dynamically when the page loads
createAddQuoteForm();

