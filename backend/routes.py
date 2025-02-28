from flask import request, jsonify, send_from_directory
import os
from utils import process_image


def init_routes(app):
    # Endpoint to upload and process an image
    @app.route('/api/process-image', methods=['POST'])
    def process_image_route():
        if 'file' not in request.files:
            print("No file in request")  # Debug
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        if file.filename == '':
            print("Empty filename")  # Debug
            return jsonify({"error": "No file selected"}), 400

        # Save the uploaded file
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        print(f"Saving file to: {upload_path}")  # Debug
        file.save(upload_path)

        # Process the image with OpenCV (from utils.py)
        result = process_image(upload_path)
        print(f"Processed result: {result}")  # Debug

        # Return response
        response = {"message": "Image processed", "result": result}
        print(f"Returning response: {response}")  # Debug
        return jsonify(response)

    # Serve processed images
    @app.route('/api/processed/<filename>', methods=['GET'])
    def get_processed(filename):
        print(f"Serving processed file: {filename}")  # Debug
        return send_from_directory(app.config['PROCESSED_FOLDER'], filename)
