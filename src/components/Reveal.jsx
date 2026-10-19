import { motion } from 'framer-motion';

export function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function SectionHead({ kicker, title, sub }) {
  return (
    <div className="section-head">
      <Reveal><span className="kicker">{kicker}</span></Reveal>
      <Reveal delay={0.08}><h2>{title}</h2></Reveal>
      {sub && <Reveal delay={0.16}><p>{sub}</p></Reveal>}
    </div>
  );
}
