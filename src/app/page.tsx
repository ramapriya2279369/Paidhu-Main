'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Sun, Moon, Search, Globe, ChevronRight, ArrowUpRight, 
  Leaf, Cpu, ShieldCheck, TrendingUp, Mail, Phone, MapPin, 
  ArrowRight, Award, Compass, RefreshCw, Send, CheckCircle2
} from 'lucide-react';


// Define structures for business verticals
interface BusinessVertical {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  image: string;
  logo: string;
  brandColor: string;
  subBrands: string[];
  features: string[];
  ctaText: string;
  ctaUrl: string;
}

// Reusable ScrollReveal Animation Component
const ScrollReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up' 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up': return 'translate-y-8';
      case 'down': return '-translate-y-8';
      case 'left': return 'translate-x-8';
      case 'right': return '-translate-x-8';
      case 'none': return '';
    }
  };

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0' 
          : `opacity-0 ${getDirectionClass()}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('EN');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  // Contact form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Stats Counters
  const [brandsCount, setBrandsCount] = useState(0);
  const [industriesCount, setIndustriesCount] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);

  // Refs for tracking sections in viewport
  const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    businesses: useRef<HTMLDivElement>(null),
    brands: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
    whyus: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Handle intersection observer to update active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Theme Toggle Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Counters Effect when activeSection is 'about'
  useEffect(() => {
    if (activeSection === 'about') {
      const duration = 2000;
      const steps = 50;
      const stepTime = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        setBrandsCount(Math.min(Math.floor((4 / steps) * step), 4));
        setIndustriesCount(Math.min(Math.floor((3 / steps) * step), 3));
        setSatisfaction(Math.min(Math.floor((100 / steps) * step), 100));

        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  const businessVerticals: BusinessVertical[] = [
    {
      id: 'foods',
      name: 'Paidhu Ethical Foods',
      tagline: 'Naturally Crafting Floral and Botanical Goodness.',
      desc: 'Discover premium quality organic edible flowers, organic saffron, and handcrafted floral jams. Sourced directly from local organic farms to enhance culinary and wellness experiences.',
      image: '/paidhu_screen.png',
      logo: '/paidhu_logo.png',
      brandColor: '#522742',
      subBrands: ['Edible Flowers', 'Bloom Cookies', 'Premium Saffron'],
      features: ['Sustainable Sourcing', 'Organic Local Farming', 'Handcrafted Floral Jams'],
      ctaText: 'Visit Paidhu Ethical Foods',
      ctaUrl: 'https://www.paidhuethicalfoods.com/',
    },
    {
      id: 'floffi',
      name: 'Floffi',
      tagline: 'Naturally Crafted Floral Goodness.',
      desc: 'Pure sweetness, crafted from nature. Bringing premium fruit jams, low-sugar fruit spreads, and natural preserves to elevate daily breakfast essentials.',
      image: '/floffi_screen.png',
      logo: 'https://floffi.in/floffi_logo.png',
      brandColor: '#E2583E',
      subBrands: ['Jams', 'Fruit Spreads', 'Preserves'],
      features: ['Naturally Sourced', 'Zero Artificial Preservatives', 'Breakfast Essentials'],
      ctaText: 'Visit Floffi',
      ctaUrl: 'https://floffi.in/',
    },
    {
      id: 'viyara',
      name: 'Viyara',
      tagline: 'Digital Curation & Engineering.',
      desc: 'VIYARA Marketing Solutions engineers world-class enterprise software and curates premium brand experiences for a market-leading digital presence.',
      image: '/viyara_screen.png',
      logo: 'https://viyara.co.in/logo-badge-blue.png',
      brandColor: '#162436',
      subBrands: ['AI & SaaS', 'UI/UX Design', 'Cloud Solutions'],
      features: ['Enterprise Software', 'Brand Experiences', 'Digital Presence Curation'],
      ctaText: 'Visit Viyara',
      ctaUrl: 'https://viyara.co.in/',
    },
    {
      id: 'kalika',
      name: 'Kalika Sphere',
      tagline: 'Empowering Future Skills and Learning.',
      desc: 'Innovative EdTech platform delivering modern professional courses, digital learning certificates, and tailored corporate technology training.',
      image: '/kalika_screen.png',
      logo: 'https://www.kalikasphere.com/assets/logo-Drzuq4t7.png',
      brandColor: '#06B6D4',
      subBrands: ['Tech Seminars', 'Corporate Training', 'Career Coaching'],
      features: ['Professional Certificates', 'Technology Seminars', 'Skill Development'],
      ctaText: 'Visit Kalika Sphere',
      ctaUrl: 'https://www.kalikasphere.com/',
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#F8F6F2] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#F8F6F2] transition-colors duration-300">
      
      {/* Sticky Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass border-b border-gray-200/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('home')}>
            <img
              src="/ChatGPT Image Aug 1, 2026, 08_30_36 PM.png"
              alt="Paidhu"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              style={{ filter: 'invert(1)', opacity: 0.95 }}
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 font-button text-sm tracking-wide font-medium">
            {Object.keys(sectionRefs).map((key) => {
              const label = key.charAt(0).toUpperCase() + key.slice(1);
              const isSelected = activeSection === key;
              if (key === 'businesses') {
                return (
                  <div
                    key={key}
                    className="relative py-2"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <button
                      onClick={() => {
                        scrollToSection(key);
                        setMegaMenuOpen(false);
                      }}
                      className={`relative py-1 transition-colors duration-300 text-xs uppercase tracking-wider ${
                        isSelected || megaMenuOpen
                          ? 'text-accent-gold font-semibold' 
                          : 'opacity-70 hover:opacity-100 hover:text-primary dark:hover:text-white'
                      }`}
                    >
                      {label}
                      {(isSelected || megaMenuOpen) && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold rounded-full transition-transform duration-300" />
                      )}
                    </button>
                  </div>
                );
              }
              return (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`relative py-2 transition-colors duration-300 text-xs uppercase tracking-wider ${
                    isSelected 
                      ? 'text-accent-gold font-semibold' 
                      : 'opacity-70 hover:opacity-100 hover:text-primary dark:hover:text-white'
                  }`}
                >
                  {label === 'Whyus' ? 'Why Choose Us' : label}
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold rounded-full transition-transform duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Interactive Utilities */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Search Icon */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="opacity-75 hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-200/20"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-primary dark:text-white" />
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-xs tracking-wider opacity-75 hover:opacity-100 uppercase"
              >
                <Globe className="w-3.5 h-3.5" />
                {language}
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-28 bg-[#FFFFFF] dark:bg-dark border border-gray-200/20 rounded-xl shadow-xl z-50 text-xs">
                  {['EN', 'ES', 'FR'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-accent-gold/10 hover:text-accent-gold"
                    >
                      {lang === 'EN' ? 'English' : lang === 'ES' ? 'Español' : 'Français'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200/20 transition-all opacity-75 hover:opacity-100"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-accent-gold" /> : <Moon className="w-4 h-4 text-primary" />}
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200/20"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-accent-gold" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-200/20"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mega Dropdown Menu */}
        {megaMenuOpen && (
          <div 
            className="absolute top-20 left-0 right-0 w-full bg-[#1A1A1A] border-t border-white/10 text-white z-40 transition-all duration-300 shadow-2xl py-12"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
              {/* Left Column: Business Overview & Brands */}
              <div className="col-span-4 border-r border-white/10 pr-8 space-y-8">
                <div>
                  <h3 className="text-xl font-serif font-light mb-2 text-white">Business Overview</h3>
                  <button 
                    onClick={() => { scrollToSection('about'); setMegaMenuOpen(false); }}
                    className="text-xs uppercase tracking-wider text-accent-gold hover:text-white transition-colors flex items-center gap-1 font-button"
                  >
                    Learn more <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-light mb-2 text-white">Our Brands</h3>
                  <button 
                    onClick={() => { scrollToSection('brands'); setMegaMenuOpen(false); }}
                    className="text-xs uppercase tracking-wider text-accent-gold hover:text-white transition-colors flex items-center gap-1 font-button"
                  >
                    Browse select Paidhu brands <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Right Column: Business Verticals */}
              <div className="col-span-8 pl-8">
                <h3 className="text-xs uppercase tracking-widest text-accent-gold font-semibold mb-6">Business Verticals</h3>
                <div className="grid grid-cols-3 gap-8">
                  {/* Vertical 1 */}
                  <div>
                    <h4 className="font-serif text-sm font-semibold mb-3 border-b border-white/5 pb-2 text-white/90">Agri & Food</h4>
                    <ul className="space-y-2 text-xs text-white/70">
                      <li>
                        <a 
                          href="https://www.paidhuethicalfoods.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-accent-gold transition-colors block"
                        >
                          Paidhu Ethical Foods
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://floffi.in/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-accent-gold transition-colors block"
                        >
                          Floffi Preserves
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Vertical 2 */}
                  <div>
                    <h4 className="font-serif text-sm font-semibold mb-3 border-b border-white/5 pb-2 text-white/90">Technology & IT</h4>
                    <ul className="space-y-2 text-xs text-white/70">
                      <li>
                        <a 
                          href="https://viyara.co.in/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-accent-gold transition-colors block"
                        >
                          Viyara Digital Transformation
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Vertical 3 */}
                  <div>
                    <h4 className="font-serif text-sm font-semibold mb-3 border-b border-white/5 pb-2 text-white/90">Skills & Education</h4>
                    <ul className="space-y-2 text-xs text-white/70">
                      <li>
                        <a 
                          href="https://www.kalikasphere.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-accent-gold transition-colors block"
                        >
                          Kalika Sphere Academy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Search Bar Overlay */}
        {searchOpen && (
          <div className="absolute top-20 left-0 right-0 bg-[#FFFFFF] dark:bg-dark border-b border-gray-200/25 p-4 shadow-lg flex justify-center animate-fade-in">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="Search Group information, businesses, sustainability report..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300/35 bg-[#F8F6F2] dark:bg-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-accent-gold text-sm"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-gold">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#FFFFFF]/95 dark:bg-[#1A1A1A]/95 backdrop-blur-lg border-b border-gray-200/20 py-6 px-6 flex flex-col gap-4 shadow-xl z-50">
            {Object.keys(sectionRefs).map((key) => {
              const label = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className="w-full text-left py-2 font-button text-sm tracking-wider uppercase opacity-85 hover:text-accent-gold transition-colors"
                >
                  {label === 'Whyus' ? 'Why Choose Us' : label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        ref={sectionRefs.home}
        className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Animated Background Visual */}
        <div className="absolute inset-0 bg-[#1A1A1A] z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#162436]/40 via-[#1A1A1A]/90 to-[#1A1A1A] z-10" />
          <div 
            className="w-full h-full opacity-40 bg-cover bg-center filter blur-[2px] animate-ken-burns"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000')` }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center z-20 text-white mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
            <span className="text-[10px] md:text-xs tracking-widest uppercase font-semibold text-accent-gold">Paidhu Group Global Vision</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-serif font-light leading-[1.15] mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            Building Businesses That <br />
            <span className="font-semibold italic text-accent-gold">Inspire a Better Future</span>
          </h1>

          <p className="text-sm md:text-lg max-w-2xl mx-auto opacity-80 font-sans font-light leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            Paidhu Group is a diversified organization shaping the future through ethical foods, innovative technology, premium consumer brands, and transformative education.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-button animate-fade-in-up" style={{ animationDelay: '700ms' }}>
            <button
              onClick={() => scrollToSection('businesses')}
              className="group w-full sm:w-auto px-8 py-3.5 bg-accent-gold hover:bg-accent-gold/90 text-white text-xs uppercase tracking-wider font-semibold rounded-full flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
            >
              Explore Our Businesses
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 backdrop-blur-md"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-20" onClick={() => scrollToSection('about')}>
          <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll to Explore</span>
          <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center p-1.5">
            <div className="w-1.5 h-2.5 bg-accent-gold rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={sectionRefs.about}
        className="py-24 md:py-32 bg-[#F8F6F2] dark:bg-[#1A1A1A] relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Image collage */}
            <ScrollReveal direction="left" className="col-span-12 lg:col-span-1">
              <div className="relative grid grid-cols-12 gap-4">
              <div className="col-span-8 rounded-3xl overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
                  alt="Sustainable Farming fields"
                  className="w-full aspect-[4/3] object-cover scale-102 hover:scale-108 transition-transform duration-700"
                />
              </div>
              <div className="col-span-4 rounded-3xl overflow-hidden shadow-2xl relative self-end group translate-y-8">
                <div className="absolute inset-0 bg-accent-gold/15 group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=500"
                  alt="Corporate growth & strategy"
                  className="w-full aspect-[3/4] object-cover scale-102 hover:scale-108 transition-transform duration-700"
                />
              </div>
              </div>
            </ScrollReveal>

            {/* Right - Content */}
            <ScrollReveal direction="right">
              <div>
              <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">Who We Are</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mt-2 mb-6 text-primary dark:text-white">
                Driven by Purpose. <br />
                <span className="font-semibold text-accent-gold">Inspired by Impact.</span>
              </h2>

              <p className="opacity-75 font-sans leading-relaxed mb-8 text-sm md:text-base">
                Paidhu Group is a multi-sector organization committed to creating long-term value through innovation, sustainability, technology, education, and ethical food solutions. Our businesses are united by a shared vision to improve lives while protecting the future.
              </p>

              {/* Counter Statistics Grid */}
              <div className="grid grid-cols-3 gap-6 border-t border-gray-200/10 pt-8">
                <div>
                  <div className="text-3xl md:text-5xl font-serif font-bold text-primary dark:text-accent-gold flex items-center">
                    <span>{brandsCount}</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-widest opacity-60 mt-2 font-medium">Brands</p>
                </div>
                <div>
                  <div className="text-3xl md:text-5xl font-serif font-bold text-primary dark:text-accent-gold">
                    <span>{industriesCount}</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-widest opacity-60 mt-2 font-medium">Industries</p>
                </div>
                <div>
                  <div className="text-3xl md:text-5xl font-serif font-bold text-primary dark:text-accent-gold">
                    <span>{satisfaction}%</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-widest opacity-60 mt-2 font-medium">Trust Focus</p>
                </div>
              </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Businesses Section */}
      <section
        id="businesses"
        ref={sectionRefs.businesses}
        className="py-24 md:py-32 bg-[#EDEDED]/50 dark:bg-dark relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">Diverse Sectors</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mt-2 mb-4 text-primary dark:text-white">Our Business Verticals</h2>
              <p className="text-sm md:text-base max-w-xl mx-auto opacity-75 leading-relaxed">
                We lead across food, tech and educational sectors with a focus on premium quality.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {businessVerticals.map((biz, idx) => (
              <ScrollReveal key={biz.id} delay={idx * 150} direction={idx % 2 === 0 ? 'left' : 'right'}>
                <div 
                  className="group rounded-3xl overflow-hidden glass-card transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl flex flex-col justify-between border-2 border-transparent"
                style={{ borderColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = biz.brandColor;
                  e.currentTarget.style.boxShadow = `0 20px 40px -15px ${biz.brandColor}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Visual header */}
                <div className="relative overflow-hidden aspect-[16/9]">
                  <img
                    src={biz.image}
                    alt={biz.name}
                    className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
                  
                  {/* Brand Logo Overlay badge */}
                  <div 
                    className="absolute top-4 right-4 w-12 h-12 rounded-xl p-1 flex items-center justify-center shadow-md overflow-hidden"
                    style={{ backgroundColor: biz.id === 'foods' ? '#522742' : '#ffffff' }}
                  >
                    {biz.id === 'foods' ? (
                      <span className="font-serif text-white font-bold text-xs tracking-tight">
                        Paidhu<span className="text-accent-gold">.</span>
                      </span>
                    ) : (
                      <img src={biz.logo} alt="" className="max-h-full max-w-full object-contain" />
                    )}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span 
                      className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full backdrop-blur-md text-white"
                      style={{ backgroundColor: biz.brandColor }}
                    >
                      {biz.id === 'foods' || biz.id === 'floffi' ? 'Agri & Food' : biz.id === 'viyara' ? 'Tech & IT' : 'Education'}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold mt-2">{biz.name}</h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <p 
                      className="text-xs font-semibold uppercase tracking-wider mb-2 italic"
                      style={{ color: biz.brandColor }}
                    >
                      "{biz.tagline}"
                    </p>
                    <p className="text-sm opacity-80 leading-relaxed mb-6">
                      {biz.desc}
                    </p>

                    {/* Sub Brands and features list */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-200/10">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 block mb-2">Offerings</span>
                        <ul className="space-y-1">
                          {biz.subBrands.map((sub, i) => (
                            <li key={i} className="text-xs opacity-80 flex items-center gap-1.5">
                              <span 
                                className="w-1 h-1 rounded-full" 
                                style={{ backgroundColor: biz.brandColor }}
                              />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 block mb-2">Core Principles</span>
                        <ul className="space-y-1">
                          {biz.features.map((feat, i) => (
                            <li key={i} className="text-xs opacity-85 flex items-center gap-1.5 text-primary dark:text-[#F8F6F2]">
                              <CheckCircle2 
                                className="w-3 h-3" 
                                style={{ color: biz.brandColor }}
                              />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <a
                    href={biz.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 font-button group/btn"
                    style={{ color: biz.brandColor }}
                  >
                    {biz.ctaText}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:translate-y-[-1px]" />
                  </a>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>



      {/* Innovation Section */}
      <section
        id="innovation"
        ref={sectionRefs.innovation}
        className="py-24 md:py-32 bg-[#1A1A1A] text-white relative overflow-hidden"
      >
        {/* Abstract background blobs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent-gold/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Header */}
            <ScrollReveal direction="left">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">Future Ready</span>
                <h2 className="text-3xl md:text-5xl font-serif font-light mt-2 mb-4 leading-tight">
                  Innovation <br />
                  <span className="font-semibold text-accent-gold">Rooted in Purpose.</span>
                </h2>
                <p className="text-sm opacity-70 leading-relaxed">
                  We believe that research and digital intelligence are vital tools for building a sustainable future. We apply next-generation tech to empower every vertical.
                </p>
              </div>
            </ScrollReveal>

            {/* Middle & Right floating cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ScrollReveal delay={100} direction="up">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent-gold/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/20 flex items-center justify-center text-accent-gold mb-6">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold mb-2">Ethical Food Research</h3>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Pioneering sustainable agriculture practices, organic yield methods, and botanical flower crop engineering.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} direction="up">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent-gold/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/20 flex items-center justify-center text-accent-gold mb-6">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold mb-2">Digital Transformation</h3>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Building next-generation workflows, SaaS platforms, and enterprise solutions for global clients at Viyara.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300} direction="up">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent-gold/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/20 flex items-center justify-center text-accent-gold mb-6">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold mb-2">AI & Software Solutions</h3>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Integrating machine learning Models to speed up logistics, automate code structures and analyze crop variables.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400} direction="up">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent-gold/40 hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/20 flex items-center justify-center text-accent-gold mb-6">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold mb-2">Education Technology</h3>
                  <p className="text-xs opacity-75 leading-relaxed">
                    Designing learning management systems and virtual bootcamps to democratize skills education at Kalika Sphere.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section
        id="sustainability"
        ref={sectionRefs.sustainability}
        className="py-32 relative flex items-center justify-center overflow-hidden"
      >
        {/* Parallax Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1500"
            alt="Forest conservation"
            className="w-full h-full object-cover scale-102 filter brightness-[0.7] contrast-[1.1]"
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center z-20 text-white">
          <ScrollReveal direction="up">
            <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">ESG Priorities</span>
            <h2 className="text-3xl md:text-6xl font-serif font-light mt-2 mb-8 leading-tight">
              Growing Better Together. <br />
              <span className="font-semibold italic text-accent-gold">Nurturing Communities.</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <ScrollReveal delay={100} direction="up">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md h-full">
                <span className="text-accent-gold text-xs font-semibold uppercase tracking-wider block mb-2">Ethical Sourcing</span>
                <p className="text-xs opacity-80 leading-relaxed">
                  100% trace-to-origin procurement across edible crops, ensuring farmers receive fair value wages and standard resource support.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} direction="up">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md h-full">
                <span className="text-accent-gold text-xs font-semibold uppercase tracking-wider block mb-2">Eco-Packaging</span>
                <p className="text-xs opacity-80 leading-relaxed">
                  Utilizing 100% biodegradable wrappers, recyclable jars, and zero-plastic elements for Floffi and Bloom Cookies products.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300} direction="up">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md h-full">
                <span className="text-accent-gold text-xs font-semibold uppercase tracking-wider block mb-2">Community First</span>
                <p className="text-xs opacity-80 leading-relaxed">
                  Allocating 5% of group resources to free software development bootcamps and skill workshops under Kalika Sphere.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Brand Showcase Wall */}
      <section
        id="brands"
        ref={sectionRefs.brands}
        className="py-24 md:py-32 bg-[#EDEDED]/40 dark:bg-dark text-[#1A1A1A] dark:text-[#F8F6F2] relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">Group Network</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light mt-2 mb-4">Core Group Brands</h2>
            <p className="text-sm opacity-70 max-w-md mx-auto">
              Our market leading subsidiaries working in cohesion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Paidhu Ethical Foods', logo: '/paidhu_logo.png', link: 'https://www.paidhuethicalfoods.com/', desc: 'Discover premium quality organic edible flowers, organic saffron, and handcrafted floral jams.' },
              { name: 'Floffi Preservation', logo: 'https://floffi.in/floffi_logo.png', link: 'https://floffi.in/', desc: 'Naturally crafted floral goodness, premium fruit jams, spreads, and natural preserves.' },
              { name: 'Viyara IT Services', logo: 'https://viyara.co.in/logo-badge-blue.png', link: 'https://viyara.co.in/', desc: 'Engineers world-class enterprise software and curates premium brand experiences.' },
              { name: 'Kalika Sphere', logo: 'https://www.kalikasphere.com/assets/logo-Drzuq4t7.png', link: 'https://www.kalikasphere.com/', desc: 'Future-ready skill development platforms, tech courses, and corporate training.' },
            ].map((logo, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-[#FFFFFF] dark:bg-dark border border-gray-200/10 shadow-md hover:shadow-2xl transition-all duration-300 text-center flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-accent-gold/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div>
                  <div className="w-20 h-20 bg-white dark:bg-dark border border-gray-200/10 mx-auto flex items-center justify-center p-3 rounded-2xl mb-6 shadow-sm transition-transform duration-500 group-hover:scale-110">
                    <img src={logo.logo} alt={logo.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <h3 className="font-serif text-base font-bold mb-2">{logo.name}</h3>
                  <p className="text-xs opacity-70 leading-relaxed mb-6">{logo.desc}</p>
                </div>

                <a
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full border border-gray-200 dark:border-gray-800 text-[11px] uppercase tracking-wider font-semibold group-hover:bg-accent-gold group-hover:border-accent-gold group-hover:text-white transition-all duration-300 font-button"
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section
        id="timeline"
        ref={sectionRefs.timeline}
        className="py-24 md:py-32 bg-[#F8F6F2] dark:bg-[#1A1A1A] relative"
      >
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">Group Journey</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mt-2 mb-4 text-primary dark:text-white">Our Corporate Timeline</h2>
              <p className="text-sm opacity-70 max-w-sm mx-auto">
                Charting consistent and responsible progress.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative border-l-2 border-accent-gold/30 ml-4 md:ml-32 space-y-12">
            {[
              { year: 'Phase 1', title: 'Foundation & Agriculture', desc: 'Paidhu Ethical Foods launched, establishing fair trade roots in Kashmir saffron and edible flowers.' },
              { year: 'Phase 2', title: 'Floffi Brand Launch', desc: 'Introduction of Floffi natural fruit jams and preserves to modern consumer breakfast segments.' },
              { year: 'Phase 3', title: 'Digital Expansion', desc: 'Viyara IT services set up, providing premium UI/UX design, SaaS, and AI platform support.' },
              { year: 'Phase 4', title: 'Kalika Sphere Academy', desc: 'EdTech and skill growth initiative launched, empowering professional digital certification.' },
              { year: 'Future', title: 'Eco-System Scalability', desc: 'Unifying global food distribution logistics, AI scaling, and carbon-neutral green projects.' },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100} direction="left">
                <div className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute left-[-9px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-accent-gold bg-[#F8F6F2] dark:bg-[#1A1A1A] group-hover:bg-accent-gold transition-colors duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-gold group-hover:bg-white" />
                </div>
                
                {/* Side Year display for desktop */}
                <div className="hidden md:block absolute left-[-160px] top-1 text-right w-28">
                  <span className="font-serif text-sm font-bold text-accent-gold">{item.year}</span>
                </div>

                <div className="p-6 rounded-2xl glass-card transition-all duration-300 group-hover:translate-x-1">
                  <span className="md:hidden text-xs font-bold text-accent-gold block mb-1">{item.year}</span>
                  <h3 className="font-serif text-base font-bold mb-2 text-primary dark:text-white">{item.title}</h3>
                  <p className="text-xs opacity-75 leading-relaxed">{item.desc}</p>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="whyus"
        ref={sectionRefs.whyus}
        className="py-24 md:py-32 bg-[#EDEDED]/50 dark:bg-dark relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">Value Core</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mt-2 mb-4">Why Choose Paidhu Group</h2>
              <p className="text-sm opacity-70 max-w-sm mx-auto">
                Our principles define who we are and guide our future.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Compass, title: 'Ethical Foods', desc: 'Sourcing organic Kashmir saffron, cookies, and flowers directly from farms under Paidhu Ethical Foods.' },
              { icon: ShieldCheck, title: 'Floffi Preserves', desc: 'Floffi uses natural recipes, real fruit content, and zero artificial preservatives.' },
              { icon: Cpu, title: 'Viyara Technology', desc: 'Viyara builds future-proof Web, SaaS, cloud, and AI applications for digital business transformation.' },
              { icon: Award, title: 'Kalika Learning', desc: 'Kalika Sphere delivers digital learning, technology certification, and professional growth.' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={idx} delay={idx * 100} direction="up">
                  <div className="p-8 rounded-3xl bg-[#FFFFFF] dark:bg-dark border border-gray-200/10 text-center shadow-sm h-full">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 dark:bg-white/5 text-accent-gold flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-2 text-primary dark:text-white">{card.title}</h3>
                  <p className="text-xs opacity-70 leading-relaxed">{card.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={sectionRefs.contact}
        className="py-24 md:py-32 bg-[#F8F6F2] dark:bg-[#1A1A1A] relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Info Column */}
            <ScrollReveal direction="left">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent-gold font-semibold">Connect With Us</span>
              <h2 className="text-3xl md:text-5xl font-serif font-light mt-2 mb-6 text-primary dark:text-white">
                Let’s Shape the <br />
                <span className="font-semibold text-accent-gold">Future Together</span>
              </h2>
              <p className="text-sm opacity-75 leading-relaxed mb-8">
                Get in touch with Paidhu Group corporate office regarding partnerships, careers, vendor registration or media inquiries.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold opacity-60">Headquarters</h4>
                    <p className="text-sm mt-1 opacity-85">No 11 Saraswati Avenue, Achipatti, Pollachi - 642002</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold opacity-60">Phone Link</h4>
                    <p className="text-sm mt-1 opacity-85">+91 8754287774</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold opacity-60">Email Inquiries</h4>
                    <p className="text-sm mt-1 opacity-85">info@paidhu.com</p>
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Right Form Column */}
            <ScrollReveal direction="right">
              <div className="p-8 md:p-10 rounded-3xl glass-card relative">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div className="w-16 h-16 bg-[#162436]/10 rounded-full flex items-center justify-center text-[#162436] dark:text-accent-gold mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">Message Received</h3>
                  <p className="text-xs opacity-75">Thank you for reaching out. A Paidhu Group representative will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold opacity-60 block mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300/35 bg-[#F8F6F2]/50 dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-gold text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold opacity-60 block mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300/35 bg-[#F8F6F2]/50 dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-gold text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold opacity-60 block mb-2">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help your business?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300/35 bg-[#F8F6F2]/50 dark:bg-dark focus:outline-none focus:ring-1 focus:ring-accent-gold text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary dark:bg-accent-gold text-white font-button text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-lg"
                  >
                    Send Message
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Elegant Footer */}
      <footer className="bg-dark text-white border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-4">
            <img
              src="/ChatGPT Image Aug 1, 2026, 08_30_36 PM.png"
              alt="Paidhu"
              className="h-14 w-auto object-contain mb-2"
              style={{ filter: 'invert(1)', opacity: 0.95 }}
            />
            <p className="text-xs opacity-65 leading-relaxed mt-4 max-w-sm">
              Building sustainable, ethical, and value-driven business verticals for a cleaner, modern tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-accent-gold mb-6">Group Sitemap</h4>
            <ul className="space-y-3 text-xs opacity-70">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-accent-gold transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-accent-gold transition-colors">About</button></li>
              <li><button onClick={() => scrollToSection('businesses')} className="hover:text-accent-gold transition-colors">Businesses</button></li>

              <li><button onClick={() => scrollToSection('contact')} className="hover:text-accent-gold transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Businesses */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-accent-gold mb-6">Our Brands</h4>
            <ul className="space-y-3 text-xs opacity-70">
              <li><a href="https://www.paidhuethicalfoods.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">Paidhu Ethical Foods</a></li>
              <li><a href="https://floffi.in/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">Floffi Jams</a></li>
              <li><a href="https://viyara.co.in/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">Viyara Digital</a></li>
              <li><a href="https://www.kalikasphere.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">Kalika Sphere</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-widest font-bold text-accent-gold mb-6">Newsletter Sign Up</h4>
            <p className="text-xs opacity-65 leading-relaxed mb-4">
              Subscribe to get updates on Paidhu ESG progress and brand announcements.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="email@company.com"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs focus:outline-none focus:border-accent-gold w-full text-white"
              />
              <button className="px-4 py-2 bg-accent-gold text-white text-xs rounded-xl font-semibold hover:bg-accent-gold/90">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] opacity-50 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Paidhu Group. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Careers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
