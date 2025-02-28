"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function UploadCard({
  selectedImage,
  setSelectedImage,
  handleImageUpload,
  handleAnalyze,
}) {
  const fileInputRef = useRef(null);

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="border-2 border-green-300 bg-white/90 backdrop-blur-sm border-dashed rounded-2xl hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-300 relative z-10">
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
        {selectedImage ? (
          <div className="w-full">
            <div className="relative h-60 w-full rounded-xl overflow-hidden mb-4 border-2 border-green-200 shadow-lg">
              <Image
                src={selectedImage.preview}
                alt="Selected plant"
                fill
                style={{ objectFit: "cover" }}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-200"
                aria-label="Remove image"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-4 mt-6 px-2">
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transform hover:scale-105 transition-all duration-200"
                onClick={triggerFileSelect}
              >
                Change Image
              </Button>
              <Button
                className="flex-1 bg-green-500 hover:bg-green-700 text-white py-2 rounded-xl transform hover:scale-105 transition-all duration-200"
                onClick={handleAnalyze}
              >
                Analyze
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          <>
            <motion.div
              className="mb-6 text-green-500"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
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
            </motion.div>
            <h3 className="text-xl font-medium text-green-700 text-center">
              Upload Plant Image
            </h3>
            <p className="text-gray-600 text-sm text-center max-w-sm mb-6">
              Upload a clear photo of your plant leaf for analysis
            </p>
            <div className="relative">
              <Button
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={triggerFileSelect}
              >
                Select Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
