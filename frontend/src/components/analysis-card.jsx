"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function AnalysisCard({ result }) {
  return (
    <Card className="border-2 border-green-300 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-300 relative z-10">
      <CardContent className="p-6 text-center flex flex-col items-center justify-center min-h-[400px]">
        <h3 className="text-xl font-medium text-green-700 mb-4">
          Analysis Result
        </h3>
        {result ? (
          result.error ? (
            <p className="text-red-500 text-sm">{result.error}</p>
          ) : (
            <div>
              <div className="relative h-60 w-full rounded-xl overflow-hidden mb-4 border-2 border-green-200 shadow-lg">
                <Image
                  src={`http://localhost:5000/api/processed/${result.result.processed_file}`}
                  alt="Processed plant"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                  <p className="text-green-800 font-medium">Dimensions</p>
                  <p className="text-gray-600 text-sm">
                    {result.result.width}px × {result.result.height}px
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                  <p className="text-green-800 font-medium">Hue</p>
                  <p className="text-gray-600 text-sm">
                    {result.result.hue}/179
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                  <p className="text-green-800 font-medium">Saturation</p>
                  <p className="text-gray-600 text-sm">
                    {result.result.saturation}/255
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                  <p className="text-green-800 font-medium">Value</p>
                  <p className="text-gray-600 text-sm">
                    {result.result.value}/255
                  </p>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center">
            <motion.div
              className="text-green-400 mb-4"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"></path>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </motion.div>
            <p className="text-gray-500 text-sm">
              Upload an image and click "Analyze" to see results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
