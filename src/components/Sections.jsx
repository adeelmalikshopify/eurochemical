import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BrickWall,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock,
  Container,
  MapPin,
  Phone,
  Play,
  ShieldCheck,
  ShowerHead,
  Sun,
  Thermometer,
  Umbrella,
  Waves,
  X,
} from 'lucide-react';
import { Reveal, SectionHead } from './Reveal';
import Counter from './Counter';
import { WhatsAppIcon } from './Icons';
import {
  ADDRESS,
  FAQ,
  GALLERY,
  MAP_QUERY,
  PHONE,
  PHONE_DISPLAY,
  PROCESS,
  RATE,
  SERVICES,
  STATS,
  waLink,
} from '../data';

const ICONS = { Umbrella, Sun, ShowerHead, Container, Waves, BrickWall };

/* ---------------- Marquee ---------------- */
export function Marquee() {
  const items = ['Roof Water Proofing', 'Heat Proofing', 'Bathroom Treatment', 'Water Tank Treatment', 'Pool Treatment', 'Back Walls Treatment', '5 Years Warranty'];
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i}>
            {t} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Stats ---------------- */
export function Stats() {
  return (
    <section className="stats container" aria-label="Highlights">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="stat">
          <strong>
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
          </strong>
          <span>{s.label}</span>
        </Reveal>
      ))}
    </section>
  );
}

