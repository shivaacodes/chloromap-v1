"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AnalyzeSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);

  // Handle file selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setSelectedImage({ file, preview: e.target.result });
      reader.readAsDataURL(file);
    }
  };

  // Send image to backend
  const handleAnalyze = async () => {
    if (!selectedImage?.file) return;

    const formData = new FormData();
    formData.append("file", selectedImage.file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/process-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Analysis failed:", error);
      setResult({ error: "Failed to process image" });
    }
  };

  return (
    <section className="py-2 bg-white mb-6">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
          Analyze Plant 🌿
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Card */}
          <Card className="border border-gray-300 bg-white border-dashed rounded-2xl hover:shadow-xl transition-shadow">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
              {selectedImage ? (
                <div className="w-full">
                  <div className="relative h-60 w-full rounded-xl overflow-hidden mb-4">
                    <Image
                      src={selectedImage.preview}
                      alt="Selected plant"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="w-full bg-green-400 hover:bg-green-700 text-white mt-2 rounded-xl"
                      onClick={() => setSelectedImage(null)}
                    >
                      Change Image
                    </Button>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-800 text-white mt-2 rounded-xl"
                      onClick={handleAnalyze}
                    >
                      Analyze
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                      <path d="M12 12v9"></path>
                      <path d="m16 16-4-4-4 4"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 text-center">
                    Upload Plant Image
                  </h3>
                  <p className="text-gray-500 text-sm text-center max-w-sm mb-6">
                    Upload a clear photo of your plant leaf for analysis
                  </p>
                  <div className="relative">
                    <Button className="bg-green-400 hover:bg-green-700 text-white px-5 py-2 rounded-xl">
                      Select Image
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Analyze Card */}
          <Card className="border border-gray-300 bg-white rounded-2xl">
            <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[400px]">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Analysis Result
              </h3>
              {result ? (
                result.error ? (
                  <p className="text-red-500 text-sm">{result.error}</p>
                ) : (
                  <div>
                    <div className="relative h-60 w-full rounded-xl overflow-hidden mb-4">
                      <Image
                        src={`http://localhost:5000/api/processed/${result.result.processed_file}`}
                        alt="Processed plant"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <p className="text-gray-600 text-sm">
                      Width: {result.result.width}px, Height:{" "}
                      {result.result.height}px
                    </p>
                    <p className="text-gray-600 text-sm">
                      Hue: {result.result.hue} (0-179)
                    </p>
                    <p className="text-gray-600 text-sm">
                      Saturation: {result.result.saturation} (0-255)
                    </p>
                    <p className="text-gray-600 text-sm">
                      Value: {result.result.value} (0-255)
                    </p>
                  </div>
                )
              ) : (
                <p className="text-gray-400 text-sm">
                  Upload an image to analyze
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
