"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadCloud, Trash, RefreshCcw, Play } from "lucide-react";

export default function UploadCard({
  selectedImage,
  setSelectedImage,
  handleImageUpload,
  handleAnalyze,
}) {
  const fileInputRef = useRef(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyzeClick = async () => {
    setIsAnalyzing(true);
    await handleAnalyze();
    setIsAnalyzing(false);
  };

  return (
    <Card className="border-2 border-green-300 bg-white/90 backdrop-blur-sm border-dashed rounded-2xl hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-300 relative z-10">
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[420px] space-y-6">
        {selectedImage ? (
          <div className="w-full flex flex-col items-center">
            <div className="relative h-60 w-60 rounded-xl overflow-hidden border-2 border-green-600 shadow-lg mb-6">
              <Image
                src={selectedImage.preview}
                alt="Selected plant"
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-200"
                aria-label="Remove image"
              >
                <Trash size={20} />
              </button>
            </div>
            <div className="flex flex-col w-full space-y-6 mt-4">
              <Button
                className="bg-green-500 hover:bg-green-700 text-white py-3 rounded-xl text-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200 w-full"
                onClick={handleAnalyzeClick}
              >
                <Play size={18} />
                <span className={isAnalyzing ? "italic font-light" : ""}>
                  {isAnalyzing ? "Analyzing..." : "Run Diagnosis"}
                </span>
                {isAnalyzing && (
                  <motion.div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
              </Button>
              <div className="flex w-full space-x-3">
                <Button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl text-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200 w-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <Trash size={18} />
                  Remove Image
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200 w-full"
                  onClick={triggerFileSelect}
                >
                  <RefreshCcw size={18} />
                  Change Image
                </Button>
              </div>
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
              <UploadCloud size={60} />
            </motion.div>
            <h3 className="text-xl font-medium text-green-700 text-center">
              Upload Plant Image
            </h3>
            <p className="text-gray-600 text-sm text-center max-w-sm mb-6">
              Upload a clear photo of your plant leaf for analysis
            </p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg hover:shadow-xl transform transition-all duration-200 flex items-center justify-center gap-2"
                onClick={triggerFileSelect}
              >
                <UploadCloud size={20} />
                Select Image
              </Button>
            </motion.div>
            <p className="text-gray-700 text-s text-center mt-2">
              Supported formats: JPG, PNG, JPEG
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
