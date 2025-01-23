async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        resultDisplay.innerHTML = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from_currency: fromCurrency,
                to_currency: toCurrency,
                amount: amount
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            resultDisplay.innerHTML = `${amount} ${fromCurrency} is equal to ${data.converted_amount} ${toCurrency}`;
        } else {
            resultDisplay.innerHTML = data.error || "Error fetching conversion rate. Please try again later.";
        }
    } catch (error) {
        resultDisplay.innerHTML = "Error fetching conversion rate. Please try again later.";
    }
}
