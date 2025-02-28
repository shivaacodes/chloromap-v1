import cv2
import os
import numpy as np
from gemini import get_plant_summary


def process_image(filepath):
    img = cv2.imread(filepath)
    if img is None:
        return {"error": "Failed to load image"}
    hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    processed_path = filepath.replace(
        'uploads', 'processed').replace('.jpg', '_hsv.jpg')
    os.makedirs(os.path.dirname(processed_path), exist_ok=True)
    cv2.imwrite(processed_path, hsv_img)
    height, width, _ = hsv_img.shape
    h, s, v = cv2.split(hsv_img)
    avg_hue = int(np.mean(h))
    avg_sat = int(np.mean(s))
    avg_val = int(np.mean(v))
    hsv_data = {"hue": avg_hue, "saturation": avg_sat, "value": avg_val}
    summary = get_plant_summary(hsv_data, filepath)
    return {
        "width": width,
        "height": height,
        "processed_file": os.path.basename(processed_path),
        "hue": avg_hue,
        "saturation": avg_sat,
        "value": avg_val,
        "summary": summary
    }
