import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-16 bg-white text-center">
      <h1 className="text-5xl font-bold text-black bg-clip-text">About</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-md">
        We make plant health mapping simple, accurate and accessible with smart
        technology.
      </p>
      <div className="mt-6 flex gap-4">
        <Button className="px-6 py-3 text-lg rounded-lg bg-green-500">
          Learn More
        </Button>
        <Button variant="outline" className="px-6 py-3 text-md rounded-lg">
          Contact
        </Button>
      </div>
    </section>
  );
}
