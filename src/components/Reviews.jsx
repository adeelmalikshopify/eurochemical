import { BadgeCheck, CheckCheck, Star } from 'lucide-react';
import { Reveal, SectionHead } from './Reveal';
import { WhatsAppIcon } from './Icons';
import { REVIEWS, waLink } from '../data';

// Hidden on the live site until real customer reviews are added to REVIEWS in data.js.
// In `npm run dev`, placeholder bubbles show the layout.
const PLACEHOLDERS = Array.from({ length: 3 }, (_, i) => ({
  name: 'Customer name',
  phone: '+92 3•• ••• ••••',
  service: 'Service',
  text: 'Real customer review goes here — paste the WhatsApp message in data.js → REVIEWS.',
  time: `1${i}:2${i} am`,
  placeholder: true,
}));

const isUrdu = (s) => /[؀-ۿ]/.test(s);

function Bubble({ r }) {
  const urdu = isUrdu(r.text);
  return (
    <figure className={`wa ${r.placeholder ? 'wa--placeholder' : ''}`}>
      <header className="wa__head">
        <span className="wa__avatar" aria-hidden="true">
          <BadgeCheck size={20} />
        </span>
        <div>
          <strong>{r.name}</strong>
          <small>{r.phone}</small>
        </div>
        {r.stars && (
          <span className="wa__stars" aria-label={`${r.stars} out of 5 stars`}>
            {Array.from({ length: r.stars }, (_, i) => <Star key={i} size={13} fill="currentColor" />)}
          </span>
        )}
      </header>
      <div className="wa__chat">
        <blockquote className="wa__msg" lang={urdu ? 'ur' : 'en'} dir={urdu ? 'rtl' : 'ltr'}>
          {r.text}
          <span className="wa__meta">{r.time}</span>
        </blockquote>
        {r.service && (
          <figcaption className="wa__service">
            <CheckCheck size={14} /> {r.service}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

export default function Reviews() {
  const items = REVIEWS.length ? REVIEWS : import.meta.env.DEV ? PLACEHOLDERS : [];
  if (!items.length) return null;
  // A scrolling row only makes sense with enough cards; otherwise lay them out in a grid.
  const scroll = items.length >= 5;

  return (
    <section id="reviews" className="section reviews">
      <div className="container">
        <SectionHead
          kicker="Customer reviews"
          title={<>What our <em>customers</em> say</>}
          sub="Real messages our customers sent us on WhatsApp after the job."
        />
      </div>

      {scroll ? (
        <div className="reviews__marquee">
          <div className="reviews__track" style={{ animationDuration: `${items.length * 7}s` }}>
            {[...items, ...items].map((r, i) => <Bubble key={i} r={r} />)}
          </div>
        </div>
      ) : (
        <div className="container reviews__grid">
          {items.map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Bubble r={r} />
            </Reveal>
          ))}
        </div>
      )}

      <div className="container reviews__cta">
        <a
          href={waLink('Assalam o Alaikum! Main Euro Water & Heat Proofing ki service ke baare mein apna review dena chahta/chahti hoon:')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={18} /> Worked with us? Send your review on WhatsApp
        </a>
      </div>
    </section>
  );
}
