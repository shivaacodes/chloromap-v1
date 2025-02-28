"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

export default function SummaryCard({ result }) {
  console.log("SummaryCard Result:", result);

  const summaryText = String(
    result?.result?.summary || "No summary provided by backend"
  );

  const summaryPoints = summaryText
    .split(/\n|,|\d+\.\s+|-\s+/)
    .map((point) => point.trim())
    .filter(Boolean);

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "italic");
    doc.setFontSize(16);
    doc.text("Plant Health Analysis", 20, 20);
    doc.setFontSize(12);

    summaryPoints.forEach((point, index) => {
      doc.text(`${index + 1}. ${point}`, 20, 40 + index * 10);
    });

    doc.save("Plant_Summary.pdf");
  };

  return (
    <Card className="border-2 border-green-400 bg-white/90 backdrop-blur-md rounded-3xl hover:shadow-2xl hover:shadow-green-200/50 transition-all duration-300 mt-4 mb-8 relative z-10 p-4">
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Summary Document
        </h3>
        {result ? (
          result.error ? (
            <p className="text-red-500 text-sm">{result.error}</p>
          ) : (
            <>
              <ul className="leading-8 list-disc pl-5 font-urbanist">
                {summaryPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.3 }}
                    className="mt-2"
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
              {summaryPoints.length > 0 && (
                <div className="mt-6">
                  <Button
                    onClick={handlePrint}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    Save as PDF
                  </Button>
                </div>
              )}
            </>
          )
        ) : (
          <p className="text-gray-600 leading-relaxed">
            A comprehensive summary of your plant analysis results and
            personalized recommendations for optimal care.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
