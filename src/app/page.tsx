'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Advanced Subtle Grid Canvas Background (Clean & High-End)
function DynamicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples = useRef<Array<{ x: number; y: number; radius: number; maxRadius: number; speed: number; alpha: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const spacing = 40;
    const dotRadius = 1;

    // Drifting particles (very slow and professional)
    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    const numParticles = 15;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        radius: Math.random() * 1.2 + 0.4,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid dots
      ctx.fillStyle = 'rgba(63, 94, 81, 0.03)';
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          let scale = 1;
          ripples.current.forEach((r) => {
            const dist = Math.hypot(x - r.x, y - r.y);
            const diff = Math.abs(dist - r.radius);
            if (diff < 60) {
              const strength = (1 - diff / 60) * r.alpha;
              scale += strength * 1.5;
            }
          });

          ctx.beginPath();
          ctx.arc(x, y, dotRadius * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw drifting particles & connection lines
      ctx.fillStyle = 'rgba(63, 94, 81, 0.04)';
      ctx.strokeStyle = 'rgba(63, 94, 81, 0.01)';
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      // Update click ripples
      ripples.current.forEach((r, idx) => {
        r.radius += r.speed;
        r.alpha -= 0.015;
        if (r.alpha <= 0) {
          ripples.current.splice(idx, 1);
          return;
        }
        ctx.strokeStyle = `rgba(63, 94, 81, ${r.alpha * 0.08})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleClick = (e: MouseEvent) => {
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 200,
        speed: 3,
        alpha: 0.8,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

// Magnetic Element Wrapper
function MagneticElement({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const xc = left + width / 2;
    const yc = top + height / 2;
    setPosition({
      x: (e.clientX - xc) * 0.2,
      y: (e.clientY - yc) * 0.2,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
}

// 3D Parallax Layer Card Wrapper
function ParallaxCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    setRotateY((x - xc) / 12);
    setRotateX((yc - y) / 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        height: '100%',
      }}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        style={{
          transformStyle: 'preserve-3d',
          height: '100%',
        }}
      >
        <div style={{ transformStyle: 'preserve-3d', height: '100%', transition: 'all 0.3s' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Infinite Scrolling Ticker Banner Component
function TickerBanner() {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'flex', background: '#D5D8D5', padding: '16px 0', borderTop: '1px solid #B4BCB4', borderBottom: '1px solid #B4BCB4', position: 'relative', zIndex: 2 }}>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
        style={{ display: 'flex', gap: 60, fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#3F5E51' }}
      >
        <span>Paidhu Ethical Foods</span>
        <span>•</span>
        <span>Floffi Preservation</span>
        <span>•</span>
        <span>Viyara IT Services</span>
        <span>•</span>
        <span>Kalika Sphere</span>
        <span>•</span>
        <span>Paidhu Ethical Foods</span>
        <span>•</span>
        <span>Floffi Preservation</span>
        <span>•</span>
        <span>Viyara IT Services</span>
        <span>•</span>
        <span>Kalika Sphere</span>
      </motion.div>
    </div>
  );
}

const BUSINESSES = [
  {
    id: 'ethical-foods',
    name: 'Paidhu Ethical Foods',
    sector: 'Agriculture & Sustainable Sourcing',
    tagline: 'Empowering Kashmir’s Heritage Agriculture',
    description: 'Re-engineering Kashmir saffron farming through absolute vertical integration. By partnering directly with local smallholder grower families, we guarantee origin-traceable saffron, wild organic honey, and hand-selected floral crops. Our fair-trade pricing model ensures کشمیر farmers receive honest value while preserving pristine agricultural traditions.',
    highlights: ['100% Trace-to-Origin Saffron', 'Empowering 100+ Grower Families', 'Fair-Trade Guaranteed Sourcing', 'Pristine Saffron Logistics Pipelines'],
    metrics: { count: '100+', label: 'Local Kashmir Farms' },
    link: 'https://www.paidhuethicalfoods.com/',
    logo: '/paidhu_logo.png',
    image: '/paidhu_screen.png',
    color: '#3F5E51',
  },
  {
    id: 'floffi',
    name: 'Floffi Preservation',
    sector: 'FMCG & Artisanal Preserves',
    tagline: 'Artisanal Preserves, Zero Synthetic Chemistry',
    description: 'Redefining the pantry staples category through pure, chemical-free food preservation. Floffi processes native wild fruits, botanical petals, and natural Kashmir honey in small, artisanal batches. By using zero artificial gelling agents or synthetic additives, we bottle natural purity in 100% biodegradable glass preserves.',
    highlights: ['0% Artificial Additives & Gelatins', 'Small-Batch Glass Preservation', 'Supporting Agrarian Micro-Enterprises', 'Native Himalayan Fruit Botanicals'],
    metrics: { count: '12+', label: 'Artisanal Flavors' },
    link: 'https://floffi.in/',
    logo: 'https://floffi.in/floffi_logo.png',
    image: '/floffi_screen.png',
    color: '#3F5E51',
  },
  {
    id: 'viyara',
    name: 'Viyara IT Services',
    sector: 'Enterprise Software & Custom AI',
    tagline: 'Engineering Scalable Digital Infrastructure',
    description: 'Building the digital pipelines that scale tomorrow\'s web. Viyara IT delivers enterprise software architecture, high-performance cloud operations, scalable SaaS frameworks, and custom generative AI system integrations. Viyara operates as the engineering core behind modern distribution networks.',
    highlights: ['Scalable SaaS Architecture Design', 'Generative AI Pipeline Integration', 'Automated DevOps & Cloud Modernization', 'Powering Supply Chain Technologies'],
    metrics: { count: '99.9%', label: 'Platform Reliability' },
    link: 'https://viyara.co.in/',
    logo: 'https://viyara.co.in/logo-badge-blue.png',
    image: '/viyara_screen.png',
    color: '#3F5E51',
  },
  {
    id: 'kalika',
    name: 'Kalika Sphere',
    sector: 'Education & Technical Academics',
    tagline: 'Democratizing Advanced Technology Education',
    description: 'Democratizing modern tech education through immersive, project-driven learning. Kalika Sphere operates full-stack bootcamps, developer mentorship circles, and skill certifications that bridge the gap between local graduate talent and enterprise software demand. We foster technical excellence without systemic boundaries.',
    highlights: ['Project-Driven Software Engineering', 'Elite Mentor Placement Pathways', 'Rural Technology Scholarships', 'Over 5,000+ Certified Graduates'],
    metrics: { count: '5,000+', label: 'Graduates Trained' },
    link: 'https://www.kalikasphere.com/',
    logo: 'https://www.kalikasphere.com/assets/logo-Drzuq4t7.png',
    image: '/kalika_screen.png',
    color: '#3F5E51',
  },
];

// Processed Logo Component using Canvas to strip black background
function ProcessedLogo() {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    const img = new Image();
    img.src = '/paidhu_logo_raw.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Make black transparent and change white text to Sage Mint (#3F5E51)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // If it's close to black background, set alpha to 0
        if (r < 50 && g < 50 && b < 50) {
          data[i+3] = 0;
        } else {
          // Keep anti-aliasing smooth by scaling transparency with brightness
          const brightness = (r + g + b) / 3 / 255;
          data[i] = 63;     // R
          data[i+1] = 94;    // G
          data[i+2] = 81;    // B
          data[i+3] = Math.round(brightness * 255);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setDataUrl(canvas.toDataURL());
    };
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -0.5 }}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {dataUrl ? (
        <img 
          src={dataUrl} 
          alt="Paidhu" 
          style={{ height: 38, width: 'auto', objectFit: 'contain' }} 
        />
      ) : (
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#3F5E51' }}>paidhu</span>
      )}
    </motion.div>
  );
}

// Hero Dynamic Slideshow Showcase Component
function HeroSlideshow({ isMobile }: { isMobile: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % BUSINESSES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = BUSINESSES[index];

  return (
    <div style={{ position: 'relative', width: '100%', height: isMobile ? 240 : 360, background: '#F5F5F0', border: '1px solid #C5C4BE', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 40px rgba(63,94,81,0.04)' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
        >
          <img src={slide.image} alt={slide.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(44,45,43,0.9) 0%, rgba(44,45,43,0.4) 60%, transparent 100%)' }} />
        </motion.div>
      </AnimatePresence>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? 20 : 32, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 6, color: '#F5F5F0' }}>
        <span style={{ fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#B4BCB4' }}>{slide.sector}</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 700, margin: 0 }}>{slide.name}</h3>
        {!isMobile && <p style={{ fontSize: '0.875rem', opacity: 0.8, margin: 0, maxWidth: 440 }}>{slide.tagline}</p>}
      </div>

      <div style={{ position: 'absolute', top: isMobile ? 16 : 24, right: isMobile ? 16 : 24, zIndex: 3, display: 'flex', gap: 6 }}>
        {BUSINESSES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: isMobile ? 16 : 24,
              height: 4,
              borderRadius: 2,
              border: 'none',
              background: i === index ? '#3F5E51' : 'rgba(245, 245, 240, 0.4)',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 850);
    };
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
      setTrailPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectBusiness = (id: string) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    setTimeout(() => {
      scrollTo(`brand-${id}`);
    }, 100);
  };

  return (
    <div style={{ background: '#ECEBE4', color: '#2C2D2B', fontFamily: 'var(--font-body)', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Subtle Canvas grid dots background */}
      <DynamicCanvas />

      {/* Subtle cursor light glow trail */}
      {!isMobile && (
        <div 
          style={{
            position: 'fixed',
            top: trailPos.y - 120,
            left: trailPos.x - 120,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63, 94, 81, 0.03) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}

      {/* SCROLL BAR */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: `${scrollProgress}%`, height: '3px', background: 'linear-gradient(90deg, #3F5E51, #5A7E70)', zIndex: 1000, transition: 'width 0.1s ease-out' }} />

      {/* HEADER */}
      <motion.header 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setDropdownOpen(false)}
        style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(236, 235, 228, 0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #C5C4BE', padding: '16px 24px' }}
      >
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <button onClick={() => scrollTo('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <ProcessedLogo />
          </button>
          
          {/* Responsive Navigation block */}
          {isMobile ? (
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                zIndex: 1001
              }}
            >
              <span style={{ display: 'block', width: 22, height: 2, background: '#2C2D2B', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: 'transform 0.2s' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#2C2D2B', opacity: mobileMenuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#2C2D2B', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: 'transform 0.2s' }} />
            </button>
          ) : (
            <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
              <button 
                onMouseEnter={() => setDropdownOpen(true)}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '0.8125rem', 
                  fontWeight: 700, 
                  color: dropdownOpen ? '#3F5E51' : '#5A5D5A', 
                  letterSpacing: '0.12em', 
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 0',
                  borderBottom: dropdownOpen ? '2px solid #3F5E51' : '2px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                Businesses
              </button>

              <MagneticElement>
                <button onClick={() => scrollTo('brands')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 700, color: '#5A5D5A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Portfolio</button>
              </MagneticElement>
              <MagneticElement>
                <button onClick={() => scrollTo('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 700, color: '#5A5D5A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Inquiry</button>
              </MagneticElement>
            </nav>
          )}

          {/* TATA STYLE CORPORATE MEGA DROPDOWN MENU (Desktop only) */}
          {!isMobile && (
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onMouseEnter={() => setDropdownOpen(true)}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'rgba(245, 245, 240, 0.98)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid #C5C4BE',
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                    padding: '36px 40px',
                    marginTop: '12px',
                    zIndex: 1000,
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1.5fr',
                    gap: '40px',
                    textAlign: 'left'
                  }}
                >
                  {/* Column 1: Business Overview */}
                  <div style={{ borderRight: '1px solid rgba(197, 196, 190, 0.5)', paddingRight: '32px' }}>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#3F5E51', letterSpacing: '0.1em', marginBottom: '16px' }}>Business Overview</h4>
                    <p style={{ fontSize: '0.875rem', color: '#5A5D5A', lineHeight: 1.6, marginBottom: '20px' }}>
                      Mapping Kashmir fair-trade agriculture, artisanal FMCG, software engineering, and developer education under one cohesive conglomerate ecosystem.
                    </p>
                    <button 
                      onClick={() => { setDropdownOpen(false); scrollTo('brands'); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 700, color: '#2C2D2B', textDecoration: 'underline', padding: 0 }}
                    >
                      Explore Group Brands
                    </button>
                  </div>

                  {/* Column 2: Our Brands */}
                  <div style={{ borderRight: '1px solid rgba(197, 196, 190, 0.5)', paddingRight: '32px' }}>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#3F5E51', letterSpacing: '0.1em', marginBottom: '16px' }}>Our Brands</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {BUSINESSES.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => selectBusiness(b.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: '#2C2D2B',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#3F5E51'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#2C2D2B'}
                        >
                          <span style={{ fontSize: '0.5rem', color: '#3F5E51' }}>●</span>
                          {b.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Business Verticals */}
                  <div>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#3F5E51', letterSpacing: '0.1em', marginBottom: '16px' }}>Business Verticals</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', fontSize: '0.8125rem', color: '#5A5D5A' }}>
                      <div>
                        <strong style={{ color: '#2C2D2B', display: 'block', fontSize: '0.875rem' }}>Technology & SaaS Platforms</strong>
                        Cloud automation, SaaS operations, Custom AI workflows, Bootcamps.
                      </div>
                      <div>
                        <strong style={{ color: '#2C2D2B', display: 'block', fontSize: '0.875rem' }}>Sustainable Agriculture & Food</strong>
                        Trace-to-origin Kashmiri Saffron exports, handpicked flower crops.
                      </div>
                      <div>
                        <strong style={{ color: '#2C2D2B', display: 'block', fontSize: '0.875rem' }}>Consumer Preservation FMCG</strong>
                        Floral preserves, organic botanicals, biodegradable glass spreads.
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#ECEBE4',
                padding: '24px 8px',
                borderTop: '1px solid #C5C4BE',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                zIndex: 999,
                position: 'relative'
              }}
            >
              <button onClick={() => scrollTo('brands')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, color: '#2C2D2B', textAlign: 'left', letterSpacing: '0.05em' }}>PORTFOLIO</button>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 12, borderLeft: '1px solid #C5C4BE' }}>
                {BUSINESSES.map((b) => (
                  <button key={b.id} onClick={() => selectBusiness(b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#5A5D5A', textAlign: 'left' }}>
                    {b.name}
                  </button>
                ))}
              </div>
              <button onClick={() => scrollTo('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, color: '#2C2D2B', textAlign: 'left', letterSpacing: '0.05em' }}>INQUIRY</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO */}
      <section id="hero" style={{ padding: isMobile ? '80px 20px 60px' : '120px 24px 80px', position: 'relative', background: '#F5F5F0', borderBottom: '1px solid #C5C4BE', overflow: 'hidden' }}>
        <div className="glow-spot" style={{ top: '10%', left: '-10%' }} />
        <div className="glow-spot" style={{ bottom: '10%', right: '-10%' }} />

        <div className="container" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: isMobile ? 40 : 56, alignItems: 'center', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: isMobile ? 16 : 24 }}>
              <motion.span initial={{ width: 0 }} animate={{ width: 24 }} transition={{ delay: 0.2 }} style={{ height: 1, background: '#3F5E51' }} />
              <span style={{ color: '#3F5E51', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                Paidhu Group Enterprise
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '2.25rem' : 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#2C2D2B', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: isMobile ? 18 : 24 }}>
              Building Businesses That <br />
              <motion.span
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="gradient-sage-text"
                style={{ fontStyle: 'italic', fontWeight: 700, display: 'inline-block' }}
              >
                Inspire a Better Future
              </motion.span>
            </h1>

            <p style={{ color: '#5A5D5A', fontSize: isMobile ? '1rem' : '1.125rem', lineHeight: 1.7, maxWidth: 540, marginBottom: isMobile ? 28 : 40 }}>
              A diversified modern conglomerate branching out into ethical agriculture, gourmet preservation, SaaS technology, and certification academics.
            </p>

            <div style={{ display: 'flex', gap: 16 }}>
              <MagneticElement>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo('brands')} 
                  className="btn-sage-action"
                >
                  Explore Portfolio
                </motion.button>
              </MagneticElement>
              <MagneticElement>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo('contact')} 
                  className="btn-outline-sage"
                >
                  Get In Touch
                </motion.button>
              </MagneticElement>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ 
              transform: isMobile ? 'none' : `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
              transition: 'transform 0.4s ease-out'
            }}
          >
            <HeroSlideshow isMobile={isMobile} />
          </motion.div>
        </div>
      </section>

      {/* INFINITE SCROLLING TICKER */}
      <TickerBanner />

      {/* PORTFOLIO GRID WITH 3D PARALLAX CARDS */}
      <section id="brands" style={{ padding: isMobile ? '60px 20px' : '100px 24px', background: '#ECEBE4', borderBottom: '1px solid #C5C4BE' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
            <span style={{ color: '#3F5E51', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Subsidiaries</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 700, color: '#2C2D2B' }}>Group Brand Profiles</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}>
            {BUSINESSES.map((b, idx) => (
              <ParallaxCard key={idx}>
                <motion.div 
                  id={`brand-${b.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                  className="elegant-panel"
                  style={{ 
                    overflow: 'hidden', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    position: 'relative'
                  }}
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.03 }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, #3F5E51 0%, transparent 60%)', zIndex: 1, pointerEvents: 'none' }}
                  />

                  <div style={{ transformStyle: 'preserve-3d', zIndex: 2 }}>
                    <div style={{ height: 140, overflow: 'hidden', borderBottom: '1px solid #C5C4BE', position: 'relative', transformStyle: 'preserve-3d' }}>
                      <motion.img 
                        whileHover={{ scale: 1.06, translateZ: 20 }}
                        transition={{ duration: 0.4 }}
                        src={b.image} 
                        alt={b.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                    <div style={{ padding: 20, transformStyle: 'preserve-3d' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, transformStyle: 'preserve-3d' }}>
                        <motion.div 
                          whileHover={{ scale: 1.05, rotate: 4, translateZ: 30 }}
                          style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ECEBE4', border: '1px solid #C5C4BE', borderRadius: 8, padding: 6, flexShrink: 0 }}
                        >
                          <img src={b.logo} alt={b.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </motion.div>
                        <div>
                          <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#3F5E51', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 2 }}>{b.sector}</span>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#2C2D2B', margin: 0, fontFamily: 'var(--font-display)' }}>{b.name}</h3>
                        </div>
                      </div>
                      <p style={{ color: '#5A5D5A', fontSize: '0.8125rem', lineHeight: 1.5, margin: 0 }}>{b.description}</p>
                    </div>
                  </div>
                  <div style={{ padding: '0 20px 20px', transformStyle: 'preserve-3d', zIndex: 2 }}>
                    <motion.a 
                      whileHover={{ x: 4, translateZ: 15 }}
                      href={b.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#2C2D2B', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none' }}
                    >
                      Visit Website <span style={{ color: '#3F5E51' }}>→</span>
                    </motion.a>
                  </div>
                </motion.div>
              </ParallaxCard>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: isMobile ? '60px 20px' : '100px 24px', background: '#ECEBE4' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? 40 : 64, alignItems: 'start' }}>
          <div>
            <span style={{ color: '#3F5E51', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Corporate Inquiry</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 700, color: '#2C2D2B', marginBottom: 20 }}>Get In Touch</h2>
            <p style={{ color: '#5A5D5A', fontSize: '1rem', lineHeight: 1.7, marginBottom: 36 }}>
              Partner with Paidhu Group across agriculture exports, enterprise software services, retail distribution, or skill bootcamps.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: '0.875rem', color: '#5A5D5A', lineHeight: 1.6 }}>
              <div><strong>Global Headquarters:</strong><br />No 11 Saraswati Avenue, Achipatti, Pollachi – 642002, Tamil Nadu, India.</div>
              <div><strong>Phone:</strong> +91 87542 87774</div>
              <div><strong>Website:</strong> www.paidhu.com</div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ background: '#F5F5F0', border: '1px solid #C5C4BE', borderRadius: 20, padding: isMobile ? 24 : 36, boxShadow: '0 8px 32px rgba(63, 94, 81, 0.01)' }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '36px 0', color: '#3F5E51' }}
                >
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 8 }}>Inquiry Submitted</h3>
                  <p style={{ fontSize: '0.875rem', color: '#5A5D5A' }}>We will contact you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#2C2D2B', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Full Name</label>
                    <input type="text" required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: '12px', border: '1px solid #C5C4BE', background: '#F5F5F0', color: '#2C2D2B', borderRadius: 8, fontSize: '0.875rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#2C2D2B', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Email Address</label>
                    <input type="email" required placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '12px', border: '1px solid #C5C4BE', background: '#F5F5F0', color: '#2C2D2B', borderRadius: 8, fontSize: '0.875rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#2C2D2B', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>Message</label>
                    <textarea required rows={4} placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ width: '100%', padding: '12px', border: '1px solid #C5C4BE', background: '#F5F5F0', color: '#2C2D2B', borderRadius: 8, fontSize: '0.875rem', outline: 'none', resize: 'none' }} />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="btn-sage-action"
                  >
                    Submit Inquiry
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ marginTop: 'auto', background: '#ECEBE4', padding: '40px 24px', borderTop: '1px solid #C5C4BE', textAlign: 'center' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontSize: '0.75rem', color: '#5A5D5A', letterSpacing: '0.05em' }}>© {new Date().getFullYear()} Paidhu Group. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <span style={{ fontSize: '0.75rem', color: '#5A5D5A', cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ fontSize: '0.75rem', color: '#5A5D5A', cursor: 'pointer' }}>Terms of Use</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
