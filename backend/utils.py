import cv2
import os
import numpy as np
from supabase import create_client
from gemini import get_plant_summary

# Supabase setup using environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")  # Set in Render dashboard
SUPABASE_KEY = os.getenv("SUPABASE_KEY")  # Set in Render dashboard
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def process_image(filepath):
    img = cv2.imread(filepath)
    if img is None:
        return {"error": "Failed to load image"}

    # Convert to HSV
    hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Temporary local path for processed image
    processed_filename = os.path.basename(filepath).replace('.jpg', '_hsv.jpg')
    processed_path = f"/tmp/{processed_filename}"
    os.makedirs(os.path.dirname(processed_path), exist_ok=True)
    cv2.imwrite(processed_path, hsv_img)

    # Upload to Supabase
    with open(filepath, 'rb') as f:
        supabase.storage.from_("uploads").upload(os.path.basename(filepath), f)
    with open(processed_path, 'rb') as f:
        supabase.storage.from_("processed").upload(processed_filename, f)

    # Clean up local files
    os.remove(filepath)
    os.remove(processed_path)

    # Calculate HSV averages
    height, width, _ = hsv_img.shape
    h, s, v = cv2.split(hsv_img)
    avg_hue = int(np.mean(h))
    avg_sat = int(np.mean(s))
    avg_val = int(np.mean(v))
    hsv_data = {"hue": avg_hue, "saturation": avg_sat, "value": avg_val}

    # Get Gemini summary
    summary = get_plant_summary(hsv_data, filepath)

    # Return Supabase public URL for processed image
    processed_url = supabase.storage.from_(
        "processed").get_public_url(processed_filename)
    return {
        "width": width,
        "height": height,
        "processed_file": processed_url,
        "hue": avg_hue,
        "saturation": avg_sat,
        "value": avg_val,
        "summary": summary
    }
