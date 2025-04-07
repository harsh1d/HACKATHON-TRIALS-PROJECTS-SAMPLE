import os
from flask import Flask, request, jsonify, render_template
import fitz  # PyMuPDF
import openai

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = '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'

def read_pdf(file_path):
    text = ""
    with fitz.open(file_path) as pdf:
        for page in pdf:
            text += page.get_text()
    return text

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    pdf_text = read_pdf(file_path)
    
    return jsonify({"message": "File uploaded successfully", "text": pdf_text}), 200

@app.route('/ask', methods=['POST'])
def ask_question():
    question = request.json.get('question')
    pdf_text = request.json.get('pdf_text')

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"{question}\n\nContext: {pdf_text}"}
        ]
    )

    answer = response['choices'][0]['message']['content']
    return jsonify({"answer": answer}), 200

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True)
