const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const loader = document.getElementById('loader');

const showLoadingSpinner = (loading) => {
  loader.hidden = !loading;
  quoteContainer.hidden = loading;
}

const updateQuote = (quote) => {
  authorText.textContent = quote.author ? quote.author : 'Unknown';
  quoteText.classList.toggle('long-text', quote.text.length > 120)
  quoteText.textContent = quote.text;
  // Simulate loading times.
  setTimeout(() => { showLoadingSpinner(false); }, 200);
};

const tweetQuote = () => {
  // https://twitter.com/intent/tweet.
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

export { updateQuote, tweetQuote, showLoadingSpinner };
