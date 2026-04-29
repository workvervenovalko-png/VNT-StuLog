"use client";

import { useState } from "react";
import Image from "next/image";

const StudentAIAnalytics = ({ studentId }: { studentId: string }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = () => {
    setLoading(true);
    // Simulating AI Analysis
    setTimeout(() => {
      const insights = [
        "Student shows exceptional performance in Mathematics but requires more focus on Literature.",
        "Consistency in attendance is positively impacting the overall grade trend.",
        "Recommended: Enroll in the Advanced Science workshop to further enhance technical skills.",
        "Participation in extracurricular activities is average; encouraging more involvement could boost soft skills.",
      ];
      setAnalysis(insights[Math.floor(Math.random() * insights.length)]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-plSky/10 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-plSky rounded-full flex items-center justify-center">
            <Image src="/message.png" alt="AI" width={16} height={16} className="invert" />
        </div>
        <h2 className="text-lg font-bold text-plSky">EduAI Insights</h2>
      </div>
      
      {analysis ? (
        <div className="bg-plSkyLight p-4 rounded-xl border-l-4 border-plSky animate-fade-in">
          <p className="text-sm text-gray-700 italic">&quot;{analysis}&quot;</p>
          <button 
            onClick={() => setAnalysis(null)}
            className="mt-2 text-[10px] text-plSky hover:underline"
          >
            Run new analysis
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 py-4">
          <p className="text-xs text-gray-400 text-center">Analyze student behavior and academic trends using VNT EduCore AI Engine.</p>
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="bg-plSky text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-900 transition flex items-center gap-2 disabled:bg-gray-300"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              "Generate AI Insights"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentAIAnalytics;
