import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "ChloroMap",
  description: "Map your plant's health in color with cutting-edge tech.",
  keywords: [
    "Next.js",
    "React",
    "Flask",
    "OpenCV",
    "Plant Health",
    "Chlorophyll Mapping",
    "Web Development",
  ],
  authors: [{ name: "Shiva Sajay", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "ChloroMap",
    description: "Visualize plant health with ChloroMap’s innovative tools.",
    url: "https://chloromap.com",
    siteName: "ChloroMap",
    images: [
      {
        url: "/images/chloromap.png",
        width: 1200,
        height: 630,
        alt: "ChloroMap Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-poppins antialiased flex flex-col min-h-screen bg-white`}
      >
        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
