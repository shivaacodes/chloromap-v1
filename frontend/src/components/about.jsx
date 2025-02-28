import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-white to-green-50 text-center">
      <h1 className="text-5xl font-bold text-black bg-clip-text mb-6">About</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-lg leading-relaxed">
        We make plant health mapping simple, accurate, and accessible with smart
        technology. Our mission is to empower everyone to care for plants
        effortlessly.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="https://shivasajay.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="px-6 py-3 text-lg rounded-xl text-white shadow-md transition-all duration-200">
            Learn More
          </Button>
        </Link>
        <Link
          href="https://x.com/shiv4real"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="px-6 py-3 text-lg rounded-xl border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 shadow-md transition-all duration-200"
          >
            Contact
          </Button>
        </Link>
      </div>
    </section>
  );
}
