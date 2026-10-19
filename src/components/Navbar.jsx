import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { NAV, PHONE, PHONE_DISPLAY } from '../data';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <motion.div className="nav__progress" style={{ scaleX: progress }} />
      <div className="container nav__inner">
        <a href="#home" className="nav__logo" aria-label="Euro Water & Heat Proofing — home">
          <img src="/media/logo-white.png" alt="Euro Water & Heat Proofing logo" width="180" height="54" />
        </a>
        <nav className="nav__links" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}>{n.label}</a>
          ))}
        </nav>
        <a className="btn btn--primary nav__cta" href={`tel:${PHONE}`}>
          <Phone size={16} /> Call Now
        </a>
        <button className="nav__burger" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="mobile-menu__close" onClick={() => setOpen(false)} aria-label="Close menu">
              <X />
            </button>
            {NAV.map((n, i) => (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                <span>0{i + 1}</span>
                {n.label}
              </motion.a>
            ))}
            <motion.a
              className="btn btn--primary"
              href={`tel:${PHONE}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Phone size={18} /> Call {PHONE_DISPLAY}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
