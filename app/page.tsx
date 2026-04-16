import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Cases from "./components/Cases";
import HowWeWork from "./components/HowWeWork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Cases />
        <HowWeWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
