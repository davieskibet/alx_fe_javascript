let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspiration" },
  { text: "The harder you work for something, the greater you’ll feel when you achieve it.", category: "Hard Work" },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuote");
const quoteTextInput = document.getElementById("newQuoteText");
const quoteCategoryInput = document.getElementById("newQuoteCategory");

function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Add one below!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <small><em>Category: ${randomQuote.category}</em></small>
  `;
}

function addQuote() {
  const text = quoteTextInput.value.trim();
  const category = quoteCategoryInput.value.trim();

  if (text === "" || category === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);

  quoteTextInput.value = "";
  quoteCategoryInput.value = "";

  alert("New quote added successfully!");
}

newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);
