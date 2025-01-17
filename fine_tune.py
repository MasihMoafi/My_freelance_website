from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments
from datasets import Dataset

# Load the tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("EleutherAI/gpt-j-6B")
model = AutoModelForCausalLM.from_pretrained("EleutherAI/gpt-j-6B")

# Load your data
with open("Data.txt", "r") as f:
    lines = f.readlines()

# Prepare the dataset
prompts = []
responses = []
for line in lines:
    if line.startswith("Prompt:"):
        prompts.append(line.strip().replace("Prompt: ", ""))
    elif line.startswith("Response:"):
        responses.append(line.strip().replace("Response: ", ""))

data = {"prompt": prompts, "response": responses}
dataset = Dataset.from_dict(data)

# Tokenize the dataset
def tokenize_function(examples):
    return tokenizer(examples["prompt"], truncation=True, padding="max_length", max_length=512)

tokenized_dataset = dataset.map(tokenize_function, batched=True)

# Fine-tune the model
training_args = TrainingArguments(
    output_dir="./fine_tuned_model",
    overwrite_output_dir=True,
    num_train_epochs=3,
    per_device_train_batch_size=1,
    save_steps=10_000,
    save_total_limit=2,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
)

trainer.train()
trainer.save_model("./fine_tuned_model")
tokenizer.save_pretrained("./fine_tuned_model")