import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MapAndReview from "@/components/MapAndReview";
import WhatsappBot from "@/components/WhatsappBot";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Hero />
      <Feature />
      <MapAndReview />
      <Footer />
      <WhatsappBot />
    </div>
  );
}
