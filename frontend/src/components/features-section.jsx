"use client";

import { useEffect, useState } from "react";

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
      icon: "📷",
    },
    {
      id: 2,
      title: "Analyze Photo",
      icon: "🔬",
    },
    {
      id: 3,
      title: "Generate Summary",
      icon: "📊",
    },
  ];

  const [ref, isVisible] = useElementOnScreen({
    rootMargin: "0px",
    threshold: 0.2,
  });

  return (
    <section className="py-14 bg-white mb-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-green-800 mb-3">Features</h2>
          <p className="text-2xl text-green-600 max-w-2xl mx-auto font-bold ">
            Monitor your plant's health in 3 simple steps
          </p>
        </div>

        <div
          ref={ref}
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16"
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
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
      `}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
      }}
    >
      <div className="relative mb-6">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 text-4xl hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>

        {/* Connecting line between features (not for the last item) */}
        {index < 2 && (
          <div className="hidden md:block absolute top-1/2 -right-16 w-16 h-0.5 bg-green-200 transform -translate-y-1/2"></div>
        )}

        <div
          className={`absolute -top-2 ${
            isLast ? "-right-2" : "-right-2"
          } w-8 h-8 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-bold`}
        >
          {feature.id}
        </div>
      </div>

      <h3
        className={`text-2xl font-bold transition-all duration-700 ease-out transform
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        style={{
          transitionDelay: isVisible ? `${index * 150 + 200}ms` : "0ms",
        }}
      >
        {feature.title}
      </h3>
    </div>
  );
}
