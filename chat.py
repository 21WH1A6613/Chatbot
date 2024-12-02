import random
import json
import torch
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load data
with open('mentalhealth.json', 'r') as json_data:
    intents = json.load(json_data)
data = torch.load("data.pth")
all_words = data['all_words']
tags = data['tags']
model = NeuralNet(data["input_size"], data["hidden_size"], data["output_size"]).to(device)
model.load_state_dict(data["model_state"])
model.eval()

def get_response(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = torch.from_numpy(X).to(device).float()
    output = model(X.unsqueeze(0))
    _, predicted = torch.max(output, dim=1)
    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent['tag']:
                return random.choice(intent['responses'])
    return "I do not understand."

if __name__ == "__main__":
    print("Start chatting with the bot! (type 'quit' to exit)")
    while True:
        msg = input("You: ")
        if msg.lower() == "quit":
            break
        print(f"{get_response(msg)}")
