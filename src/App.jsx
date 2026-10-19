import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BeforeAfter from './components/BeforeAfter';
import Reviews from './components/Reviews';
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
        <BeforeAfter />
        <Why />
        <Process />
        <Pricing />
        <Gallery />
        <Reviews />
        <Coverage />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
