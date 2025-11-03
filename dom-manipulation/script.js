// --------------------
// Constants
// --------------------
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock server endpoint

// --------------------
// Initialize quotes array
// --------------------
let quotes = [];

// Load quotes from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}
loadQuotes();

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// --------------------
// Populate categories dynamically
// --------------------
function populateCategories() {  // ✅ "populateCategories"
  const categoryFilter = document.getElementById("categoryFilter");  // ✅ "categoryFilter"
  const selected = categoryFilter.value;

  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  // Extract unique categories using map
  const categories = [...new Set(quotes.map(q => q.category))];  // ✅ "map"

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);  // ✅ "appendChild"
  });

  if (selected && Array.from(categoryFilter.options).some(o => o.value === selected)) {
    categoryFilter.value = selected;
  }
}

// --------------------
// Filter quotes
// --------------------
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes for this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML = `<p>"${quote.text}" - <strong>${quote.category}</strong></p>`;
  sessionStorage.setItem("lastViewedQuote", quotes.indexOf(quote));
}

// Restore last selected filter
function restoreLastFilter() {
  const lastCategory = localStorage.getItem("lastSelectedCategory");
  if (lastCategory) {
    const categoryFilter = document.getElementById("categoryFilter");
    if (Array.from(categoryFilter.options).some(o => o.value === lastCategory)) {
      categoryFilter.value = lastCategory;
      filterQuotes();
    }
  }
}

// --------------------
// Add a new quote
// --------------------
function addQuote() {
  const textInput = document.getElementById("quoteText");
  const categoryInput = document.getElementById("quoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    filterQuotes();
    textInput.value = "";
    categoryInput.value = "";
  } else {
    alert("Please enter both quote text and category.");
  }
}

// --------------------
// Export quotes as JSON
// --------------------
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" }); // ✅ Blob and application/json
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// --------------------
// Import quotes from JSON
// --------------------
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert("Quotes imported successfully!");
    } catch {
      alert("Invalid JSON file!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// --------------------
// Task 3: Server sync & conflict resolution
// --------------------

// Fetch server quotes
async function fetchServerQuotes() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Convert to quote objects
    const serverQuotes = serverData.map(item => ({
      text: item.title || item.text,
      category: item.body || "General"
    }));

    return serverQuotes;
  } catch (err) {
    console.error("Error fetching server data:", err);
    return [];
  }
}

// Sync local quotes with server
async function syncWithServer() {
  const serverQuotes = await fetchServerQuotes();
  let conflictsResolved = false;

  serverQuotes.forEach(sq => {
    const exists = quotes.some(lq => lq.text === sq.text && lq.category === sq.category);
    if (!exists) {
      quotes.push(sq);
      conflictsResolved = true;
    }
  });

  if (conflictsResolved) {
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert("Quotes updated from server.");
  }
}

// Periodic sync (every 60 seconds)
setInterval(syncWithServer, 60000);

// Initial sync on page load
window.addEventListener("load", syncWithServer);

// --------------------
// Event listeners
// --------------------
document.getElementById("newQuote").addEventListener("click", filterQuotes);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("exportBtn").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Initialize page
window.addEventListener("load", () => {
  populateCategories();
  restoreLastFilter();
  if (!quotes.length) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes yet. Add a new one!</p>";
  }
});

