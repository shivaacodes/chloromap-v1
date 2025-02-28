import Header from "@/components/header";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white bg-cover bg-center relative px-6">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/images/3px-tile.png')",
            backgroundRepeat: "repeat",
            opacity: "0.2",
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 30%, white 100%)",
          }}
        ></div>
      </div>

      <div
        className="absolute inset-0 z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/chloromap.png')" }}
      ></div>

      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>

      {/* Text content */}
      <div className="text-center max-w-6xl relative z-30">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-700">
          Map your plant's <br />
          health in{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 via-purple-500 via-red-500 to-pink-500 drop-shadow-lg">
            color!
          </span>
        </h1>
      </div>
    </section>
  );
}
