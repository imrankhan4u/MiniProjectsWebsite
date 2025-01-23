import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import requests

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

# Route for rendering the home page
@app.route("/")
def home():
    return render_template("index.html")

# Route for rendering the Tic-Tac-Toe page
@app.route("/tictactoe")
def tictactoe():
    return render_template("tictactoe.html")

# Route for rendering the password generator page
@app.route("/password_generator")
def password_generator():
    return render_template("password_generator.html")

# Route for rendering the currency converter page
@app.route("/currency_converter")
def currency_converter():
    return render_template("currency_converter.html")

# Route for rendering the temperature converter page
@app.route("/temperature_converter")
def temperature_converter():
    return render_template("temperature_converter.html")

# Route for rendering the quiz game page
@app.route("/quiz")
def quiz_game():
    return render_template("quiz_game.html")

# Route for rendering the calculator page
@app.route("/calculator")
def calculator():
    return render_template("calculator.html")

# Route for rendering the to-do list page
@app.route("/todo")
def todo_list():
    return render_template("todo_list.html")

# Route to handle currency conversion requests
@app.route("/convert", methods=["POST"])
def convert_currency():
    data = request.json
    from_currency = data["from_currency"]
    to_currency = data["to_currency"]
    amount = data["amount"]

    # Fetch API key from environment variables
    api_key = os.getenv("EXCHANGE_API_KEY")

    if not api_key:
        return jsonify({"error": "API key not found"}), 500

    # Make API request to get conversion rates
    api_url = f"https://v6.exchangerate-api.com/v6/{api_key}/latest/{from_currency}"
    response = requests.get(api_url)
    data = response.json()

    if "conversion_rates" in data:
        conversion_rate = data["conversion_rates"].get(to_currency)
        if conversion_rate:
            converted_amount = amount * conversion_rate
            return jsonify({"converted_amount": round(converted_amount, 2)})

    return jsonify({"error": "Conversion failed"}), 400

if __name__ == "__main__":
    app.run(debug=True)
