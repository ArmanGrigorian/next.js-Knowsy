import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Header";
import { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Knowsy!",
  description: "Futuristic Wikipedia Search",
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriweather.variable} min-h-screen flex flex-col antialiased bg-neutral-50 text-neutral-900 font-sans`}
      >
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[100px] md:blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/5 blur-[100px] md:blur-[150px]" />
        </div>

        <NavBar />
        <div className="flex-1 max-w-6xl w-full mx-auto relative z-10 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
