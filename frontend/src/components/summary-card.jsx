"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SummaryCard({ result }) {
  console.log("SummaryCard Result:", result); // Debug to confirm data

  return (
    <Card className="border-2 border-green-300 bg-white/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-300 mt-4 mb-8 relative z-10">
      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-2 text-gray-800">
          Summary Document
        </h3>
        {result ? (
          result.error ? (
            <p className="text-red-500 text-sm">{result.error}</p>
          ) : (
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {result.result?.summary || "No summary provided by backend"}
            </p>
          )
        ) : (
          <p className="text-gray-600 leading-relaxed">
            This section will display a comprehensive summary of your plant
            analysis results and personalized recommendations for optimal care.
          </p>
        )}
        <div className="mt-4">
          <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transform hover:scale-105 transition-all duration-200">
            Print Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
