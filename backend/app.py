from flask import Flask
from flask_cors import CORS
from routes import init_routes

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = '/tmp'  # Temporary local dir for Render

init_routes(app)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
