import Navbar from './components/Navbar';
import Hero from './components/Hero';
import {
  Contact,
  Coverage,
  Faq,
  FloatingButtons,
  Footer,
  Gallery,
  Marquee,
  Pricing,
  Process,
  Services,
  Stats,
  Why,
} from './components/Sections';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Why />
        <Process />
        <Pricing />
        <Gallery />
        <Coverage />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
