'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── TYPES ───────────────────────────────────────────────────────────────
interface Business {
  id: string;
  name: string;
  tagline: string;
  description: string;
  link: string;
  logo: string;
  category: string;
  image: string;
  stats: string;
  highlights: string[];
}

interface Brand {
  name: string;
  logo: string;
  link: string;
  desc: string;
  category: string;
}

interface HeroSlide {
  id: number;
  tag: string;
  title: string;
  highlight: string;
  subtitle: string;
  bgImage: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────
const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: 'Paidhu Group Global Vision',
    title: 'Building Businesses That',
    highlight: 'Inspire a Better Future',
    subtitle: 'A multi-vertical enterprise pioneering ethical foods, digital transformation, natural preservation, and skill education worldwide.',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
    ctaText: 'Explore Verticals',
    ctaLink: '#businesses',
    secondaryCtaText: 'Group Story',
    secondaryCtaLink: '#about',
  },
  {
    id: 2,
    tag: 'Sustainable Agriculture & Foods',
    title: 'Pure Kashmiri Saffron &',
    highlight: 'Botanical Edible Flowers',
    subtitle: 'Paidhu Ethical Foods brings 100% trace-to-origin organic crops, empowering smallholder farmers with fair trade practices.',
    bgImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80',
    ctaText: 'Discover Foods',
    ctaLink: 'https://www.paidhuethicalfoods.com/',
    secondaryCtaText: 'Our Ethics',
    secondaryCtaLink: '#why-us',
  },
  {
    id: 3,
    tag: 'Digital Transformation & AI',
    title: 'Enterprise Software &',
    highlight: 'Intelligent Cloud Systems',
    subtitle: 'Viyara IT Services engineers next-generation SaaS architectures, AI platforms, and bespoke digital experiences for global clients.',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80',
    ctaText: 'Explore Viyara IT',
    ctaLink: 'https://viyara.co.in/',
    secondaryCtaText: 'Tech Impact',
    secondaryCtaLink: '#stories',
  },
  {
    id: 4,
    tag: 'Consumer Preserves & EdTech',
    title: 'Natural Floral Jams &',
    highlight: 'Future-Ready Education',
    subtitle: 'From Floffi natural fruit preserves to Kalika Sphere tech academies, we deliver excellence across consumer and skill sectors.',
    bgImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80',
    ctaText: 'View All Brands',
    ctaLink: '#brands',
    secondaryCtaText: 'Get in Touch',
    secondaryCtaLink: '#contact',
  },
];

const BUSINESSES: Business[] = [
  {
    id: 'ethical-foods',
    name: 'Paidhu Ethical Foods',
    tagline: 'Farm to Table, Honestly',
    description: 'Pioneering Kashmir saffron, edible flower crops, and handcrafted botanicals sourced directly through fair-trade agricultural partnerships.',
    link: 'https://www.paidhuethicalfoods.com/',
    logo: '/paidhu_logo.png',
    category: 'Agriculture & Foods',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    stats: '100% Trace-to-Origin',
    highlights: ['Organic Kashmiri Saffron', 'Botanical Edible Flowers', 'Fair Trade Partner Network', 'Sustainable Crop Science'],
  },
  {
    id: 'floffi',
    name: 'Floffi Preservation',
    tagline: 'Nature Bottled Beautifully',
    description: 'Naturally crafted floral fruit jams, spreads, and botanical preserves prepared with zero artificial preservatives and pure garden recipes.',
    link: 'https://floffi.in/',
    logo: 'https://floffi.in/floffi_logo.png',
    category: 'Consumer Goods',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
    stats: '0 Artificial Additives',
    highlights: ['Handcrafted Botanical Jams', 'Eco-Friendly Packaging', 'Artisanal Fruit Preserves', 'Global Gourmet Export'],
  },
  {
    id: 'viyara',
    name: 'Viyara IT Services',
    tagline: 'Engineering Digital Excellence',
    description: 'Enterprise-grade software engineering, SaaS platform development, cloud modernization, and custom AI integration for global enterprises.',
    link: 'https://viyara.co.in/',
    logo: 'https://viyara.co.in/logo-badge-blue.png',
    category: 'Technology & AI',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    stats: '99.9% System Reliability',
    highlights: ['Full-Stack Enterprise Tech', 'AI & Machine Learning', 'UI/UX Design Systems', 'Scalable Cloud DevOps'],
  },
  {
    id: 'kalika',
    name: 'Kalika Sphere',
    tagline: 'Knowledge Without Boundaries',
    description: 'Next-generation EdTech platform offering skill development academies, developer bootcamps, and professional corporate certifications.',
    link: 'https://www.kalikasphere.com/',
    logo: 'https://www.kalikasphere.com/assets/logo-Drzuq4t7.png',
    category: 'Education & Academics',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    stats: '5,000+ Skilled Graduates',
    highlights: ['Hands-On Coding Bootcamps', 'Corporate Tech Training', 'Industry Certifications', 'Placement Support'],
  },
];

