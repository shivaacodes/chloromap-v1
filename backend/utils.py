import cv2
import os
import numpy as np

def process_image(filepath):
    # Read the image in BGR (OpenCV default)
    img = cv2.imread(filepath)
    if img is None:
        return {"error": "Failed to load image"}

    # Convert BGR to HSV
    hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Optional: Save HSV image (for display or debugging)
    processed_path = filepath.replace('uploads', 'processed').replace('.jpg', '_hsv.jpg')
    os.makedirs(os.path.dirname(processed_path), exist_ok=True)
    cv2.imwrite(processed_path, hsv_img)

    # Analyze HSV channels (example: average hue, saturation, value)
    height, width, _ = hsv_img.shape
    h, s, v = cv2.split(hsv_img)  # Split into Hue, Saturation, Value channels
    avg_hue = int(np.mean(h))     # Average hue (0-179 in OpenCV)
    avg_sat = int(np.mean(s))     # Average saturation (0-255)
    avg_val = int(np.mean(v))     # Average value (0-255)

    # Return metadata
    return {
        "width": width,
        "height": height,
        "processed_file": os.path.basename(processed_path),
        "hue": avg_hue,
        "saturation": avg_sat,
        "value": avg_val
    }