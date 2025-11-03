// Array to hold quotes
const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do what you can, with what you have, where you are.", category: "Inspiration" }
];

/**
 * ✅ Function: displayRandomQuote
 * Selects a random quote and updates the DOM
 */
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Logic: pick random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update the DOM using innerHTML
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <p><em>— ${randomQuote.category}</em></p>
  `;
}

/**
 * ✅ Function: addQuote
 * Adds a new quote to the quotes array and updates the DOM
 */
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newQuoteText = textInput.value.trim();
  const newQuoteCategory = categoryInput.value.trim();

  // Logic: add new quote
  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Update the DOM immediately with new quote
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `
      <p>"${newQuoteText}"</p>
      <p><em>— ${newQuoteCategory}</em></p>
    `;

    // Clear input fields
    textInput.value = "";
    categoryInput.value = "";
  } else {
    alert("Please enter both quote text and category.");
  }
}

/**
 * ✅ Function: createAddQuoteForm
 * Dynamically creates a form for adding new quotes
 */
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

  document.body.appendChild(formContainer);
}

/**
 * ✅ Event listener on the “Show New Quote” button
 */
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Create Add Quote form dynamically
createAddQuoteForm();

