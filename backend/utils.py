import cv2
import os
import numpy as np
from supabase import create_client
from gemini import get_plant_summary

# Supabase setup using environment variables
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
print(f"Supabase URL: {SUPABASE_URL}, Key: {SUPABASE_KEY}")  # Debug
try:
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    print("Supabase client initialized successfully")  # Debug
except Exception as e:
    print(f"Failed to initialize Supabase client: {str(e)}")
    raise  # Crash early if Supabase fails


def process_image(filepath):
    print(f"Starting to process image: {filepath}")  # Debug
    try:
        img = cv2.imread(filepath)
        if img is None:
            print(f"Failed to load image from: {filepath}")  # Debug
            return {"error": "Failed to load image"}

        # Convert to HSV
        hsv_img = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

        # Temporary local path for processed image
        processed_filename = os.path.basename(
            filepath).replace('.jpg', '_hsv.jpg')
        processed_path = f"/tmp/{processed_filename}"
        os.makedirs(os.path.dirname(processed_path), exist_ok=True)
        print(f"Writing HSV image to: {processed_path}")  # Debug
        cv2.imwrite(processed_path, hsv_img)

        # Verify files exist before upload
        if not os.path.exists(filepath):
            print(f"Original file not found: {filepath}")
            return {"error": "Original file missing before upload"}
        if not os.path.exists(processed_path):
            print(f"Processed file not found: {processed_path}")
            return {"error": "Processed file missing before upload"}

        # Upload to Supabase
        try:
            with open(filepath, 'rb') as f:
                supabase.storage.from_("uploads").upload(
                    os.path.basename(filepath), f)
            # Debug
            print(
                f"Uploaded original to Supabase: {os.path.basename(filepath)}")
            with open(processed_path, 'rb') as f:
                supabase.storage.from_("processed").upload(
                    processed_filename, f)
            # Debug
            print(f"Uploaded processed to Supabase: {processed_filename}")
        except Exception as e:
            print(f"Supabase upload failed: {str(e)}")  # Debug
            return {"error": f"Storage upload failed: {str(e)}"}

        # Clean up local files
        os.remove(filepath)
        os.remove(processed_path)
        print("Cleaned up temporary files")  # Debug

        # Calculate HSV averages
        height, width, _ = hsv_img.shape
        h, s, v = cv2.split(hsv_img)
        avg_hue = int(np.mean(h))
        avg_sat = int(np.mean(s))
        avg_val = int(np.mean(v))
        hsv_data = {"hue": avg_hue, "saturation": avg_sat, "value": avg_val}

        # Get Gemini summary
        try:
            summary = get_plant_summary(hsv_data, filepath)
            print(f"Gemini summary generated: {summary}")  # Debug
        except Exception as e:
            print(f"Gemini summary failed: {str(e)}")  # Debug
            return {"error": f"Summary generation failed: {str(e)}"}

        # Return Supabase public URL for processed image
        processed_url = supabase.storage.from_(
            "processed").get_public_url(processed_filename)
        print(f"Generated processed URL: {processed_url}")  # Debug
        result = {
            "width": width,
            "height": height,
            "processed_file": processed_url,
            "hue": avg_hue,
            "saturation": avg_sat,
            "value": avg_val,
            "summary": summary
        }
        print(f"Returning result: {result}")  # Debug
        return result
    except Exception as e:
        print(f"Unexpected error in process_image: {str(e)}")  # Debug
        return {"error": f"Processing failed: {str(e)}"}
