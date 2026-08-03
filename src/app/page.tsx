'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Search, 
  Globe, 
  X, 
  ChevronDown, 
  ArrowUpRight, 
  Check, 
  Menu, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Clock
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. DYNAMIC DOT GRID BACKGROUND (refined for luxury feel)
function DynamicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const spacing = 64;
    const dotRadius = 0.75;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid dots
      ctx.fillStyle = 'rgba(17, 17, 17, 0.03)';
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

// 2. DATASETS
const BUSINESSES = [
  {
    id: 'ethical-foods',
    name: 'Paidhu Ethical Foods',
    sector: 'FMCG & Sourcing',
    tagline: 'Empowering Saffron Sourcing & Organic Food Staples',
    description: 'Re-engineering Kashmir saffron farming through absolute vertical integration. We partner directly with local smallholder grower families to guarantee origin-traceable saffron, organic edible flowers, and zero-synthetic bloom cookies. Under this division, we power Floffi preserves with zero chemical stabilizers.',
    highlights: ['Edible Flowers & Saffron Flowers', 'Zero-Additive Bloom Cookies', 'Floffi Preserves Sourcing (floffi.in)', 'Direct Saffron Sourcing pipelines'],
    metrics: { value: 100, suffix: '+', label: 'Local Kashmir Farms' },
    link: 'https://www.paidhuethicalfoods.com/',
    image: '/paidhu_screen.png',
    cardTag: 'Heritage Sourcing',
    cardTitle: '2026 First Half Saffron Audits',
    cardAction: 'Access Saffron Reports'
  },
  {
    id: 'viyara',
    name: 'Viyara',
    sector: 'Technology & Software',
    tagline: 'Engineering Scalable Digital Infrastructure',
    description: 'Building the digital pipelines that scale tomorrow\'s web. Viyara delivers enterprise software architectures, custom high-performance website and mobile application development, scalable SaaS products, UI/UX systems, branding guidelines, and custom generative AI integrations.',
    highlights: ['Website & Custom Software Dev', 'Scalable SaaS Product Pipelines', 'Stripe-Level UI/UX and Branding', 'Generative AI Pipeline Integration'],
    metrics: { value: 99.9, suffix: '%', label: 'Platform Reliability' },
    link: 'https://viyara.co.in/',
    image: '/viyara_screen.png',
    cardTag: 'Digital Infrastructure',
    cardTitle: 'Scalable Enterprise Solutions',
    cardAction: 'Explore Tech Architecture'
  },
  {
    id: 'kaligar',
    name: 'Kaligasphere',
    sector: 'Education & Learning',
    tagline: 'Democratizing Advanced Technology Education',
    description: 'Democratizing tech education through immersive, project-driven learning. Kaligasphere operates a full-stack learning platform, professional certification courses, and software skill development ecosystems that directly bridge the gap between local talent and enterprise developer needs.',
    highlights: ['Immersive Learning Platform', 'Professional Tech Courses', 'Corporate Skill Development', 'Enterprise-Recognized Certs'],
    metrics: { value: 5000, suffix: '+', label: 'Graduates Trained' },
    link: 'https://www.kaligasphere.com/',
    image: '/kalika_screen.png',
    cardTag: 'Academic Innovation',
    cardTitle: '5,000 Certified Tech Professionals',
    cardAction: 'View Academic Ecosystem'
  },
];

const STORIES = [
  {
    id: 'story-1',
    title: "From Kashmir Soil to Global Pantries: The Saffron Revolution",
    category: "Sustainable Agriculture",
    date: "June 2026",
    description: "How Paidhu Ethical Foods bypassed intermediaries to bring origin-verified saffron to international markets, ensuring 100% of growers receive fair compensation.",
    image: "/paidhu_screen.png",
    featured: true
  },
  {
    id: 'story-2',
    title: "The Alchemy of Batch Fruit Sourcing",
    category: "Preservation",
    date: "May 2026",
    description: "Exploring Floffi's micro-preservation methods that use natural honey as a stabilizer instead of artificial preservatives.",
    image: "/floffi_screen.png",
    featured: false
  },
  {
    id: 'story-3',
    title: "Scaling Custom SaaS Pipelines: Viyara's Tech Architecture",
    category: "IT & Technology",
    date: "May 2026",
    description: "Deploying secure, high-performance cloud networks and custom generative AI automation pipelines to drive digital agility for modern global enterprises.",
    image: "/viyara_screen.png",
    featured: false
  },
  {
    id: 'story-4',
    title: "Bridging the Remote Engineering Gap",
    category: "IT Education",
    date: "April 2026",
    description: "How Kaligasphere and Viyara cooperate to train developers in small-town municipalities and deploy them into global software pipelines.",
    image: "/kalika_screen.png",
    featured: false
  }
];

