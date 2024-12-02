from flask import Flask, render_template, jsonify, request, json
from chat import get_response

app = Flask(__name__)

emojis = {
    "happy": "&#128522;",
    "neutral": "&#128528;",
    "sad": "&#128577;"
}

# Route to serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_bot_response():
    user_message = request.form['user_message']
    
    # Check if the user’s message is "thank you"
    if user_message.lower() == "thank you":
        response = (
            "You're welcome! Please select an emoji that represents how satisfied you are with bot suggestions<br>"
            + "<div><button class='emoji-btn happy' onclick='sendFeedback(\"happy\")'>" + emojis["happy"] + "</button></div>"
            + "<div><button class='emoji-btn neutral' onclick='sendFeedback(\"neutral\")'>" + emojis["neutral"] + "</button></div>"
            + "<div><button class='emoji-btn sad' onclick='sendFeedback(\"sad\")'>" + emojis["sad"] + "</button></div>"
        )
    else:
        # Get response from the chatbot module
        response = get_response(user_message)
    
    return jsonify({'bot_response': response})

if __name__ == '__main__':
    app.run(debug=True)
