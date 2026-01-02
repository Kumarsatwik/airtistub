import Header from "@/app/_shared/Header";
import Hero from "./_shared/Hero";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <Hero />
      {/* Background gradient elements */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] bg-purple-500/20 rounded-full blur-[150px] z-0" />
      <div className="absolute top-20 -right-40 h-[500px] w-[500px] bg-blue-500/25 rounded-full blur-[120px] z-0" />
      <div className="absolute -bottom-40 left-1/2 h-[400px] w-[400px] bg-pink-500/20 rounded-full blur-[100px] z-0" />
      <div className="absolute top-1/2 -left-20 h-[300px] w-[300px] bg-indigo-400/15 rounded-full blur-[80px] z-0" />
    </div>
  );
}
