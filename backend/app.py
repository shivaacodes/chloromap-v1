from flask import Flask
from flask_cors import CORS
from routes import init_routes

app = Flask(__name__)
CORS(app)

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['PROCESSED_FOLDER'] = 'processed'

init_routes(app)  # Load routes from routes.py

if __name__ == '__main__':
    app.run(debug=True, port=5000)
