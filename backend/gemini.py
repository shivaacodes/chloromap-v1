import google.generativeai as genai
import os

api_key = os.getenv("GEMINI_API_KEY")
print(f"API Key: {api_key}")
genai.configure(api_key=api_key)


def get_plant_summary(hsv_data, image_path):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"Analyze this plant's HSV data: Hue={hsv_data['hue']}, Saturation={hsv_data['saturation']}, Value={hsv_data['value']}. What does it indicate about the plant's health?"
    response = model.generate_content(prompt)
    print("Gemini Generated Response:", response.text)  #
    return response.text
