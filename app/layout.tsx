import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ronnie Learn IDE — Interactive Robotics Code Learning",
  description:
    "Learn embedded systems, robotics, and AI through Ronnie — a quadruped robot. VS Code–style interactive editor with contextual explanations for every line of Arduino/C++ code.",
  keywords: ["robotics", "embedded systems", "Arduino", "ESP32", "quadruped robot", "learning", "education"],
  openGraph: {
    title: "Ronnie Learn IDE",
    description: "Interactive robotics code-learning environment for beginners",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#070b14] text-slate-200 font-sans antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
