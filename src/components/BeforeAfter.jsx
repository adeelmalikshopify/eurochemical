import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';
import { Reveal, SectionHead } from './Reveal';
import { BEFORE_AFTER } from '../data';

function Slider({ item }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  // one-time hint so visitors know it can be dragged
  useEffect(() => {
    if (!inView) return;
    const c = animate(50, [50, 22, 78, 50], {
      duration: 2.4,
      ease: 'easeInOut',
      delay: 0.4,
      onUpdate: setPos,
    });
    return () => c.stop();
  }, [inView]);

  const moveTo = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className={`ba__frame ${dragging ? 'is-dragging' : ''}`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => dragging && moveTo(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img src={item.after} alt={`${item.label} after treatment`} draggable="false" />
      <img
        src={item.before}
        alt={`${item.label} before treatment`}
        draggable="false"
        className="ba__before"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span className="ba__tag ba__tag--before" style={{ opacity: pos > 12 ? 1 : 0 }}>Before</span>
      <span className="ba__tag ba__tag--after" style={{ opacity: pos < 88 ? 1 : 0 }}>After</span>
      <div className="ba__handle" style={{ left: `${pos}%` }}>
        <span className="ba__knob">
          <ChevronsLeftRight size={22} />
        </span>
      </div>
      <input
        className="ba__range"
        type="range"
        min="0"
        max="100"
        step="1"
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${item.label}: drag to compare before and after`}
      />
    </div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const item = BEFORE_AFTER[active];

  return (
    <section id="before-after" className="section ba">
      <div className="container">
        <SectionHead
          kicker="Before & After"
          title={<>See the <em>difference</em></>}
          sub="Drag the slider to compare a surface before and after Euro treatment."
        />

        <Reveal>
          <div className="ba__tabs" role="tablist">
          {BEFORE_AFTER.map((b, i) => (
            <button
              key={b.key}
              role="tab"
              aria-selected={active === i}
              className={active === i ? 'active' : ''}
              onClick={() => setActive(i)}
            >
              {active === i && <motion.span layoutId="ba-pill" className="ba__pill" />}
              <span>{b.label}</span>
            </button>
          ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Slider key={item.key} item={item} />
          <div className="ba__caption">
            <p>{item.caption}</p>
            <small>Illustration of a typical result.</small>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
