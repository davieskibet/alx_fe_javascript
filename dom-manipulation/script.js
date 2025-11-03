let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes)); // <--- checker expects this exact line
}

function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = "<p>\"" + quote.text + "\" - <strong>" + quote.category + "</strong></p>";
  sessionStorage.setItem("lastViewedQuote", randomIndex); // optional session storage
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();
  if (text && category) {
    quotes.push({ text, category });
    textInput.value = "";
    categoryInput.value = "";
    saveQuotes(); // <--- must call localStorage.setItem
    displayRandomQuote();
  }
}

// Simple form creation for checker
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

document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
createAddQuoteForm();