const BRANDS: Brand[] = [
  { name: 'Paidhu Ethical Foods', logo: '/paidhu_logo.png', link: 'https://www.paidhuethicalfoods.com/', desc: 'Premium Kashmiri saffron & organic edible flower crops.', category: 'Foods' },
  { name: 'Floffi Preservation', logo: 'https://floffi.in/floffi_logo.png', link: 'https://floffi.in/', desc: 'Artisanal floral fruit jams & natural gourmet spreads.', category: 'Consumer' },
  { name: 'Viyara IT Services', logo: 'https://viyara.co.in/logo-badge-blue.png', link: 'https://viyara.co.in/', desc: 'Enterprise SaaS, cloud engineering & AI software solutions.', category: 'Technology' },
  { name: 'Kalika Sphere', logo: 'https://www.kalikasphere.com/assets/logo-Drzuq4t7.png', link: 'https://www.kalikasphere.com/', desc: 'Future-ready tech learning platforms & skill bootcamps.', category: 'EdTech' },
];

const STATS = [
  { value: 4, suffix: '+', label: 'Core Verticals', desc: 'Foods, Tech, FMCG & EdTech' },
  { value: 100, suffix: '%', label: 'Ethical Sourcing', desc: 'Direct farm & fair-wage trade' },
  { value: 5, suffix: 'K+', label: 'Global Clients & Learners', desc: 'Across digital & retail channels' },
  { value: 2019, suffix: '', label: 'Group Founding Year', desc: 'Pioneering ethical business' },
];

const STORY_TABS = [
  {
    id: 'sustainability',
    title: 'ESG & Sustainability',
    subtitle: 'Zero-compromise responsibility from soil to software.',
    description: 'We believe true growth must be regenerative. In agriculture, we enforce 100% biodegradable packaging and trace-to-origin sourcing. In technology, we build energy-efficient cloud architectures.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    points: ['100% Recyclable Packaging', 'Zero Plastic Wrappers in FMCG', 'Farmer Fair-Value Wage Guarantee', 'Green Cloud Infrastructure'],
  },
  {
    id: 'innovation',
    title: 'Technological Excellence',
    subtitle: 'Pioneering intelligent platforms across industries.',
    description: 'Viyara IT Services drives digital transformation across all group verticals. By combining modern React/Next.js frameworks, machine learning models, and real-time logistics analytics, we turn complex operations into seamless experiences.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    points: ['AI-Driven Crop & Quality Analytics', 'High-Performance SaaS Engines', 'Custom Brand Digital Twins', 'Automated Enterprise Workflows'],
  },
  {
    id: 'empowerment',
    title: 'Community Empowerment',
    subtitle: 'Investing in human potential and future skills.',
    description: 'Through Kalika Sphere, we allocate 5% of group resources toward free skill development workshops, developer scholarships, and rural digital literacy drives, building talent pipelines for tomorrow.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    points: ['Free Tech Scholarships', 'Kashmir Farmer Upskilling', 'Women-Led Artisanal Food Co-ops', 'Youth Certification Drives'],
  },
];

