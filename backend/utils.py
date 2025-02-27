import cv2
import os


def process_image(filepath):
    img = cv2.imread(filepath)
    if img is None:
        return {"Error": "Failed to load image"}

    # Convert to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    processed_path = filepath.replace(
        'uploads', 'processed').replace('.jpg', '_gray.jpg')

    os.makedirs(os.path.dirname(processed_path), exist_ok=True)
    cv2.imwrite(processed_path, gray_img)

    h, w = gray_img.shape
    return {"width": w, "height": h, "processed_file": os.path.basename(processed_path)}
