"use client";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-2">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-white">ChloroMap</h3>
        </div>

        <span className="relative light text-white px-2 py-1 ">
          Made by Shiva
        </span>

        <div className="flex flex-col items-center md:items-end gap-1">
          <div className="flex gap-3">
            <span className="text-sm font-medium text-green-100">Flask</span>
            <span className="text-sm font-medium text-green-100">OpenCV</span>
            <span className="text-sm font-medium text-green-100">Next.js</span>
          </div>
          <p className="text-xs text-green-300">
            © {new Date().getFullYear()} ChloroMap
          </p>
        </div>
      </div>
    </footer>
  );
}
