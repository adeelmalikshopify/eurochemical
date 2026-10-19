import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, Phone, ShieldCheck } from 'lucide-react';
import Rain from './Rain';
import { WhatsAppIcon } from './Icons';
import { PHONE, PHONE_DISPLAY, RATE, waLink } from '../data';

const words = ['LEAK', 'SEAL', 'COOL ROOFS'];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" className="hero" ref={ref}>
      <motion.div className="hero__media" style={{ y, scale }}>
        <video
          src="/media/work-1.mp4"
          poster="/media/project-1.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      </motion.div>
      <div className="hero__overlay" />
      <Rain />
      <div className="hero__glow" />

      <motion.div className="container hero__content" style={{ opacity: fade }}>
        <motion.span
          className="pill"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ShieldCheck size={16} /> 5 Years Warranty · Punjab · KPK · AJK
        </motion.span>

        <h1 className="hero__title">
          <motion.span
            className="hero__italic"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Seamless
          </motion.span>
          <span className="hero__big">
            {'SOLUTIONS'.split('').map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {c}
              </motion.span>
            ))}
          </span>
          <span className="sr-only"> — Roof Water Proofing & Heat Proofing in Lahore</span>
        </h1>

        <div className="hero__words">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.15 }}
            >
              {w}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="hero__sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Lahore's trusted roof water proofing & heat proofing experts. Joint-free coating that stops
          leakage and keeps your home cool — starting at just <strong>Rs {RATE} per sq. ft.</strong>
        </motion.p>

        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
        >
          <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Free Quote on WhatsApp
          </a>
          <a className="btn btn--ghost" href={`tel:${PHONE}`}>
            <Phone size={18} /> {PHONE_DISPLAY}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__price"
        initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.9, type: 'spring', stiffness: 160, damping: 12 }}
      >
        <small>Only</small>
        <strong>Rs {RATE}</strong>
        <small>per sq. ft.</small>
      </motion.div>

      <a href="#services" className="hero__scroll" aria-label="Scroll to services">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