const PARTNERS = [
  "Himalayan Saffron Board",
  "National Organic Certification Authority",
  "Vercel Enterprise Network",
  "AWS Cloud Partner Labs",
  "National Skill Development Council",
  "Pampore Agrarian Cooperative"
];

const NEWS_ITEMS = [
  {
    title: "Paidhu Ethical Foods Completes 100% Saffron Traceability Audit",
    source: "Corporate Press",
    date: "July 28, 2026",
    excerpt: "Paidhu announced complete logistics validation, proving origin traceability from individual grower plots in Pampore to export shipment packing."
  },
  {
    title: "Viyara Deploys Automated Generative AI Models for Supply Chains",
    source: "Tech Insights",
    date: "July 15, 2026",
    excerpt: "New AI pipeline integration allows enterprise client networks to monitor inventory, automate order flows, and optimize routing dynamically."
  },
  {
    title: "Kaligasphere Fosters 5,000 Certified Tech Graduates",
    source: "Academic Review",
    date: "June 30, 2026",
    excerpt: "The technology academy celebrated its graduation milestone, marking an industry-leading 92% placement rate across global software ecosystems."
  }
];

export default function Page() {
  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', country: '', industry: '', message: '' });
  const [sent, setSent] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('EN');
  
  // Responsive Check
  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  // Sync scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial fade in triggers using GSAP ScrollTrigger
    const fadeElements = document.querySelectorAll('.scroll-fade-in');
    fadeElements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    const dividerLines = document.querySelectorAll('.scroll-line-draw');
    dividerLines.forEach((el) => {
      gsap.fromTo(el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power4.inOut',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Hero slideshow auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % BUSINESSES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ company: '', name: '', email: '', phone: '', country: '', industry: '', message: '' });
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full bg-white text-charcoal font-sans min-h-screen flex flex-col relative overflow-x-hidden selection:bg-[#111111] selection:text-white">
      
      {/* Background Canvas Particles */}
      <DynamicCanvas />

      {/* ── LVMH ACCESSIBILITY TOP BAR ── */}
      <div className="w-full bg-white border-b border-gray-100 py-2.5 px-6 md:px-12 flex justify-between items-center text-[10px] tracking-[0.2em] font-semibold text-gray-500 z-110 relative select-none">
        <a href="#accessibility" className="hover:text-black transition-colors uppercase">
          Accessibility
        </a>
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline-block text-[#3F5E51]">
            PAIDHU GROUP +1.24%
          </span>
          <button onClick={() => scrollTo('maisons')} className="hover:text-black transition-colors uppercase focus:outline-none">
            Maisons
          </button>
          <button onClick={() => scrollTo('investors')} className="hover:text-black transition-colors uppercase focus:outline-none">
            Investors
          </button>
          <button onClick={() => scrollTo('chairman')} className="hover:text-black transition-colors uppercase focus:outline-none">
            Leadership
          </button>
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition-colors">
            <span>{language}</span>
            <ChevronDown className="w-3 h-3" />
            <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-md rounded overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-[10px] min-w-[60px] text-left">
              {['EN', 'FR', 'ES'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="w-full px-3 py-1.5 hover:bg-gray-50 text-left font-semibold border-none bg-transparent"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN FLOATING NAVIGATION BAR ── */}
      <header 
        style={{
          position: 'fixed',
          top: '35px',
          left: 0,
          right: 0,
          zIndex: 100,
          background: headerScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: headerScrolled ? 'blur(10px)' : 'none',
          borderBottom: headerScrolled ? '1px solid #E5E5E5' : '1px solid transparent',
          padding: headerScrolled ? '16px 24px' : '28px 48px',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div 
          className="flex items-center justify-between relative w-full"
          style={{ maxWidth: '1440px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {/* Left: Combined Menu & Search Bar */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-3 px-4 py-2 border border-gray-200/20 bg-white/10 backdrop-blur-sm rounded-none hover:bg-white hover:border-black transition-all cursor-pointer group focus:outline-none"
              style={{
                borderColor: headerScrolled ? '#E5E5E5' : 'rgba(255,255,255,0.2)',
                backgroundColor: headerScrolled ? 'transparent' : 'rgba(255,255,255,0.1)'
              }}
            >
              <div className="flex flex-col gap-1 w-4">
                <span className="h-0.5 w-full bg-white group-hover:bg-black transition-colors" style={{ backgroundColor: headerScrolled ? '#111111' : '#FFFFFF' }} />
                <span className="h-0.5 w-full bg-white group-hover:bg-black transition-colors" style={{ backgroundColor: headerScrolled ? '#111111' : '#FFFFFF' }} />
              </div>
              <span 
                className="text-[10px] tracking-[0.2em] font-semibold uppercase group-hover:text-black transition-colors"
                style={{ color: headerScrolled ? '#111111' : '#FFFFFF' }}
              >
                Menu
              </span>
            </button>

            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-none border border-gray-200/20 bg-white/10 hover:bg-white hover:border-black hover:text-black transition-all cursor-pointer focus:outline-none"
              style={{
                borderColor: headerScrolled ? '#E5E5E5' : 'rgba(255,255,255,0.2)',
                backgroundColor: headerScrolled ? 'transparent' : 'rgba(255,255,255,0.1)',
                color: headerScrolled ? '#111111' : '#FFFFFF'
              }}
              aria-label="Search site"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Paidhu Exact Logo */}
          <button 
            onClick={() => scrollTo('hero')} 
            className="focus:outline-none cursor-pointer border-none bg-transparent outline-none text-right flex items-center justify-end"
          >
            <div className="overflow-hidden h-10 md:h-12 flex items-center justify-end">
              <img 
                src="/paidhu_logo_new.png" 
                alt="Paidhu Logo" 
                className="h-28 md:h-32 w-auto object-contain transition-all duration-300"
                style={{
                  filter: headerScrolled ? 'invert(1)' : 'none',
                  margin: '-12px 0'
                }}
              />
            </div>
          </button>
        </div>

        {/* LVMH-Style Slide-In Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black z-190"
              />
              {/* Drawer Content */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="fixed top-0 left-0 bottom-0 w-full sm:w-[420px] bg-white z-200 shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-gray-100"
              >
                {/* Drawer Header */}
                <div className="flex justify-between items-center py-5 px-8 border-b border-gray-200/60">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-black hover:opacity-75 transition-opacity cursor-pointer border-none bg-transparent focus:outline-none"
                  >
                    <X className="w-5 h-5 font-light" />
                    <span className="text-[10px] tracking-[0.25em] font-semibold uppercase">Close</span>
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setSearchOpen(true); }}
                    className="p-2 text-black hover:opacity-75 transition-opacity cursor-pointer border-none bg-transparent focus:outline-none"
                  >
                    <Search className="w-4 h-4 font-light" />
                  </button>
                </div>

                {/* Main Large Serif Menu Links */}
                <div className="flex flex-col gap-6 py-12 px-10 text-left">
                  {[
                    { label: 'Group', target: 'highlights' },
                    { label: 'Commitments', target: 'chairman' },
                    { label: 'Maisons', target: 'maisons' },
                    { label: 'Join Us', target: 'contact' },
                    { label: 'Dream Machine', target: 'hero' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollTo(item.target);
                      }}
                      className="font-serif text-[26px] font-light text-black tracking-[0.08em] hover:text-gray-400 transition-colors uppercase text-left border-none bg-transparent cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Accent Callout Row (Les Journées Particulières / Sourcing Audits) */}
                <div className="border-t border-b border-gray-200/50 bg-[#FBF9F6]">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollTo('highlights');
                    }}
                    className="w-full flex justify-between items-center py-5 px-10 text-left text-[9px] tracking-[0.25em] font-semibold text-black uppercase hover:bg-gray-50 transition-colors border-none bg-transparent cursor-pointer"
                  >
                    <span>Les Journées Particulières</span>
                    <ChevronRight className="w-4 h-4 text-black font-light" />
                  </button>
                </div>

                {/* Lower Secondary Links */}
                <div className="flex flex-col gap-4.5 py-8 px-10 text-left">
                  {[
                    { label: 'Investors', target: 'investors' },
                    { label: 'Press', target: 'highlights' },
                    { label: 'Startups & Tech Partners', target: 'maisons' },
                    { label: 'Suppliers', target: 'contact' },
                    { label: 'Candidate Portal', target: 'contact' }
                  ].map((subLink) => (
                    <button
                      key={subLink.label}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollTo(subLink.target);
                      }}
                      className="text-[9px] font-bold tracking-[0.2em] text-gray-400 hover:text-black transition-colors uppercase text-left border-none bg-transparent cursor-pointer"
                    >
                      {subLink.label}
                    </button>
                  ))}
                </div>

                {/* Social Network Section (2 rows of custom monochrome icons) */}
                <div className="py-8 border-t border-gray-200/50 flex flex-col items-center gap-6 bg-[#FFFFFF]">
                  {/* Row 1: Facebook, Instagram, YouTube, Pinterest */}
                  <div className="flex justify-center gap-7 items-center text-black">
                    {/* Facebook */}
                    <a href="#facebook" className="hover:opacity-60 transition-opacity" aria-label="Facebook">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                    {/* Instagram */}
                    <a href="#instagram" className="hover:opacity-60 transition-opacity" aria-label="Instagram">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </a>
                    {/* YouTube */}
                    <a href="#youtube" className="hover:opacity-60 transition-opacity" aria-label="YouTube">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    {/* Pinterest */}
                    <a href="#pinterest" className="hover:opacity-60 transition-opacity" aria-label="Pinterest">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.162 0 7.397 2.967 7.397 6.93 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>

                  {/* Row 2: LinkedIn, X, TikTok */}
                  <div className="flex justify-center gap-7 items-center text-black">
                    {/* LinkedIn */}
                    <a href="#linkedin" className="hover:opacity-60 transition-opacity" aria-label="LinkedIn">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    {/* X */}
                    <a href="#x" className="hover:opacity-60 transition-opacity" aria-label="X">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    {/* TikTok */}
                    <a href="#tiktok" className="hover:opacity-60 transition-opacity" aria-label="TikTok">
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.39-.33-.24-.63-.51-.9-.8-.06 2.68-.02 5.37-.04 8.05-.04 2.44-.72 4.87-2.2 6.78-1.89 2.43-5.07 3.75-8.1 3.22-3.1-.53-5.83-2.87-6.73-5.89-.98-3.3.17-7.14 2.91-9.17 1.71-1.27 3.86-1.78 5.96-1.45v4.08c-1.13-.34-2.37-.18-3.37.47-1.16.76-1.73 2.19-1.5 3.56.22 1.34 1.25 2.5 2.58 2.76 1.48.29 3.09-.43 3.69-1.84.22-.52.28-1.1.27-1.66-.03-4.83-.02-9.66-.02-14.49z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 bg-white flex flex-col p-6 md:p-24"
          >
            <div className="w-full flex justify-between items-center mb-16 px-6 md:px-12" style={{ maxWidth: '1440px', marginLeft: 'auto', marginRight: 'auto' }}>
              <span className="font-serif text-xl tracking-[0.2em] font-light text-black">PAIDHU SEARCH</span>
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-3 border border-gray-200 rounded-full text-black hover:border-black transition-colors cursor-pointer bg-transparent focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="w-full flex-grow flex flex-col justify-center px-6 md:px-12" style={{ maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
              <input
                type="text"
                autoFocus
                placeholder="Search Paidhu Group..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-gray-300 py-6 text-2xl md:text-5xl text-black font-serif font-light focus:outline-none focus:border-black transition-colors placeholder-gray-300"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LVMH-STYLE HERO CAROUSEL ── */}
      <section 
        id="hero" 
        className="w-full relative h-[94vh] flex items-center justify-center bg-gray-900 text-white overflow-hidden"
      >
        {/* Slides */}
        <div className="absolute inset-0 z-0 bg-[#0f1110]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.72 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${BUSINESSES[activeSlide].image})`,
                backgroundPosition: 'center 20%',
              }}
            />
          </AnimatePresence>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />
        </div>

        {/* Vertical Slide Controls */}
        <button 
          onClick={() => setActiveSlide((prev) => (prev - 1 + BUSINESSES.length) % BUSINESSES.length)}
          className="absolute left-0 top-0 bottom-0 w-16 bg-black/5 hover:bg-black/15 flex items-center justify-center text-white border-none cursor-pointer transition-colors z-20 focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-8 h-8 font-light" />
        </button>

        <button 
          onClick={() => setActiveSlide((prev) => (prev + 1) % BUSINESSES.length)}
          className="absolute right-0 top-0 bottom-0 w-16 bg-black/5 hover:bg-black/15 flex items-center justify-center text-white border-none cursor-pointer transition-colors z-20 focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-8 h-8 font-light" />
        </button>

        {/* Signature Centered White Card Overlay */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-[650px] bg-white border border-gray-100 shadow-xl py-10 px-8 text-center scroll-fade-in">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C79B36] block mb-3 font-mono">
            {BUSINESSES[activeSlide].cardTag}
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-light text-black tracking-[0.08em] uppercase leading-tight mb-5">
            {BUSINESSES[activeSlide].cardTitle}
          </h2>
          <div className="w-12 h-[1px] bg-gray-200 mx-auto mb-5" />
          <button 
            onClick={() => scrollTo(`brand-${BUSINESSES[activeSlide].id}`)}
            className="font-serif text-[11px] uppercase tracking-[0.2em] font-semibold text-black hover:opacity-70 transition-opacity border-b border-black pb-0.5 bg-transparent cursor-pointer"
          >
            {BUSINESSES[activeSlide].cardAction}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {BUSINESSES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className="w-1.5 h-1.5 rounded-full transition-all focus:outline-none border-none cursor-pointer"
              style={{
                backgroundColor: activeSlide === idx ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                transform: activeSlide === idx ? 'scale(1.3)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      </section>

      {/* ── 3. GROUP HIGHLIGHTS (Clean Editorial Grid with thin borders) ── */}
      <section 
        id="highlights" 
        className="w-full bg-[#FCFAF6] py-28 flex flex-col items-center relative z-10 text-left"
      >
        <div 
          className="w-full px-6 md:px-12 flex flex-col gap-12"
          style={{ maxWidth: '1440px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {/* Header Block */}
          <div className="text-center max-w-[800px] mx-auto mb-6 scroll-fade-in">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 block mb-3 font-mono">
              Corporate Ledger
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-black tracking-[0.1em] uppercase leading-tight">
              Group Editorial Highlights
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C79B36] mx-auto mt-6" />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200/60 items-stretch">
            {STORIES.map((story) => (
              <div 
                key={story.id} 
                className="group flex flex-col justify-between overflow-hidden bg-white border-r border-b border-gray-200/60 hover:shadow-lg transition-all duration-500 relative scroll-fade-in"
              >
                <div>
                  <div className="relative overflow-hidden w-full aspect-[4/3] bg-gray-50">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-103"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#C79B36] block mb-2 font-mono">
                      {story.category}
                    </span>
                    <h3 className="font-serif text-xl font-light text-black leading-snug tracking-wide group-hover:text-gray-600 transition-colors uppercase">
                      {story.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-4 leading-relaxed font-sans line-clamp-3">
                      {story.description}
                    </p>
                  </div>
                </div>
                <div className="p-8 pt-0 flex justify-between items-center text-[10px] font-bold tracking-wider font-mono text-gray-400">
                  <span>{story.date}</span>
                  <button 
                    onClick={() => scrollTo('contact')}
                    className="text-black hover:text-[#C79B36] flex items-center gap-1.5 transition-colors border-none bg-transparent uppercase focus:outline-none"
                  >
                    View
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. THE MAISONS / GROUP PORTFOLIO ── */}
      <section 
        id="maisons" 
        className="w-full py-28 bg-white flex justify-center text-left border-t border-gray-100"
      >
        <div 
          className="w-full px-6 md:px-12 flex flex-col gap-16"
          style={{ maxWidth: '1440px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div className="text-center scroll-fade-in">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 block mb-3 font-mono">
              Division Sectors
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-black tracking-[0.1em] uppercase leading-tight">
              The Houses of Paidhu
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto mt-4 font-sans leading-relaxed">
              Diversified conglomerates focused on direct agricultural logistics, enterprise cloud technology, and academic placement ecosystems.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {BUSINESSES.map((b, idx) => (
              <div 
                key={b.id} 
                id={`brand-${b.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''} scroll-fade-in`}
              >
                {/* Visual Cover */}
                <div className={`lg:col-span-7 overflow-hidden relative border border-gray-100 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden aspect-[16/10] bg-gray-50 group">
                    <img 
                      src={b.image} 
                      alt={b.name} 
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-102"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="lg:col-span-5 flex flex-col justify-center text-left">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C79B36] block mb-3 font-mono">
                    {b.sector}
                  </span>
                  <h3 className="font-serif text-2xl md:text-4xl font-light text-black tracking-[0.08em] uppercase mb-6">
                    {b.name}
                  </h3>
                  <div className="w-10 h-[1px] bg-gray-200 mb-6" />
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 font-sans">
                    {b.description}
                  </p>

                  <div className="flex flex-col gap-3.5 mb-8 text-xs font-medium text-gray-500 font-sans">
                    {b.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C79B36] shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-4 mb-8">
                    <span className="font-serif text-5xl font-light text-[#C79B36] tracking-tight">
                      {b.metrics.value}{b.metrics.suffix}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                      {b.metrics.label}
                    </span>
                  </div>

                  <a 
                    href={b.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-sage-action py-3.5 text-center self-start"
                  >
                    Enter House Portal
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 6. LEADERSHIP EDITORIAL SPREAD ── */}
      <section
        id="chairman"
        className="w-full py-36 bg-white flex justify-center text-left relative z-10"
      >
        <div 
          className="w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
          style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {/* Left Column: Portrait & Title */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center scroll-fade-in lg:border-r lg:border-gray-100 lg:pr-12">
            <div className="relative p-2.5 border border-[#B08D57]/40 bg-[#FCFAF6] shadow-xl rounded-full max-w-[250px] w-full aspect-square mb-6">
              <div className="w-full h-full overflow-hidden rounded-full bg-gray-100 relative">
                <img
                  src="/WhatsApp Image 2026-08-03 at 5.59.24 PM.jpeg"
                  alt="Ragapriya Karunakaran"
                  className="w-full h-full object-cover object-[50%_15%] transition-transform duration-700 hover:scale-102"
                />
              </div>
            </div>
            
            <h3 className="font-serif text-2xl font-semibold text-black tracking-wide leading-tight">
              Ragapriya Karunakaran
            </h3>
            <p className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#B08D57] mt-2 font-mono">
              Founder &amp; CEO, Paidhu Group
            </p>
            
            {/* Optional Signature Style Element */}
            <div className="mt-6 border-t border-gray-100 pt-4 w-24">
              <span className="font-serif text-xs italic text-gray-400">Ragapriya K.</span>
            </div>
          </div>

          {/* Right Column: Editorial Message */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left scroll-fade-in max-w-[650px]">
            
            <p className="font-serif text-xl md:text-2xl text-gray-800 italic leading-relaxed mb-8 font-light">
              "As the Founder of Paidhu, I am driven by a vision to redefine the way generations experience floral-based foods through authenticity, purity, and innovation."
            </p>

            <div className="flex flex-col gap-6 text-sm text-gray-600 leading-relaxed mb-8 font-sans">
              <p>
                Building a brand founded on ethical sourcing, absolute transparency, and mutual trust is at the core of our operations. By establishing direct-from-grower supply structures in Kashmir and connecting regional engineering talent with global software deployments, we foster purposeful development that empowers health and bridges industrial gaps.
              </p>
              <p>
                Through Paidhu Ethical Foods, Viyara, and Kaligasphere, our houses work in tandem to align sustainable agriculture, custom SaaS technologies, and professional learning systems under one cohesive mission of global impact.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {['Ethical Sourcing', 'Innovation', 'Sustainability', 'Global Technology', 'Agriculture', 'Transparency'].map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] uppercase font-bold tracking-widest text-gray-600 font-mono py-2 px-4 border border-gray-200/80 rounded-full bg-[#F9F7F2]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. INQUIRY PORTAL (Contact Form) ── */}
      <section id="contact" className="w-full py-36 bg-[#F9F7F2] relative z-10 flex justify-center border-t border-b border-gray-200/40">
        <div 
          className="w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start text-left"
          style={{ maxWidth: '1440px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {/* Left Side: Cards and Info */}
          <div className="lg:col-span-6 flex flex-col gap-8 scroll-fade-in">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-[#B08D57] block mb-3 font-mono">Inquiry Portal</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-black tracking-[0.08em] uppercase mb-6 leading-tight">Partner With Our Houses</h2>
              <p className="text-sm text-gray-500 leading-relaxed font-sans max-w-lg">
                We welcome sourcing partners, institutional buyers, software collaborations and strategic business partnerships.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-w-lg">
              {/* Card 1: Headquarters */}
              <div className="p-6 bg-[#FCFAF6] border border-[#B08D57]/20 rounded-[12px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-350 flex gap-4">
                <MapPin className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-xs font-semibold text-black uppercase tracking-wider mb-2">Headquarters</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    No.11 Saraswati Avenue,<br />
                    Achipatti,<br />
                    Pollachi - 642002
                  </p>
                </div>
              </div>

              {/* Card 2: Corporate Relations */}
              <div className="p-6 bg-[#FCFAF6] border border-[#B08D57]/20 rounded-[12px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-350 flex gap-4">
                <Phone className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-xs font-semibold text-black uppercase tracking-wider mb-2">Corporate Relations</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    +91 87542 87774
                  </p>
                </div>
              </div>

              {/* Card 3: Business Hours */}
              <div className="p-6 bg-[#FCFAF6] border border-[#B08D57]/20 rounded-[12px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-350 flex gap-4 sm:col-span-2 lg:col-span-1">
                <Clock className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-xs font-semibold text-black uppercase tracking-wider mb-2">Business Hours</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Inquiry Form */}
          <div className="lg:col-span-6 w-full scroll-fade-in">
            <div className="bg-white border border-gray-100 p-8 md:p-10 shadow-lg rounded-[12px]">
              <div className="mb-8">
                <h3 className="font-serif text-xl font-semibold text-black uppercase tracking-wide">Business Inquiry</h3>
                <p className="text-xs text-gray-400 mt-1">We will connect with you within 24 hours.</p>
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center text-black flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full border border-[#B08D57] flex items-center justify-center mb-6">
                      <Check className="w-5 h-5 text-[#B08D57]" />
                    </div>
                    <h3 className="font-serif text-lg uppercase tracking-wider mb-2">Request Successfully Logged</h3>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                      Your query has been logged. An executive secretary will verify origin details and contact you within 24 operational hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-mono">Company / Organization</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Alexis Saffron S.A." 
                          value={form.company} 
                          onChange={(e) => setForm({ ...form, company: e.target.value })} 
                          className="w-full bg-[#FCFAF6] border border-gray-200 px-4 py-2.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#B08D57] transition-all font-sans rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-mono">Contact Person</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Jean Dupont" 
                          value={form.name} 
                          onChange={(e) => setForm({ ...form, name: e.target.value })} 
                          className="w-full bg-[#FCFAF6] border border-gray-200 px-4 py-2.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#B08D57] transition-all font-sans rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-mono">Business Email</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="partner@company.com" 
                          value={form.email} 
                          onChange={(e) => setForm({ ...form, email: e.target.value })} 
                          className="w-full bg-[#FCFAF6] border border-gray-200 px-4 py-2.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#B08D57] transition-all font-sans rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-mono">Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="e.g. +33 1 23 45 67 89" 
                          value={form.phone} 
                          onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                          className="w-full bg-[#FCFAF6] border border-gray-200 px-4 py-2.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#B08D57] transition-all font-sans rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-mono">Country</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. France" 
                          value={form.country} 
                          onChange={(e) => setForm({ ...form, country: e.target.value })} 
                          className="w-full bg-[#FCFAF6] border border-gray-200 px-4 py-2.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#B08D57] transition-all font-sans rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-mono">Industry</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. FMCG / Technology / Retail" 
                          value={form.industry} 
                          onChange={(e) => setForm({ ...form, industry: e.target.value })} 
                          className="w-full bg-[#FCFAF6] border border-gray-200 px-4 py-2.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#B08D57] transition-all font-sans rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-2 font-mono">Message</label>
                      <textarea 
                        required 
                        rows={4} 
                        placeholder="Detail sourcing directives, volume requirements, or technical platforms here..." 
                        value={form.message} 
                        onChange={(e) => setForm({ ...form, message: e.target.value })} 
                        className="w-full bg-[#FCFAF6] border border-gray-200 px-4 py-2.5 text-xs text-black placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#B08D57] transition-all font-sans resize-none rounded-lg"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-4 text-xs font-bold tracking-[0.2em] bg-black text-white hover:bg-[#B08D57] hover:text-white transition-all duration-350 cursor-pointer focus:outline-none uppercase font-mono rounded-lg border-none"
                    >
                      Submit Business Inquiry
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. LUXURY MULTI-COLUMN FOOTER ── */}
      <footer className="w-full bg-[#FCFAF6] text-charcoal pt-28 pb-28 z-10 relative flex justify-center border-t border-gray-100 text-left">
        <div 
          className="w-full px-6 md:px-12"
          style={{ maxWidth: '1440px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pb-20 border-b border-gray-200/60">
            <div className="col-span-12 md:col-span-4 flex flex-col gap-5">
              <div className="overflow-hidden h-12 md:h-14 flex items-center mb-2">
                <img 
                  src="/paidhu_logo_new.png" 
                  alt="Paidhu Group" 
                  className="h-32 md:h-36 w-auto object-contain select-none" 
                  style={{ 
                    filter: 'invert(1)',
                    margin: '-15px 0'
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm font-sans">
                A multi-industry conglomerate directing trace-to-origin saffron pipelines, chemical-free food preservation systems, custom cloud software architectures, and educational platforms.
              </p>
              
              <div className="flex gap-5">
                {['LinkedIn', 'Instagram', 'Twitter'].map((social, i) => (
                  <button 
                    key={i} 
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors cursor-pointer focus:outline-none border-none bg-transparent"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-6 md:col-span-3 font-sans">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C79B36] block mb-5 font-mono">Maisons Portfolios</span>
              <div className="flex flex-col gap-3">
                {BUSINESSES.map((b) => (
                  <button 
                    key={b.id} 
                    onClick={() => scrollTo(`brand-${b.id}`)}
                    className="text-xs text-gray-400 hover:text-black transition-colors block text-left border-none bg-transparent"
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-6 md:col-span-2 font-sans">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C79B36] block mb-5 font-mono">Sectors</span>
              <div className="flex flex-col gap-3 text-xs text-gray-400">
                <span>Direct Agriculture</span>
                <span>Organic Preserves</span>
                <span>IT Infrastructure</span>
                <span>Academics & Training</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-3 font-sans">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C79B36] block mb-5 font-mono">Corporate Dispatch</span>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Subscribe to receive annual audit sheets, origin reports, and vertical allocations.
              </p>
              
              <form onSubmit={(e) => { e.preventDefault(); alert("Successfully subscribed!"); }} className="flex gap-2">
                <input 
                  type="email" 
                  required
                  placeholder="Enter email address" 
                  className="bg-white border border-gray-200 px-3 py-2 text-xs w-full text-black focus:outline-none focus:border-black placeholder-gray-300 font-mono"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-black text-white text-[10px] uppercase font-bold tracking-widest hover:bg-black/95 transition-colors cursor-pointer border-none font-mono"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-gray-400 font-sans text-[10px]">
            <span>
              © {new Date().getFullYear()} Paidhu Group. All rights reserved. Registered Indian Conglomerate.
            </span>
            
            <div className="flex gap-6 uppercase tracking-wider font-semibold">
              <span className="hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-black cursor-pointer transition-colors">Terms of Sourcing</span>
              <span className="hover:text-black cursor-pointer transition-colors">Annual Audits</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
