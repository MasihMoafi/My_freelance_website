from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load the fine-tuned model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("./fine_tuned_model")
model = AutoModelForCausalLM.from_pretrained("./fine_tuned_model")

app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate_text():
    data = request.json
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    # Tokenize input
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, padding=True)

    # Generate text with controlled randomness (lower temperature)
    output = model.generate(
        inputs["input_ids"],
        attention_mask=inputs["attention_mask"],
        max_length=len(inputs["input_ids"][0]) + 100,
        do_sample=True,  # Set to True to use temperature and top_p
        temperature=0.3,  # Lower temperature to reduce hallucinations
        top_p=0.9,
        pad_token_id=tokenizer.eos_token_id
    )

    # Decode and return the text
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({"response": generated_text.strip()})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)