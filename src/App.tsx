import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Scale, Menu, X,
  Briefcase, TrendingUp, Building,
  Play, Pause, CheckCircle2, Users, Sparkles, Clock, ExternalLink
} from 'lucide-react';
import { CircularTestimonials } from './components/ui/circular-testimonials';
import { CallNowButton } from './components/ui/call-now-button';

/* ─── Framer Motion Variants ──────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

/* ─── Data ────────────────────────────────────────── */
const services = [
  {
    title: 'Tax Advisory',
    icon: <Scale className="w-7 h-7" />,
    highlights: ['Tax Planning', 'Tax Compliance', 'Tax Representation'],
    color: 'from-blue-600 to-indigo-700',
    desc: 'Expert guidance on tax planning, compliance, and representation. We help individuals and businesses minimize tax liabilities and stay aligned with evolving tax laws.',
  },
  {
    title: 'GST Compliance',
    icon: <TrendingUp className="w-7 h-7" />,
    highlights: ['GST Disputes', 'Notices & Appeals', 'Legal Representation'],
    color: 'from-orange-500 to-red-600',
    desc: 'Specialized assistance in handling GST disputes, notices, and appeals. We represent clients before authorities and ensure strong legal support in complex GST matters.',
  },
  {
    title: 'Income Tax',
    icon: <Briefcase className="w-7 h-7" />,
    highlights: ['Dispute Resolution', 'Assessments', 'Tribunal Appeals'],
    color: 'from-emerald-500 to-teal-600',
    desc: 'Comprehensive support in resolving income tax disputes, assessments, and appeals. We represent clients before tax authorities and tribunals to protect their interests effectively.',
  },
  {
    title: 'Audit Services',
    icon: <Building className="w-7 h-7" />,
    highlights: ['Forensic Audit', 'IS Audit', 'Risk Management'],
    color: 'from-purple-600 to-pink-600',
    desc: 'We specialize in forensic and information system audits to detect financial irregularities and assess IT controls. Our audits enhance transparency, compliance, and risk management across your organization.',
  },
];

const leadershipData = [
  {
    name: 'CA Sanbarta Koley',
    designation: 'Proprietor & Founder',
    quote: 'CA Sanbarta Koley is a seasoned Chartered Accountant with over 10 years of experience specializing in both direct and indirect tax litigation. He is recognized for his strategic approach in handling complex tax matters before various adjudication and appellate authorities. In addition to his core expertise, he is a Certified Forensic Auditor and Information System Auditor, bringing a robust blend of financial acumen and technological insight to every engagement. His commitment to precision, compliance, and client advocacy has earned him a reputation for excellence in the industry.',
    src: '/assets/damnne.jpg',
  }
];

const stats = [
  { value: '15+', label: 'Years of Experience' },
  { value: '500+', label: 'Clients Served' },
];

