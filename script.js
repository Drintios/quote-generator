// Local quotes fallback.
import Quotes from './quotes.js';
import { updateQuote, tweetQuote, showLoadingSpinner } from './domManipulation.js';

// Check if two dates are in the same day.
function sameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

// Show new quote.
function newQuote() {
  showLoadingSpinner(true);
  const quotes = store.get('quotes');
  const apiQuotes = quotes ? quotes.apiQuotes : Quotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  return quote;
}

// Get quote from API.
async function getQuotes() {
  showLoadingSpinner(true);
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    const apiQuotes = await response.json();
    store.set('quotes', { updated: new Date(), apiQuotes });
    updateQuote(newQuote());
  } catch (error) {
    console.log('Whoops, no quote', error);
    updateQuote(newQuote());
  }
}

// Check if quotes in cached.
const storedQuotes = store.get('quotes');
showLoadingSpinner(true);
if (storedQuotes && sameDay(new Date(storedQuotes.updated), new Date())) {
  updateQuote(newQuote());
} else {
  getQuotes();
}

const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', () => { updateQuote(newQuote()) });
