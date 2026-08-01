'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── TYPES ───────────────────────────────────────────────────────────────
interface Business {
  name: string;
  tagline: string;
  description: string;
  link: string;
  logo: string;
  category: string;
  color: string;
}

interface Brand {
  name: string;
  logo: string;
  link: string;
  desc: string;
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────
const BUSINESSES: Business[] = [
  {
    name: 'Paidhu Ethical Foods',
    tagline: 'Farm to Table, Honestly',
    description: 'Premium organic saffron, edible flowers, and handcrafted botanicals sourced directly from Kashmir — ethical trade at every step.',
    link: 'https://www.paidhuethicalfoods.com/',
    logo: '/paidhu_logo.png',
    category: 'Agriculture & Food',
    color: '#2D5016',
  },
  {
    name: 'Floffi Preservation',
    tagline: 'Nature Bottled Beautifully',
    description: 'Naturally crafted floral fruit jams, preserves, and spreads inspired by the finest gardens — pure ingredients, zero compromise.',
    link: 'https://floffi.in/',
    logo: 'https://floffi.in/floffi_logo.png',
    category: 'Consumer Brands',
    color: '#6B2D8B',
  },
  {
    name: 'Viyara IT Services',
    tagline: 'Engineering Digital Excellence',
    description: 'World-class enterprise software, SaaS platforms, AI-driven solutions, and premium brand experiences for global clients.',
    link: 'https://viyara.co.in/',
    logo: 'https://viyara.co.in/logo-badge-blue.png',
    category: 'Technology',
    color: '#1A3A6B',
  },
  {
    name: 'Kalika Sphere',
    tagline: 'Knowledge Without Boundaries',
    description: 'Future-ready skill development, tech certification programs, and corporate training — empowering the workforce of tomorrow.',
    link: 'https://www.kalikasphere.com/',
    logo: 'https://www.kalikasphere.com/assets/logo-Drzuq4t7.png',
    category: 'Education & EdTech',
    color: '#8B1A1A',
  },
];

const BRANDS: Brand[] = [
  { name: 'Paidhu Ethical Foods', logo: '/paidhu_logo.png', link: 'https://www.paidhuethicalfoods.com/', desc: 'Premium organic edible flowers & Kashmir saffron.' },
  { name: 'Floffi Preservation', logo: 'https://floffi.in/floffi_logo.png', link: 'https://floffi.in/', desc: 'Naturally crafted floral jams & fruit preserves.' },
  { name: 'Viyara IT Services', logo: 'https://viyara.co.in/logo-badge-blue.png', link: 'https://viyara.co.in/', desc: 'Enterprise software & premium brand experiences.' },
  { name: 'Kalika Sphere', logo: 'https://www.kalikasphere.com/assets/logo-Drzuq4t7.png', link: 'https://www.kalikasphere.com/', desc: 'Future-ready skill development & tech courses.' },
];

const STATS = [
  { value: 4, suffix: '+', label: 'Business Verticals' },
  { value: 100, suffix: '%', label: 'Ethical Sourcing' },
  { value: 5, suffix: 'K+', label: 'Happy Customers' },
  { value: 2019, suffix: '', label: 'Founded' },
];

const WHY_US = [
  {
    icon: '🌿',
    title: 'Purpose-Driven',
    desc: 'Every business vertical is built around a clear ethical mission — profitability and purpose, never at odds.',
  },
  {
    icon: '🔬',
    title: 'Research-Backed',
    desc: 'From agricultural science to AI-driven software, we invest in knowledge before commercialization.',
  },
  {
    icon: '🤝',
    title: 'Community First',
    desc: 'Fair wages, local sourcing, and social education programs — our growth benefits communities.',
  },
  {
    icon: '🚀',
    title: 'Innovation Engine',
    desc: 'Our diverse portfolio creates cross-industry synergies that drive innovation at every level.',
  },
  {
    icon: '🛡️',
    title: 'Quality Assured',
    desc: 'Uncompromising standards across every product and service — premium at every price point.',
  },
  {
    icon: '🌍',
    title: 'Global Vision',
    desc: 'Rooted in India, building for the world — our brands are designed for global markets.',
  },
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
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
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
      setTimeout(() => setHidden(true), 800);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--dark)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        opacity,
        transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: hidden ? 'none' : 'all',
      }}
    >
      <img
        src="/ChatGPT Image Aug 1, 2026, 08_30_36 PM.png"
        alt="Paidhu"
        style={{
          height: 80,
          width: 'auto',
          filter: 'invert(1)',
          mixBlendMode: 'screen',
          animation: 'fadeIn 0.6s ease forwards',
        }}
      />
      <div
        style={{
          marginTop: 32,
          width: 200,
          height: 2,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
            borderRadius: 2,
            animation: 'loadBar 1.6s ease-out forwards',
          }}
        />
      </div>
      <style>{`
        @keyframes loadBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────
function ScrollProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${width}%`,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
        zIndex: 10000,
        transition: 'width 0.1s linear',
      }}
    />
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = ['About', 'Businesses', 'Brands', 'Why Us', 'Contact'];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(' ', '-').replace(/\s/g, '-'));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
    setActiveSection(id.toLowerCase());
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
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          background: scrolled ? 'rgba(22,36,54,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          padding: scrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(24px, 5vw, 64px)' }}>
          {/* Logo */}
          <button onClick={() => scrollTo('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}>
            <img
              src="/ChatGPT Image Aug 1, 2026, 08_30_36 PM.png"
              alt="Paidhu"
              style={{ height: 56, width: 'auto', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'screen', transition: 'transform 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </button>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(/\s/g, '-'))}
                className="hover-underline"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  padding: '4px 0',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.8125rem', display: 'none' }}
              id="nav-cta"
            >
              Get in Touch
            </button>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                padding: 8,
              }}
              className="hamburger-btn"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: 24,
                    height: 2,
                    background: 'white',
                    borderRadius: 2,
                    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                    transform: menuOpen
                      ? i === 0 ? 'translateY(7px) rotate(45deg)' : i === 2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)'
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(15,23,42,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {navItems.map((item, i) => (
          <button
            key={item}
            onClick={() => scrollTo(item.toLowerCase().replace(/\s/g, '-'))}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              transition: 'color 0.3s',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: `${i * 60}ms`,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'white')}
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => scrollTo('contact')}
          className="btn-primary"
          style={{ marginTop: 16 }}
        >
          Get in Touch →
        </button>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hamburger-btn { display: none !important; }
          #nav-cta { display: inline-flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--dark)',
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 30% 40%, rgba(232,184,109,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 70% 60%, rgba(22,36,54,0.9) 0%, transparent 70%),
            linear-gradient(135deg, #0F172A 0%, #162436 50%, #0F1A2E 100%)
          `,
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          animation: 'heroZoom 20s ease-in-out infinite alternate',
        }}
      />

      {/* Floating Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[
          { w: 500, h: 500, left: '-10%', top: '-10%', opacity: 0.08, delay: '0s' },
          { w: 400, h: 400, right: '-5%', top: '20%', opacity: 0.06, delay: '3s' },
          { w: 300, h: 300, left: '20%', bottom: '10%', opacity: 0.05, delay: '6s' },
        ].map((orb, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: orb.w,
              height: orb.h,
              background: `radial-gradient(circle, var(--accent), transparent)`,
              borderRadius: '50%',
              left: orb.left,
              top: orb.top,
              right: (orb as any).right,
              bottom: (orb as any).bottom,
              opacity: orb.opacity,
              animation: `float 8s ease-in-out infinite`,
              animationDelay: orb.delay,
              transform: `translate(${mousePos.x * (i + 1) * 0.15}px, ${mousePos.y * (i + 1) * 0.15}px)`,
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 clamp(24px, 5vw, 96px)',
        }}
      >
        <div
          style={{
            animation: 'fadeUp 0.8s ease 0.3s both',
            marginBottom: 24,
          }}
        >
          <span
            className="label"
            style={{
              color: 'var(--accent)',
              letterSpacing: '0.2em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ width: 32, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
            Paidhu Group Global Vision
            <span style={{ width: 32, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
          </span>
        </div>

        <h1
          className="display-xl"
          style={{
            color: 'white',
            animation: 'fadeUp 0.9s ease 0.5s both',
            marginBottom: 16,
            maxWidth: 900,
            margin: '0 auto 24px',
          }}
        >
          Building Businesses That
          <br />
          <span className="gradient-text">Inspire a Better Future</span>
        </h1>

        <p
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.7,
            maxWidth: 580,
            margin: '0 auto 48px',
            animation: 'fadeUp 0.9s ease 0.7s both',
          }}
        >
          A diversified group shaping tomorrow through ethical foods, breakthrough technology, premium consumer brands, and transformative education.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeUp 0.9s ease 0.9s both',
          }}
        >
          <button
            className="btn-primary"
            onClick={() => document.getElementById('businesses')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Our Businesses →
          </button>
          <button
            className="btn-outline"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Story
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            animation: 'fadeIn 1s ease 1.5s both',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1.5, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)', animation: 'scrollBounce 2s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(to top, var(--bg), transparent)',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────
function MarqueeStrip() {
  const items = ['Ethical Business', 'Premium Quality', 'Sustainable Future', 'Indian Craftsmanship', 'Global Vision', 'Purpose-Driven Growth', 'Innovation at Scale'];
  const repeated = [...items, ...items];

  return (
    <div style={{ background: 'var(--accent)', padding: '14px 0', overflow: 'hidden' }}>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              color: 'var(--primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              paddingRight: 48,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 48,
            }}
          >
            {item}
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', opacity: 0.4, display: 'inline-block' }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────
function About() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" style={{ background: 'var(--bg)', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)' }}>
      <div className="container">
        {/* Editorial Header */}
        <div style={{ marginBottom: 80 }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: 16 }}>Who We Are</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <h2 className="display-md reveal" style={{ color: 'var(--primary)' }}>
              A Legacy of Purpose&#8209;Driven Enterprise
            </h2>
            <div className="reveal-right" style={{ paddingBottom: 8 }}>
              <div style={{ width: 48, height: 3, background: 'var(--accent)', marginBottom: 24, borderRadius: 2 }} />
              <p style={{ color: 'var(--muted)', fontSize: '1.0625rem', lineHeight: 1.8 }}>
                Paidhu Group was born from a simple conviction — that business can be both profitable and principled. We build verticals that serve real human needs, powered by ethical sourcing, genuine innovation, and deep community respect.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 2,
            background: 'var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: 80,
          }}
        >
          {STATS.map((stat, i) => (
            <StatCounter key={i} stat={stat} visible={statsVisible} delay={i * 150} />
          ))}
        </div>

        {/* Mission / Vision / Values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            {
              title: 'Our Mission',
              text: 'To build ethical, scalable businesses that create lasting value for customers, communities, and the planet — without compromise.',
              icon: '🎯',
            },
            {
              title: 'Our Vision',
              text: 'A world where enterprise and ethics are inseparable — where every product sold and every service rendered makes lives measurably better.',
              icon: '🌅',
            },
            {
              title: 'Our Values',
              text: 'Integrity in sourcing. Excellence in execution. Humility in leadership. Community in growth. These are not aspirations — they are non-negotiables.',
              icon: '🧭',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="card-premium reveal"
              style={{
                padding: 36,
                animationDelay: `${i * 100}ms`,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 20 }}>{item.icon}</div>
              <h3 className="heading-md" style={{ color: 'var(--primary)', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9375rem', lineHeight: 1.8 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .display-md + div { grid-column: 1; }
        }
      `}</style>
    </section>
  );
}

