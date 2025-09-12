from flask import Flask, request, jsonify
from llama_index.llms.gemini import Gemini
from llama_index.core.llms import ChatMessage
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.embeddings.gemini import GeminiEmbedding
import os
from flask_cors import CORS

api_key = "<API-KEY>"
os.environ["GOOGLE_API_KEY"] = api_key

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

llm = Gemini()
model_name = "models/embedding-001"
embed_model = GeminiEmbedding(
    model_name=model_name, api_key=api_key, 
)
Settings.embed_model = embed_model
Settings.llm = llm
documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

@app.route('/chat', methods=['POST'])
def chat():
    # Get the data from the request
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({"error": "No message provided"}), 400

    user_message = data['message']

    response_message = str(query_engine.query(user_message+" . Your response should not be more than 50 words."))
    response_message = response_message.replace('"', '')
    response_message = response_message.replace('*', '')
    response_message = response_message.replace("'", '')
    # print(response_message)
    return jsonify({"response": response_message})

if __name__ == '__main__':
    app.run(debug=True)