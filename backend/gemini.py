import google.generativeai as genai
import os
import re

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)


def get_plant_summary(hsv_data, image_path):
    model = genai.GenerativeModel("gemini-1.5-flash")

    prompt = (
        f"Analyze the plant's health based on its HSV values:\n"
        f"- Hue: {hsv_data['hue']}\n"
        f"- Saturation: {hsv_data['saturation']}\n"
        f"- Value: {hsv_data['value']}\n\n"
        "Provide **2 to 5 concise insights** on:\n"
        "- Potential nutrient deficiencies\n"
        "- Water content and hydration\n"
        "- General plant health\n"
        "- Possible corrective actions (if applicable)\n\n"
        "Format your response as clear, numbered bullet points."
        "no need of bold text"
    )

    response = model.generate_content(prompt)

    # Ensure proper bullet point formatting
    summary_text = response.text.strip()

    # Use regex to split correctly into a list of points
    summary_points = re.split(r"\n\d+\.\s+", summary_text)
    summary_points = [point.strip()
                      for point in summary_points if point.strip()]

    print("Gemini Generated Response:")
    for point in summary_points:
        print(f"- {point}")

    return summary_points  # Returning a structured list
