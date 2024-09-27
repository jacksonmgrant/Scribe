from transformers import pipeline
from database.connection import Settings

access_token = Settings().HUGGINGFACE_TOKEN

generator = pipeline("text-generation", model="meta-llama/Meta-Llama-3-8B", token=access_token)

def generate_title(text: str) -> str:
    prompt = f"Generate a title for this text: {text}"
    return generator(prompt, max_length=5000, max_new_tokens=150, truncation=True, do_sample=True, temperature=0.2)[0]["generated_text"]

def generate_note(text: str) -> str:
    prompt = f"Synthesize notes from this text: {text}"
    return generator(prompt, max_length=5000, max_new_tokens=1000, truncation=True, do_sample=True, temperature=0.2)[0]["generated_text"]

if __name__ == "__main__":
    print("Generating title and note for sample text...")
    sample_text = "Artificial intelligence (AI) is a branch of computer science that focuses on creating intelligent machines capable of performing tasks that typically require human intelligence. AI systems employ various techniques, including machine learning and deep learning, to analyze data, learn from it, and make decisions or predictions. AI has numerous applications across industries, including healthcare, finance, transportation, and entertainment. In healthcare, AI is used for medical imaging analysis, drug discovery, and personalized treatment recommendations. In finance, AI algorithms are employed for fraud detection, risk assessment, and algorithmic trading. In transportation, AI powers autonomous vehicles, traffic management systems, and route optimization algorithms. In entertainment, AI-driven recommendation systems personalize content for users based on their preferences and behavior. As AI continues to advance, its impact on society and the economy is expected to grow, with both opportunities and challenges arising from its widespread adoption."
    #print(generate_title(sample_text))
    print(generate_note(sample_text))