/* ─── App ─────────────────────────────────────────── */
const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    audioRef.current = new Audio('/assets/welcomemsg.mp3');
    audioRef.current.loop = false;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.warn("Audio playback failed:", err);
      setIsPlaying(false);
    }
  };

  const navLinks = ['About', 'Services', 'Leadership', 'Contact'];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden">

      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, #d4af37, #f97316)' }}
      />

      {/* ── Audio Controller ── */}
      <div className="fixed bottom-8 left-6 z-50 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleAudio}
          className="w-12 h-12 rounded-full bg-white/8 backdrop-blur-xl border border-white/15 flex items-center justify-center shadow-2xl group overflow-hidden relative"
          aria-label="Toggle audio"
        >
          <div className="absolute inset-0 bg-[#d4af37]/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          {isPlaying
            ? <Pause size={16} className="text-[#d4af37] z-10" />
            : <Play size={16} className="text-[#d4af37] ml-0.5 z-10" />}
        </motion.button>
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
            >
              <div className="flex gap-0.5 h-3 items-end">
                {[1,2,3,4].map(i => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 12, 6, 10, 4] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                    className="w-[3px] bg-[#d4af37] rounded-full"
                  />
                ))}
              </div>
              Audio On
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── WhatsApp Float ── */}
      <motion.a
        href="https://wa.me/917044077047"
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.1, rotate: 6 }}
        whileTap={{ scale: 0.95 }}
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        {/* Official WhatsApp SVG logo */}
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 1C7.716 1 1 7.716 1 16c0 2.63.687 5.247 1.993 7.56L1 31l7.63-2.003A14.946 14.946 0 0016 31c8.284 0 15-6.716 15-15S24.284 1 16 1z" fill="#fff"/>
          <path d="M16 3.5c-6.903 0-12.5 5.597-12.5 12.5 0 2.34.652 4.618 1.887 6.582l.277.44-1.18 4.317 4.433-1.163.427.253A12.44 12.44 0 0016 28.5c6.903 0 12.5-5.597 12.5-12.5S22.903 3.5 16 3.5z" fill="#25D366"/>
          <path d="M11.93 9.5c-.3-.667-.617-.68-.9-.692-.234-.01-.5-.009-.767-.009-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.334 0 1.967 1.433 3.867 1.633 4.133.2.267 2.767 4.434 6.833 6.034 3.383 1.333 4.067 1.067 4.8 1 .733-.067 2.367-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467-.4-.2-2.367-1.167-2.733-1.3-.367-.133-.634-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.687-.622-3.213-1.98-1.187-1.058-1.99-2.366-2.223-2.766-.234-.4-.025-.617.175-.816.18-.179.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.878-2.167-1.237-2.971z" fill="#fff"/>
        </svg>
      </motion.a>

      {/* ── Navbar ── */}
      <nav
        className={`fixed w-full z-[90] transition-all duration-500 ${
          scrolled
            ? 'glass-nav h-[68px] shadow-xl shadow-black/30'
            : 'bg-transparent h-[88px]'
        }`}
      >
        <div className="section-container h-full flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/assets/Logo.png"
              alt="Sanbarta & Associates Logo"
              width="48"
              height="48"
              className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="block mt-1">
              <p className="text-white font-black text-sm sm:text-xl tracking-wide leading-none drop-shadow-md">Sanbarta &amp; Associates</p>
              <p className="text-[#d4af37] font-bold text-[10px] sm:text-xs tracking-[0.15em] mt-1.5 uppercase">
                Chartered Accountants
              </p>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative text-slate-400 hover:text-white font-semibold text-[11px] uppercase tracking-widest transition-colors duration-200 group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#d4af37] rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <CallNowButton
              phone="tel:+917044077047"
              displayNumber="+91 70440 77047"
            />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle menu"
          >
            {isNavOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-[#020617]/98 backdrop-blur-2xl border-t border-white/10 px-8 pt-12 pb-24 flex flex-col gap-8 shadow-2xl"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map(link => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setIsNavOpen(false)}
                    className="text-slate-300 hover:text-[#d4af37] font-bold text-base uppercase tracking-[0.2em] transition-all duration-300 text-center"
                  >
                    {link}
                  </a>
                ))}
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

              <div className="flex flex-col items-center gap-6">
                <a
                  href="tel:+917044077047"
                  className="w-full py-4 bg-[#d4af37] text-[#020617] rounded-xl font-black text-sm uppercase tracking-widest text-center shadow-lg shadow-[#d4af37]/20 active:scale-95 transition-transform"
                >
                  +91 70440 77047
                </a>
                
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Quick Connect</p>
                  <p className="text-xs text-white">info@smcpl.in</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="about">

        {/* Background image with float animation */}
        <div className="absolute inset-0 z-0">
          <div
            className="hero-bg-image absolute inset-0 bg-[url('/assets/top_header.jpg')] bg-cover bg-center"
          />
          {/* Layered gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/60 to-[#020617]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/50 via-transparent to-[#020617]/50" />
        </div>

        {/* Ambient glow orbs */}
        <div className="hero-glow-orb w-[500px] h-[500px] top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 bg-[#003366]/40" />
        <div
          className="hero-glow-orb w-[400px] h-[400px] bottom-1/4 right-1/4 bg-[#d4af37]/20"
          style={{ animationDelay: '4s' }}
        />

        {/* Hero Content */}
        <div className="relative z-10 section-container text-center pt-28 pb-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.span variants={fadeUp} className="section-label mb-8">
              Expert Tax Advisory
            </motion.span>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.02] mb-6 max-w-5xl"
            >
              Simplifying Tax.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5cc5f] to-[#f97316]">
                Amplifying Confidence.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed text-center"
            >
              Bridging the gap between complex regulatory landscapes and
              high-growth business performance across India.
            </motion.p>


          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#d4af37]/60 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
        </motion.div>
      </section>

      {/* ── Stats Strip (below hero, full-width) ── */}
      <div className="relative z-10 border-y border-white/8 bg-[#020617]/90 backdrop-blur-xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="section-container grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/8"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="px-8 py-10 text-center group"
            >
              <p className="text-4xl md:text-5xl font-black text-[#d4af37] tracking-tight mb-2 group-hover:scale-105 transition-transform duration-300">
                {s.value}
              </p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.22em]">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Section Strip ── */}
      <div className="section-strip" aria-hidden="true">
        <div className="section-strip-line" />
        <div className="section-strip-dot" />
        <div className="section-strip-line" />
      </div>

      {/* ══════════════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════════════ */}
      <section id="services" className="py-28 md:py-36">
        <div className="section-container">

          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-24 md:mb-32 flex flex-col items-center text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-5 text-center"
            >
              Expertise.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f97316]">
                Without Compromise.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl leading-relaxed text-center">
              Tailored financial strategies and regulatory solutions designed for elite business growth.
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <div className="relative" style={{ zIndex: 1, marginTop: '4rem' }}>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start"
            >
              {services.map((s) => (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  className="uiverse-card"
                  tabIndex={0}
                  role="article"
                  style={{ alignSelf: 'start' }}
                >
                  {/* Collapsed header: icon + title always visible */}
                  <div className="card-header">
                    <div className="card-icon-wrap">
                      {s.icon}
                    </div>
                    <p className="heading">{s.title}</p>
                  </div>

                  {/* Expandable body — revealed on hover */}
                  <div className="card-body">
                    <p className="text-justify">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.highlights.map(h => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/5 border border-white/8 rounded-full text-[10px] font-semibold text-[#d4af37] uppercase tracking-wider"
                        >
                          <CheckCircle2 size={9} />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* More Services Link */}
          <div className="flex flex-col items-center gap-3" style={{ marginTop: '4rem' }}>
            <div className="flex items-center gap-4 w-full max-w-xs">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.28em] whitespace-nowrap">More Services</p>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>
            <motion.a
              href="https://www.smcpl.in"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center justify-center text-center gap-2.5 px-4 sm:px-7 py-3.5 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/6 hover:bg-[#d4af37]/14 hover:border-[#d4af37]/55 text-[#d4af37] font-bold text-sm tracking-wide transition-all duration-300 group max-w-full"
            >
              <span className="flex-1">Explore Our Other Services at www.smcpl.in</span>
              <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── Section Strip ── */}
      <div className="section-strip" aria-hidden="true" style={{ zIndex: 10, isolation: 'isolate' }}>
        <div className="section-strip-line" />
        <div className="section-strip-dot" />
        <div className="section-strip-line" />
      </div>

      {/* ══════════════════════════════════════════════
          WHY CHOOSE US SECTION
      ══════════════════════════════════════════════ */}
      <section id="why-choose-us" className="py-20 md:py-28">
        <div className="section-container">

          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
            style={{ marginBottom: '7rem' }}
          >
            <motion.span variants={fadeUp} className="section-label mb-6">
              Our Promise
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-4"
            >
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f97316]">
                Sanbarta &amp; Associates?
              </span>
            </motion.h2>
            <motion.div variants={fadeUp} className="flex justify-center w-full">
              <p className="text-slate-400 text-lg text-center leading-relaxed max-w-2xl">
                Trusted by hundreds of clients for integrity, precision, and results that matter.
              </p>
            </motion.div>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-3 gap-8 md:gap-10"
          >
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Experienced Team',
                desc: 'Highly qualified professionals with decades of collective experience. Our team brings deep expertise across tax, audit, and compliance domains.',
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: 'Personalized Service',
                desc: 'Tailored financial solutions for every client. We understand that each business is unique and craft strategies specific to your needs and goals.',
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: 'Timely Delivery',
                desc: 'Commitment to deadlines and compliance. We pride ourselves on delivering accurate, thorough work well within the time frames our clients need.',
              },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="why-choose-card">
                <div className="why-choose-icon">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed text-justify">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Proprietor note */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
            style={{ marginTop: '8rem' }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 px-4 sm:px-6 py-3.5 rounded-xl bg-white/[0.03] border border-white/8 text-center sm:text-left w-full max-w-md mx-auto">
              <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse shrink-0" />
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Led by <span className="text-white font-semibold whitespace-nowrap">CA Sanbarta Koley</span>, <span className="block sm:inline">Proprietor &amp; Founder</span>
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Section Strip ── */}
      <div className="section-strip" aria-hidden="true">
        <div className="section-strip-line" />
        <div className="section-strip-dot" />
        <div className="section-strip-line" />
      </div>

      {/* ══════════════════════════════════════════════
          LEADERSHIP SECTION
      ══════════════════════════════════════════════ */}
      <section id="leadership" className="py-16 md:py-24 bg-gradient-to-b from-transparent to-[#060f1e]/60">
        <div className="section-container">

          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4"
            >
              Our Leadership
            </motion.h2>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </motion.div>
            <div className="flex justify-center w-full mt-5" style={{ paddingBottom: '0rem' }}>
              <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-lg text-center leading-relaxed">
                Led by seasoned professionals with decades of combined expertise in finance and compliance.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ marginTop: '4rem' }}
          >
            <CircularTestimonials
              testimonials={leadershipData}
              autoplay={false}
              colors={{
                name: '#ffffff',
                designation: '#d4af37',
                testimony: '#94a3b8',
                arrowBackground: '#0d1b34',
                arrowForeground: '#ffffff',
                arrowHoverBackground: '#d4af37'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Section Strip ── */}
      <div className="section-strip" aria-hidden="true">
        <div className="section-strip-line" />
        <div className="section-strip-dot" />
        <div className="section-strip-line" />
      </div>

      {/* ══════════════════════════════════════════════
          CONTACT SECTION — Creative Open Layout
      ══════════════════════════════════════════════ */}
      <section id="contact" className="py-20 md:py-28 relative overflow-hidden">

        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(0,51,102,0.18),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_80%_20%,rgba(212,175,55,0.06),transparent)] pointer-events-none" />

        <div className="section-container relative z-10">

          {/* ── Top: Headline ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-16 md:mb-20"
          >
            <motion.p variants={fadeUp} className="text-[#d4af37] text-[11px] font-black uppercase tracking-[0.4em] mb-4">
              Ready to grow?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] max-w-2xl"
            >
              Let's Define Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5cc5f] to-[#f97316]">
                Financial Future.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg mt-5 max-w-xl leading-relaxed">
              Connect with our executive team for a bespoke consultation — tailored to your business strategy, compliance needs, and growth ambitions.
            </motion.p>
          </motion.div>

          {/* ── Body: 2-col — info left, map right ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid lg:grid-cols-5 gap-8 items-stretch"
          >
            {/* Left: Contact info cards */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* 3 contact detail cards */}
              {[
                {
                  Icon: MapPin,
                  label: 'Visit Us',
                  value: 'Balikata, Bandel, Hooghly',
                  sub: 'West Bengal 712123',
                },
                {
                  Icon: Phone,
                  label: 'Call Us',
                  value: '+91 70440 77047',
                  href: 'tel:+917044077047',
                },
                {
                  Icon: Mail,
                  label: 'Email Us',
                  value: 'info@smcpl.in',
                  href: 'mailto:info@smcpl.in',
                },
              ].map(({ Icon, label, value, sub, href }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="group flex items-center gap-5 p-5 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#d4af37]/25 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#d4af37]/18 transition-colors duration-300">
                    <Icon size={20} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white font-semibold text-sm hover:text-[#d4af37] transition-colors duration-200">{value}</a>
                    ) : (
                      <p className="text-white font-semibold text-sm">{value}</p>
                    )}
                    {sub && <p className="text-slate-500 text-xs mt-0.5">{sub}</p>}
                  </div>
                </motion.div>
              ))}

              {/* WhatsApp CTA */}
              <motion.div variants={fadeUp}>
                <a
                  href="https://wa.me/917044077047"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 p-5 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/8 hover:bg-[#25D366]/15 hover:border-[#25D366]/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/25">
                    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M11.93 9.5c-.3-.667-.617-.68-.9-.692-.234-.01-.5-.009-.767-.009-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.334 0 1.967 1.433 3.867 1.633 4.133.2.267 2.767 4.434 6.833 6.034 3.383 1.333 4.067 1.067 4.8 1 .733-.067 2.367-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467-.4-.2-2.367-1.167-2.733-1.3-.367-.133-.634-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.687-.622-3.213-1.98-1.187-1.058-1.99-2.366-2.223-2.766-.234-.4-.025-.617.175-.816.18-.179.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.878-2.167-1.237-2.971z" fill="#fff"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">WhatsApp</p>
                    <p className="text-white font-semibold text-sm group-hover:text-[#25D366] transition-colors duration-200">Chat with our team</p>
                  </div>
                  <svg className="text-slate-600 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-200" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Right: Map */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-3 relative min-h-[380px] rounded-2xl overflow-hidden border border-white/8"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.8262017505135!2d88.37295691495554!3d22.919780425913515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f893c70ac2650d%3A0x765e58afb60ed41f!2sSanbarta%20Management%20Consulting%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1585481082475!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Office Location"
              />
              {/* Edge fades */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(2,6,23,0.6)] pointer-events-none rounded-2xl" />
              {/* Location badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#020617]/92 backdrop-blur-md border border-white/10 shadow-xl whitespace-nowrap">
                  <MapPin size={13} className="text-[#d4af37] shrink-0" />
                  <span className="text-white text-xs font-semibold">Sanbarta &amp; Associates</span>
                </div>
              </div>
              {/* LIVE MAP badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#020617]/80 backdrop-blur-sm border border-[#d4af37]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                <span className="text-[#d4af37] text-[10px] font-bold uppercase tracking-widest">Live Map</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section Strip ── */}
      <div className="section-strip" aria-hidden="true" style={{ marginTop: '2rem' }}>
        <div className="section-strip-line" />
        <div className="section-strip-dot" />
        <div className="section-strip-line" />
      </div>

      {/* ── Flashing Footer Branding ── */}
      <section className="relative overflow-hidden flex items-center justify-center py-12 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-[#0a1423]" />
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.98, 1, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <img 
            src="/assets/Logo.png" 
            alt="Sanbarta & Associates Logo" 
            loading="lazy"
            width="112"
            height="112"
            className="w-auto h-20 sm:h-28 mb-6 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
          />
          <h2 className="font-black text-white tracking-widest uppercase text-2xl sm:text-4xl mb-4 [text-shadow:0_4px_10px_rgba(0,0,0,0.5)]">
            Sanbarta &amp; Associates
          </h2>
          <p className="text-[#d4af37] text-xs sm:text-lg font-bold tracking-[0.2em] uppercase">
            Your Trusted Partner in Tax Litigation
          </p>
        </motion.div>
      </section>

      {/* ── Footer ── */}

      <footer className="py-8 border-t border-white/6 bg-[#0a1423]">
        <div className="section-container flex flex-col sm:flex-row items-center justify-center text-center gap-4">
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-[0.18em]">
            © 2026 Sanbarta &amp; Associates. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default App;
