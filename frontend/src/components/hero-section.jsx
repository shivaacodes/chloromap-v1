import Header from "@/components/header";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-green-50 bg-cover bg-center relative px-6">
      {/* Tile background behind everything */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "url('/images/3px-tile.png')",
          backgroundRepeat: "repeat",
        }}
      ></div>

      {/* Main background image on top of the tile */}
      <div
        className="absolute inset-0 z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/chloromap.png')" }}
      ></div>

      {/* Header on top */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      {/* Text content */}
      <div className="text-center max-w-4xl relative z-30">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700">
          Map your plant health in{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 via-purple-500 via-blue-500 via-red-500 to-pink-500 drop-shadow-lg">
            color!
          </span>
        </h1>
      </div>
    </section>
  );
}
