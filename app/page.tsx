"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Bot, Menu } from "lucide-react";
import { RESOLVED_MEDIA_URLS } from "./constants/media";

type Event = {
  id: number;
  date: string;
  month: string;
  title: string;
  time: string;
  location: string;
  link: string;
  highlight?: boolean;
};

type News = {
  id: number;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  img: string;
};

const fallbackNewsData: News[] = [
  {
    id: 1,
    tag: "ANNOUNCEMENTS",
    title: "Orientation for 2025/2026 New Intakes",
    excerpt:
      "Official welcome ceremony and orientation schedule released for all faculties...",
    date: "Oct 12, 2025",
    readTime: "5 min read",
    img: RESOLVED_MEDIA_URLS.announcement,
  },
  {
    id: 2,
    tag: "RESEARCH",
    title: "FUHSA Researchers Unveil Findings on Local Herb Properties",
    excerpt:
      "A breakthrough study published in the Global Health Journal by our Pharmaceutical Sciences team...",
    date: "Oct 08, 2025",
    readTime: "8 min read",
    img: RESOLVED_MEDIA_URLS.lab,
  },
  {
    id: 3,
    tag: "CAMPUS LIFE",
    title: "Inter-Faculty Sports Week Commences",
    excerpt:
      "Students from all faculties participate in the annual sporting event to foster unity and fitness...",
    date: "Sep 25, 2025",
    readTime: "3 min read",
    img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
  },
];

const fallbackEventsData: Event[] = [
  {
    id: 1,
    date: "25",
    month: "OCT",
    title: "Annual Health Symposium",
    time: "09:00 AM",
    location: "Main Auditorium",
    link: "#",
  },
  {
    id: 2,
    date: "12",
    month: "NOV",
    title: "Matriculation Ceremony",
    time: "10:00 AM",
    location: "University Square",
    link: "#",
    highlight: true,
  },
  {
    id: 3,
    date: "05",
    month: "DEC",
    title: "Research Grant Workshop",
    time: "02:00 PM",
    location: "Senate Building",
    link: "#",
  },
];

