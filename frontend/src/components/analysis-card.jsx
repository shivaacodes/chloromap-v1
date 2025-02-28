"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function AnalysisCard({ result }) {
  return (
    <Card className="border-2 border-green-400 bg-white backdrop-blur-md rounded-2xl hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300 relative z-10">
      <CardContent className="p-4 text-center flex flex-col items-center justify-center min-h-[420px]">
        <h3 className="text-2xl font-semibold font-urbanist mb-2">
          Assessment Outcome
        </h3>
        {result ? (
          result.error ? (
            <p className="text-red-500 text-sm">{result.error}</p>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="relative h-64 w-64 rounded-xl overflow-hidden mb-5 border border-green-200 shadow-md">
                <Image
                  src={`http://localhost:5000/api/processed/${result.result.processed_file}`}
                  alt="Processed plant"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-3 mt-4">
                {[
                  { label: "Hue", value: `${result.result.hue}/179` },
                  {
                    label: "Saturation",
                    value: `${result.result.saturation}/255`,
                  },
                  { label: "Value", value: `${result.result.value}/255` },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-100 p-4 rounded-lg border border-green-200 shadow-sm text-center w-32 h-20 flex flex-col justify-center"
                  >
                    <p className="text-green-800 font-medium">{item.label}</p>
                    <p className="text-gray-700 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center">
            <motion.div
              className="text-green-500 mb-5"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="55"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"></path>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </motion.div>
            <p className="text-gray-600 text-sm">
              Upload an image and click "Analyze" to see results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
