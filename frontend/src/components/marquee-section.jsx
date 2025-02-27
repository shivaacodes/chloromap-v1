import { Marquee } from "@/components/magicui/marquee";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function MarqueeSection() {
  const brands = [
    { name: "AgriTech Solutions", initials: "AT" },
    { name: "PlantCare Systems", initials: "PC" },
    { name: "GreenLeaf Research", initials: "GL" },
    { name: "FarmSense Analytics", initials: "FA" },
    { name: "BotanicalAI", initials: "BA" },
    { name: "HarvestHealth", initials: "HH" },
    { name: "CropVision Labs", initials: "CV" },
    { name: "EcoGrowth Institute", initials: "EG" },
    { name: "BioDynamics", initials: "BD" },
    { name: "TerraCrop Systems", initials: "TC" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-100 to-blue-50">
      {/* Heading */}
      <div className="container mx-auto mb-8 text-center">
        <h2 className="text-4xl font-bold text-green-900 drop-shadow-md">
          Trusted by Leading Agricultural Organizations
        </h2>
        <p className="text-lg text-black mt-2">
          Join thousands of farmers and researchers monitoring plant health with{" "}
          <span className="font-semibold">ChloroMap</span>.
        </p>
      </div>

      <Marquee className="py-6" pauseOnHover speed={30}>
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="mx-6 flex items-center gap-4 px-6 py-4 bg-white border border-green-300 shadow-lg rounded-xl transition hover:scale-105"
          >
            <Avatar className="w-12 h-12 bg-green-500 text-white">
              <AvatarFallback className="text-black">
                {brand.initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium text-black">{brand.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
