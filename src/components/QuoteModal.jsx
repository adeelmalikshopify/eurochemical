import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calculator, MapPin, Phone, User, X } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { RATE, waLink } from '../data';

// Lahore standard: 1 marla = 225 sq ft, 1 kanal = 20 marla
const UNITS = [
  { key: 'sqft', label: 'sq ft', toSqft: 1, def: 1000 },
  { key: 'sqm', label: 'sq m', toSqft: 10.7639, def: 100 },
  { key: 'marla', label: 'marla', toSqft: 225, def: 5 },
  { key: 'kanal', label: 'kanal', toSqft: 4500, def: 1 },
];

const fmt = (n) => Math.round(n).toLocaleString('en-US');

export default function QuoteModal({ service, initialSqft, onClose }) {
  const open = Boolean(service);
  const priced = service?.priced;
  const fromPrice = service?.fromPrice;
  const [unit, setUnit] = useState(UNITS[0]);
  const [qty, setQty] = useState(1000);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!open) return;
    setUnit(UNITS[0]);
    setQty(initialSqft || 1000);
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, initialSqft, onClose]);

  const sqft = qty * unit.toSqft;
  const total = sqft * RATE;

  const pickUnit = (u) => {
    setUnit(u);
    setQty(u.def);
  };

  const send = () => {
    const lines = [
      'Assalam o Alaikum! I would like a detailed quote.',
      '',
      `Service: ${service.title}`,
    ];
    if (priced) {
      lines.push(`Area: ${fmt(qty)} ${unit.label}${unit.key !== 'sqft' ? ` (≈ ${fmt(sqft)} sq ft)` : ''}`);
      lines.push(`Estimate: Rs ${fmt(total)} (Rs ${RATE}/sq ft)`);
    }
    if (name.trim()) lines.push(`Name: ${name.trim()}`);
    if (phone.trim()) lines.push(`Phone: ${phone.trim()}`);
    if (address.trim()) lines.push(`Address: ${address.trim()}`);
    if (fromPrice) lines.push(`Price: from Rs ${fmt(fromPrice)}`);
    if (!priced) lines.push('', 'Please arrange a free inspection.');
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal__head">
              <div className="modal__icon">{service.icon}</div>
              <div>
                <h3 id="quote-title">{service.title}</h3>
                <p>{priced || fromPrice ? 'Get an instant cost estimate' : 'Request a free site inspection'}</p>
              </div>
              <button className="modal__close" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="modal__body">
              {priced && (
                <>
                  <label className="modal__label" htmlFor="q-area">Area</label>
                  <div className="modal__tabs" role="tablist">
                    {UNITS.map((u) => (
                      <button
                        key={u.key}
                        role="tab"
                        aria-selected={unit.key === u.key}
                        className={unit.key === u.key ? 'active' : ''}
                        onClick={() => pickUnit(u)}
                      >
                        {unit.key === u.key && <motion.span layoutId="unit-pill" className="modal__pill" />}
                        <span>{u.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="calc__input">
                    <input
                      id="q-area"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={qty}
                      onChange={(e) => setQty(Math.max(0, Number(e.target.value) || 0))}
                    />
                    <span>{unit.label}</span>
                  </div>

                  <div className="modal__total">
                    <span>Estimated cost</span>
                    <motion.strong key={Math.round(total)} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                      Rs {fmt(total)}
                    </motion.strong>
                    <small>
                      {fmt(qty)} {unit.label} × Rs {RATE}/sq ft{unit.key !== 'sqft' && ` (≈ ${fmt(sqft)} sq ft)`}
                    </small>
                  </div>
                </>
              )}

              {fromPrice && (
                <>
                  <div className="modal__strip">
                    <Calculator size={16} /> Price: <strong>Rs {fmt(fromPrice)}</strong> starting from
                  </div>
                  <div className="modal__total">
                    <span>Estimated cost</span>
                    <strong><small className="modal__from">From</small> Rs {fmt(fromPrice)}</strong>
                    <small>Base price, final quote after free inspection</small>
                  </div>
                </>
              )}

              <p className="modal__label">
                <User size={15} /> Your details <em className="modal__opt">(optional)</em>
              </p>
              <div className="modal__fields">
                <div className="modal__field">
                  <User size={17} />
                  <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </div>
                <div className="modal__field">
                  <Phone size={17} />
                  <input placeholder="Phone number" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                </div>
                <div className="modal__field">
                  <MapPin size={17} />
                  <input placeholder="Property address / city" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" />
                </div>
              </div>

              <p className="modal__note">
                {priced || fromPrice
                  ? '* This is an approximate estimate. Final price is confirmed after a free site inspection.'
                  : '* Price depends on the size and condition — we will quote after a free site inspection.'}
              </p>

              <button className="btn btn--wa btn--block modal__send" onClick={send}>
                <WhatsAppIcon /> Request Detailed Quote
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
