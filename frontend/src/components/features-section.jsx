"use client";

import { useEffect, useState } from "react";
import { Camera, ScanFace, FileText } from "lucide-react";

function useElementOnScreen(options) {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, isVisible];
}

export default function FeatureSection() {
  const features = [
    {
      id: 1,
      title: "Upload Image",
      icon: Camera,
    },
    {
      id: 2,
      title: "Analyze Photo",
      icon: ScanFace,
    },
    {
      id: 3,
      title: "Generate Doc",
      icon: FileText,
    },
  ];

  const [ref, isVisible] = useElementOnScreen({
    rootMargin: "0px",
    threshold: 0.2,
  });

  return (
    <section className="py-14 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-3">Features</h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto font-semibold">
            Monitor your plant's health in 3 simple steps
          </p>
        </div>

        <div
          ref={ref}
          className="relative flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20"
        >
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.id}
              feature={feature}
              isVisible={isVisible}
              index={index}
              isLast={index === features.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ feature, isVisible, index, isLast }) {
  return (
    <div
      className={`text-center transition-all duration-700 ease-out transform
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      style={{
        transitionDelay: isVisible ? `${index * 200}ms` : "0ms",
      }}
    >
      <div className="relative mb-6">
        {/* Feature Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 text-5xl shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300 ease-out">
          <feature.icon size={48} strokeWidth={1.5} />
        </div>

        {/* Connecting Curved Line (for first two items) */}
        {!isLast && (
          <svg
            className="hidden md:block absolute top-1/2 -right-20 w-24 h-12"
            viewBox="0 0 100 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 25 Q50 -20 100 25"
              stroke="rgb(167 243 208)"
              strokeWidth="4"
              fill="transparent"
            />
          </svg>
        )}

        <div className="absolute -top-4 right-3 w-9 h-9 rounded-full bg-green-500 text-white text-lg flex items-center justify-center font-semibold shadow-md">
          {feature.id}
        </div>
      </div>

      {/* Feature Title */}
      <h3
        className={`text-2xl font-semibold transition-all duration-700 ease-out transform
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        style={{
          transitionDelay: isVisible ? `${index * 200 + 150}ms` : "0ms",
        }}
      >
        {feature.title}
      </h3>
    </div>
  );
}
