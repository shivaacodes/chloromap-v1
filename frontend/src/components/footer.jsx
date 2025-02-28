"use client";

export default function Footer() {
  return (
    <footer className="text-black py-3 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold">ChloroMap</h3>

        <span className="px-3 py-1 text-sm font-medium ml-16">
          Developed and Maintained by Shiva Sajay
        </span>

        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="flex gap-4 text-sm font-medium">
            {["Flask", "OpenCV", "Next.js"].map((tech) => (
              <span key={tech} className="hover:text-green-600 transition">
                {tech}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} ChloroMap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