/* ---------------- Services ---------------- */
function TiltCard({ children, className }) {
  const [t, setT] = useState({ x: 0, y: 0, mx: 50, my: 50 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ x: (py - 0.5) * -10, y: (px - 0.5) * 10, mx: px * 100, my: py * 100 });
  };
  return (
    <div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0, mx: 50, my: 50 })}
      style={{
        transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)`,
        '--mx': `${t.mx}%`,
        '--my': `${t.my}%`,
      }}
    >
      {children}
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHead
          kicker="What we do"
          title={<>Complete <em>Water & Heat</em> Proofing Services</>}
          sub="From a single bathroom to a full factory rooftop — one seamless system, one trusted team."
        />
        <div className="services">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.key} delay={(i % 3) * 0.1}>
                <TiltCard className="service">
                  <div className="service__media">
                    <img src={s.img} alt={`${s.title} in Lahore`} loading="lazy" width="1920" height="1280" />
                    <span className="service__price">{s.price}</span>
                  </div>
                  <div className="service__body">
                    <div className="service__icon"><Icon size={26} /></div>
                    <h3>{s.title}</h3>
                    <p className="service__urdu" lang="ur">{s.urdu}</p>
                    <p>{s.desc}</p>
                    <ul className="service__points">
                      {s.points.map((p) => (
                        <li key={p}><CheckCircle2 size={16} /> {p}</li>
                      ))}
                    </ul>
                    <div className="service__foot">
                      <a
                        className="service__cta"
                        href={s.key === 'roof' || s.key === 'heat' ? '#pricing' : waLink(`Assalam o Alaikum! I need a quote for ${s.title}.`)}
                        {...(s.key === 'roof' || s.key === 'heat' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                      >
                        {s.key === 'roof' || s.key === 'heat' ? 'Calculate Estimate →' : 'Get Free Quote →'}
                      </a>
                      <a className="service__wa" href={waLink(`Assalam o Alaikum! I need a quote for ${s.title}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Get quote for ${s.title} on WhatsApp`}>
                        <WhatsAppIcon size={18} />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why / Before-After feel ---------------- */
export function Why() {
  const points = [
    { icon: ShieldCheck, t: '5 Years Written Warranty', d: 'We stand behind every square foot we coat.' },
    { icon: Thermometer, t: 'Cooler Rooms', d: 'Reflective white coating reduces roof heat in peak summer.' },
    { icon: Umbrella, t: 'Zero Leakage', d: 'Seamless, joint-free membrane — no seams for water to sneak in.' },
    { icon: Clock, t: 'Fast & Clean', d: 'Most homes completed in 1–2 days with minimal mess.' },
  ];
  return (
    <section className="section why">
      <div className="container why__grid">
        <Reveal className="why__media">
          <div className="why__img why__img--a"><img src="/media/roof-2.webp" alt="Seamless white waterproof roof coating in Lahore" loading="lazy" /></div>
          <div className="why__img why__img--b"><img src="/media/roof-3.webp" alt="Terrace water proofing treatment" loading="lazy" /></div>
          <motion.div
            className="why__badge"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <strong>05</strong>
            <span>Years<br />Warranty</span>
          </motion.div>
        </Reveal>
        <div>
          <SectionHead
            kicker="Why Euro"
            title={<>Roofs that stay <em>dry</em> & <em>cool</em></>}
            sub="Pakistan's summers and monsoons are tough on roofs. Our system is built to handle both."
          />
          <div className="why__points">
            {points.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} className="why__point">
                <p.icon size={22} />
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
export function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="container">
        <SectionHead kicker="How it works" title={<>Simple <em>4-step</em> process</>} />
        <div className="process">
          <motion.div
            className="process__line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} delay={0.2 + i * 0.15} className="step">
              <span className="step__num">{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing calculator ---------------- */
export function Pricing() {
  const [area, setArea] = useState(1000);
  const total = area * RATE;
  return (
    <section id="pricing" className="section pricing">
      <div className="container pricing__grid">
        <div>
          <SectionHead
            kicker="Transparent pricing"
            title={<>Just <em>Rs {RATE}</em> per sq. ft.</>}
            sub="Roof water proofing & heat proofing at one flat rate. No hidden charges — free site inspection included."
          />
          <ul className="checks">
            {['Free site inspection & measurement', 'Material + labour included', 'Seamless, joint-free finish', '5 years written warranty'].map((c, i) => (
              <Reveal as="li" key={c} delay={i * 0.06}>
                <CheckCircle2 size={20} /> {c}
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="calc">
          <div className="calc__head">
            <Calculator size={22} /> Instant Estimate
          </div>
          <label htmlFor="area">Roof area (sq. ft.)</label>
          <div className="calc__input">
            <input
              id="area"
              type="number"
              inputMode="numeric"
              min="0"
              value={area}
              onChange={(e) => setArea(Math.max(0, Number(e.target.value) || 0))}
            />
            <span>sq. ft.</span>
          </div>
          <input
            type="range"
            min="100"
            max="10000"
            step="50"
            value={Math.min(Math.max(area, 100), 10000)}
            onChange={(e) => setArea(Number(e.target.value))}
            aria-label="Roof area slider"
          />
          <div className="calc__presets">
            {[500, 1125, 2250, 4500].map((v) => (
              <button key={v} onClick={() => setArea(v)} className={area === v ? 'active' : ''}>
                {v === 1125 ? '5 Marla' : v === 2250 ? '10 Marla' : v === 4500 ? '1 Kanal' : '500 ft²'}
              </button>
            ))}
          </div>
          <div className="calc__total">
            <span>Estimated cost</span>
            <motion.strong key={total} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              Rs {total.toLocaleString('en-PK')}
            </motion.strong>
            <small>{area.toLocaleString('en-PK')} ft² × Rs {RATE}. Final price confirmed after free inspection.</small>
          </div>
          <a
            className="btn btn--wa btn--block"
            href={waLink(`Assalam o Alaikum! My roof area is about ${area} sq. ft. (estimate Rs ${total.toLocaleString('en-PK')}). Please book a free inspection.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon /> Book Free Inspection
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
export function Gallery() {
  const [active, setActive] = useState(null);
  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead kicker="Our work" title={<>Real projects, <em>real results</em></>} sub="Tap any photo or video to view it full screen." />
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 0.08} className={`gallery__item gallery__item--${i}`}>
              <button onClick={() => setActive(g)} aria-label={`Open: ${g.label}`}>
                {g.type === 'video' ? (
                  <>
                    <video src={g.src} muted loop playsInline autoPlay preload="metadata" poster={g.poster} />
                    <span className="gallery__play"><Play size={22} fill="currentColor" /></span>
                  </>
                ) : (
                  <img src={g.src} alt={g.label} loading="lazy" />
                )}
                <span className="gallery__label">{g.label}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <button className="lightbox__close" aria-label="Close"><X /></button>
            <motion.div
              className="lightbox__body"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {active.type === 'video' ? (
                <video src={active.src} controls autoPlay playsInline />
              ) : (
                <img src={active.src} alt={active.label} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Coverage ---------------- */
export function Coverage() {
  const regions = [
    { n: 'Punjab', c: 'Lahore, Kasur, Sheikhupura, Gujranwala, Faisalabad, Sialkot, Multan, Rawalpindi & more' },
    { n: 'Khyber Pakhtunkhwa', c: 'Peshawar, Mardan, Abbottabad, Swat & more' },
    { n: 'Azad Kashmir', c: 'Muzaffarabad, Mirpur, Kotli & more' },
  ];
  return (
    <section className="section coverage">
      <div className="container">
        <SectionHead kicker="Service areas" title={<>We come to <em>you</em></>} sub="Head office in Lahore — teams available across Punjab, KPK and Azad Kashmir." />
        <div className="regions">
          {regions.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.1} className="region">
              <MapPin size={22} />
              <h3>{r.n}</h3>
              <p>{r.c}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container faq">
        <SectionHead kicker="FAQ" title={<>Common <em>questions</em></>} />
        <div className="faq__list">
          {FAQ.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05} className={`faq__item ${open === i ? 'open' : ''}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <h3>{f.q}</h3>
                <ChevronDown size={20} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal className="cta">
          <div className="cta__waves" aria-hidden="true">
            <span /><span /><span />
          </div>
          <h2>Leaking roof? <em>Hot rooms?</em><br />Let's fix it — today.</h2>
          <p>Free inspection anywhere in Lahore. Call or WhatsApp now.</p>
          <div className="hero__ctas">
            <a className="btn btn--wa" href={waLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp Us</a>
            <a className="btn btn--light" href={`tel:${PHONE}`}><Phone size={18} /> {PHONE_DISPLAY}</a>
          </div>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__info">
            <h2>Visit or call us</h2>
            <a href={`tel:${PHONE}`} className="contact__row"><Phone size={20} /><div><small>Call</small>{PHONE_DISPLAY}</div></a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="contact__row"><WhatsAppIcon size={20} /><div><small>WhatsApp</small>{PHONE_DISPLAY}</div></a>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`} target="_blank" rel="noopener noreferrer" className="contact__row">
              <MapPin size={20} /><div><small>Address</small>{ADDRESS}</div>
            </a>
            <div className="contact__row"><Clock size={20} /><div><small>Working hours</small>Mon – Sat, 9:00 AM – 7:00 PM</div></div>
          </Reveal>
          <Reveal delay={0.1} className="contact__map">
            <iframe
              title="Euro Water & Heat Proofing location map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src="/media/logo-white.png" alt="Euro Water & Heat Proofing" width="160" height="48" loading="lazy" />
        <p>Seamless roof water proofing & heat proofing in Lahore — serving all Punjab, KPK & Azad Kashmir.</p>
        <p className="footer__small">© {new Date().getFullYear()} Euro Water & Heat Proofing. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ---------------- Floating buttons ---------------- */
export function FloatingButtons() {
  return (
    <div className="floating">
      <motion.a
        href={`tel:${PHONE}`}
        className="floating__call"
        aria-label="Call now"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.4, type: 'spring' }}
      >
        <Phone size={22} />
      </motion.a>
      <motion.a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="floating__wa"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.2, type: 'spring' }}
      >
        <WhatsAppIcon size={28} />
      </motion.a>
    </div>
  );
}