function StatCounter({ stat, visible, delay }: { stat: typeof STATS[0]; visible: boolean; delay: number }) {
  const count = useCounter(stat.value, 2000, visible);

  return (
    <div
      style={{
        background: 'white',
        padding: '48px 32px',
        textAlign: 'center',
        transition: 'background 0.3s',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#FAFAFA')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'white')}
    >
      <div className="stat-number">
        {stat.value > 1000 ? count.toLocaleString() : count}{stat.suffix}
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginTop: 8, letterSpacing: '0.04em' }}>{stat.label}</p>
    </div>
  );
}

// ─── BUSINESSES ───────────────────────────────────────────────────────────
function Businesses() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="businesses"
      style={{
        background: 'var(--dark)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)',
      }}
    >
      <div className="container">
        <div style={{ marginBottom: 72, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 32 }}>
          <div>
            <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: 16 }}>Our Verticals</p>
            <h2 className="display-md reveal" style={{ color: 'white' }}>
              Four Pillars of<br />
              <span className="gradient-text">Purposeful Growth</span>
            </h2>
          </div>
          <p className="reveal-right" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9375rem', maxWidth: 280, lineHeight: 1.7 }}>
            Each vertical is an independent business with its own identity, built on shared values.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {BUSINESSES.map((biz, i) => (
            <a
              key={i}
              href={biz.link}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal"
              style={{
                textDecoration: 'none',
                display: 'block',
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                style={{
                  background: hovered === i ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${hovered === i ? 'rgba(232,184,109,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 36,
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  transform: hovered === i ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hovered === i ? '0 24px 60px rgba(0,0,0,0.3)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Category badge */}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: 'rgba(232,184,109,0.12)',
                    border: '1px solid rgba(232,184,109,0.2)',
                    borderRadius: 50,
                    color: 'var(--accent)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 24,
                    width: 'fit-content',
                  }}
                >
                  {biz.category}
                </span>

                {/* Logo */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                    overflow: 'hidden',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    transform: hovered === i ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <img src={biz.logo} alt={biz.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </div>

                <h3 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', fontWeight: 700, marginBottom: 8, letterSpacing: '-0.01em' }}>
                  {biz.name}
                </h3>
                <p style={{ color: 'var(--accent)', fontSize: '0.8125rem', fontWeight: 600, marginBottom: 16, letterSpacing: '0.04em' }}>
                  {biz.tagline}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, flex: 1 }}>
                  {biz.description}
                </p>

                <div
                  style={{
                    marginTop: 28,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: 'var(--accent)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    transition: 'gap 0.3s',
                  }}
                >
                  Visit Website
                  <span style={{ transition: 'transform 0.3s', transform: hovered === i ? 'translateX(4px)' : 'none' }}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BRANDS ───────────────────────────────────────────────────────────────
function Brands() {
  return (
    <section
      id="brands"
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)',
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: 16 }}>Group Network</p>
          <h2 className="display-md reveal" style={{ color: 'var(--primary)' }}>Core Group Brands</h2>
          <p className="reveal" style={{ color: 'var(--muted)', maxWidth: 480, margin: '16px auto 0', fontSize: '1rem', lineHeight: 1.7 }}>
            Market-leading subsidiaries working in cohesion across industries.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {BRANDS.map((brand, i) => (
            <a
              key={i}
              href={brand.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-premium reveal"
              style={{
                textDecoration: 'none',
                padding: 40,
                textAlign: 'center',
                display: 'block',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  margin: '0 auto 24px',
                  borderRadius: 20,
                  background: '#F7F8FA',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <img src={brand.logo} alt={brand.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem', color: 'var(--primary)', marginBottom: 8 }}>
                {brand.name}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{brand.desc}</p>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: 16,
                  color: 'var(--accent)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Visit →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STORYTELLING / WHY US ────────────────────────────────────────────────
function WhyUs() {
  return (
    <section
      id="why-us"
      style={{
        background: 'var(--primary)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 70% at 80% 50%, rgba(232,184,109,0.06), transparent)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: 16 }}>Why Paidhu</p>
          <h2 className="display-md reveal" style={{ color: 'white' }}>
            The Paidhu<br />
            <span className="gradient-text">Difference</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {WHY_US.map((item, i) => (
            <div
              key={i}
              className="card-dark reveal"
              style={{
                padding: 36,
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: 'rgba(232,184,109,0.12)',
                  border: '1px solid rgba(232,184,109,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 24,
                }}
              >
                {item.icon}
              </div>
              <h3 style={{ color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1.125rem', marginBottom: 12 }}>
                {item.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', lineHeight: 1.75 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      style={{
        background: 'var(--dark)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 64px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: 'absolute',
          right: '-200px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,184,109,0.06), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Info */}
          <div>
            <p className="label reveal" style={{ color: 'var(--accent)', marginBottom: 16 }}>Get In Touch</p>
            <h2 className="display-md reveal" style={{ color: 'white', marginBottom: 24 }}>
              Let's Build<br />
              <span className="gradient-text">Something Great</span>
            </h2>
            <p className="reveal" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 48 }}>
              Whether you're a business partner, customer, investor, or job seeker — we'd love to hear from you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {[
                { icon: '📍', label: 'Address', value: 'No 11 Saraswati Avenue, Achipatti,\nPollachi – 642002, Tamil Nadu' },
                { icon: '📞', label: 'Phone', value: '+91 87542 87774' },
                { icon: '🌐', label: 'Website', value: 'www.paidhu.com' },
              ].map((info, i) => (
                <div key={i} className="reveal" style={{ display: 'flex', gap: 20, transitionDelay: `${i * 80}ms` }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'rgba(232,184,109,0.12)',
                      border: '1px solid rgba(232,184,109,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ color: 'var(--accent)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                      {info.label}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9375rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className="reveal-right"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(32px, 5vw, 48px)',
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)' }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h3 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 8 }}>Send a Message</h3>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', fontWeight: 500, display: 'block', marginBottom: 8 }}>Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="form-input"
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px 32px' }}>
                  Send Message →
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
  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Businesses', id: 'businesses' },
    { label: 'Brands', id: 'brands' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#080E1A', padding: 'clamp(64px, 10vw, 96px) clamp(24px, 5vw, 64px) 0' }}>
      <div className="container">
        {/* Top Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, paddingBottom: 64, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Brand */}
          <div>
            <img
              src="/ChatGPT Image Aug 1, 2026, 08_30_36 PM.png"
              alt="Paidhu"
              style={{ height: 64, width: 'auto', filter: 'invert(1)', mixBlendMode: 'screen', marginBottom: 20 }}
            />
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: 300 }}>
              Building sustainable, ethical, and value-driven business verticals for a cleaner, modern tomorrow.
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              {['LinkedIn', 'Twitter', 'Instagram'].map((soc) => (
                <a
                  key={soc}
                  href="#"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(232,184,109,0.15)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(232,184,109,0.3)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  {soc[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="hover-underline"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', textAlign: 'left', padding: 0, transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Businesses */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Businesses</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {BUSINESSES.map((biz) => (
                <a
                  key={biz.name}
                  href={biz.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {biz.name.split(' ').slice(0, 2).join(' ')}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              <p>No 11 Saraswati Avenue,<br />Achipatti, Pollachi – 642002</p>
              <p>+91 87542 87774</p>
              <p>www.paidhu.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 0',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8125rem' }}>
            © {new Date().getFullYear()} Paidhu Group. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8125rem', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer .container > div:last-child {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function Page() {
  useScrollReveal();

  return (
    <>
      <LoadingScreen />
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <Businesses />
        <Brands />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
