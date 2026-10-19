export const PHONE = '+923256833242';
export const PHONE_DISPLAY = '0325 6833242';
export const WA_INTL = '923256833242';
export const RATE = 50; // Rs per sq. ft.
export const ADDRESS = 'Gajjumata, Main Ferozpur Road, Lahore';
export const MAP_QUERY = 'Gajjumata, Ferozepur Road, Lahore';

export const waLink = (text = 'Assalam o Alaikum! I need a free quote for water / heat proofing.') =>
  `https://wa.me/${WA_INTL}?text=${encodeURIComponent(text)}`;

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'work', label: 'Our Work' },
  { id: 'contact', label: 'Contact' },
];

export const SERVICES = [
  {
    key: 'roof',
    title: 'Roof Water Proofing',
    urdu: 'چھت کی واٹر پروفنگ',
    desc: 'Seamless, joint-free membrane that stops seepage and leakage for good — even in heavy monsoon rains.',
    price: `Rs ${RATE} / sq. ft.`,
    icon: 'Umbrella',
    img: '/media/svc-roof.webp',
    points: ['Polymer-based seamless coating', '100% leak protection', 'Suitable for all roof surfaces', '5 years warranty'],
  },
  {
    key: 'heat',
    title: 'Heat Proofing / Cool Roof',
    urdu: 'ہیٹ پروفنگ',
    desc: 'High-reflective white coating that bounces back sunlight and keeps rooms noticeably cooler in summer.',
    price: `Rs ${RATE} / sq. ft.`,
    icon: 'Sun',
    img: '/media/svc-heat.webp',
    points: ['UV-reflective white coating', 'Cooler top-floor rooms', 'Lower AC & electricity bills', '5 years warranty'],
  },
  {
    key: 'bath',
    title: 'Bathroom Treatment',
    urdu: 'باتھ روم ٹریٹمنٹ',
    desc: 'Stop dampness reaching the floors and walls below — without breaking your tiles.',
    price: 'Free inspection',
    icon: 'ShowerHead',
    img: '/media/svc-bath.webp',
    points: ['No tile breaking in most cases', 'Joint & grout sealing', 'Stops ceiling seepage below'],
  },
  {
    key: 'tank',
    title: 'Water Tank Treatment',
    urdu: 'پانی کی ٹینکی',
    desc: 'Leak-proof, hygienic lining for underground and overhead tanks.',
    price: 'Free inspection',
    icon: 'Container',
    img: '/media/svc-tank.webp',
    points: ['Underground & overhead tanks', 'Hygienic, safe lining', 'Prevents leakage & contamination'],
  },
  {
    key: 'pool',
    title: 'Pool Treatment',
    urdu: 'سوئمنگ پول',
    desc: 'Durable waterproof coating for swimming pools and water features.',
    price: 'Free inspection',
    icon: 'Waves',
    img: '/media/svc-pool.webp',
    points: ['Swimming pools & fountains', 'Stops water loss', 'Long-lasting protection'],
  },
  {
    key: 'walls',
    title: 'Back Walls Treatment',
    urdu: 'دیواروں کی سیلن',
    desc: 'Protection against seepage, salt-peter and damp patches on exterior and back walls.',
    price: 'Free inspection',
    icon: 'BrickWall',
    img: '/media/svc-walls.webp',
    points: ['Seepage & seelan treatment', 'Stops paint peeling', 'Exterior & back walls'],
  },
];

// Placeholder figures — confirm real numbers with the client
export const STATS = [
  { value: 1200, suffix: '+', label: 'Projects Done' },
  { value: 850, suffix: '+', label: 'Happy Clients' },
  { value: 5, suffix: ' Yrs', label: 'Warranty' },
  { value: 50, prefix: 'Rs ', label: 'Per sq. ft.' },
];

export const PROCESS = [
  { title: 'Free Inspection', desc: 'We visit, measure the area and find the exact cause of the leak.' },
  { title: 'Surface Prep', desc: 'Cleaning, crack filling and sealing of joints, pipes and corners.' },
  { title: 'Seamless Coating', desc: 'Multi-layer waterproof and heat-reflective membrane applied.' },
  { title: '5-Year Warranty', desc: 'Final quality check and a written 5-year warranty handed over.' },
];

export const GALLERY = [
  { type: 'video', src: '/media/work-1.mp4', poster: '/media/project-1.webp', label: 'On-site application' },
  { type: 'image', src: '/media/project-1.webp', label: 'Commercial building roof' },
  { type: 'image', src: '/media/roof-2.webp', label: 'Seamless white roof coating' },
  { type: 'video', src: '/media/work-2.mp4', poster: '/media/roof-2.webp', label: 'Work in progress' },
  { type: 'image', src: '/media/roof-3.webp', label: 'Terrace water proofing' },
  { type: 'image', src: '/media/roof-1.webp', label: 'Factory rooftop — cool roof' },
];

export const FAQ = [
  {
    q: 'What is the rate per square foot?',
    a: `Roof water proofing and heat proofing is Rs ${RATE} per sq. ft. Bathrooms, tanks, pools and walls are quoted after inspection.`,
  },
  { q: 'Do you give a warranty?', a: 'Yes — every roof job comes with a 5 years written warranty.' },
  { q: 'Which cities do you cover?', a: 'We are based in Lahore and provide services across all Punjab, KPK and Azad Kashmir.' },
  { q: 'Do I have to break my tiles?', a: 'No. Our seamless treatment is applied over the existing surface in most cases — no tearing up needed.' },
  { q: 'How long does a job take?', a: 'Most homes are completed in 1–2 days depending on the area and weather.' },
];
