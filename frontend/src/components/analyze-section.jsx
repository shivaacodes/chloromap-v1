"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import UploadCard from "@/components/upload-card";
import AnalysisCard from "@/components/analysis-card";
import SummaryCard from "@/components/summary-card";

export default function AnalyzeSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setSelectedImage({ file, preview: e.target.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage?.file) return;

    const formData = new FormData();
    formData.append("file", selectedImage.file);

    try {
      console.log("Sending request to backend...");
      const response = await axios.post(
        "http://localhost:5000/api/process-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Response from backend:", response.data);
      setResult(response.data);
    } catch (error) {
      console.error("Analysis failed:", error);
      setResult({ error: "Failed to process image" });
    }
  };

  return (
    <section className="py-20 mb-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-gradient-radial from-green-400 to-transparent opacity-40"
          animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-10 top-1/3 w-80 h-80 rounded-full bg-gradient-radial from-green-300 to-transparent opacity-40"
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-gradient-radial from-green-500 to-transparent opacity-30"
          animate={{ x: [0, 40, 0], y: [0, 50, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-1/4 w-48 h-48 rounded-full bg-gradient-radial from-green-300 to-transparent opacity-40"
          animate={{ x: [0, -40, 0], y: [0, 35, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-1/3 w-56 h-56 rounded-full bg-gradient-radial from-green-600 to-transparent opacity-30"
          animate={{ x: [0, 35, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-gradient-radial from-emerald-400 to-transparent opacity-30"
          animate={{ x: [0, -45, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/2 w-40 h-40 rounded-full bg-gradient-radial from-lime-500 to-transparent opacity-40"
          animate={{ x: [0, 25, 0], y: [0, 30, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        <h2 className="text-5xl font-bold text-black mb-20 text-center bg-clip-text">
          Analyze your Plant
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UploadCard
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleImageUpload={handleImageUpload}
            handleAnalyze={handleAnalyze}
          />
          <AnalysisCard result={result} />
        </div>
        <SummaryCard result={result} />
      </div>

      <style jsx global>{`
        .bg-gradient-radial {
          background-image: radial-gradient(circle, var(--tw-gradient-stops));
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        .pulse-animate {
          animation: pulse 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
