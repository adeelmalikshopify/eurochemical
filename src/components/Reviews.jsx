import { CheckCheck, Star } from 'lucide-react';
import { SectionHead } from './Reveal';
import { WhatsAppIcon } from './Icons';
import { REVIEWS } from '../data';

// Hidden on the live site until real customer reviews are added to REVIEWS in data.js.
// In `npm run dev`, placeholder bubbles show the layout.
const PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => ({
  name: 'Customer name',
  area: 'Area, City',
  text: 'Real customer review goes here — paste the WhatsApp message in data.js → REVIEWS.',
  time: `1${i}:2${i} am`,
  placeholder: true,
}));

const isUrdu = (s) => /[؀-ۿ]/.test(s);

function Bubble({ r }) {
  return (
    <figure className={`wa ${r.placeholder ? 'wa--placeholder' : ''}`}>
      <header className="wa__head">
        <span className="wa__avatar">{r.name.trim()[0]}</span>
        <div>
          <strong>{r.name}</strong>
          <small>{r.area}</small>
        </div>
        <span className="wa__stars" aria-label={`${r.stars ?? 5} out of 5 stars`}>
          {Array.from({ length: r.stars ?? 5 }, (_, i) => <Star key={i} size={13} fill="currentColor" />)}
        </span>
      </header>
      <div className="wa__chat">
        <blockquote className="wa__msg" lang={isUrdu(r.text) ? 'ur' : 'en'} dir={isUrdu(r.text) ? 'rtl' : 'ltr'}>
          {r.text}
          <span className="wa__meta">
            {r.time} <CheckCheck size={15} />
          </span>
        </blockquote>
      </div>
    </figure>
  );
}

export default function Reviews() {
  const items = REVIEWS.length ? REVIEWS : import.meta.env.DEV ? PLACEHOLDERS : [];
  if (!items.length) return null;
  const row = [...items, ...items];

  return (
    <section id="reviews" className="section reviews">
      <div className="container">
        <SectionHead
          kicker="Customer reviews"
          title={<>What our <em>customers</em> say</>}
          sub="Messages our customers sent us on WhatsApp after the job."
        />
      </div>
      <div className="reviews__marquee">
        <div className="reviews__track" style={{ animationDuration: `${items.length * 7}s` }}>
          {row.map((r, i) => <Bubble key={i} r={r} />)}
        </div>
      </div>
      <div className="container reviews__cta">
        <WhatsAppIcon size={18} /> Worked with us? Send your feedback on WhatsApp.
      </div>
    </section>
  );
}