export default function FuhsaAceternityLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- UPGRADED CHATBOT STATE & LOGIC ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatTooltip, setShowChatTooltip] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! 👋 Welcome to FUHSA. How can I help you today?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smart Knowledge Base
  const generateBotResponse = (input: string) => {
    const query = input.toLowerCase();

    if (
      query.includes("admission") ||
      query.includes("apply") ||
      query.includes("post utme")
    ) {
      return "Admissions for the 2026/2027 session are currently open! You need a minimum JAMB score of 220. Click 'Admission' in the top menu to start your Post-UTME screening.";
    }
    if (
      query.includes("course") ||
      query.includes("program") ||
      query.includes("faculty")
    ) {
      return "We offer fully accredited programs in Medicine & Surgery (MBBS), Nursing Sciences, Public Health, Dentistry, Medical Laboratory Science, and Human Anatomy. You can explore the 'Academics' page for full details.";
    }
    if (
      query.includes("fee") ||
      query.includes("pay") ||
      query.includes("school fee")
    ) {
      return "The Post-UTME screening fee is a non-refundable ₦2,000 payable via Remita. For full tuition and hostel details, please log in to your student dashboard.";
    }
    if (
      query.includes("where") ||
      query.includes("location") ||
      query.includes("address")
    ) {
      return "FUHSA is located along Azare-Kano Road, Azare, Bauchi State, Nigeria. We have a beautiful campus equipped with state-of-the-art medical facilities!";
    }
    if (
      query.includes("contact") ||
      query.includes("help") ||
      query.includes("phone")
    ) {
      return "You can reach our helpdesk at info@fuhsa.edu.ng or call +234 800 FUHSA HELP. Our team is available Monday to Friday, 9:00 AM to 4:00 PM.";
    }
    if (
      query.includes("hi") ||
      query.includes("hello") ||
      query.includes("hey")
    ) {
      return "Hello! I'm the FUHSA AI Assistant. Are you a prospective student, or are you looking for specific campus information?";
    }
    if (
      query.includes("jamb") ||
      query.includes("cut off") ||
      query.includes("score")
    ) {
      return "The general cut-off mark for most programs is 220. However, highly competitive courses like Medicine & Surgery (MBBS) may require higher scores.";
    }

    return "That's a great question! While I don't have the exact answer right now, our Admissions team would love to help. You can email them directly at admissions@fuhsa.edu.ng.";
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setChatInput("");
    setIsTyping(true);
    setShowChatTooltip(false);

    // Simulate AI Processing time for realism
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = generateBotResponse(userMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 1200);
  };

  const handleQuickAction = (text: string) => {
    setChatInput(text);
    setTimeout(
      () => handleChatSubmit({ preventDefault: () => {} } as React.FormEvent),
      50,
    );
  };

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Chatbot Initial Tooltip Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isChatOpen) setShowChatTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isChatOpen]);

  // --- GENERAL EFFECTS ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVideoOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isVideoOpen]);

  // --- DATA ---
  const [newsData, setNewsData] = useState<any[]>([]);
  const [eventsData, setEventsData] = useState<any[]>([]);

  const portalLinks = [
    { label: "Student Portal", href: "https://fuhsa.safsrms.com/" },
    { label: "Admission Portal", href: "https://fuhsa.admissions.cloud/" },
    {
      label: "Remedial Portal",
      href: "https://fuhsa_remedial.admissions.cloud/",
    },
    {
      label: "Inter/Intra Transfer",
      href: "https://applicant.safapply.com/fuhsa",
    },
  ];

  const resourceLinks = [
    { label: "TETFund", href: "https://tetfund.gov.ng/" },
    { label: "NUC", href: "https://www.nuc.edu.ng/" },
    {
      label: "Ministry of Edu",
      href: "https://education.gov.ng/our-structure/",
    },
  ];

  const departmentGroups = [
    {
      faculty: "Faculty of Allied Health Sciences",
      departments: [
        "Department of Audiology",
        "Department of Health Information Management",
        "Department of Medical Laboratory Science",
        "Department of Nursing",
        "Department of Occupational Therapy",
        "Department of Optometry",
        "Department of Physiotherapy",
        "Department of Radiography",
        "Department of Speech Language Therapy",
      ],
    },
    {
      faculty: "Faculty of Integrated Health Sciences",
      departments: [
        "Department of Anatomy",
        "Department of Biochemistry",
        "Department of Environmental Health",
        "Department of Microbiology",
        "Department of Nutrition and Dietetics",
        "Department of Pharmacology",
        "Department of Physiology",
        "Department of Public Health",
      ],
    },
    {
      faculty: "Faculty of Science",
      departments: [
        "Department of Biology",
        "Department of Biostatistics",
        "Department of Biotechnology",
        "Department of Chemistry",
        "Department of Information Technology and Health Informatics",
        "Department of Mathematics",
        "Department of Physics",
      ],
    },
    {
      faculty: "College of Medical Sciences",
      departments: ["MBBS"],
    },
    {
      faculty: "Dentistry",
      departments: ["Dentistry"],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public/announcements");
        const contentType = response.headers.get("content-type") ?? "";

        if (!response.ok || !contentType.includes("application/json")) {
          throw new Error("Announcements endpoint did not return JSON.");
        }

        const data = await response.json();
        const announcements = Array.isArray(data) ? data : [];

        // Split data into news (with image/summary) and events (by tag or type)
        const news = announcements.filter(
          (item: any) => item.image_url || item.summary,
        );
        const events = announcements.filter(
          (item: any) => !item.image_url && !item.summary,
        );

        setNewsData(news.length > 0 ? news : fallbackNewsData);
        setEventsData(events.length > 0 ? events : fallbackEventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNewsData(fallbackNewsData);
        setEventsData(fallbackEventsData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="aceternity-wrapper relative min-h-screen">
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&display=swap');

        :root {
          --fuhsa-navy: #0B1C30;
          --fuhsa-navy-light: #152b47;
          --fuhsa-gold: #DDA83A;
          --fuhsa-teal: #5CB8A5;
          --text-dark: #0f172a;
          --text-muted: #64748b;
          --bg-light: #f8fafc;
        }

        html { scroll-behavior: smooth; }
        body { margin: 0; background-color: #fff; color: var(--text-muted); font-family: 'Inter', sans-serif; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; transition: all 0.3s ease; }
        * { box-sizing: border-box; }

        h1, h2, h3, .serif-font { font-family: 'Playfair Display', serif; color: var(--text-dark); }
        .text-gold { color: var(--fuhsa-gold); }

        /* Aceternity Spotlights, Meteors, and Hover States */
        .spotlight-wrapper { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 2; }
        .spotlight {
          position: absolute; top: -20%; left: 50%; transform: translateX(-50%); width: 100vw; height: 100vh;
          background: radial-gradient(ellipse at center, rgba(92, 184, 165, 0.15) 0%, transparent 70%);
          filter: blur(50px); animation: pulseSpotlight 10s ease-in-out infinite alternate;
        }
        .meteor { position: absolute; top: -50px; width: 2px; height: 50px; background: linear-gradient(to bottom, transparent, var(--fuhsa-gold)); transform: rotate(45deg); animation: meteorShower 6s linear infinite; opacity: 0; z-index: 1; }
        .meteor::before { content: ''; position: absolute; bottom: 0; left: -2px; width: 6px; height: 6px; border-radius: 50%; background: #fff; box-shadow: 0 0 10px 2px var(--fuhsa-gold); }
        .m1 { left: 20%; animation-delay: 1s; animation-duration: 5s; }
        .m2 { left: 50%; animation-delay: 3s; animation-duration: 6s; }
        .m3 { left: 80%; animation-delay: 2s; animation-duration: 4.5s; }

        .btn-aceternity { position: relative; display: inline-flex; padding: 2px; border-radius: 999px; overflow: hidden; cursor: pointer; text-align: center; }
        .btn-aceternity::before { content: ''; position: absolute; inset: -100%; background: conic-gradient(from 0deg, transparent 0 340deg, var(--fuhsa-gold) 360deg); animation: spin 3s linear infinite; }
        .btn-aceternity-inner { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: var(--fuhsa-navy); border-radius: 999px; padding: 14px 36px; font-weight: 600; color: #fff; z-index: 1; font-size: 0.95rem; transition: background 0.3s ease; white-space: nowrap; }
        .btn-aceternity:hover .btn-aceternity-inner { background: rgba(11, 28, 48, 0.8); }
        .btn-outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.4); padding: 16px 36px; border-radius: 999px; font-weight: 600; display: inline-flex; justify-content: center; text-align: center; transition: all 0.3s ease; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

        .glare-card { position: relative; border-radius: 12px; background: #fff; border: 1px solid #f1f5f9; padding: 40px 24px; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; transform-style: preserve-3d; }
        .glare-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.1); border-color: rgba(92, 184, 165, 0.3); }
        .glare-card::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent); transform: skewX(-20deg); transition: 0.7s; z-index: 1; pointer-events: none; }
        .glare-card:hover::after { left: 200%; }

        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes kenBurns { 0% { transform: scale(1); opacity: 0; } 5% { opacity: 0.6; } 30% { opacity: 0.6; } 35% { transform: scale(1.1); opacity: 0; } 100% { transform: scale(1.1); opacity: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseSpotlight { 0% { transform: translateX(-50%) scale(1); opacity: 0.6; } 100% { transform: translateX(-50%) scale(1.3); opacity: 1; } }
        @keyframes meteorShower { 0% { transform: rotate(45deg) translateY(-200px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: rotate(45deg) translateY(1000px); opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
        @keyframes floatText { 0%, 100% { transform: translateZ(50px) translateY(0); } 50% { transform: translateZ(50px) translateY(-12px); } }
        @keyframes pulseGlow { 0% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.9); } 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); } }

        .skeleton-bg { background-color: #e2e8f0; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Layout */
        .nav-container { position: fixed; top: 0; width: 100%; z-index: 1000; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; transition: all 0.4s ease; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; }
        .nav-container.scrolled { background: rgba(11, 28, 48, 0.95); backdrop-filter: blur(16px); padding: 15px 5%; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .logo-wrap { display: flex; align-items: center; gap: 12px; cursor: pointer; }
        .logo-text { font-weight: 700; font-size: 1.1rem; letter-spacing: 0.05em; line-height: 1.2; }
        .logo-sub { font-size: 0.65rem; color: var(--fuhsa-gold); letter-spacing: 0.1em; font-weight: 600; }

        .nav-links { display: flex; gap: 32px; font-size: 0.85rem; font-weight: 500; }
        .nav-links a, .nav-links button { position: relative; }
        .nav-links a::after { content: ''; position: absolute; width: 0; height: 2px; bottom: -4px; left: 0; background: var(--fuhsa-gold); transition: 0.3s; }
        .nav-links a:hover::after { width: 100%; }

        .hero-section { position: relative; height: 100vh; display: flex; align-items: center; padding: 0 5%; overflow: hidden; background: var(--fuhsa-navy); }
        .slide { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; animation: kenBurns 24s infinite; }
        .slide-1 { background: url('${RESOLVED_MEDIA_URLS.slide1}') center/cover no-repeat; animation-delay: 0s; }
        .slide-2 { background: url('${RESOLVED_MEDIA_URLS.slide2}') center/cover no-repeat; animation-delay: 8s; }
        .slide-3 { background: url('${RESOLVED_MEDIA_URLS.slide3}') center/cover no-repeat; animation-delay: 16s; }
        .slide-4 { background: url('${RESOLVED_MEDIA_URLS.slide4}') center/cover no-repeat; animation-delay: 24s; }
        .slide-5 { background: url('${RESOLVED_MEDIA_URLS.slide5}') center/cover no-repeat; animation-delay: 32s; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(11,28,48,0.95) 0%, rgba(11,28,48,0.7) 50%, rgba(11,28,48,0.3) 100%); z-index: 1; }

        .hero-content { position: relative; z-index: 10; max-width: 850px; color: #fff; margin-top: 40px; animation: fadeUp 1s ease forwards; }
        .hero-badge { display: inline-flex; align-items: center; gap: 10px; color: var(--fuhsa-gold); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; margin-bottom: 24px; text-transform: uppercase; }
        .hero-badge::before { content: ''; display: block; width: 30px; height: 2px; background: var(--fuhsa-gold); }
        .hero-title { font-size: 5.5rem; font-weight: 700; line-height: 1.05; margin: 0 0 24px 0; color: #fff; }
        .hero-subtitle { font-size: 1.15rem; line-height: 1.7; max-width: 650px; margin-bottom: 40px; color: #cbd5e1; }

        .section-padding { padding: 120px 5%; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-title { font-size: 3rem; font-weight: 700; margin-bottom: 24px; color: var(--fuhsa-navy); }
        .about-text { font-size: 1.1rem; line-height: 1.8; margin-bottom: 40px; }

        .mission-vision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .mv-box { background: var(--bg-light); padding: 30px 24px; border-left: 4px solid var(--fuhsa-gold); border-radius: 0 8px 8px 0; }
        .mv-title { font-weight: 700; color: var(--fuhsa-navy); margin: 0 0 12px 0; font-size: 1.1rem; }

        .about-image-wrapper { position: relative; perspective: 1000px; width: 100%; }
        .about-image { width: 100%; height: 550px; border-radius: 12px; background-image: url('${RESOLVED_MEDIA_URLS.labb}'); background-size: cover; background-position: center; box-shadow: 0 30px 60px rgba(0,0,0,0.15); transition: transform 0.5s; transform: rotateY(-5deg); }
        .about-image-wrapper:hover .about-image { transform: rotateY(0deg); }
        .about-badge { position: absolute; bottom: -30px; left: -30px; background: var(--fuhsa-gold); padding: 40px; border-radius: 12px; color: var(--fuhsa-navy); box-shadow: 0 20px 40px rgba(221, 168, 58, 0.3); z-index: 2; }
        .about-badge h4 { margin: 0; font-size: 3rem; font-weight: 700; line-height: 1; font-family: 'Inter', sans-serif; }
        .about-badge p { margin: 5px 0 0 0; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

        .stats-section { background: var(--fuhsa-navy); color: #fff; padding: 80px 5%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center; position: relative; overflow: hidden; }
        .stat-num { color: var(--fuhsa-gold); font-size: 3.5rem; font-weight: 700; margin-bottom: 8px; }
        .stat-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; color: #e2e8f0; }

        /* Marquee */
        .marquee-container { background: var(--fuhsa-gold); color: var(--fuhsa-navy); padding: 8px 0; overflow: hidden; white-space: nowrap; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(0,0,0,0.1); }
        .marquee-content { display: inline-block; animation: marquee 30s linear infinite; padding-left: 100%; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }

        /* VC Message Section */
        .vc-section { background: #fff; }
        .vc-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; align-items: center; }
        .vc-image-wrap { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); aspect-ratio: 4/5; width: 100%; }
        .vc-image { width: 100%; height: 100%; object-fit: cover; }
        .vc-content { position: relative; }
        .vc-quote-icon { color: var(--fuhsa-gold); opacity: 0.2; margin-bottom: 20px; }
        .vc-name { font-size: 1.5rem; font-weight: 700; color: var(--fuhsa-navy); margin-top: 30px; }
        .vc-title { color: var(--fuhsa-gold); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; }

        /* Journal & Conference */
        .journal-section { background: var(--bg-light); }
        .journal-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; }
        .info-card { background: #fff; padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0; height: 100%; transition: 0.3s; display: flex; flex-direction: column; }
        .info-card:hover { border-color: var(--fuhsa-gold); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .info-tag { display: inline-block; width: fit-content; padding: 4px 12px; border-radius: 4px; background: rgba(92, 184, 165, 0.1); color: var(--fuhsa-teal); font-weight: 700; font-size: 0.7rem; margin-bottom: 20px; }

        .faculties-section { background: var(--bg-light); text-align: center; }
        .section-header { max-width: 650px; margin: 0 auto 60px; }
        .section-header h2 { font-size: 3rem; font-weight: 700; margin-bottom: 20px; color: var(--fuhsa-navy); }
        .section-header p { font-size: 1.1rem; line-height: 1.7; }
        .faculties-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; text-align: center; }
        .faculty-icon { width: 70px; height: 70px; margin: 0 auto 24px; background: rgba(92, 184, 165, 0.1); color: var(--fuhsa-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .faculty-title { font-size: 1.35rem; font-weight: 700; margin: 0 0 15px 0; color: var(--fuhsa-navy); }
        .faculty-desc { font-size: 0.9rem; line-height: 1.7; margin-bottom: 24px; }
        .faculty-link { color: var(--fuhsa-navy); font-weight: 700; font-size: 0.9rem; display: inline-flex; align-items: center; justify-content: center; gap: 5px; }

        .departments-section { background: #fff; }
        .departments-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .department-card { background: var(--bg-light); border: 1px solid #e2e8f0; border-radius: 8px; padding: 28px; text-align: left; }
        .department-card h3 { font-family: 'Inter', sans-serif; font-size: 1.05rem; color: var(--fuhsa-navy); margin: 0 0 18px; }
        .department-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
        .department-list li { color: var(--text-muted); font-size: 0.92rem; line-height: 1.45; padding-left: 18px; position: relative; }
        .department-list li::before { content: ''; position: absolute; left: 0; top: 0.62em; width: 7px; height: 7px; border-radius: 50%; background: var(--fuhsa-gold); }

        .research-section { background: var(--fuhsa-navy); color: #fff; position: relative; overflow: hidden; }
        .research-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
        .research-title { font-size: 3rem; font-weight: 700; margin-bottom: 50px; color: #fff; }
        .research-list { list-style: none; padding: 0; margin: 0 0 50px 0; }
        .research-list li { display: flex; gap: 24px; margin-bottom: 40px; }
        .research-num { background: rgba(221, 168, 58, 0.1); color: var(--fuhsa-gold); padding: 10px 16px; height: fit-content; font-weight: 700; border-radius: 8px; border: 1px solid rgba(221, 168, 58, 0.3); font-size: 1.1rem; }
        .research-list h4 { margin: 0 0 10px 0; font-size: 1.2rem; color: #fff; font-family: 'Inter', sans-serif; font-weight: 600; }
        .research-list p { margin: 0; font-size: 0.95rem; color: #cbd5e1; line-height: 1.7; }

        .research-poster { position: relative; width: 100%; height: 600px; border-radius: 20px; background: linear-gradient(135deg, var(--fuhsa-teal) 0%, #064e3b 100%); display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.3); transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
        .research-poster:hover { transform: translateY(-10px) rotateX(2deg) rotateY(-2deg); box-shadow: 0 40px 80px rgba(13, 148, 136, 0.4); }
        .research-grid-bg { position: absolute; inset: 0; background-image: radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px); background-size: 20px 20px; z-index: 1; }
        .research-glow { position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(221, 168, 58, 0.4) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2; animation: pulseGlow 4s ease-in-out infinite alternate; }
        .research-inner-content { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; transform: translateZ(50px); animation: floatText 6s ease-in-out infinite; }
        .poster-tag { color: #fff; font-family: 'Inter', sans-serif; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 20px; opacity: 0.9; }
        .poster-title { font-size: 6rem; font-weight: 900; margin: 0; line-height: 1; font-family: 'Playfair Display', serif; background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.3) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)); }
        .poster-motto { color: var(--fuhsa-gold); font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.2rem; margin-top: 20px; letter-spacing: 0.05em; }

        .tour-section { background: var(--bg-light); text-align: center; }
        .tour-container { position: relative; width: 100%; height: 65vh; min-height: 450px; background: url('${RESOLVED_MEDIA_URLS.gate}') center/cover; border-radius: 16px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.1); cursor: pointer; }
        .tour-container::before { content: ''; position: absolute; inset: 0; background: rgba(11,28,48,0.4); transition: 0.4s; }
        .tour-container:hover::before { background: rgba(11,28,48,0.2); }
        .play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.5); transition: 0.3s; z-index: 10; }
        .tour-container:hover .play-btn { background: var(--fuhsa-gold); border-color: var(--fuhsa-gold); transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 30px rgba(221,168,58,0.5); }
        .play-btn svg { width: 35px; height: 35px; fill: #fff; margin-left: 5px; }

        .dynamic-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; flex-wrap: wrap; gap: 15px; }
        .dynamic-header h2 { margin: 0; font-size: 2.5rem; color: var(--fuhsa-navy); }
        .view-link { color: var(--fuhsa-navy); font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; }

        .events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .event-card { display: flex; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; transition: 0.3s; }
        .event-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .event-card.highlight { background: rgba(221, 168, 58, 0.05); border-color: var(--fuhsa-gold); }
        .event-date { background: var(--fuhsa-navy); color: #fff; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 110px; }
        .event-card.highlight .event-date { background: var(--fuhsa-gold); color: var(--fuhsa-navy); }
        .event-date span:first-child { font-size: 2.5rem; font-family: 'Playfair Display', serif; font-weight: 700; line-height: 1; }
        .event-date span:last-child { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; margin-top: 5px; }
        .event-details { padding: 24px; width: 100%; display: flex; flex-direction: column; justify-content: center; }
        .event-details h4 { margin: 0 0 12px 0; font-size: 1.1rem; color: var(--text-dark); font-family: 'Inter', sans-serif; }

        .news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .news-card { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; }
        .news-img { width: 100%; height: 240px; object-fit: cover; transition: transform 0.5s; }
        .news-card:hover .news-img { transform: scale(1.05); }
        .news-content { padding: 30px; position: relative; background: #fff; z-index: 2; display: flex; flex-direction: column; height: 100%; }
        .news-tag { font-size: 0.7rem; font-weight: 700; color: var(--fuhsa-teal); letter-spacing: 0.1em; margin-bottom: 12px; display: block; }
        .news-title { font-size: 1.4rem; font-weight: 700; margin: 0 0 15px 0; line-height: 1.4; }

        .footer { background: var(--fuhsa-navy); color: #94a3b8; padding: 100px 5% 40px; border-top: 4px solid var(--fuhsa-gold); }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 80px; }
        .footer-logo { display: flex; align-items: center; gap: 12px; color: #fff; font-size: 1.5rem; font-weight: 700; margin-bottom: 24px; font-family: 'Inter', sans-serif; }
        .footer-desc { line-height: 1.8; margin-bottom: 30px; max-width: 400px; font-size: 0.95rem; }
        .footer h4 { color: #fff; font-family: 'Inter', sans-serif; font-size: 1.1rem; font-weight: 700; margin: 0 0 24px 0; }
        .footer-links { list-style: none; padding: 0; margin: 0; }
        .footer-links li { margin-bottom: 16px; }
        .footer-links a { transition: color 0.3s; }
        .footer-links a:hover { color: var(--fuhsa-gold); }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; font-size: 0.85rem; }

        /* --- RESPONSIVE QUERIES --- */
        @media (max-width: 1024px) {
          .about-grid, .research-grid, .vc-grid, .journal-grid { grid-template-columns: 1fr; gap: 50px; }
          .stats-section { grid-template-columns: repeat(2, 1fr); gap: 40px; }
          .faculties-grid, .news-grid, .events-grid, .departments-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 50px; }
          .hero-title { font-size: 4rem; }
          .poster-title { font-size: 4.5rem; }
          .research-poster { height: 450px; }
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hero-title { font-size: 3rem; }
          .hero-subtitle { font-size: 1rem; }
          .about-title { font-size: 2.2rem; }
          .research-title { font-size: 2.2rem; }
          .section-header h2 { font-size: 2.2rem; }
          .dynamic-header h2 { font-size: 2rem; }
          .faculties-grid, .news-grid, .events-grid, .footer-grid, .departments-grid { grid-template-columns: 1fr; }
          .mission-vision-grid { grid-template-columns: 1fr; }
          .section-padding { padding: 80px 5%; }
          .about-image { height: 400px; }
          .about-badge { padding: 25px; bottom: -15px; left: -15px; }
          .about-badge h4 { font-size: 2.2rem; }
          .vc-image-wrap { height: auto; aspect-ratio: 4/5; }
          .stats-section { grid-template-columns: repeat(2, 1fr); gap: 30px; padding: 60px 5%; }
          .stat-num { font-size: 2.5rem; }
          .poster-title { font-size: 3.5rem; }
          .btn-aceternity, .btn-outline { width: 100%; text-align: center; justify-content: center; }
          .dynamic-header { align-items: flex-start; flex-direction: column; }
          .tour-container { height: 40vh; min-height: 300px; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 2.5rem; }
          .btn-aceternity-inner { padding: 14px 20px; white-space: normal; }
          .stats-section { grid-template-columns: 1fr; gap: 30px; }
          .event-card { flex-direction: column; }
          .event-date { flex-direction: row; gap: 15px; padding: 20px; }
          .news-img { height: 200px; }
          .footer-logo { flex-direction: column; align-items: flex-start; }
          .about-badge p { font-size: 0.75rem; }
        }
      `}</style>

      {/* --- FLOATING AI CHATBOT GUIDE --- */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end pointer-events-none">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
                transformOrigin: "bottom right",
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-[calc(100vw-32px)] sm:w-[380px] max-h-[80vh] mb-4 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-[var(--fuhsa-navy)] p-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <Sparkles className="w-4 h-4 text-[var(--fuhsa-gold)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px] tracking-wide leading-none">
                      FUHSA Guide
                    </h4>
                    <p className="text-[11px] text-green-400 flex items-center gap-1.5 mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      AI Assistant Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 min-h-[250px] sm:min-h-[320px] overflow-y-auto p-5 flex flex-col gap-5 scroll-smooth">
                {messages.map((msg, idx) => (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: msg.sender === "user" ? 10 : -10,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-[14px] leading-relaxed shadow-md ${
                        msg.sender === "user"
                          ? "bg-[var(--fuhsa-gold)] text-[var(--fuhsa-navy)] rounded-tr-sm font-medium"
                          : "bg-white/10 text-slate-100 rounded-tl-sm border border-white/5"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center shadow-md">
                      <div
                        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length < 3 && !isTyping && (
                <div className="px-5 pb-3 flex gap-2 overflow-x-auto hide-scrollbar">
                  {["Admission Requirements", "Courses", "School Fees"].map(
                    (chip) => (
                      <button
                        key={chip}
                        onClick={() => handleQuickAction(chip)}
                        className="whitespace-nowrap text-[12px] font-medium bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 px-3.5 py-2 rounded-full transition-colors shadow-sm"
                      >
                        {chip}
                      </button>
                    ),
                  )}
                </div>
              )}

              {/* Input Area */}
              <form
                onSubmit={handleChatSubmit}
                className="p-4 border-t border-white/10 bg-black/40"
              >
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 pl-4 focus-within:border-[var(--fuhsa-gold)] focus-within:ring-2 focus-within:ring-[var(--fuhsa-gold)]/30 transition-all">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 bg-transparent text-[14px] text-white placeholder:text-slate-400 focus:outline-none w-full"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="w-10 h-10 shrink-0 rounded-full bg-[var(--fuhsa-gold)] flex items-center justify-center text-[var(--fuhsa-navy)] disabled:opacity-30 disabled:bg-slate-700 hover:brightness-110 transition-all shadow-md"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <AnimatePresence>
            {showChatTooltip && !isChatOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-white text-[var(--fuhsa-navy)] text-[13px] font-bold px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-slate-200 relative cursor-pointer hover:bg-slate-50 transition-colors hidden sm:block"
                onClick={() => {
                  setIsChatOpen(true);
                  setShowChatTooltip(false);
                }}
              >
                Need help navigating?
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-slate-200 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => {
              setIsChatOpen(!isChatOpen);
              setShowChatTooltip(false);
            }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--fuhsa-navy)] flex items-center justify-center text-white shadow-[0_10px_40px_rgba(11,28,48,0.5)] border border-white/20 hover:scale-105 transition-transform relative group z-50"
          >
            <div className="absolute inset-0 rounded-full bg-[var(--fuhsa-gold)] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            {isChatOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </button>
        </div>
      </div>

      {/* --- VIDEO MODAL --- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-500">
          <button
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/10 animate-in zoom-in-95 duration-500 delay-150 fill-mode-both">
            <video
              src={RESOLVED_MEDIA_URLS.fuhsaVideo}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* --- Marquee --- */}
      <div
        className="marquee-container"
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 1001 }}
      >
        <div className="marquee-content">
          NOTICE OF ONLINE SCREENING TO PROSPECTIVE CANDIDATES FOR 2026/2027
          ADMISSIONS • WELCOME TO FUHSA AZARE • EXCELLENCE IN HEALTH SCIENCES •
          RESEARCH AND INNOVATION FOR GLOBAL IMPACT •
        </div>
      </div>

      {/* --- Navigation --- */}
      <header
        className={`nav-container ${scrolled ? "scrolled" : ""}`}
        style={{ top: "35px" }}
      >
        <div className="logo-wrap">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white border border-white/10 shadow-sm relative shrink-0">
            <img
              src={RESOLVED_MEDIA_URLS.logo}
              alt="FUHSA Logo"
              className="w-full h-full object-cover relative z-10"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.innerHTML =
                  '<span class="text-[#0B1C30] font-bold text-xl">F</span>';
              }}
            />
          </div>
          <div>
            <div className="logo-text">FUHSA</div>
            <div className="logo-sub">AZARE, BAUCHI STATE</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links hidden md:flex items-center">
          <Link href="/" style={{ color: "var(--fuhsa-gold)" }}>
            Home
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[var(--fuhsa-gold)] cursor-pointer bg-transparent border-none text-inherit font-inherit p-0">
              Institutional{" "}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="absolute top-full left-0 w-48 bg-[var(--fuhsa-navy)] border border-white/10 rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
              <Link
                href="/institutional-data"
                className="block px-4 py-2 hover:bg-white/5"
              >
                Institutional Data
              </Link>
              <Link
                href="/annual-budget"
                className="block px-4 py-2 hover:bg-white/5"
              >
                Annual Budget
              </Link>
              <Link href="#" className="block px-4 py-2 hover:bg-white/5">
                Needs Assessment
              </Link>
              <Link href="#" className="block px-4 py-2 hover:bg-white/5">
                Key Info Data
              </Link>
            </div>
          </div>
          <Link href="https://fuhsa.admissions.cloud/">Academics</Link>
          <Link href="https://fuhsa.admissions.cloud/">Admission</Link>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[var(--fuhsa-gold)] cursor-pointer bg-transparent border-none text-inherit font-inherit p-0">
              Resources{" "}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="absolute top-full left-0 w-48 bg-[var(--fuhsa-navy)] border border-white/10 rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
              {resourceLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[var(--fuhsa-gold)] cursor-pointer bg-transparent border-none text-inherit font-inherit p-0">
              Portal{" "}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className="absolute top-full left-0 w-52 bg-[var(--fuhsa-navy)] border border-white/10 rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
              {portalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="https://library.fuhsa.edu.ng/">Library</Link>
        </nav>

        <div className="hidden md:block">
          <Link
            href="https://fuhsa.safsrms.com/"
            className="btn-aceternity"
            style={{ padding: 1 }}
          >
            <span
              className="btn-aceternity-inner"
              style={{
                padding: "10px 24px",
                background: scrolled ? "var(--fuhsa-navy)" : "transparent",
              }}
            >
              Student Login
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[90px] bg-[var(--fuhsa-navy)] border-b border-white/10 shadow-2xl z-[999] md:hidden flex flex-col p-6 gap-4"
          >
            <Link
              href="/"
              className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
            >
              Home
            </Link>
            <Link
              href="/programs"
              className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
            >
              Academics
            </Link>
            <Link
              href="https://fuhsa.admissions.cloud/"
              className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
            >
              Admission
            </Link>
            <Link
              href="/institutional-data"
              className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
            >
              Institutional Data
            </Link>
            <Link
              href="/annual-budget"
              className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
            >
              Annual Budget
            </Link>
            {portalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://fuhsa.safsrms.com/"
              className="bg-[var(--fuhsa-gold)] text-[var(--fuhsa-navy)] text-center font-bold py-3 rounded-lg mt-4"
            >
              Student Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Cinematic Hero Section --- */}
      <section className="hero-section">
        <div className="spotlight-wrapper">
          <div className="spotlight"></div>
        </div>
        <div className="slideshow">
          <div className="slide slide-1"></div>
          <div className="slide slide-2"></div>
          <div className="slide slide-3"></div>
          <div className="slide slide-4"></div>
          <div className="slide slide-5"></div>
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-badge">ESTABLISHED 2021 | BAUCHI STATE</div>
          <h1 className="hero-title">
            Empowering the{" "}
            <span
              className="serif-font text-gold"
              style={{ fontStyle: "italic" }}
            >
              Next
              <br />
              Generation
            </span>{" "}
            of Health
            <br />
            Leaders
          </h1>
          <p className="hero-subtitle">
            Excellence in specialized Health Education, Research, and Community
            Service at the Federal University of Health Sciences, Azare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="https://fuhsa.admissions.cloud/"
              className="btn-aceternity"
            >
              <span className="btn-aceternity-inner">Apply Now &rarr;</span>
            </Link>
            <Link href="/programs" className="btn-outline">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section className="section-padding">
        <div className="about-grid">
          <div>
            <h2 className="about-title serif-font">
              Pioneering Excellence in Health Sciences
            </h2>
            <p className="about-text">
              Located in Bauchi State, the Federal University of Health
              Sciences, Azare (FUHSA) was founded to bridge the gap in
              healthcare manpower through world-class education and cutting-edge
              medical research.
            </p>
            <div className="mission-vision-grid">
              <div className="mv-box">
                <h4 className="mv-title">Our Mission</h4>
                <p>
                  To produce highly skilled health professionals who are
                  globally competitive.
                </p>
              </div>
              <div className="mv-box">
                <h4 className="mv-title">Our Vision</h4>
                <p>
                  To be a leading center of excellence in health sciences
                  education and innovation.
                </p>
              </div>
            </div>
          </div>
          <div className="about-image-wrapper">
            <div className="about-image"></div>
            <div className="about-badge">
              <h4>100%</h4>
              <p>Specialized Focus</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- VC Welcome Message --- */}
      <section className="section-padding vc-section">
        <div className="vc-grid">
          <div className="vc-image-wrap">
            <img
              src={RESOLVED_MEDIA_URLS.vcImage}
              alt="Prof. Bala Muhammad Audu"
              className="vc-image"
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background:
                  "linear-gradient(to top, var(--fuhsa-navy), transparent)",
                padding: "40px 20px 20px",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  margin: 0,
                  fontWeight: 700,
                  fontSize: "1.2rem",
                }}
              >
                Prof. Bala Muhammad Audu
              </div>
              <div className="vc-title">Vice Chancellor</div>
            </div>
          </div>
          <div className="vc-content">
            <div className="vc-quote-icon">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H3.017V21H5.017Z" />
              </svg>
            </div>
            <h2
              className="serif-font"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.5rem)",
                marginBottom: "30px",
                color: "var(--fuhsa-navy)",
              }}
            >
              Vice Chancellor's Welcome Message
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "var(--text-muted)",
                marginBottom: "30px",
              }}
            >
              Welcome to the Federal University of Health Sciences, Azare
              (FUHSA). We are committed to excellence in health sciences
              education, research, and innovation. Our goal is to develop
              competent healthcare professionals who will contribute
              meaningfully to society. Thank you for visiting our website, and
              we invite you to explore the opportunities available at FUHSA.
            </p>
            <div className="vc-name" style={{ margin: 0 }}>
              Prof. Bala Muhammad Audu
            </div>
            <div className="vc-title">Vice Chancellor</div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="#" className="btn-aceternity">
                <span className="btn-aceternity-inner">View Full Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Stats Strip --- */}
      <section className="stats-section">
        <div>
          <div className="stat-num">5</div>
          <div className="stat-label">Faculties</div>
        </div>
        <div>
          <div className="stat-num">26</div>
          <div className="stat-label">Departments</div>
        </div>
        <div>
          <div className="stat-num">5000+</div>
          <div className="stat-label">Students</div>
        </div>
        <div>
          <div className="stat-num">100%</div>
          <div className="stat-label">Health Sciences Focus</div>
        </div>
      </section>

      {/* --- Departments List --- */}
      <section className="section-padding departments-section">
        <div className="section-header">
          <h2 className="serif-font">Faculties & Departments</h2>
          <p>
            FUHSA's academic structure spans 5 faculties and 26 departments and
            programmes across health sciences and supporting sciences.
          </p>
        </div>
        <div className="departments-grid">
          {departmentGroups.map((group) => (
            <div className="department-card" key={group.faculty}>
              <h3>{group.faculty}</h3>
              <ul className="department-list">
                {group.departments.map((department) => (
                  <li key={department}>{department}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* --- Academic Faculties --- */}
      <section id="academics" className="section-padding faculties-section">
        <div className="section-header">
          <h2 className="serif-font">Academic Departments</h2>
          <p>
            Explore our range of undergraduate and postgraduate programs
            designed to build professional expertise.
          </p>
        </div>

        <div className="faculties-grid">
          <div className="glare-card">
            <div className="faculty-icon">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="faculty-title">Medicine & Surgery</h3>
            <p className="faculty-desc">
              MBBS program focused on clinical excellence and ethical medical
              practice.
            </p>
            <Link href="#" className="faculty-link">
              Learn More &rarr;
            </Link>
          </div>
          <div className="glare-card">
            <div className="faculty-icon">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3 className="faculty-title">Nursing Sciences</h3>
            <p className="faculty-desc">
              Comprehensive training for empathetic and highly skilled
              healthcare support.
            </p>
            <Link href="#" className="faculty-link">
              Learn More &rarr;
            </Link>
          </div>
          <div className="glare-card">
            <div className="faculty-icon">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="faculty-title">Public Health</h3>
            <p className="faculty-desc">
              Addressing global health challenges through community-based
              strategies.
            </p>
            <Link href="#" className="faculty-link">
              Learn More &rarr;
            </Link>
          </div>
          <div className="glare-card">
            <div className="faculty-icon">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 2v7.31" />
                <path d="M14 9.3V1.99" />
                <path d="M8.5 2h7" />
                <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
              </svg>
            </div>
            <h3 className="faculty-title">Medical Laboratory</h3>
            <p className="faculty-desc">
              Advanced diagnostic training using modern laboratory equipment.
            </p>
            <Link href="#" className="faculty-link">
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* --- Research Section --- */}
      <section id="research" className="section-padding research-section">
        <div className="meteor m1"></div>
        <div className="meteor m2"></div>
        <div className="meteor m3"></div>
        <div className="research-grid">
          <div>
            <h2 className="research-title serif-font">
              Advancing Global Health Through Innovation
            </h2>
            <ul className="research-list">
              <li>
                <div className="research-num">01</div>
                <div>
                  <h4>Tropical Medicine</h4>
                  <p>
                    Leading research on neglected tropical diseases prevalent in
                    Northern Nigeria.
                  </p>
                </div>
              </li>
              <li>
                <div className="research-num">02</div>
                <div>
                  <h4>Public Health Surveillance</h4>
                  <p>
                    Collaborating with international partners for
                    epidemiological monitoring.
                  </p>
                </div>
              </li>
              <li>
                <div className="research-num">03</div>
                <div>
                  <h4>Health Technology</h4>
                  <p>
                    Innovating digital health solutions for rural health service
                    delivery.
                  </p>
                </div>
              </li>
            </ul>
            <div className="w-full sm:w-auto">
              <a
                href="#research-center"
                className="inline-block text-center w-full sm:w-auto"
                style={{
                  background: "#fff",
                  color: "var(--fuhsa-navy)",
                  padding: "14px 32px",
                  borderRadius: "999px",
                  fontWeight: 600,
                }}
              >
                View Research Center
              </a>
            </div>
          </div>
          <div className="research-poster">
            <div className="research-grid-bg"></div>
            <div className="research-glow"></div>
            <div className="research-inner-content">
              <span className="poster-tag">Research</span>
              <h3 className="poster-title">FUHSA</h3>
              <span className="poster-motto">
                Excellence in Health Innovation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Virtual Tour Section --- */}
      <section className="section-padding tour-section">
        <div className="section-header">
          <h2 className="serif-font">Campus Virtual Tour</h2>
          <p>
            Step inside our state-of-the-art clinical laboratories and lecture
            halls.
          </p>
        </div>
        <div className="tour-container" onClick={() => setIsVideoOpen(true)}>
          <div className="play-btn">
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </section>

      {/* --- Journals & Conferences --- */}
      <section className="section-padding journal-section">
        <div className="section-header">
          <h2 className="serif-font">Academic Resources & Research</h2>
          <p>
            Access our latest publications and upcoming scientific gatherings.
          </p>
        </div>
        <div className="journal-grid">
          <div className="info-card">
            <span className="info-tag">PUBLICATIONS</span>
            <h3
              className="serif-font"
              style={{ fontSize: "1.8rem", marginBottom: "20px" }}
            >
              The Scholar Journal of Health Sciences
            </h3>
            <p
              className="flex-1"
              style={{ marginBottom: "30px", lineHeight: 1.7 }}
            >
              FUHSA's premier peer-reviewed journal dedicated to disseminating
              high-quality research findings in various health science
              disciplines.
            </p>
            <div className="w-full sm:w-auto">
              <a
                href="https://thescholarjournalfuhsa.com/index.php/tsj"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aceternity w-full sm:w-auto"
              >
                <span className="btn-aceternity-inner">
                  Access Journal &rarr;
                </span>
              </a>
            </div>
          </div>
          <div className="info-card">
            <span className="info-tag">CONFERENCES</span>
            <h3
              className="serif-font"
              style={{ fontSize: "1.8rem", marginBottom: "20px" }}
            >
              MDCAN Scientific Conference 2025
            </h3>
            <p
              className="flex-1"
              style={{
                fontWeight: 700,
                marginBottom: "10px",
                color: "var(--fuhsa-navy)",
              }}
            >
              Theme: Strengthening Nigeria's Health System Through Workforce
              Excellence, Innovation and Sustainable Partnership.
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                marginBottom: "30px",
              }}
            >
              Published: 09-03-2026 • FUHSA Teaching Hospital, Azare.
            </p>
            <div className="w-full sm:w-auto">
              <Link href="#" className="btn-aceternity w-full sm:w-auto">
                <span className="btn-aceternity-inner">View Details</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Dynamic Events Section --- */}
      <section className="section-padding" style={{ background: "#fff" }}>
        <div className="dynamic-header">
          <div>
            <h2 className="serif-font">Upcoming Events</h2>
            <p style={{ margin: "10px 0 0 0", fontSize: "1.1rem" }}>
              Mark your calendars for these important dates.
            </p>
          </div>
          <a href="#calendar" className="view-link">
            Full Calendar &rarr;
          </a>
        </div>
        {loading ? (
          <div className="events-grid">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row bg-white border border-slate-200 rounded-lg overflow-hidden h-auto sm:h-[120px]"
              >
                <div className="w-full sm:w-[110px] h-[100px] sm:h-full skeleton-bg"></div>
                <div className="p-6 w-full flex flex-col justify-center space-y-3">
                  <div className="h-4 skeleton-bg rounded w-3/4"></div>
                  <div className="h-3 skeleton-bg rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="events-grid">
            {eventsData.map((event) => (
              <div
                key={event.id}
                className={`event-card ${event.highlight ? "highlight" : ""}`}
              >
                <div className="event-date">
                  <span>{event.date}</span>
                  <span>{event.month}</span>
                </div>
                <div className="event-details">
                  <h4>{event.title}</h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      margin: "0 0 15px 0",
                    }}
                  >
                    {event.time} | {event.location}
                  </p>
                  <a
                    href={event.link}
                    style={{
                      fontWeight: 700,
                      color: event.highlight
                        ? "var(--fuhsa-gold)"
                        : "var(--fuhsa-navy)",
                    }}
                  >
                    {event.highlight ? "Details" : "Register"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Dynamic News Section --- */}
      <section
        className="section-padding"
        style={{ background: "var(--bg-light)" }}
      >
        <div className="dynamic-header">
          <div>
            <h2 className="serif-font">Latest News</h2>
            <p style={{ margin: "10px 0 0 0", fontSize: "1.1rem" }}>
              Stay updated with the heartbeat of FUHSA.
            </p>
          </div>
          <a href="/news" className="view-link">
            View All Updates &rarr;
          </a>
        </div>
        {loading ? (
          <div className="news-grid">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white"
              >
                <div className="w-full h-[240px] skeleton-bg"></div>
                <div className="p-8 space-y-4">
                  <div className="h-3 skeleton-bg rounded w-1/4"></div>
                  <div className="h-6 skeleton-bg rounded w-full"></div>
                  <div className="h-6 skeleton-bg rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="news-grid">
            {newsData.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="glare-card"
                style={{ padding: 0 }}
              >
                <div style={{ overflow: "hidden" }}>
                  <img
                    src={item.image_url || item.img}
                    alt={item.title}
                    className="news-img"
                  />
                </div>
                <div className="news-content">
                  <span className="news-tag">{item.tag || "NEWS"}</span>
                  <h3 className="news-title serif-font">{item.title}</h3>
                  <p
                    className="flex-1"
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      margin: "0 0 20px 0",
                    }}
                  >
                    {item.summary || item.excerpt}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      color: "#94a3b8",
                      borderTop: "1px solid #f1f5f9",
                      paddingTop: "15px",
                    }}
                  >
                    <span>
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString()
                        : item.date}
                    </span>
                    <span>{item.readTime || "Read More"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* --- Footer --- */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shrink-0">
                <img
                  src={RESOLVED_MEDIA_URLS.logo}
                  alt="FUHSA Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<span class="text-[#0B1C30] font-bold text-xl">F</span>';
                  }}
                />
              </div>
              FUHSA
            </div>
            <p className="footer-desc">
              The Federal University of Health Sciences, Azare, is dedicated to
              the advancement of health education, research, and service.
            </p>
            <div style={{ marginTop: "20px" }}>
              <h4>Institutional</h4>
              <ul className="footer-links">
                <li>
                  <Link href="/institutional-data">Institutional Data</Link>
                </li>
                <li>
                  <Link href="/annual-budget">Annual Budget</Link>
                </li>
                <li>
                  <a href="#">Needs Assessment</a>
                </li>
                <li>
                  <a href="#">Key Info Data</a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link href="https://fuhsa.admissions.cloud/">Admission</Link>
              </li>
              <li>
                <a href="#">Campus Life</a>
              </li>
              <li>
                <a href="#">University Bulletin</a>
              </li>
              <li>
                <a href="#">Internal Audit</a>
              </li>
              <li>
                <a href="#">Records</a>
              </li>
              <li>
                <a href="#">Extension of arm</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul className="footer-links">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <a href="#">Alumni</a>
              </li>
              <li>
                <a href="#">Bursary</a>
              </li>
              <li>
                <a href="#">ICT Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul className="footer-links" style={{ lineHeight: 1.8 }}>
              <li>Along Azare-Kano Road, Azare, Bauchi State, Nigeria.</li>
              <li>info@fuhsa.edu.ng</li>
              <li>+234 800 FUHSA HELP</li>
            </ul>
            <div style={{ marginTop: "30px" }}>
              <h4>Governance</h4>
              <ul className="footer-links">
                <li>
                  <a href="#">Directorate</a>
                </li>
                <li>
                  <a href="#">Research & Partnership</a>
                </li>
                <li>
                  <a href="#">Feedback</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom flex flex-col md:flex-row gap-4 items-center justify-between text-center md:text-left text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} FEDERAL UNIVERSITY OF HEALTH
            SCIENCES, AZARE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              TERMS OF USE
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
