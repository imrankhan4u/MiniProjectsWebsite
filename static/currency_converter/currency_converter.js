const currencyInputFields = document.querySelectorAll('input[type="number"], select');
const resultDisplay = document.getElementById('conversion-result');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');

// List of popular currencies
const currencies = [
    'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CNY', 'MXN', 'BRL', 
    'SGD', 'CHF', 'ZAR', 'KRW', 'RUB', 'NZD', 'AED', 'MYR', 'THB', 'HKD'
];

// Populate select options
currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrencySelect.appendChild(option1);
    
    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrencySelect.appendChild(option2);
});
// Function to convert currency
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  if (isNaN(amount) || amount <= 0) {
      resultDisplay.innerHTML = "Please enter a valid amount.";
      return;
  }

  // Fetch conversion rate using ExchangeRate-API
  const apiKey = '888c5063cd91d69986af8426'; // Replace with your API key
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      if (data.error) {
          resultDisplay.innerHTML = "Error fetching data. Please try again later.";
          return;
      }

      const conversionRate = data.conversion_rates[toCurrency];  // Update with correct property name
      const convertedAmount = (amount * conversionRate).toFixed(2);

      resultDisplay.innerHTML = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
  } catch (error) {
      resultDisplay.innerHTML = "Error fetching conversion rate. Please try again later.";
  }
}