const WHY_US = [
  { icon: '🌿', title: 'Purpose-Driven Enterprise', desc: 'Every business vertical is established around a distinct societal mission — aligning financial success with human progress.' },
  { icon: '🔬', title: 'Research-Backed Quality', desc: 'From botanical crop engineering to AI algorithm design, we ground every endeavor in rigorous scientific research.' },
  { icon: '🤝', title: 'Farmer & Community Equity', desc: 'Fair wages, direct crop purchasing, and local community investments ensure equitable distribution of value.' },
  { icon: '🚀', title: 'Cross-Vertical Synergies', desc: 'Our multi-industry portfolio leverages in-house IT expertise to digitize agriculture, retail, and education.' },
  { icon: '🛡️', title: 'Uncompromising Standards', desc: 'Strict ISO and organic compliance across food products, paired with 99.9% SLA guarantees in technology.' },
  { icon: '🌍', title: 'Global Vision, Local Roots', desc: 'Proudly rooted in Tamil Nadu & Kashmir, India — engineering products and software for global markets.' },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── LOADING SCREEN ──────────────────────────────────────────────────────
function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => setHidden(true), 700);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        opacity,
        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: hidden ? 'none' : 'all',
      }}
    >
      <img
        src="/ChatGPT Image Aug 1, 2026, 08_30_36 PM.png"
        alt="Paidhu Group"
        style={{
          height: 84,
          width: 'auto',
          filter: 'invert(1)',
          mixBlendMode: 'screen',
        }}
      />
      <div style={{ marginTop: 28, width: 180, height: 2, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg, #E8B86D, #F0C98A)', animation: 'loadProgress 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards' }} />
      </div>
      <style>{`
        @keyframes loadProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: 3,
        background: 'linear-gradient(90deg, #E8B86D, #F0C98A, #FFFFFF)',
        zIndex: 10000,
        transition: 'width 0.1s linear',
      }}
    />
  );
}

// ─── MEGA NAVBAR & SEARCH ────────────────────────────────────────────────
function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMegaOpen(false);
    setSearchOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          background: scrolled ? 'rgba(15, 23, 42, 0.94)' : 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8), transparent)',
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(4px)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(20px, 4vw, 64px)' }}>
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <img
              src="/ChatGPT Image Aug 1, 2026, 08_30_36 PM.png"
              alt="Paidhu Group"
              style={{
                height: scrolled ? 48 : 58,
                width: 'auto',
                filter: 'invert(1)',
                mixBlendMode: 'screen',
                transition: 'all 0.3s ease',
              }}
            />
          </button>

          {/* Desktop Links */}
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {[
              { label: 'About Group', id: 'about' },
              { label: 'Businesses', id: 'businesses' },
              { label: 'Brands', id: 'brands' },
              { label: 'Stories & Impact', id: 'stories' },
              { label: 'Why Paidhu', id: 'why-us' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="hover-underline"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  padding: '6px 0',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                width: 38,
                height: 38,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              title="Search"
            >
              🔍
            </button>

            {/* CTA Button */}
            <button
              onClick={() => scrollTo('contact')}
              className="btn-primary desktop-only"
              style={{ padding: '10px 22px', fontSize: '0.8125rem' }}
            >
              Contact Us
            </button>

            {/* Mega Menu Toggle */}
            <button
              onClick={() => setMegaOpen(!megaOpen)}
              style={{
                background: megaOpen ? '#E8B86D' : 'rgba(255,255,255,0.12)',
                color: megaOpen ? '#0F172A' : 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 50,
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.3s',
              }}
            >
              <span>{megaOpen ? 'Close' : 'Menu'}</span>
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>{megaOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            background: 'rgba(15, 23, 42, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <button
            onClick={() => setSearchOpen(false)}
            style={{
              position: 'absolute',
              top: 32,
              right: 32,
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: 32,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
          <div style={{ maxWidth: 640, width: '100%', textAlign: 'center' }}>
            <h3 style={{ color: '#E8B86D', fontSize: '0.875rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
              Search Paidhu Group
            </h3>
            <input
              type="text"
              placeholder="Search verticals, products, software, sustainability..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="form-input"
              style={{
                fontSize: '1.25rem',
                padding: '18px 24px',
                borderRadius: 50,
                background: 'rgba(255,255,255,0.08)',
                borderColor: '#E8B86D',
              }}
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
              {['Ethical Foods', 'Floffi Jams', 'Viyara IT', 'Kalika Sphere', 'ESG Sourcing'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    scrollTo(tag.includes('Foods') ? 'businesses' : tag.includes('IT') ? 'businesses' : 'brands');
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.8)',
                    borderRadius: 50,
                    padding: '6px 16px',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MEGA MENU OVERLAY */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 998,
          background: '#0F172A',
          color: 'white',
          opacity: megaOpen ? 1 : 0,
          pointerEvents: megaOpen ? 'all' : 'none',
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px clamp(24px, 6vw, 96px) 60px',
          overflowY: 'auto',
        }}
      >
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 48 }}>
          {/* Navigation Column */}
          <div>
            <h4 style={{ color: '#E8B86D', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>
              Group Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { name: 'Home Overview', id: 'hero' },
                { name: 'About Paidhu Group', id: 'about' },
                { name: 'Business Verticals', id: 'businesses' },
                { name: 'Subsidiaries & Brands', id: 'brands' },
                { name: 'Impact & Sustainability', id: 'stories' },
                { name: 'Why Choose Paidhu', id: 'why-us' },
                { name: 'Contact & Offices', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'color 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#E8B86D';
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Core Verticals Quick Links */}
          <div>
            <h4 style={{ color: '#E8B86D', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>
              Business Subsidiaries
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {BUSINESSES.map((b) => (
                <a
                  key={b.id}
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16,
                    padding: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(232,184,109,0.1)';
                    e.currentTarget.style.borderColor = 'rgba(232,184,109,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <img src={b.logo} alt={b.name} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                  <div>
                    <h5 style={{ color: 'white', fontSize: '0.9375rem', fontWeight: 600 }}>{b.name}</h5>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>{b.category}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Contact Box */}
          <div style={{ background: 'rgba(232,184,109,0.06)', border: '1px solid rgba(232,184,109,0.2)', borderRadius: 24, padding: 32 }}>
            <h4 style={{ color: '#E8B86D', fontSize: '1.25rem', fontFamily: 'var(--font-serif)', marginBottom: 12 }}>
              Global Headquarters
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 20 }}>
              No 11 Saraswati Avenue, Achipatti, Pollachi – 642002, Tamil Nadu, India.
            </p>
            <p style={{ color: '#E8B86D', fontSize: '0.875rem', fontWeight: 600, marginBottom: 24 }}>
              📞 +91 87542 87774
            </p>
            <button onClick={() => scrollTo('contact')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send Inquiry →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── TATA-STYLE SWIPABLE HERO SLIDER ────────────────────────────────────
function HeroSwiper() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef<number>(0);
  const touchEnd = useRef<number>(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  return (
    <section
      id="hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 700,
        background: '#0F172A',
        overflow: 'hidden',
      }}
    >
      {/* SLIDES */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? 'all' : 'none',
              transition: 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Background Image with Ken Burns effect */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 7s ease-out',
                filter: 'brightness(0.4) contrast(1.1)',
              }}
            />

            {/* Gradient Overlays */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, #0F172A 0%, transparent 60%), linear-gradient(to right, rgba(15,23,42,0.85) 0%, transparent 70%)',
              }}
            />

            {/* Content Container */}
            <div
              className="container"
              style={{
                position: 'relative',
                zIndex: 10,
                padding: '0 clamp(24px, 6vw, 96px)',
                maxWidth: 1100,
              }}
            >
              {/* Tag */}
              <div style={{ marginBottom: 20, opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s 0.2s' }}>
                <span
                  style={{
                    color: '#E8B86D',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span style={{ width: 32, height: 2, background: '#E8B86D' }} />
                  {slide.tag}
                </span>
              </div>

              {/* Title */}
              <h1
                className="display-xl"
                style={{
                  color: 'white',
                  marginBottom: 20,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s 0.4s',
                }}
              >
                {slide.title}<br />
                <span className="gradient-text">{slide.highlight}</span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  lineHeight: 1.7,
                  maxWidth: 640,
                  marginBottom: 40,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s 0.6s',
                }}
              >
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: 'flex',
                  gap: 16,
                  flexWrap: 'wrap',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s 0.8s',
                }}
              >
                {slide.ctaLink.startsWith('http') ? (
                  <a href={slide.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {slide.ctaText} →
                  </a>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={() => {
                      document.querySelector(slide.ctaLink)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {slide.ctaText} →
                  </button>
                )}

                {slide.secondaryCtaLink.startsWith('http') ? (
                  <a href={slide.secondaryCtaLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    {slide.secondaryCtaText}
                  </a>
                ) : (
                  <button
                    className="btn-outline"
                    onClick={() => {
                      document.querySelector(slide.secondaryCtaLink)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {slide.secondaryCtaText}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* TATA SLIDER CONTROLS (Bottom Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          right: 'clamp(24px, 6vw, 96px)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(12px)',
          padding: '12px 24px',
          borderRadius: 50,
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Slide Counter */}
        <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'monospace' }}>
          0{current + 1} / 0{HERO_SLIDES.length}
        </span>

        {/* Slide Dots */}
        <div style={{ display: 'flex', gap: 8 }}>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              style={{
                background: idx === current ? '#E8B86D' : 'rgba(255,255,255,0.3)',
                width: idx === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next Arrows */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={prevSlide}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              width: 32,
              height: 32,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              width: 32,
              height: 32,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ›
          </button>
        </div>
      </div>

      {/* Swipe Hint Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 'clamp(24px, 6vw, 96px)',
          zIndex: 20,
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span>👈 Swipe or Click to Explore</span>
      </div>
    </section>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────
function MarqueeStrip() {
  const items = ['Ethical Foods', 'Viyara IT Services', 'Floffi Preserves', 'Kalika Sphere EdTech', '100% Traceable Saffron', 'SaaS & AI Platforms', 'Fair Wage Agriculture'];
  const list = [...items, ...items];

  return (
    <div style={{ background: '#E8B86D', padding: '14px 0', overflow: 'hidden' }}>
      <div className="marquee-track">
        {list.map((item, i) => (
          <span
            key={i}
            style={{
              color: '#0F172A',
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              paddingRight: 48,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 48,
            }}
          >
            {item}
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0F172A', opacity: 0.5 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT GROUP ──────────────────────────────────────────────────────────
function AboutGroup() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" style={{ background: '#F7F8FA', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <span className="label reveal" style={{ color: '#E8B86D', marginBottom: 12, display: 'block' }}>
            Group Architecture
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'end' }}>
            <h2 className="display-md reveal" style={{ color: '#111827' }}>
              A Diversified Enterprise Built on Purpose & Precision
            </h2>
            <div className="reveal-right">
              <div style={{ width: 48, height: 3, background: '#E8B86D', marginBottom: 20, borderRadius: 2 }} />
              <p style={{ color: '#6B7280', fontSize: '1.0625rem', lineHeight: 1.8 }}>
                Founded in 2019, Paidhu Group spans agriculture, organic food processing, enterprise IT engineering, consumer brands, and skill academies. We combine traditional ethics with modern technology to scale sustainable value.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,
            background: 'rgba(22,36,54,0.08)',
            borderRadius: 24,
            overflow: 'hidden',
            marginBottom: 80,
          }}
        >
          {STATS.map((s, i) => (
            <StatCard key={i} stat={s} visible={statsVisible} />
          ))}
        </div>

        {/* Core Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            { title: 'Ethical Agriculture', desc: 'Working directly with Kashmir saffron & botanical flower farmers with 100% fair-wage pricing.', icon: '🌸' },
            { title: 'Digital Innovation', desc: 'Building enterprise cloud systems, SaaS engines, and custom AI tools under Viyara IT Services.', icon: '⚡' },
            { title: 'Natural FMCG', desc: 'Crafting floral fruit preserves and gourmet jams with zero artificial colors or synthetic additives.', icon: '🍯' },
            { title: 'Skill Academies', desc: 'Empowering students and professionals with hands-on coding and tech certifications at Kalika Sphere.', icon: '🎓' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="card-premium reveal"
              style={{ padding: 36, transitionDelay: `${idx * 100}ms` }}
            >
              <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#162436', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: '#6B7280', fontSize: '0.9375rem', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, visible }: { stat: typeof STATS[0]; visible: boolean }) {
  const count = useCounter(stat.value, 2000, visible);

  return (
    <div
      style={{
        background: 'white',
        padding: '40px 28px',
        textAlign: 'center',
        transition: 'background 0.3s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#FAFBFD')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
    >
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: '#E8B86D', lineHeight: 1 }}>
        {stat.value > 1000 ? count.toLocaleString() : count}{stat.suffix}
      </div>
      <h4 style={{ color: '#111827', fontSize: '0.9375rem', fontWeight: 600, marginTop: 8 }}>{stat.label}</h4>
      <p style={{ color: '#6B7280', fontSize: '0.8125rem', marginTop: 4 }}>{stat.desc}</p>
    </div>
  );
}

// ─── SWIPABLE BUSINESS VERTICALS CAROUSEL ────────────────────────────────
function BusinessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % BUSINESSES.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + BUSINESSES.length) % BUSINESSES.length);

  return (
    <section id="businesses" style={{ background: '#0F172A', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="label reveal" style={{ color: '#E8B86D', marginBottom: 12, display: 'block' }}>
              Enterprise Portfolio
            </span>
            <h2 className="display-md reveal" style={{ color: 'white' }}>
              Explore Business Verticals
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="reveal-right" style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={prev}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                width: 48,
                height: 48,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 20,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#E8B86D')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              ←
            </button>
            <button
              onClick={next}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                width: 48,
                height: 48,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 20,
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#E8B86D')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              →
            </button>
          </div>
        </div>

        {/* Carousel Active Business Focus Display */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, alignItems: 'center' }}>
          {/* Left Feature Card */}
          <div
            className="reveal"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(232,184,109,0.3)',
              borderRadius: 32,
              padding: 'clamp(32px, 5vw, 48px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span
              style={{
                background: 'rgba(232,184,109,0.15)',
                color: '#E8B86D',
                padding: '6px 16px',
                borderRadius: 50,
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 24,
                display: 'inline-block',
              }}
            >
              {BUSINESSES[activeIndex].category}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <img src={BUSINESSES[activeIndex].logo} alt={BUSINESSES[activeIndex].name} style={{ height: 48, objectFit: 'contain' }} />
              <div>
                <h3 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700 }}>
                  {BUSINESSES[activeIndex].name}
                </h3>
                <p style={{ color: '#E8B86D', fontSize: '0.875rem', fontWeight: 600 }}>{BUSINESSES[activeIndex].tagline}</p>
              </div>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 32 }}>
              {BUSINESSES[activeIndex].description}
            </p>

            <div style={{ marginBottom: 32 }}>
              <h4 style={{ color: 'white', fontSize: '0.8125rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
                Key Highlights
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {BUSINESSES[activeIndex].highlights.map((h, i) => (
                  <div key={i} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#E8B86D' }}>✓</span> {h}
                  </div>
                ))}
              </div>
            </div>

            <a
              href={BUSINESSES[activeIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Visit {BUSINESSES[activeIndex].name} →
            </a>
          </div>

          {/* Right Image Feature */}
          <div className="reveal-right" style={{ position: 'relative', borderRadius: 32, overflow: 'hidden', height: 440 }}>
            <img
              src={BUSINESSES[activeIndex].image}
              alt={BUSINESSES[activeIndex].name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.6s ease' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }} />
            <div style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
              <span style={{ color: '#E8B86D', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Benchmark</span>
              <p style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, marginTop: 4 }}>
                {BUSINESSES[activeIndex].stats}
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Swiper Selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 32 }}>
          {BUSINESSES.map((b, idx) => (
            <button
              key={b.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                background: idx === activeIndex ? 'rgba(232,184,109,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${idx === activeIndex ? '#E8B86D' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 20,
                padding: 20,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              <span style={{ color: idx === activeIndex ? '#E8B86D' : 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                0{idx + 1}
              </span>
              <h4 style={{ color: 'white', fontSize: '0.9375rem', fontWeight: 600, marginTop: 4 }}>{b.name}</h4>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BRANDS GRID ──────────────────────────────────────────────────────────
function BrandsGrid() {
  return (
    <section id="brands" style={{ background: '#F7F8FA', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="label reveal" style={{ color: '#E8B86D', marginBottom: 12, display: 'block' }}>
            Group Ecosystem
          </span>
          <h2 className="display-md reveal" style={{ color: '#111827' }}>
            Group Subsidiaries & Brands
          </h2>
          <p className="reveal" style={{ color: '#6B7280', maxWidth: 520, margin: '16px auto 0', fontSize: '1rem' }}>
            Pioneering excellence across agriculture, retail food, enterprise technology, and academies.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {BRANDS.map((b, i) => (
            <a
              key={i}
              href={b.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-premium reveal"
              style={{
                textDecoration: 'none',
                padding: 36,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div>
                <span
                  style={{
                    background: 'rgba(22,36,54,0.06)',
                    color: '#162436',
                    padding: '4px 12px',
                    borderRadius: 50,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    marginBottom: 20,
                    display: 'inline-block',
                  }}
                >
                  {b.category}
                </span>
                <div style={{ height: 60, display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                  <img src={b.logo} alt={b.name} style={{ maxHeight: 50, maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <h3 style={{ color: '#111827', fontSize: '1.125rem', fontWeight: 700, marginBottom: 8 }}>{b.name}</h3>
                <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.6 }}>{b.desc}</p>
              </div>

              <div style={{ marginTop: 24, color: '#E8B86D', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Visit Platform →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TATA-STYLE TABBED STORYTELLING ──────────────────────────────────────
function StorytellingSection() {
  const [activeTab, setActiveTab] = useState(0);
  const current = STORY_TABS[activeTab];

  return (
    <section id="stories" style={{ background: '#162436', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)', color: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="label reveal" style={{ color: '#E8B86D', marginBottom: 12, display: 'block' }}>
            Impact Stories
          </span>
          <h2 className="display-md reveal" style={{ color: 'white' }}>
            How We Shape Sustainable Enterprise
          </h2>
        </div>

        {/* Tab Navigation Buttons */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap',
            marginBottom: 48,
          }}
        >
          {STORY_TABS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              style={{
                background: idx === activeTab ? '#E8B86D' : 'rgba(255,255,255,0.08)',
                color: idx === activeTab ? '#0F172A' : 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: 50,
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Active Tab Panel */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 32,
            padding: 'clamp(32px, 5vw, 56px)',
            alignItems: 'center',
          }}
        >
          <div>
            <h3 style={{ color: '#E8B86D', fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>
              {current.subtitle}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: 32 }}>
              {current.description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {current.points.map((pt, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 14, fontSize: '0.875rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  🌟 {pt}
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderRadius: 24, overflow: 'hidden', height: 380, position: 'relative' }}>
            <img src={current.image} alt={current.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(22,36,54,0.6), transparent)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE PAIDHU ──────────────────────────────────────────────────
function WhyChooseUs() {
  return (
    <section id="why-us" style={{ background: '#0F172A', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="label reveal" style={{ color: '#E8B86D', marginBottom: 12, display: 'block' }}>
            Group Values
          </span>
          <h2 className="display-md reveal" style={{ color: 'white' }}>
            The Paidhu Advantage
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {WHY_US.map((item, i) => (
            <div
              key={i}
              className="card-dark reveal"
              style={{ padding: 36, transitionDelay: `${i * 80}ms` }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: 'rgba(232,184,109,0.12)',
                  border: '1px solid rgba(232,184,109,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 20,
                }}
              >
                {item.icon}
              </div>
              <h3 style={{ color: 'white', fontSize: '1.125rem', fontWeight: 600, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" style={{ background: '#162436', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)', color: 'white' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'start' }}>
          {/* Left Info */}
          <div>
            <span className="label reveal" style={{ color: '#E8B86D', marginBottom: 12, display: 'block' }}>
              Connect With Us
            </span>
            <h2 className="display-md reveal" style={{ color: 'white', marginBottom: 24 }}>
              Let's Build the Future Together
            </h2>
            <p className="reveal" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', lineHeight: 1.8, marginBottom: 40 }}>
              Partner with Paidhu Group across agriculture exports, custom IT engineering, consumer brand distribution, or skill academies.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { icon: '📍', title: 'Headquarters', text: 'No 11 Saraswati Avenue, Achipatti, Pollachi – 642002, Tamil Nadu, India' },
                { icon: '📞', title: 'Phone', text: '+91 87542 87774' },
                { icon: '✉️', title: 'Email & Web', text: 'www.paidhu.com' },
              ].map((c, idx) => (
                <div key={idx} className="reveal" style={{ display: 'flex', gap: 16, transitionDelay: `${idx * 100}ms` }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'rgba(232,184,109,0.15)',
                      border: '1px solid rgba(232,184,109,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <h4 style={{ color: '#E8B86D', fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9375rem', marginTop: 2 }}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div
            className="reveal-right"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 32,
              padding: 'clamp(28px, 4vw, 48px)',
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: 8 }}>Inquiry Submitted!</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Thank you. Our corporate team will reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h3 style={{ color: 'white', fontSize: '1.375rem', fontFamily: 'var(--font-serif)', marginBottom: 6 }}>Corporate Inquiry</h3>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', marginBottom: 6, display: 'block' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', marginBottom: 6, display: 'block' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', marginBottom: 6, display: 'block' }}>Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Partnership, Sales, Services..."
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', marginBottom: 6, display: 'block' }}>Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your inquiry..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-input"
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
                  Send Corporate Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#090F1D', padding: '80px clamp(24px, 5vw, 64px) 32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, marginBottom: 64 }}>
          {/* Col 1 */}
          <div>
            <img
              src="/ChatGPT Image Aug 1, 2026, 08_30_36 PM.png"
              alt="Paidhu Group"
              style={{ height: 60, width: 'auto', filter: 'invert(1)', mixBlendMode: 'screen', marginBottom: 20 }}
            />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              Building ethical, sustainable, and value-driven business verticals for a modern global economy.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ color: '#E8B86D', fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['about', 'businesses', 'brands', 'stories', 'why-us', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.6)',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ color: '#E8B86D', fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Subsidiaries</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BUSINESSES.map((b) => (
                <a key={b.id} href={b.link} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem' }}>
                  {b.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ color: '#E8B86D', fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>Contact Us</h4>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              No 11 Saraswati Avenue, Achipatti, Pollachi – 642002, Tamil Nadu.<br />
              📞 +91 87542 87774
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem' }}>
            © {new Date().getFullYear()} Paidhu Group. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem' }}>Privacy Policy</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem' }}>Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE COMPONENT ────────────────────────────────────────────────
export default function Page() {
  useScrollReveal();

  return (
    <>
      <LoadingScreen />
      <ScrollProgressBar />
      <HeaderNav />
      <main>
        <HeroSwiper />
        <MarqueeStrip />
        <AboutGroup />
        <BusinessCarousel />
        <BrandsGrid />
        <StorytellingSection />
        <WhyChooseUs />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
