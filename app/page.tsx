// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Send, Sparkles, Bot, Menu } from "lucide-react";
// import { RESOLVED_MEDIA_URLS } from "./constants/media";

// type Event = {
//   id: number;
//   date: string;
//   month: string;
//   title: string;
//   time: string;
//   location: string;
//   link: string;
//   highlight?: boolean;
// };

// type News = {
//   id: number;
//   tag: string;
//   title: string;
//   excerpt: string;
//   date: string;
//   readTime: string;
//   img: string;
//   link: string;
// };

// const fallbackNewsData: News[] = [
//   {
//     id: 1,
//     tag: "ANNOUNCEMENTS",
//     title: "Orientation for 2025/2026 New Intakes",
//     excerpt:
//       "Official welcome ceremony and orientation schedule released for all faculties...",
//     date: "Oct 12, 2025",
//     readTime: "5 min read",
//     img: RESOLVED_MEDIA_URLS.announcement,
//     link: "#",
//   },
//   {
//     id: 2,
//     tag: "RESEARCH",
//     title: "FUHSA Researchers Unveil Findings on Local Herb Properties",
//     excerpt:
//       "A breakthrough study published in the Global Health Journal by our Pharmaceutical Sciences team...",
//     date: "Oct 08, 2025",
//     readTime: "8 min read",
//     img: RESOLVED_MEDIA_URLS.lab,
//     link: "#",
//   },
//   {
//     id: 3,
//     tag: "CAMPUS LIFE",
//     title: "Inter-Faculty Sports Week Commences",
//     excerpt:
//       "Students from all faculties participate in the annual sporting event to foster unity and fitness...",
//     date: "Sep 25, 2025",
//     readTime: "3 min read",
//     img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
//     link: "#",
//   },
// ];

// const fallbackEventsData: Event[] = [
//   {
//     id: 1,
//     date: "25",
//     month: "OCT",
//     title: "Annual Health Symposium",
//     time: "09:00 AM",
//     location: "Main Auditorium",
//     link: "#",
//   },
//   {
//     id: 2,
//     date: "12",
//     month: "NOV",
//     title: "Matriculation Ceremony",
//     time: "10:00 AM",
//     location: "University Square",
//     link: "#",
//     highlight: true,
//   },
//   {
//     id: 3,
//     date: "05",
//     month: "DEC",
//     title: "Research Grant Workshop",
//     time: "02:00 PM",
//     location: "Senate Building",
//     link: "#",
//   },
// ];

// export default function FuhsaAceternityLanding() {
//   const [scrolled, setScrolled] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isVideoOpen, setIsVideoOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // --- UPGRADED CHATBOT STATE & LOGIC ---
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [showChatTooltip, setShowChatTooltip] = useState(false);
//   const [chatInput, setChatInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "Hi there! 👋 Welcome to FUHSA. How can I help you today?",
//     },
//   ]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Smart Knowledge Base
//   const generateBotResponse = (input: string) => {
//     const query = input.toLowerCase();

//     if (
//       query.includes("admission") ||
//       query.includes("apply") ||
//       query.includes("post utme")
//     ) {
//       return "Admissions for the 2026/2027 session are currently open! You need a minimum JAMB score of 220. Click 'Admission' in the top menu to start your Post-UTME screening.";
//     }
//     if (
//       query.includes("course") ||
//       query.includes("program") ||
//       query.includes("faculty")
//     ) {
//       return "We offer fully accredited programs in Medicine & Surgery (MBBS), Nursing Sciences, Public Health, Dentistry, Medical Laboratory Science, and Human Anatomy. You can explore the 'Academics' page for full details.";
//     }
//     if (
//       query.includes("fee") ||
//       query.includes("pay") ||
//       query.includes("school fee")
//     ) {
//       return "The Post-UTME screening fee is a non-refundable ₦2,000 payable via Remita. For full tuition and hostel details, please log in to your student dashboard.";
//     }
//     if (
//       query.includes("where") ||
//       query.includes("location") ||
//       query.includes("address")
//     ) {
//       return "FUHSA is located along Azare-Kano Road, Azare, Bauchi State, Nigeria. We have a beautiful campus equipped with state-of-the-art medical facilities!";
//     }
//     if (
//       query.includes("contact") ||
//       query.includes("help") ||
//       query.includes("phone")
//     ) {
//       return "You can reach our helpdesk at info@fuhsa.edu.ng or call +234 800 FUHSA HELP. Our team is available Monday to Friday, 9:00 AM to 4:00 PM.";
//     }
//     if (
//       query.includes("hi") ||
//       query.includes("hello") ||
//       query.includes("hey")
//     ) {
//       return "Hello! I'm the FUHSA AI Assistant. Are you a prospective student, or are you looking for specific campus information?";
//     }
//     if (
//       query.includes("jamb") ||
//       query.includes("cut off") ||
//       query.includes("score")
//     ) {
//       return "The general cut-off mark for most programs is 220. However, highly competitive courses like Medicine & Surgery (MBBS) may require higher scores.";
//     }

//     return "That's a great question! While I don't have the exact answer right now, our Admissions team would love to help. You can email them directly at admissions@fuhsa.edu.ng.";
//   };

//   const handleChatSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!chatInput.trim()) return;

//     const userMessage = chatInput.trim();
//     setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
//     setChatInput("");
//     setIsTyping(true);
//     setShowChatTooltip(false);

//     // Simulate AI Processing time for realism
//     setTimeout(() => {
//       setIsTyping(false);
//       const botResponse = generateBotResponse(userMessage);
//       setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
//     }, 1200);
//   };

//   const handleQuickAction = (text: string) => {
//     setChatInput(text);
//     setTimeout(
//       () => handleChatSubmit({ preventDefault: () => {} } as React.FormEvent),
//       50,
//     );
//   };

//   // Auto-scroll chat
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, isTyping]);

//   // Chatbot Initial Tooltip Timer
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!isChatOpen) setShowChatTooltip(true);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [isChatOpen]);

//   // --- GENERAL EFFECTS ---
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isVideoOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "auto";
//   }, [isVideoOpen]);

//   // --- DATA ---
//   const [newsData, setNewsData] = useState<any[]>([]);
//   const [eventsData, setEventsData] = useState<any[]>([]);

//   const portalLinks = [
//     { label: "Student Portal", href: "https://fuhsa.safsrms.com/" },
//     { label: "Admission Portal", href: "https://fuhsa.admissions.cloud/" },
//     {
//       label: "Remedial Portal",
//       href: "https://fuhsa_remedial.admissions.cloud/",
//     },
//     {
//       label: "Inter/Intra Transfer",
//       href: "https://applicant.safapply.com/fuhsa",
//     },
//   ];

//   const resourceLinks = [
//     { label: "TETFund", href: "https://tetfund.gov.ng/" },
//     { label: "NUC", href: "https://www.nuc.edu.ng/" },
//     {
//       label: "Ministry of Edu",
//       href: "https://education.gov.ng/our-structure/",
//     },
//   ];

//   const departmentGroups = [
//     {
//       faculty: "Faculty of Allied Health Sciences",
//       departments: [
//         "Department of Audiology",
//         "Department of Health Information Management",
//         "Department of Medical Laboratory Science",
//         "Department of Nursing",
//         "Department of Occupational Therapy",
//         "Department of Optometry",
//         "Department of Physiotherapy",
//         "Department of Radiography",
//         "Department of Speech Language Therapy",
//       ],
//     },
//     {
//       faculty: "Faculty of Integrated Health Sciences",
//       departments: [
//         "Department of Anatomy",
//         "Department of Biochemistry",
//         "Department of Environmental Health",
//         "Department of Microbiology",
//         "Department of Nutrition and Dietetics",
//         "Department of Pharmacology",
//         "Department of Physiology",
//         "Department of Public Health",
//       ],
//     },
//     {
//       faculty: "Faculty of Science",
//       departments: [
//         "Department of Biology",
//         "Department of Biostatistics",
//         "Department of Biotechnology",
//         "Department of Chemistry",
//         "Department of Information Technology and Health Informatics",
//         "Department of Mathematics",
//         "Department of Physics",
//       ],
//     },
//     {
//       faculty: "College of Medical Sciences",
//       departments: ["MBBS"],
//     },
//     {
//       faculty: "Dentistry",
//       departments: ["Dentistry"],
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/public/announcements");
//         const contentType = response.headers.get("content-type") ?? "";

//         if (!response.ok || !contentType.includes("application/json")) {
//           throw new Error("Announcements endpoint did not return JSON.");
//         }

//         const data = await response.json();
//         const announcements = Array.isArray(data) ? data : [];

//         // Split data into news (with image/summary) and events (by tag or type)
//         const news = announcements.filter(
//           (item: any) => item.image_url || item.summary,
//         );
//         const events = announcements.filter(
//           (item: any) => !item.image_url && !item.summary,
//         );

//         setNewsData(news.length > 0 ? news : fallbackNewsData);
//         setEventsData(events.length > 0 ? events : fallbackEventsData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setNewsData(fallbackNewsData);
//         setEventsData(fallbackEventsData);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="aceternity-wrapper relative min-h-screen">
//       <style>{`
//         /* Typography */
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&display=swap');

//         :root {
//           --fuhsa-navy: #0B1C30;
//           --fuhsa-navy-light: #152b47;
//           --fuhsa-gold: #DDA83A;
//           --fuhsa-teal: #5CB8A5;
//           --text-dark: #0f172a;
//           --text-muted: #64748b;
//           --bg-light: #f8fafc;
//         }

//         html { scroll-behavior: smooth; }
//         body { margin: 0; background-color: #fff; color: var(--text-muted); font-family: 'Inter', sans-serif; overflow-x: hidden; }
//         a { text-decoration: none; color: inherit; transition: all 0.3s ease; }
//         * { box-sizing: border-box; }

//         h1, h2, h3, .serif-font { font-family: 'Playfair Display', serif; color: var(--text-dark); }
//         .text-gold { color: var(--fuhsa-gold); }

//         /* Aceternity Spotlights, Meteors, and Hover States */
//         .spotlight-wrapper { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 2; }
//         .spotlight {
//           position: absolute; top: -20%; left: 50%; transform: translateX(-50%); width: 100vw; height: 100vh;
//           background: radial-gradient(ellipse at center, rgba(92, 184, 165, 0.15) 0%, transparent 70%);
//           filter: blur(50px); animation: pulseSpotlight 10s ease-in-out infinite alternate;
//         }
//         .meteor { position: absolute; top: -50px; width: 2px; height: 50px; background: linear-gradient(to bottom, transparent, var(--fuhsa-gold)); transform: rotate(45deg); animation: meteorShower 6s linear infinite; opacity: 0; z-index: 1; }
//         .meteor::before { content: ''; position: absolute; bottom: 0; left: -2px; width: 6px; height: 6px; border-radius: 50%; background: #fff; box-shadow: 0 0 10px 2px var(--fuhsa-gold); }
//         .m1 { left: 20%; animation-delay: 1s; animation-duration: 5s; }
//         .m2 { left: 50%; animation-delay: 3s; animation-duration: 6s; }
//         .m3 { left: 80%; animation-delay: 2s; animation-duration: 4.5s; }

//         .btn-aceternity { position: relative; display: inline-flex; padding: 2px; border-radius: 999px; overflow: hidden; cursor: pointer; text-align: center; }
//         .btn-aceternity::before { content: ''; position: absolute; inset: -100%; background: conic-gradient(from 0deg, transparent 0 340deg, var(--fuhsa-gold) 360deg); animation: spin 3s linear infinite; }
//         .btn-aceternity-inner { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: var(--fuhsa-navy); border-radius: 999px; padding: 14px 36px; font-weight: 600; color: #fff; z-index: 1; font-size: 0.95rem; transition: background 0.3s ease; white-space: nowrap; }
//         .btn-aceternity:hover .btn-aceternity-inner { background: rgba(11, 28, 48, 0.8); }
//         .btn-outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.4); padding: 16px 36px; border-radius: 999px; font-weight: 600; display: inline-flex; justify-content: center; text-align: center; transition: all 0.3s ease; }
//         .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

//         .glare-card { position: relative; border-radius: 12px; background: #fff; border: 1px solid #f1f5f9; padding: 40px 24px; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; transform-style: preserve-3d; }
//         .glare-card:hover { transform: translateY(-10px); box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.1); border-color: rgba(92, 184, 165, 0.3); }
//         .glare-card::after { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent); transform: skewX(-20deg); transition: 0.7s; z-index: 1; pointer-events: none; }
//         .glare-card:hover::after { left: 200%; }

//         @keyframes spin { 100% { transform: rotate(360deg); } }
//         @keyframes kenBurns { 0% { transform: scale(1); opacity: 0; } 5% { opacity: 0.6; } 30% { opacity: 0.6; } 35% { transform: scale(1.1); opacity: 0; } 100% { transform: scale(1.1); opacity: 0; } }
//         @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes pulseSpotlight { 0% { transform: translateX(-50%) scale(1); opacity: 0.6; } 100% { transform: translateX(-50%) scale(1.3); opacity: 1; } }
//         @keyframes meteorShower { 0% { transform: rotate(45deg) translateY(-200px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: rotate(45deg) translateY(1000px); opacity: 0; } }
//         @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
//         @keyframes floatText { 0%, 100% { transform: translateZ(50px) translateY(0); } 50% { transform: translateZ(50px) translateY(-12px); } }
//         @keyframes pulseGlow { 0% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.9); } 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); } }

//         .skeleton-bg { background-color: #e2e8f0; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

//         /* Layout */
//         .nav-container { position: fixed; top: 0; width: 100%; z-index: 1000; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; transition: all 0.4s ease; border-bottom: 1px solid rgba(255,255,255,0.1); color: #fff; }
//         .nav-container.scrolled { background: rgba(11, 28, 48, 0.95); backdrop-filter: blur(16px); padding: 15px 5%; border-bottom: 1px solid rgba(255,255,255,0.05); }
//         .logo-wrap { display: flex; align-items: center; gap: 12px; cursor: pointer; }
//         .logo-text { font-weight: 700; font-size: 1.1rem; letter-spacing: 0.05em; line-height: 1.2; }
//         .logo-sub { font-size: 0.65rem; color: var(--fuhsa-gold); letter-spacing: 0.1em; font-weight: 600; }

//         .nav-links { display: flex; gap: 32px; font-size: 0.85rem; font-weight: 500; }
//         .nav-links a, .nav-links button { position: relative; }
//         .nav-links a::after { content: ''; position: absolute; width: 0; height: 2px; bottom: -4px; left: 0; background: var(--fuhsa-gold); transition: 0.3s; }
//         .nav-links a:hover::after { width: 100%; }

//         .hero-section { position: relative; height: 100vh; display: flex; align-items: center; padding: 0 5%; overflow: hidden; background: var(--fuhsa-navy); }
//         .slide { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; animation: kenBurns 24s infinite; }
//         .slide-1 { background: url('${RESOLVED_MEDIA_URLS.slide1}') center/cover no-repeat; animation-delay: 0s; }
//         .slide-2 { background: url('${RESOLVED_MEDIA_URLS.slide2}') center/cover no-repeat; animation-delay: 8s; }
//         .slide-3 { background: url('${RESOLVED_MEDIA_URLS.slide3}') center/cover no-repeat; animation-delay: 16s; }
//         .slide-4 { background: url('${RESOLVED_MEDIA_URLS.slide4}') center/cover no-repeat; animation-delay: 24s; }
//         .slide-5 { background: url('${RESOLVED_MEDIA_URLS.slide5}') center/cover no-repeat; animation-delay: 32s; }
//         .hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(11,28,48,0.95) 0%, rgba(11,28,48,0.7) 50%, rgba(11,28,48,0.3) 100%); z-index: 1; }

//         .hero-content { position: relative; z-index: 10; max-width: 850px; color: #fff; margin-top: 40px; animation: fadeUp 1s ease forwards; }
//         .hero-badge { display: inline-flex; align-items: center; gap: 10px; color: var(--fuhsa-gold); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; margin-bottom: 24px; text-transform: uppercase; }
//         .hero-badge::before { content: ''; display: block; width: 30px; height: 2px; background: var(--fuhsa-gold); }
//         .hero-title { font-size: 5.5rem; font-weight: 700; line-height: 1.05; margin: 0 0 24px 0; color: #fff; }
//         .hero-subtitle { font-size: 1.15rem; line-height: 1.7; max-width: 650px; margin-bottom: 40px; color: #cbd5e1; }

//         .section-padding { padding: 120px 5%; }
//         .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
//         .about-title { font-size: 3rem; font-weight: 700; margin-bottom: 24px; color: var(--fuhsa-navy); }
//         .about-text { font-size: 1.1rem; line-height: 1.8; margin-bottom: 40px; }

//         .mission-vision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
//         .mv-box { background: var(--bg-light); padding: 30px 24px; border-left: 4px solid var(--fuhsa-gold); border-radius: 0 8px 8px 0; }
//         .mv-title { font-weight: 700; color: var(--fuhsa-navy); margin: 0 0 12px 0; font-size: 1.1rem; }

//         .about-image-wrapper { position: relative; perspective: 1000px; width: 100%; }
//         .about-image { width: 100%; height: 550px; border-radius: 12px; background-image: url('${RESOLVED_MEDIA_URLS.labb}'); background-size: cover; background-position: center; box-shadow: 0 30px 60px rgba(0,0,0,0.15); transition: transform 0.5s; transform: rotateY(-5deg); }
//         .about-image-wrapper:hover .about-image { transform: rotateY(0deg); }
//         .about-badge { position: absolute; bottom: -30px; left: -30px; background: var(--fuhsa-gold); padding: 40px; border-radius: 12px; color: var(--fuhsa-navy); box-shadow: 0 20px 40px rgba(221, 168, 58, 0.3); z-index: 2; }
//         .about-badge h4 { margin: 0; font-size: 3rem; font-weight: 700; line-height: 1; font-family: 'Inter', sans-serif; }
//         .about-badge p { margin: 5px 0 0 0; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

//         .stats-section { background: var(--fuhsa-navy); color: #fff; padding: 80px 5%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center; position: relative; overflow: hidden; }
//         .stat-num { color: var(--fuhsa-gold); font-size: 3.5rem; font-weight: 700; margin-bottom: 8px; }
//         .stat-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; color: #e2e8f0; }

//         /* Marquee */
//         .marquee-container { background: var(--fuhsa-gold); color: var(--fuhsa-navy); padding: 8px 0; overflow: hidden; white-space: nowrap; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(0,0,0,0.1); }
//         .marquee-content { display: inline-block; animation: marquee 30s linear infinite; padding-left: 100%; }
//         @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }

//         /* VC Message Section */
//         .vc-section { background: #fff; }
//         .vc-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; align-items: center; }
//         .vc-image-wrap { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); aspect-ratio: 4/5; width: 100%; }
//         .vc-image { width: 100%; height: 100%; object-fit: cover; }
//         .vc-content { position: relative; }
//         .vc-quote-icon { color: var(--fuhsa-gold); opacity: 0.2; margin-bottom: 20px; }
//         .vc-name { font-size: 1.5rem; font-weight: 700; color: var(--fuhsa-navy); margin-top: 30px; }
//         .vc-title { color: var(--fuhsa-gold); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; }

//         /* Journal & Conference */
//         .journal-section { background: var(--bg-light); }
//         .journal-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; }
//         .info-card { background: #fff; padding: 40px; border-radius: 16px; border: 1px solid #e2e8f0; height: 100%; transition: 0.3s; display: flex; flex-direction: column; }
//         .info-card:hover { border-color: var(--fuhsa-gold); box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
//         .info-tag { display: inline-block; width: fit-content; padding: 4px 12px; border-radius: 4px; background: rgba(92, 184, 165, 0.1); color: var(--fuhsa-teal); font-weight: 700; font-size: 0.7rem; margin-bottom: 20px; }

//         .faculties-section { background: var(--bg-light); text-align: center; }
//         .section-header { max-width: 650px; margin: 0 auto 60px; }
//         .section-header h2 { font-size: 3rem; font-weight: 700; margin-bottom: 20px; color: var(--fuhsa-navy); }
//         .section-header p { font-size: 1.1rem; line-height: 1.7; }
//         .faculties-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; text-align: center; }
//         .faculty-icon { width: 70px; height: 70px; margin: 0 auto 24px; background: rgba(92, 184, 165, 0.1); color: var(--fuhsa-teal); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
//         .faculty-title { font-size: 1.35rem; font-weight: 700; margin: 0 0 15px 0; color: var(--fuhsa-navy); }
//         .faculty-desc { font-size: 0.9rem; line-height: 1.7; margin-bottom: 24px; }
//         .faculty-link { color: var(--fuhsa-navy); font-weight: 700; font-size: 0.9rem; display: inline-flex; align-items: center; justify-content: center; gap: 5px; }

//         .departments-section { background: #fff; }
//         .departments-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
//         .department-card { background: var(--bg-light); border: 1px solid #e2e8f0; border-radius: 8px; padding: 28px; text-align: left; }
//         .department-card h3 { font-family: 'Inter', sans-serif; font-size: 1.05rem; color: var(--fuhsa-navy); margin: 0 0 18px; }
//         .department-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
//         .department-list li { color: var(--text-muted); font-size: 0.92rem; line-height: 1.45; padding-left: 18px; position: relative; }
//         .department-list li::before { content: ''; position: absolute; left: 0; top: 0.62em; width: 7px; height: 7px; border-radius: 50%; background: var(--fuhsa-gold); }

//         .research-section { background: var(--fuhsa-navy); color: #fff; position: relative; overflow: hidden; }
//         .research-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 10; }
//         .research-title { font-size: 3rem; font-weight: 700; margin-bottom: 50px; color: #fff; }
//         .research-list { list-style: none; padding: 0; margin: 0 0 50px 0; }
//         .research-list li { display: flex; gap: 24px; margin-bottom: 40px; }
//         .research-num { background: rgba(221, 168, 58, 0.1); color: var(--fuhsa-gold); padding: 10px 16px; height: fit-content; font-weight: 700; border-radius: 8px; border: 1px solid rgba(221, 168, 58, 0.3); font-size: 1.1rem; }
//         .research-list h4 { margin: 0 0 10px 0; font-size: 1.2rem; color: #fff; font-family: 'Inter', sans-serif; font-weight: 600; }
//         .research-list p { margin: 0; font-size: 0.95rem; color: #cbd5e1; line-height: 1.7; }

//         .research-poster { position: relative; width: 100%; height: 600px; border-radius: 20px; background: linear-gradient(135deg, var(--fuhsa-teal) 0%, #064e3b 100%); display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.3); transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; }
//         .research-poster:hover { transform: translateY(-10px) rotateX(2deg) rotateY(-2deg); box-shadow: 0 40px 80px rgba(13, 148, 136, 0.4); }
//         .research-grid-bg { position: absolute; inset: 0; background-image: radial-gradient(rgba(255, 255, 255, 0.15) 2px, transparent 2px); background-size: 20px 20px; z-index: 1; }
//         .research-glow { position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(221, 168, 58, 0.4) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2; animation: pulseGlow 4s ease-in-out infinite alternate; }
//         .research-inner-content { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; transform: translateZ(50px); animation: floatText 6s ease-in-out infinite; }
//         .poster-tag { color: #fff; font-family: 'Inter', sans-serif; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.9rem; margin-bottom: 20px; opacity: 0.9; }
//         .poster-title { font-size: 6rem; font-weight: 900; margin: 0; line-height: 1; font-family: 'Playfair Display', serif; background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.3) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)); }
//         .poster-motto { color: var(--fuhsa-gold); font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.2rem; margin-top: 20px; letter-spacing: 0.05em; }

//         .tour-section { background: var(--bg-light); text-align: center; }
//         .tour-container { position: relative; width: 100%; height: 65vh; min-height: 450px; background: url('${RESOLVED_MEDIA_URLS.gate}') center/cover; border-radius: 16px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.1); cursor: pointer; }
//         .tour-container::before { content: ''; position: absolute; inset: 0; background: rgba(11,28,48,0.4); transition: 0.4s; }
//         .tour-container:hover::before { background: rgba(11,28,48,0.2); }
//         .play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.5); transition: 0.3s; z-index: 10; }
//         .tour-container:hover .play-btn { background: var(--fuhsa-gold); border-color: var(--fuhsa-gold); transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 30px rgba(221,168,58,0.5); }
//         .play-btn svg { width: 35px; height: 35px; fill: #fff; margin-left: 5px; }

//         .dynamic-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; flex-wrap: wrap; gap: 15px; }
//         .dynamic-header h2 { margin: 0; font-size: 2.5rem; color: var(--fuhsa-navy); }
//         .view-link { color: var(--fuhsa-navy); font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; }

//         .events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
//         .event-card { display: flex; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; transition: 0.3s; }
//         .event-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
//         .event-card.highlight { background: rgba(221, 168, 58, 0.05); border-color: var(--fuhsa-gold); }
//         .event-date { background: var(--fuhsa-navy); color: #fff; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 110px; }
//         .event-card.highlight .event-date { background: var(--fuhsa-gold); color: var(--fuhsa-navy); }
//         .event-date span:first-child { font-size: 2.5rem; font-family: 'Playfair Display', serif; font-weight: 700; line-height: 1; }
//         .event-date span:last-child { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; margin-top: 5px; }
//         .event-details { padding: 24px; width: 100%; display: flex; flex-direction: column; justify-content: center; }
//         .event-details h4 { margin: 0 0 12px 0; font-size: 1.1rem; color: var(--text-dark); font-family: 'Inter', sans-serif; }

//         .news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
//         .news-card { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; }
//         .news-img { width: 100%; height: 240px; object-fit: cover; transition: transform 0.5s; }
//         .news-card:hover .news-img { transform: scale(1.05); }
//         .news-content { padding: 30px; position: relative; background: #fff; z-index: 2; display: flex; flex-direction: column; height: 100%; }
//         .news-tag { font-size: 0.7rem; font-weight: 700; color: var(--fuhsa-teal); letter-spacing: 0.1em; margin-bottom: 12px; display: block; }
//         .news-title { font-size: 1.4rem; font-weight: 700; margin: 0 0 15px 0; line-height: 1.4; }

//         .footer { background: var(--fuhsa-navy); color: #94a3b8; padding: 100px 5% 40px; border-top: 4px solid var(--fuhsa-gold); }
//         .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 80px; }
//         .footer-logo { display: flex; align-items: center; gap: 12px; color: #fff; font-size: 1.5rem; font-weight: 700; margin-bottom: 24px; font-family: 'Inter', sans-serif; }
//         .footer-desc { line-height: 1.8; margin-bottom: 30px; max-width: 400px; font-size: 0.95rem; }
//         .footer h4 { color: #fff; font-family: 'Inter', sans-serif; font-size: 1.1rem; font-weight: 700; margin: 0 0 24px 0; }
//         .footer-links { list-style: none; padding: 0; margin: 0; }
//         .footer-links li { margin-bottom: 16px; }
//         .footer-links a { transition: color 0.3s; }
//         .footer-links a:hover { color: var(--fuhsa-gold); }
//         .footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; font-size: 0.85rem; }

//         /* --- RESPONSIVE QUERIES --- */
//         @media (max-width: 1024px) {
//           .about-grid, .research-grid, .vc-grid, .journal-grid { grid-template-columns: 1fr; gap: 50px; }
//           .stats-section { grid-template-columns: repeat(2, 1fr); gap: 40px; }
//           .faculties-grid, .news-grid, .events-grid, .departments-grid { grid-template-columns: repeat(2, 1fr); }
//           .footer-grid { grid-template-columns: 1fr 1fr; gap: 50px; }
//           .hero-title { font-size: 4rem; }
//           .poster-title { font-size: 4.5rem; }
//           .research-poster { height: 450px; }
//         }

//         @media (max-width: 768px) {
//           .nav-links { display: none; }
//           .hero-title { font-size: 3rem; }
//           .hero-subtitle { font-size: 1rem; }
//           .about-title { font-size: 2.2rem; }
//           .research-title { font-size: 2.2rem; }
//           .section-header h2 { font-size: 2.2rem; }
//           .dynamic-header h2 { font-size: 2rem; }
//           .faculties-grid, .news-grid, .events-grid, .footer-grid, .departments-grid { grid-template-columns: 1fr; }
//           .mission-vision-grid { grid-template-columns: 1fr; }
//           .section-padding { padding: 80px 5%; }
//           .about-image { height: 400px; }
//           .about-badge { padding: 25px; bottom: -15px; left: -15px; }
//           .about-badge h4 { font-size: 2.2rem; }
//           .vc-image-wrap { height: auto; aspect-ratio: 4/5; }
//           .stats-section { grid-template-columns: repeat(2, 1fr); gap: 30px; padding: 60px 5%; }
//           .stat-num { font-size: 2.5rem; }
//           .poster-title { font-size: 3.5rem; }
//           .btn-aceternity, .btn-outline { width: 100%; text-align: center; justify-content: center; }
//           .dynamic-header { align-items: flex-start; flex-direction: column; }
//           .tour-container { height: 40vh; min-height: 300px; }
//         }

//         @media (max-width: 480px) {
//           .hero-title { font-size: 2.5rem; }
//           .btn-aceternity-inner { padding: 14px 20px; white-space: normal; }
//           .stats-section { grid-template-columns: 1fr; gap: 30px; }
//           .event-card { flex-direction: column; }
//           .event-date { flex-direction: row; gap: 15px; padding: 20px; }
//           .news-img { height: 200px; }
//           .footer-logo { flex-direction: column; align-items: flex-start; }
//           .about-badge p { font-size: 0.75rem; }
//         }
//       `}</style>

//       {/* --- FLOATING AI CHATBOT GUIDE --- */}
//       <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end pointer-events-none">
//         <AnimatePresence>
//           {isChatOpen && (
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 20,
//                 scale: 0.95,
//                 transformOrigin: "bottom right",
//               }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 20, scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               className="w-[calc(100vw-32px)] sm:w-[380px] max-h-[80vh] mb-4 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto"
//             >
//               {/* Header */}
//               <div className="bg-[var(--fuhsa-navy)] p-4 flex items-center justify-between border-b border-white/10">
//                 <div className="flex items-center gap-3 text-white">
//                   <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
//                     <Sparkles className="w-4 h-4 text-[var(--fuhsa-gold)]" />
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-[15px] tracking-wide leading-none">
//                       FUHSA Guide
//                     </h4>
//                     <p className="text-[11px] text-green-400 flex items-center gap-1.5 mt-1.5">
//                       <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
//                       AI Assistant Online
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setIsChatOpen(false)}
//                   className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-all"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Chat Area */}
//               <div className="flex-1 min-h-[250px] sm:min-h-[320px] overflow-y-auto p-5 flex flex-col gap-5 scroll-smooth">
//                 {messages.map((msg, idx) => (
//                   <motion.div
//                     initial={{
//                       opacity: 0,
//                       x: msg.sender === "user" ? 10 : -10,
//                     }}
//                     animate={{ opacity: 1, x: 0 }}
//                     key={idx}
//                     className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//                   >
//                     <div
//                       className={`max-w-[85%] rounded-2xl p-3.5 text-[14px] leading-relaxed shadow-md ${
//                         msg.sender === "user"
//                           ? "bg-[var(--fuhsa-gold)] text-[var(--fuhsa-navy)] rounded-tr-sm font-medium"
//                           : "bg-white/10 text-slate-100 rounded-tl-sm border border-white/5"
//                       }`}
//                     >
//                       {msg.text}
//                     </div>
//                   </motion.div>
//                 ))}

//                 {isTyping && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="flex justify-start"
//                   >
//                     <div className="bg-white/10 border border-white/5 rounded-2xl rounded-tl-sm p-4 flex gap-1.5 items-center shadow-md">
//                       <div
//                         className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0ms" }}
//                       />
//                       <div
//                         className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "150ms" }}
//                       />
//                       <div
//                         className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "300ms" }}
//                       />
//                     </div>
//                   </motion.div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Quick Actions */}
//               {messages.length < 3 && !isTyping && (
//                 <div className="px-5 pb-3 flex gap-2 overflow-x-auto hide-scrollbar">
//                   {["Admission Requirements", "Courses", "School Fees"].map(
//                     (chip) => (
//                       <button
//                         key={chip}
//                         onClick={() => handleQuickAction(chip)}
//                         className="whitespace-nowrap text-[12px] font-medium bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 px-3.5 py-2 rounded-full transition-colors shadow-sm"
//                       >
//                         {chip}
//                       </button>
//                     ),
//                   )}
//                 </div>
//               )}

//               {/* Input Area */}
//               <form
//                 onSubmit={handleChatSubmit}
//                 className="p-4 border-t border-white/10 bg-black/40"
//               >
//                 <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 pl-4 focus-within:border-[var(--fuhsa-gold)] focus-within:ring-2 focus-within:ring-[var(--fuhsa-gold)]/30 transition-all">
//                   <input
//                     type="text"
//                     value={chatInput}
//                     onChange={(e) => setChatInput(e.target.value)}
//                     placeholder="Ask a question..."
//                     className="flex-1 bg-transparent text-[14px] text-white placeholder:text-slate-400 focus:outline-none w-full"
//                   />
//                   <button
//                     type="submit"
//                     disabled={!chatInput.trim()}
//                     className="w-10 h-10 shrink-0 rounded-full bg-[var(--fuhsa-gold)] flex items-center justify-center text-[var(--fuhsa-navy)] disabled:opacity-30 disabled:bg-slate-700 hover:brightness-110 transition-all shadow-md"
//                   >
//                     <Send className="w-4 h-4 ml-0.5" />
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-4 pointer-events-auto">
//           <AnimatePresence>
//             {showChatTooltip && !isChatOpen && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 10 }}
//                 className="bg-white text-[var(--fuhsa-navy)] text-[13px] font-bold px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-slate-200 relative cursor-pointer hover:bg-slate-50 transition-colors hidden sm:block"
//                 onClick={() => {
//                   setIsChatOpen(true);
//                   setShowChatTooltip(false);
//                 }}
//               >
//                 Need help navigating?
//                 <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-slate-200 rotate-45" />
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <button
//             onClick={() => {
//               setIsChatOpen(!isChatOpen);
//               setShowChatTooltip(false);
//             }}
//             className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[var(--fuhsa-navy)] flex items-center justify-center text-white shadow-[0_10px_40px_rgba(11,28,48,0.5)] border border-white/20 hover:scale-105 transition-transform relative group z-50"
//           >
//             <div className="absolute inset-0 rounded-full bg-[var(--fuhsa-gold)] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
//             {isChatOpen ? (
//               <X className="w-6 h-6 sm:w-7 sm:h-7" />
//             ) : (
//               <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* --- VIDEO MODAL --- */}
//       {isVideoOpen && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-500">
//           <button
//             onClick={() => setIsVideoOpen(false)}
//             className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 z-50 hover:scale-110"
//           >
//             <X className="w-6 h-6" />
//           </button>
//           <div className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/10 animate-in zoom-in-95 duration-500 delay-150 fill-mode-both">
//             <video
//               src={RESOLVED_MEDIA_URLS.fuhsaVideo}
//               controls
//               autoPlay
//               playsInline
//               className="w-full h-full object-cover"
//             >
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>
//       )}

//       {/* --- Marquee --- */}
//       <div
//         className="marquee-container"
//         style={{ position: "fixed", top: 0, width: "100%", zIndex: 1001 }}
//       >
//         <div className="marquee-content">
//           NOTICE OF ONLINE SCREENING TO PROSPECTIVE CANDIDATES FOR 2026/2027
//           ADMISSIONS • WELCOME TO FUHSA AZARE • EXCELLENCE IN HEALTH SCIENCES •
//           RESEARCH AND INNOVATION FOR GLOBAL IMPACT •
//         </div>
//       </div>

//       {/* --- Navigation --- */}
//       <header
//         className={`nav-container ${scrolled ? "scrolled" : ""}`}
//         style={{ top: "35px" }}
//       >
//         <div className="logo-wrap">
//           <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white border border-white/10 shadow-sm relative shrink-0">
//             <img
//               src={RESOLVED_MEDIA_URLS.logo}
//               alt="FUHSA Logo"
//               className="w-full h-full object-cover relative z-10"
//               onError={(e) => {
//                 e.currentTarget.style.display = "none";
//                 e.currentTarget.parentElement!.innerHTML =
//                   '<span class="text-[#0B1C30] font-bold text-xl">F</span>';
//               }}
//             />
//           </div>
//           <div>
//             <div className="logo-text">FUHSA</div>
//             <div className="logo-sub">AZARE, BAUCHI STATE</div>
//           </div>
//         </div>

//         {/* Desktop Nav */}
//         <nav className="nav-links hidden md:flex items-center">
//           <Link href="/" style={{ color: "var(--fuhsa-gold)" }}>
//             Home
//           </Link>
//           <div className="relative group">
//             <button className="flex items-center gap-1 hover:text-[var(--fuhsa-gold)] cursor-pointer bg-transparent border-none text-inherit font-inherit p-0">
//               Institutional{" "}
//               <svg
//                 width="12"
//                 height="12"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="m6 9 6 6 6-6" />
//               </svg>
//             </button>
//             <div className="absolute top-full left-0 w-48 bg-[var(--fuhsa-navy)] border border-white/10 rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
//               <Link
//                 href="/institutional-data"
//                 className="block px-4 py-2 hover:bg-white/5"
//               >
//                 Institutional Data
//               </Link>
//               <Link
//                 href="/annual-budget"
//                 className="block px-4 py-2 hover:bg-white/5"
//               >
//                 Annual Budget
//               </Link>
//               <Link href="#" className="block px-4 py-2 hover:bg-white/5">
//                 Needs Assessment
//               </Link>
//               <Link href="#" className="block px-4 py-2 hover:bg-white/5">
//                 Key Info Data
//               </Link>
//             </div>
//           </div>
//           <Link href="https://fuhsa.admissions.cloud/">Academics</Link>
//           <Link href="https://fuhsa.admissions.cloud/">Admission</Link>
//           <div className="relative group">
//             <button className="flex items-center gap-1 hover:text-[var(--fuhsa-gold)] cursor-pointer bg-transparent border-none text-inherit font-inherit p-0">
//               Resources{" "}
//               <svg
//                 width="12"
//                 height="12"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="m6 9 6 6 6-6" />
//               </svg>
//             </button>
//             <div className="absolute top-full left-0 w-48 bg-[var(--fuhsa-navy)] border border-white/10 rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
//               {resourceLinks.map((item) => (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className="block px-4 py-2 hover:bg-white/5"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="relative group">
//             <button className="flex items-center gap-1 hover:text-[var(--fuhsa-gold)] cursor-pointer bg-transparent border-none text-inherit font-inherit p-0">
//               Portal{" "}
//               <svg
//                 width="12"
//                 height="12"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="m6 9 6 6 6-6" />
//               </svg>
//             </button>
//             <div className="absolute top-full left-0 w-52 bg-[var(--fuhsa-navy)] border border-white/10 rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
//               {portalLinks.map((item) => (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className="block px-4 py-2 hover:bg-white/5"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <Link href="https://library.fuhsa.edu.ng/">Library</Link>
//         </nav>

//         <div className="hidden md:block">
//           <Link
//             href="https://fuhsa.safsrms.com/"
//             className="btn-aceternity"
//             style={{ padding: 1 }}
//           >
//             <span
//               className="btn-aceternity-inner"
//               style={{
//                 padding: "10px 24px",
//                 background: scrolled ? "var(--fuhsa-navy)" : "transparent",
//               }}
//             >
//               Student Login
//             </span>
//           </Link>
//         </div>

//         {/* Mobile Hamburger */}
//         <button
//           className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 text-white"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </header>

//       {/* Mobile Menu Dropdown */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed inset-x-0 top-[90px] bg-[var(--fuhsa-navy)] border-b border-white/10 shadow-2xl z-[999] md:hidden flex flex-col p-6 gap-4"
//           >
//             <Link
//               href="/"
//               className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
//             >
//               Home
//             </Link>
//             <Link
//               href="/programs"
//               className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
//             >
//               Academics
//             </Link>
//             <Link
//               href="https://fuhsa.admissions.cloud/"
//               className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
//             >
//               Admission
//             </Link>
//             <Link
//               href="/institutional-data"
//               className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
//             >
//               Institutional Data
//             </Link>
//             <Link
//               href="/annual-budget"
//               className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
//             >
//               Annual Budget
//             </Link>
//             {portalLinks.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="text-white font-medium hover:text-[var(--fuhsa-gold)] py-2 border-b border-white/5"
//               >
//                 {item.label}
//               </Link>
//             ))}
//             <Link
//               href="https://fuhsa.safsrms.com/"
//               className="bg-[var(--fuhsa-gold)] text-[var(--fuhsa-navy)] text-center font-bold py-3 rounded-lg mt-4"
//             >
//               Student Login
//             </Link>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- Cinematic Hero Section --- */}
//       <section className="hero-section">
//         <div className="spotlight-wrapper">
//           <div className="spotlight"></div>
//         </div>
//         <div className="slideshow">
//           <div className="slide slide-1"></div>
//           <div className="slide slide-2"></div>
//           <div className="slide slide-3"></div>
//           <div className="slide slide-4"></div>
//           <div className="slide slide-5"></div>
//         </div>
//         <div className="hero-overlay"></div>

//         <div className="hero-content">
//           <div className="hero-badge">ESTABLISHED 2021 | BAUCHI STATE</div>
//           <h1 className="hero-title">
//             Empowering the{" "}
//             <span
//               className="serif-font text-gold"
//               style={{ fontStyle: "italic" }}
//             >
//               Next
//               <br />
//               Generation
//             </span>{" "}
//             of Health
//             <br />
//             Leaders
//           </h1>
//           <p className="hero-subtitle">
//             Excellence in specialized Health Education, Research, and Community
//             Service at the Federal University of Health Sciences, Azare.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//             <Link
//               href="https://fuhsa.admissions.cloud/"
//               className="btn-aceternity"
//             >
//               <span className="btn-aceternity-inner">Apply Now &rarr;</span>
//             </Link>
//             <Link href="https://fuhsa.admissions.cloud/" className="btn-outline">
//               Explore Programs
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* --- About Section --- */}
//       <section className="section-padding">
//         <div className="about-grid">
//           <div>
//             <h2 className="about-title serif-font">
//               Pioneering Excellence in Health Sciences
//             </h2>
//             <p className="about-text">
//               Located in Bauchi State, the Federal University of Health
//               Sciences, Azare (FUHSA) was founded to bridge the gap in
//               healthcare manpower through world-class education and cutting-edge
//               medical research.
//             </p>
//             <div className="mission-vision-grid">
//               <div className="mv-box">
//                 <h4 className="mv-title">Our Mission</h4>
//                 <p>
//                   To produce highly skilled health professionals who are
//                   globally competitive.
//                 </p>
//               </div>
//               <div className="mv-box">
//                 <h4 className="mv-title">Our Vision</h4>
//                 <p>
//                   To be a leading center of excellence in health sciences
//                   education and innovation.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="about-image-wrapper">
//             <div className="about-image"></div>
//             <div className="about-badge">
//               <h4>100%</h4>
//               <p>Specialized Focus</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- VC Welcome Message --- */}
//       <section className="section-padding vc-section">
//         <div className="vc-grid">
//           <div className="vc-image-wrap">
//             <img
//               src={RESOLVED_MEDIA_URLS.vcImage}
//               alt="Prof. Bala Muhammad Audu"
//               className="vc-image"
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 background:
//                   "linear-gradient(to top, var(--fuhsa-navy), transparent)",
//                 padding: "40px 20px 20px",
//               }}
//             >
//               <div
//                 style={{
//                   color: "#fff",
//                   margin: 0,
//                   fontWeight: 700,
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 Prof. Bala Muhammad Audu
//               </div>
//               <div className="vc-title">Vice Chancellor</div>
//             </div>
//           </div>
//           <div className="vc-content">
//             <div className="vc-quote-icon">
//               <svg
//                 width="60"
//                 height="60"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H3.017V21H5.017Z" />
//               </svg>
//             </div>
//             <h2
//               className="serif-font"
//               style={{
//                 fontSize: "clamp(2rem, 4vw, 2.5rem)",
//                 marginBottom: "30px",
//                 color: "var(--fuhsa-navy)",
//               }}
//             >
//               Vice Chancellor's Welcome Message
//             </h2>
//             <p
//               style={{
//                 fontSize: "1.1rem",
//                 lineHeight: 1.8,
//                 color: "var(--text-muted)",
//                 marginBottom: "30px",
//               }}
//             >
//               Welcome to the Federal University of Health Sciences, Azare
//               (FUHSA). We are committed to excellence in health sciences
//               education, research, and innovation. Our goal is to develop
//               competent healthcare professionals who will contribute
//               meaningfully to society. Thank you for visiting our website, and
//               we invite you to explore the opportunities available at FUHSA.
//             </p>
//             <div className="vc-name" style={{ margin: 0 }}>
//               Prof. Bala Muhammad Audu
//             </div>
//             <div className="vc-title">Vice Chancellor</div>

//             <div className="mt-8 flex flex-col sm:flex-row gap-4">
//               <Link href="#" className="btn-aceternity">
//                 <span className="btn-aceternity-inner">View Full Profile</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- Stats Strip --- */}
//       <section className="stats-section">
//         <div>
//           <div className="stat-num">5</div>
//           <div className="stat-label">Faculties</div>
//         </div>
//         <div>
//           <div className="stat-num">26</div>
//           <div className="stat-label">Departments</div>
//         </div>
//         <div>
//           <div className="stat-num">5000+</div>
//           <div className="stat-label">Students</div>
//         </div>
//         <div>
//           <div className="stat-num">100%</div>
//           <div className="stat-label">Health Sciences Focus</div>
//         </div>
//       </section>

//       {/* --- Departments List --- */}
//       <section className="section-padding departments-section">
//         <div className="section-header">
//           <h2 className="serif-font">Faculties & Departments</h2>
//           <p>
//             FUHSA's academic structure spans 5 faculties and 26 departments and
//             programmes across health sciences and supporting sciences.
//           </p>
//         </div>
//         <div className="departments-grid">
//           {departmentGroups.map((group) => (
//             <div className="department-card" key={group.faculty}>
//               <h3>{group.faculty}</h3>
//               <ul className="department-list">
//                 {group.departments.map((department) => (
//                   <li key={department}>{department}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- Academic Faculties --- */}
//       <section id="academics" className="section-padding faculties-section">
//         <div className="section-header">
//           <h2 className="serif-font">Academic Departments</h2>
//           <p>
//             Explore our range of undergraduate and postgraduate programs
//             designed to build professional expertise.
//           </p>
//         </div>

//         <div className="faculties-grid">
//           <div className="glare-card">
//             <div className="faculty-icon">
//               <svg
//                 width="30"
//                 height="30"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//               </svg>
//             </div>
//             <h3 className="faculty-title">Medicine & Surgery</h3>
//             <p className="faculty-desc">
//               MBBS program focused on clinical excellence and ethical medical
//               practice.
//             </p>
//             <Link href="#" className="faculty-link">
//               Learn More &rarr;
//             </Link>
//           </div>
//           <div className="glare-card">
//             <div className="faculty-icon">
//               <svg
//                 width="30"
//                 height="30"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//               </svg>
//             </div>
//             <h3 className="faculty-title">Nursing Sciences</h3>
//             <p className="faculty-desc">
//               Comprehensive training for empathetic and highly skilled
//               healthcare support.
//             </p>
//             <Link href="#" className="faculty-link">
//               Learn More &rarr;
//             </Link>
//           </div>
//           <div className="glare-card">
//             <div className="faculty-icon">
//               <svg
//                 width="30"
//                 height="30"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//                 <circle cx="9" cy="7" r="4" />
//                 <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//                 <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//               </svg>
//             </div>
//             <h3 className="faculty-title">Public Health</h3>
//             <p className="faculty-desc">
//               Addressing global health challenges through community-based
//               strategies.
//             </p>
//             <Link href="#" className="faculty-link">
//               Learn More &rarr;
//             </Link>
//           </div>
//           <div className="glare-card">
//             <div className="faculty-icon">
//               <svg
//                 width="30"
//                 height="30"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//               >
//                 <path d="M10 2v7.31" />
//                 <path d="M14 9.3V1.99" />
//                 <path d="M8.5 2h7" />
//                 <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
//               </svg>
//             </div>
//             <h3 className="faculty-title">Medical Laboratory</h3>
//             <p className="faculty-desc">
//               Advanced diagnostic training using modern laboratory equipment.
//             </p>
//             <Link href="#" className="faculty-link">
//               Learn More &rarr;
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* --- Research Section --- */}
//       <section id="research" className="section-padding research-section">
//         <div className="meteor m1"></div>
//         <div className="meteor m2"></div>
//         <div className="meteor m3"></div>
//         <div className="research-grid">
//           <div>
//             <h2 className="research-title serif-font">
//               Advancing Global Health Through Innovation
//             </h2>
//             <ul className="research-list">
//               <li>
//                 <div className="research-num">01</div>
//                 <div>
//                   <h4>Tropical Medicine</h4>
//                   <p>
//                     Leading research on neglected tropical diseases prevalent in
//                     Northern Nigeria.
//                   </p>
//                 </div>
//               </li>
//               <li>
//                 <div className="research-num">02</div>
//                 <div>
//                   <h4>Public Health Surveillance</h4>
//                   <p>
//                     Collaborating with international partners for
//                     epidemiological monitoring.
//                   </p>
//                 </div>
//               </li>
//               <li>
//                 <div className="research-num">03</div>
//                 <div>
//                   <h4>Health Technology</h4>
//                   <p>
//                     Innovating digital health solutions for rural health service
//                     delivery.
//                   </p>
//                 </div>
//               </li>
//             </ul>
//             <div className="w-full sm:w-auto">
//               <a
//                 href="#research-center"
//                 className="inline-block text-center w-full sm:w-auto"
//                 style={{
//                   background: "#fff",
//                   color: "var(--fuhsa-navy)",
//                   padding: "14px 32px",
//                   borderRadius: "999px",
//                   fontWeight: 600,
//                 }}
//               >
//                 View Research Center
//               </a>
//             </div>
//           </div>
//           <div className="research-poster">
//             <div className="research-grid-bg"></div>
//             <div className="research-glow"></div>
//             <div className="research-inner-content">
//               <span className="poster-tag">Research</span>
//               <h3 className="poster-title">FUHSA</h3>
//               <span className="poster-motto">
//                 Excellence in Health Innovation
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- Virtual Tour Section --- */}
//       <section className="section-padding tour-section">
//         <div className="section-header">
//           <h2 className="serif-font">Campus Virtual Tour</h2>
//           <p>
//             Step inside our state-of-the-art clinical laboratories and lecture
//             halls.
//           </p>
//         </div>
//         <div className="tour-container" onClick={() => setIsVideoOpen(true)}>
//           <div className="play-btn">
//             <svg viewBox="0 0 24 24">
//               <path d="M8 5v14l11-7z" />
//             </svg>
//           </div>
//         </div>
//       </section>

//       {/* --- Journals & Conferences --- */}
//       <section className="section-padding journal-section">
//         <div className="section-header">
//           <h2 className="serif-font">Academic Resources & Research</h2>
//           <p>
//             Access our latest publications and upcoming scientific gatherings.
//           </p>
//         </div>
//         <div className="journal-grid">
//           <div className="info-card">
//             <span className="info-tag">PUBLICATIONS</span>
//             <h3
//               className="serif-font"
//               style={{ fontSize: "1.8rem", marginBottom: "20px" }}
//             >
//               The Scholar Journal of Health Sciences
//             </h3>
//             <p
//               className="flex-1"
//               style={{ marginBottom: "30px", lineHeight: 1.7 }}
//             >
//               FUHSA's premier peer-reviewed journal dedicated to disseminating
//               high-quality research findings in various health science
//               disciplines.
//             </p>
//             <div className="w-full sm:w-auto">
//               <a
//                 href="https://thescholarjournalfuhsa.com/index.php/tsj"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="btn-aceternity w-full sm:w-auto"
//               >
//                 <span className="btn-aceternity-inner">
//                   Access Journal &rarr;
//                 </span>
//               </a>
//             </div>
//           </div>
//           <div className="info-card">
//             <span className="info-tag">CONFERENCES</span>
//             <h3
//               className="serif-font"
//               style={{ fontSize: "1.8rem", marginBottom: "20px" }}
//             >
//               MDCAN Scientific Conference 2025
//             </h3>
//             <p
//               className="flex-1"
//               style={{
//                 fontWeight: 700,
//                 marginBottom: "10px",
//                 color: "var(--fuhsa-navy)",
//               }}
//             >
//               Theme: Strengthening Nigeria's Health System Through Workforce
//               Excellence, Innovation and Sustainable Partnership.
//             </p>
//             <p
//               style={{
//                 fontSize: "0.9rem",
//                 color: "var(--text-muted)",
//                 marginBottom: "30px",
//               }}
//             >
//               Published: 09-03-2026 • FUHSA Teaching Hospital, Azare.
//             </p>
//             <div className="w-full sm:w-auto">
//               <Link href="#" className="btn-aceternity w-full sm:w-auto">
//                 <span className="btn-aceternity-inner">View Details</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- Dynamic Events Section --- */}
//       <section className="section-padding" style={{ background: "#fff" }}>
//         <div className="dynamic-header">
//           <div>
//             <h2 className="serif-font">Upcoming Events</h2>
//             <p style={{ margin: "10px 0 0 0", fontSize: "1.1rem" }}>
//               Mark your calendars for these important dates.
//             </p>
//           </div>
//           <a href="#calendar" className="view-link">
//             Full Calendar &rarr;
//           </a>
//         </div>
//         {loading ? (
//           <div className="events-grid">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="flex flex-col sm:flex-row bg-white border border-slate-200 rounded-lg overflow-hidden h-auto sm:h-[120px]"
//               >
//                 <div className="w-full sm:w-[110px] h-[100px] sm:h-full skeleton-bg"></div>
//                 <div className="p-6 w-full flex flex-col justify-center space-y-3">
//                   <div className="h-4 skeleton-bg rounded w-3/4"></div>
//                   <div className="h-3 skeleton-bg rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="events-grid">
//             {eventsData.map((event) => (
//               <div
//                 key={event.id}
//                 className={`event-card ${event.highlight ? "highlight" : ""}`}
//               >
//                 <div className="event-date">
//                   <span>{event.date}</span>
//                   <span>{event.month}</span>
//                 </div>
//                 <div className="event-details">
//                   <h4>{event.title}</h4>
//                   <p
//                     style={{
//                       fontSize: "0.85rem",
//                       color: "var(--text-muted)",
//                       margin: "0 0 15px 0",
//                     }}
//                   >
//                     {event.time} | {event.location}
//                   </p>
//                   <a
//                     href={event.link}
//                     style={{
//                       fontWeight: 700,
//                       color: event.highlight
//                         ? "var(--fuhsa-gold)"
//                         : "var(--fuhsa-navy)",
//                     }}
//                   >
//                     {event.highlight ? "Details" : "Register"}
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Dynamic News Section --- */}
//       <section
//         className="section-padding"
//         style={{ background: "var(--bg-light)" }}
//       >
//         <div className="dynamic-header">
//           <div>
//             <h2 className="serif-font">Latest News</h2>
//             <p style={{ margin: "10px 0 0 0", fontSize: "1.1rem" }}>
//               Stay updated with the heartbeat of FUHSA.
//             </p>
//           </div>
//           <span className="view-link" style={{ cursor: 'default' }}>
//             View All Updates &rarr;
//           </span>
//         </div>
//         {loading ? (
//           <div className="news-grid">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="border border-slate-200 rounded-xl overflow-hidden bg-white"
//               >
//                 <div className="w-full h-[240px] skeleton-bg"></div>
//                 <div className="p-8 space-y-4">
//                   <div className="h-3 skeleton-bg rounded w-1/4"></div>
//                   <div className="h-6 skeleton-bg rounded w-full"></div>
//                   <div className="h-6 skeleton-bg rounded w-5/6"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="news-grid">
//             {newsData.map((item) => (
//               <div
//                 key={item.id}
//                 className="glare-card"
//                 style={{ padding: 0 }}
//               >
//                 <div style={{ overflow: "hidden" }}>
//                   <img
//                     src={item.image_url || item.img}
//                     alt={item.title}
//                     className="news-img"
//                   />
//                 </div>
//                 <div className="news-content">
//                   <span className="news-tag">{item.tag || "NEWS"}</span>
//                   <h3 className="news-title serif-font">{item.title}</h3>
//                   <p
//                     className="flex-1"
//                     style={{
//                       fontSize: "0.9rem",
//                       lineHeight: 1.6,
//                       margin: "0 0 20px 0",
//                     }}
//                   >
//                     {item.summary || item.excerpt}
//                   </p>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       fontSize: "0.8rem",
//                       color: "#94a3b8",
//                       borderTop: "1px solid #f1f5f9",
//                       paddingTop: "15px",
//                     }}
//                   >
//                     <span>
//                       {item.published_at
//                         ? new Date(item.published_at).toLocaleDateString()
//                         : item.date}
//                     </span>
//                     <span>{item.readTime || "Read More"}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* --- Footer --- */}
//       <footer className="footer">
//         <div className="footer-grid">
//           <div>
//             <div className="footer-logo">
//               <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shrink-0">
//                 <img
//                   src={RESOLVED_MEDIA_URLS.logo}
//                   alt="FUHSA Logo"
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.currentTarget.style.display = "none";
//                     e.currentTarget.parentElement!.innerHTML =
//                       '<span class="text-[#0B1C30] font-bold text-xl">F</span>';
//                   }}
//                 />
//               </div>
//               FUHSA
//             </div>
//             <p className="footer-desc">
//               The Federal University of Health Sciences, Azare, is dedicated to
//               the advancement of health education, research, and service.
//             </p>
//             <div style={{ marginTop: "20px" }}>
//               <h4>Institutional</h4>
//               <ul className="footer-links">
//                 <li>
//                   <Link href="/institutional-data">Institutional Data</Link>
//                 </li>
//                 <li>
//                   <Link href="/annual-budget">Annual Budget</Link>
//                 </li>
//                 <li>
//                   <a href="#">Needs Assessment</a>
//                 </li>
//                 <li>
//                   <a href="#">Key Info Data</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div>
//             <h4>Quick Links</h4>
//             <ul className="footer-links">
//               <li>
//                 <Link href="https://fuhsa.admissions.cloud/">Admission</Link>
//               </li>
//               <li>
//                 <a href="#">Campus Life</a>
//               </li>
//               <li>
//                 <a href="#">University Bulletin</a>
//               </li>
//               <li>
//                 <a href="#">Internal Audit</a>
//               </li>
//               <li>
//                 <a href="#">Records</a>
//               </li>
//               <li>
//                 <a href="#">Extension of arm</a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4>Resources</h4>
//             <ul className="footer-links">
//               {resourceLinks.map((item) => (
//                 <li key={item.href}>
//                   <Link href={item.href}>{item.label}</Link>
//                 </li>
//               ))}
//               <li>
//                 <a href="#">Alumni</a>
//               </li>
//               <li>
//                 <a href="#">Bursary</a>
//               </li>
//               <li>
//                 <a href="#">ICT Support</a>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h4>Contact Us</h4>
//             <ul className="footer-links" style={{ lineHeight: 1.8 }}>
//               <li>Along Azare-Kano Road, Azare, Bauchi State, Nigeria.</li>
//               <li>info@fuhsa.edu.ng</li>
//               <li>+234 800 FUHSA HELP</li>
//             </ul>
//             <div style={{ marginTop: "30px" }}>
//               <h4>Governance</h4>
//               <ul className="footer-links">
//                 <li>
//                   <a href="#">Directorate</a>
//                 </li>
//                 <li>
//                   <a href="#">Research & Partnership</a>
//                 </li>
//                 <li>
//                   <a href="#">Feedback</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="footer-bottom flex flex-col md:flex-row gap-4 items-center justify-between text-center md:text-left text-slate-400">
//           <div>
//             &copy; {new Date().getFullYear()} FEDERAL UNIVERSITY OF HEALTH
//             SCIENCES, AZARE. ALL RIGHTS RESERVED.
//           </div>
//           <div className="flex flex-wrap justify-center gap-6">
//             <a href="#privacy" className="hover:text-white transition-colors">
//               PRIVACY POLICY
//             </a>
//             <a href="#terms" className="hover:text-white transition-colors">
//               TERMS OF USE
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

const CONTACT_EMAIL = "sportcolony92@gmail.com";

const theme = {
  ink: "#1a1410",
  paper: "#f5f0e8",
  warm: "#c9a96e",
  warmDark: "#8b6b35",
  red: "#b5362a",
  muted: "#6b5e4e",
  border: "rgba(139, 107, 53, 0.25)",
};

export default function DeveloperNoticePage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
      } else {
        // Fallback for browsers without the async clipboard API
        const textarea = document.createElement("textarea");
        textarea.value = CONTACT_EMAIL;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      backgroundColor: theme.paper,
      color: theme.ink,
      fontFamily: dmSans.style.fontFamily, // Strict inline Next.js font
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative",
    },
    noise: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      pointerEvents: "none",
      zIndex: 0,
    },
    topBand: {
      backgroundColor: theme.ink,
      color: theme.warm,
      textAlign: "center",
      padding: "10px 1rem",
      fontSize: "11px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      fontWeight: 500,
      position: "relative",
      zIndex: 10,
    },
    header: {
      position: "relative",
      zIndex: 10,
      borderBottom: `1px solid ${theme.border}`,
      padding: "2rem 2rem 1.5rem",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1rem",
    },
    logoArea: { display: "flex", alignItems: "center", gap: "14px" },
    logoMark: {
      width: "46px",
      height: "46px",
      background: `linear-gradient(145deg, ${theme.ink} 0%, #2c2318 100%)`,
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `inset 0 0 0 1px rgba(201,169,110,0.35), 0 6px 18px rgba(26,20,16,0.18)`,
      position: "relative",
    },
    logoMarkSpan: {
      color: theme.warm,
      fontFamily: playfair.style.fontFamily,
      fontSize: "21px",
      fontWeight: 700,
    },
    logoText: {
      fontFamily: playfair.style.fontFamily,
      fontSize: "18px",
      fontWeight: 700,
      color: theme.ink,
      lineHeight: 1.1,
    },
    logoSub: {
      fontSize: "11px",
      color: theme.muted,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      fontWeight: 400,
    },
    headerDate: {
      fontSize: "12px",
      color: theme.muted,
      letterSpacing: "0.06em",
      textAlign: "right",
    },
    hero: {
      position: "relative",
      zIndex: 10,
      maxWidth: "860px",
      margin: "0 auto",
      padding: "5rem 2rem 4rem",
      textAlign: "center",
    },
    heroKicker: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "rgba(181, 54, 42, 0.06)",
      color: theme.red,
      fontSize: "11px",
      fontWeight: 500,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      padding: "8px 20px",
      borderRadius: "999px",
      border: "1px solid rgba(181, 54, 42, 0.28)",
      marginBottom: "2.25rem",
    },
    heroKickerDot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: theme.red,
      flexShrink: 0,
    },
    h1: {
      fontFamily: playfair.style.fontFamily,
      fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
      fontWeight: 900,
      lineHeight: 1.05,
      color: theme.ink,
      marginBottom: "2rem",
    },
    h1Em: { fontStyle: "italic", color: theme.warmDark },
    heroSub: {
      fontSize: "1.1rem",
      color: theme.muted,
      maxWidth: "560px",
      margin: "0 auto 3rem",
      lineHeight: 1.7,
      fontWeight: 300,
    },
    ornament: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      maxWidth: "400px",
      margin: "0 auto 4rem",
      color: theme.warm,
    },
    ornamentLine: { flex: 1, height: "1px", backgroundColor: theme.border },
    ornamentIcon: { fontSize: "18px", color: theme.warm },
    statsRow: {
      position: "relative",
      zIndex: 10,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "1px",
      backgroundColor: theme.border,
      border: `1px solid ${theme.border}`,
      maxWidth: "860px",
      margin: "0 auto 5rem",
      borderRadius: "8px",
      overflow: "hidden",
    },
    stat: {
      backgroundColor: theme.paper,
      padding: "2rem 1.5rem",
      textAlign: "center",
    },
    statNum: {
      fontFamily: playfair.style.fontFamily,
      fontSize: "2.6rem",
      fontWeight: 900,
      color: theme.ink,
      lineHeight: 1,
      marginBottom: "6px",
    },
    statNumRed: { color: theme.red },
    statLabel: {
      fontSize: "12px",
      color: theme.muted,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      fontWeight: 500,
    },
    section: {
      position: "relative",
      zIndex: 10,
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 2rem 5rem",
    },
    sectionLabelWrap: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "1.5rem",
    },
    sectionLabel: {
      fontSize: "11px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      fontWeight: 500,
      color: theme.warmDark,
    },
    sectionLabelLine: {
      flex: "0 0 40px",
      height: "1px",
      backgroundColor: theme.warmDark,
    },
    messageCard: {
      backgroundColor: theme.ink,
      color: theme.paper,
      borderRadius: "12px",
      padding: "3rem",
      position: "relative",
      overflow: "hidden",
    },
    quoteMark: {
      position: "absolute",
      top: "-20px",
      left: "30px",
      fontFamily: playfair.style.fontFamily,
      fontSize: "14rem",
      color: "rgba(201, 169, 110, 0.08)",
      lineHeight: 1,
      pointerEvents: "none",
    },
    messageP: {
      fontSize: "1.08rem",
      lineHeight: 1.85,
      color: "rgba(245, 240, 232, 0.88)",
      marginBottom: "1.4rem",
      position: "relative",
      zIndex: 2,
      fontWeight: 300,
    },
    messageStrong: { color: theme.warm, fontWeight: 500 },
    workItems: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1.5rem",
      marginTop: "1.5rem",
    },
    workItem: {
      border: `1px solid ${theme.border}`,
      borderRadius: "10px",
      padding: "1.5rem",
      backgroundColor: "rgba(255,255,255,0.4)",
    },
    workItemNum: {
      fontFamily: playfair.style.fontFamily,
      fontSize: "2rem",
      fontWeight: 900,
      color: theme.warmDark,
      opacity: 0.4,
      lineHeight: 1,
      marginBottom: "8px",
    },
    workItemTitle: {
      fontFamily: playfair.style.fontFamily,
      fontSize: "1.1rem",
      fontWeight: 700,
      color: theme.ink,
      marginBottom: "6px",
    },
    workItemDesc: { fontSize: "0.88rem", color: theme.muted, lineHeight: 1.6 },
    ctaSection: {
      position: "relative",
      zIndex: 10,
      maxWidth: "860px",
      margin: "0 auto",
      padding: "0 2rem 6rem",
      textAlign: "center",
    },
    ctaBox: {
      border: `1px solid ${theme.border}`,
      borderRadius: "16px",
      padding: "3.5rem 2.5rem",
      backgroundColor: "rgba(255,255,255,0.5)",
      position: "relative",
    },
    ctaH2: {
      fontFamily: playfair.style.fontFamily,
      fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
      fontWeight: 900,
      color: theme.ink,
      marginBottom: "1rem",
      lineHeight: 1.2,
    },
    ctaP: {
      fontSize: "1rem",
      color: theme.muted,
      maxWidth: "480px",
      margin: "0 auto 2.5rem",
      lineHeight: 1.7,
      fontWeight: 300,
    },
    ctaEmail: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      backgroundColor: theme.ink,
      color: theme.warm,
      fontFamily: dmSans.style.fontFamily,
      fontSize: "1rem",
      fontWeight: 500,
      padding: "1rem 2.2rem",
      borderRadius: "6px",
      textDecoration: "none",
      letterSpacing: "0.02em",
      marginBottom: "1.5rem",
    },
    emailRow: {
      display: "inline-flex",
      alignItems: "stretch",
      flexWrap: "wrap",
      gap: "10px",
      justifyContent: "center",
      marginBottom: "1.5rem",
    },
    copyBtn: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "transparent",
      color: theme.ink,
      border: `1px solid ${theme.warmDark}`,
      fontFamily: dmSans.style.fontFamily,
      fontSize: "0.92rem",
      fontWeight: 500,
      padding: "1rem 1.6rem",
      borderRadius: "6px",
      cursor: "pointer",
      letterSpacing: "0.02em",
      transition: "all 0.2s ease",
    },
    copyBtnDone: {
      backgroundColor: theme.warmDark,
      color: theme.paper,
      borderColor: theme.warmDark,
    },
    ctaNote: {
      fontSize: "0.82rem",
      color: theme.muted,
      letterSpacing: "0.04em",
    },
    footer: {
      position: "relative",
      zIndex: 10,
      borderTop: `1px solid ${theme.border}`,
      padding: "1.5rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "0.5rem",
      fontSize: "12px",
      color: theme.muted,
    },
    glow: {
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      background:
        "radial-gradient(60% 45% at 50% 0%, rgba(201,169,110,0.16) 0%, transparent 70%)",
    },
    signature: {
      position: "relative",
      zIndex: 2,
      marginTop: "2.5rem",
      paddingTop: "1.75rem",
      borderTop: "1px solid rgba(201,169,110,0.18)",
    },
    signatureName: {
      fontFamily: playfair.style.fontFamily,
      fontStyle: "italic",
      fontSize: "1.5rem",
      fontWeight: 400,
      color: theme.warm,
      lineHeight: 1.1,
    },
    signatureRole: {
      fontSize: "11px",
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(245,240,232,0.5)",
      marginTop: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes devFade {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes devSeal {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .dev-fade { opacity: 0; animation: devFade 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .dev-d1 { animation-delay: 0.05s; }
        .dev-d2 { animation-delay: 0.16s; }
        .dev-d3 { animation-delay: 0.28s; }
        .dev-d4 { animation-delay: 0.42s; }
        .dev-d5 { animation-delay: 0.56s; }
        .dev-seal { animation: devSeal 5s ease-in-out infinite; }
        ::selection { background: ${theme.warm}; color: ${theme.ink}; }
        .dev-dropcap::first-letter {
          font-family: ${playfair.style.fontFamily};
          font-size: 3.5em;
          font-weight: 900;
          float: left;
          line-height: 0.72;
          margin: 6px 14px 0 0;
          color: ${theme.warm};
        }
        .dev-work {
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
        }
        .dev-work:hover {
          transform: translateY(-6px);
          border-color: rgba(201, 169, 110, 0.55);
          box-shadow: 0 22px 44px rgba(26, 20, 16, 0.1);
          background: rgba(255, 255, 255, 0.6);
        }
        .dev-email {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 6px 18px rgba(26, 20, 16, 0.16);
        }
        .dev-email:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(26, 20, 16, 0.28);
        }
        .dev-copy { transition: all 0.25s ease; }
        .dev-copy:hover {
          background: ${theme.ink};
          color: ${theme.paper};
          border-color: ${theme.ink};
        }
        .dev-ctabox { transition: box-shadow 0.4s ease, border-color 0.4s ease; }
        .dev-ctabox:hover {
          border-color: rgba(201, 169, 110, 0.5);
          box-shadow: 0 24px 60px rgba(26, 20, 16, 0.08);
        }
        @media (prefers-reduced-motion: reduce) {
          .dev-fade { opacity: 1; animation: none; }
          .dev-seal { animation: none; }
        }
      `}</style>

      <div style={styles.noise}></div>
      <div style={styles.glow}></div>

      <div style={styles.topBand}>
        Official Notice — Outstanding Payment for Work Delivered
      </div>

      <header style={styles.header}>
        <div style={styles.logoArea}>
          <div style={styles.logoMark} className="dev-seal">
            <span style={styles.logoMarkSpan}>D</span>
          </div>
          <div>
            <div style={styles.logoText}>Developer Notice</div>
            <div style={styles.logoSub}>Landing Page — Web Development</div>
          </div>
        </div>
        <div style={styles.headerDate}>
          Issued: July 2026
          <br />
          <span style={{ color: theme.red, fontWeight: 500 }}>
            Status: Awaiting Payment
          </span>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroKicker} className="dev-fade dev-d1">
          <span style={styles.heroKickerDot}></span>
          Urgent — For the Institution
        </div>
        <h1 style={styles.h1} className="dev-fade dev-d2">
          This Work Has
          <br />
          <em style={styles.h1Em}>Not Been Paid For.</em>
        </h1>
        <p style={styles.heroSub} className="dev-fade dev-d3">
          This message stands in place of the landing page built for this
          institution. The developer who designed and delivered that page has
          not been paid for the work. This is not a fault in the website, and it
          is not a hack — it is a formal notice about an unresolved payment.
        </p>
        <div style={styles.ornament} className="dev-fade dev-d4">
          <div style={styles.ornamentLine}></div>
          <span style={styles.ornamentIcon}>◆</span>
          <div style={styles.ornamentLine}></div>
        </div>
      </section>

      {/* <div style={styles.statsRow}>
        <div style={styles.stat}>
          <div style={{ ...styles.statNum, ...styles.statNumRed }}>Partial</div>
          <div style={styles.statLabel}>Payment Status</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statNum}>0</div>
          <div style={styles.statLabel}>Projects Delivered</div>
        </div>
      </div> */}

      <section style={styles.section}>
        <div style={styles.sectionLabelWrap}>
          <span style={styles.sectionLabel}>The Message</span>
          <div style={styles.sectionLabelLine}></div>
        </div>
        <div style={styles.messageCard}>
          <div style={styles.quoteMark}>&quot;</div>
          <p style={styles.messageP} className="dev-dropcap">
            This notice is addressed to{" "}
            <strong>the institution and its representatives</strong>. The
            landing page you expected to see here was designed and built in good
            faith by the developer. That work was delivered — but the developer
            has <strong>not been paid</strong> for it.
          </p>
          <p style={styles.messageP}>
            Before displaying this notice, every reasonable effort was made to
            resolve the matter quietly and privately. Messages were sent,{" "}
            <strong>the backend was adjusted repeatedly</strong>, and multiple
            attempts were made behind the scenes to reach an agreement without
            ever affecting what visitors see. All of those attempts have failed
            to bring a response or a resolution.
          </p>
          <p style={styles.messageP}>
            Please understand clearly:{" "}
            <strong>this is not a hack, and nothing has been broken</strong>.
            The website and its data are intact and safe. This page is simply
            the developer&#39;s own work being held back until the work is
            honoured — a last resort after every private channel was exhausted.
          </p>
          <p style={{ ...styles.messageP, marginBottom: 0 }}>
            Doing this brings the developer{" "}
            <strong>no joy whatsoever</strong>. It is not meant as an attack on
            the institution or its reputation. The moment fair payment is
            settled, the proper landing page will be restored immediately. All
            that is needed is a reply — <strong>let&#39;s talk.</strong>
          </p>
          <div style={styles.signature}>
            <div style={styles.signatureName}>The Developer</div>
            <div style={styles.signatureRole}>
              In good faith, and with respect
            </div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionLabelWrap}>
          <span style={styles.sectionLabel}>Scope of Work</span>
          <div style={styles.sectionLabelLine}></div>
        </div>
        <div style={styles.workItems}>
          <div style={styles.workItem} className="dev-work">
            <div style={styles.workItemNum}>01</div>
            <div style={styles.workItemTitle}>Landing Page Design</div>
            <div style={styles.workItemDesc}>
              The complete public landing page for the institution — layout,
              visual design, responsive styling, and the full user experience
              that visitors first see.
            </div>
          </div>
          <div style={styles.workItem} className="dev-work">
            <div style={styles.workItemNum}>02</div>
            <div style={styles.workItemTitle}>Build & Integration</div>
            <div style={styles.workItemDesc}>
              Component development, content structure, and the supporting
              backend wiring needed to bring the page to life and keep it
              running smoothly.
            </div>
          </div>
          <div style={styles.workItem} className="dev-work">
            <div style={styles.workItemNum}>03</div>
            <div style={styles.workItemTitle}>Delivery & Support</div>
            <div style={styles.workItemDesc}>
              The page was delivered and deployed in good faith, with repeated
              backend attempts made privately to resolve the payment before this
              notice was ever shown.
            </div>
          </div>
        </div>
      </section>

      <section style={styles.ctaSection}>
        <div style={styles.ctaBox} className="dev-ctabox">
          <h2 style={styles.ctaH2}>
            Let&#39;s Settle This
            <br />
            And Move On.
          </h2>
          <p style={styles.ctaP}>
            One reply is all it takes. Reach out to the developer directly to
            settle the outstanding payment, and the proper landing page will be
            restored right away. No hard feelings — just a fair resolution.
          </p>
          <div style={styles.emailRow}>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={styles.ctaEmail}
              className="dev-email"
            >
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: "18px",
                  height: "18px",
                  fill: theme.warm,
                  flexShrink: 0,
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              {CONTACT_EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className={copied ? undefined : "dev-copy"}
              style={
                copied
                  ? { ...styles.copyBtn, ...styles.copyBtnDone }
                  : styles.copyBtn
              }
            >
              {copied ? (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      width: "16px",
                      height: "16px",
                      fill: "currentColor",
                      flexShrink: 0,
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    style={{
                      width: "16px",
                      height: "16px",
                      fill: "currentColor",
                      flexShrink: 0,
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  Copy Email
                </>
              )}
            </button>
          </div>
          <br />
          <span style={styles.ctaNote}>
            Tap the address to open your mail app, or use{" "}
            <strong style={{ color: theme.warmDark }}>Copy Email</strong> to
            copy it and write to the developer from anywhere.
          </span>
        </div>
      </section>

      <footer style={styles.footer}>
        <span>Developer Notice — Landing Page Payment Outstanding</span>
        <span>{CONTACT_EMAIL}</span>
      </footer>
    </div>
  );
}

///landing page for the website owner. This page is a formal notice regarding the status of the full-stack web development projects, payment issues, and next steps for resolution.
// ("use client");

// import { FormEvent, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Utensils,
//   Bike,
//   Store,
//   Sparkles,
//   MapPin,
//   Zap,
//   Menu,
//   X,
//   ShoppingBag,
//   ArrowRight,
//   Flame,
//   Star,
//   Clock,
//   Search,
//   TrendingUp,
//   Shield,
// } from "lucide-react";

// // ─────────────────────────────────────────────
// //  AI RECOMMENDATION ENGINE (client-side mock)
// //  Replace processPrompt with a real API call when ready.
// // ─────────────────────────────────────────────

// interface Recommendation {
//   meal: string;
//   vendor: string;
//   price: string;
//   time: string;
//   rating: string;
//   tag: string;
// }

// interface RecommendationResult {
//   label: string;
//   recs: Recommendation[];
// }

// class AIRecommendationEngine {
//   processPrompt(prompt: string): RecommendationResult {
//     const t = prompt.toLowerCase();
//     if (t.includes("spicy") || t.includes("pepper") || t.includes("hot"))
//       return {
//         label: "High-Heat Picks",
//         recs: [
//           {
//             meal: "Peri-Peri Chicken Wrap",
//             vendor: "KFC Bodija",
//             price: "₦4,500",
//             time: "14m",
//             rating: "4.9",
//             tag: "Trending",
//           },
//           {
//             meal: "Suya Pepper Steak",
//             vendor: "Malam's Spot",
//             price: "₦3,200",
//             time: "19m",
//             rating: "4.7",
//             tag: "Local Fave",
//           },
//         ],
//       };
//     if (t.includes("budget") || t.includes("cheap") || /₦?\d+/.test(t))
//       return {
//         label: "Value Deals",
//         recs: [
//           {
//             meal: "Student Combo Jollof",
//             vendor: "Item 7",
//             price: "₦1,800",
//             time: "9m",
//             rating: "4.6",
//             tag: "Best Value",
//           },
//           {
//             meal: "Sausage Roll & Hollandia",
//             vendor: "Campus Bakery",
//             price: "₦1,100",
//             time: "5m",
//             rating: "4.8",
//             tag: "Quick Pick",
//           },
//         ],
//       };
//     if (t.includes("healthy") || t.includes("salad") || t.includes("vegan"))
//       return {
//         label: "Clean Eats",
//         recs: [
//           {
//             meal: "Grilled Chicken Power Bowl",
//             vendor: "GreenBowl",
//             price: "₦3,800",
//             time: "17m",
//             rating: "4.9",
//             tag: "Protein",
//           },
//           {
//             meal: "Acai & Granola Parfait",
//             vendor: "SmoothieHub",
//             price: "₦2,200",
//             time: "7m",
//             rating: "4.7",
//             tag: "Fresh",
//           },
//         ],
//       };
//     return {
//       label: "Trending Now",
//       recs: [
//         {
//           meal: "Classic Beef Shawarma XL",
//           vendor: "Shawarma King",
//           price: "₦3,000",
//           time: "12m",
//           rating: "4.9",
//           tag: "🔥 Hot",
//         },
//         {
//           meal: "Jollof Rice & Turkey Leg",
//           vendor: "Tantalizers",
//           price: "₦5,500",
//           time: "18m",
//           rating: "4.8",
//           tag: "Crowd Fave",
//         },
//       ],
//     };
//   }
// }

// const aiEngine = new AIRecommendationEngine();

// // ─────────────────────────────────────────────
// //  DYNAMIC ISLAND TRACKER
// // ─────────────────────────────────────────────

// function DynamicIsland() {
//   const [open, setOpen] = useState(false);
//   const [stage, setStage] = useState(0);

//   useEffect(() => {
//     if (!open) return;
//     const t1 = setTimeout(() => setStage(1), 1600);
//     const t2 = setTimeout(() => setStage(2), 3800);
//     return () => {
//       clearTimeout(t1);
//       clearTimeout(t2);
//     };
//   }, [open]);

//   const stages = [
//     "Grabbing your meal…",
//     "Rider on Bodija Road…",
//     "Arriving at your gate!",
//   ];
//   const pct = [28, 62, 96][stage];

//   return (
//     <div
//       onClick={() =>
//         setOpen((o) => {
//           if (!o) setStage(0);
//           return !o;
//         })
//       }
//       style={{
//         position: "fixed",
//         top: 18,
//         left: "50%",
//         transform: "translateX(-50%)",
//         background: "#fff",
//         borderRadius: 50,
//         width: open ? 320 : 172,
//         height: open ? 136 : 44,
//         padding: open ? "16px 20px" : "0 20px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: open ? "flex-start" : "center",
//         alignItems: "center",
//         zIndex: 9000,
//         cursor: "pointer",
//         overflow: "hidden",
//         boxShadow: "0 8px 32px rgba(230,0,0,0.18)",
//         border: "1px solid rgba(230,0,0,0.12)",
//         transition: "all 0.48s cubic-bezier(0.32,0.72,0,1)",
//       }}
//     >
//       {!open ? (
//         <span
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             fontWeight: 800,
//             fontSize: 13,
//             color: "#e60000",
//             fontFamily: "inherit",
//           }}
//         >
//           <span
//             style={{
//               width: 8,
//               height: 8,
//               borderRadius: "50%",
//               background: "#e60000",
//               animation: "pulse-red 1.8s infinite",
//             }}
//           />
//           1 Active Order
//         </span>
//       ) : (
//         <div style={{ width: "100%", animation: "fadeUp 0.4s ease" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: 10,
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 11,
//                 fontWeight: 700,
//                 color: "#888",
//                 letterSpacing: 1,
//                 textTransform: "uppercase",
//               }}
//             >
//               ODG-LCU-99
//             </span>
//             <span style={{ fontSize: 12, fontWeight: 900, color: "#e60000" }}>
//               12 min away
//             </span>
//           </div>
//           <p
//             style={{
//               margin: "0 0 12px",
//               fontWeight: 800,
//               fontSize: 14,
//               color: "#0f172a",
//             }}
//           >
//             {stages[stage]}
//           </p>
//           <div
//             style={{
//               height: 5,
//               background: "#f1f5f9",
//               borderRadius: 5,
//               overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 height: "100%",
//                 background: "linear-gradient(90deg,#e60000,#ff4d4d)",
//                 width: `${pct}%`,
//                 transition: "width 1.2s ease-in-out",
//                 borderRadius: 5,
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// //  TICKER
// // ─────────────────────────────────────────────

// const orders = [
//   {
//     id: "ACU-102",
//     label: "Chicken Burger",
//     color: "#ff6b35",
//     status: "12m away",
//     icon: "🔥",
//   },
//   {
//     id: "LCU-44",
//     label: "Jollof Rice",
//     color: "#00c853",
//     status: "Delivered",
//     icon: "✅",
//   },
//   {
//     id: "UI-90",
//     label: "Parfait XL",
//     color: "#00b0ff",
//     status: "Preparing",
//     icon: "🚀",
//   },
//   {
//     id: "ACU-114",
//     label: "Beef Shawarma",
//     color: "#ff6b35",
//     status: "8m away",
//     icon: "🔥",
//   },
// ];

// function Ticker() {
//   const track = [...orders, ...orders, ...orders];
//   return (
//     <div
//       style={{
//         background: "#0f172a",
//         padding: "14px 0",
//         overflow: "hidden",
//         whiteSpace: "nowrap",
//       }}
//     >
//       <div
//         style={{
//           display: "inline-block",
//           animation: "scrollLeft 30s linear infinite",
//         }}
//       >
//         {track.map((o, i) => (
//           <span
//             key={i}
//             style={{
//               fontSize: 14,
//               fontWeight: 700,
//               marginRight: 60,
//               color: "#fff",
//               fontFamily: "inherit",
//             }}
//           >
//             <span style={{ color: o.color }}>
//               {o.icon} Order #{o.id}:
//             </span>{" "}
//             {o.label} — <span style={{ color: "#94a3b8" }}>{o.status}</span>
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// //  AI MODAL
// // ─────────────────────────────────────────────

// interface AIModalProps {
//   results: RecommendationResult | null;
//   onClose: () => void;
// }

// function AIModal({ results, onClose }: AIModalProps) {
//   if (!results) return null;
//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         background: "rgba(15,23,42,0.6)",
//         backdropFilter: "blur(18px)",
//         zIndex: 9999,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "20px",
//         animation: "fadeIn 0.25s ease",
//       }}
//     >
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: 28,
//           padding: "36px",
//           maxWidth: 560,
//           width: "100%",
//           boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
//           animation: "slideUp 0.3s ease",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 8,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <Sparkles size={22} color="#e60000" />
//             <span
//               style={{
//                 fontWeight: 900,
//                 fontSize: 22,
//                 color: "#0f172a",
//                 fontFamily: "inherit",
//               }}
//             >
//               ODG Picks
//             </span>
//           </div>
//           <button
//             onClick={onClose}
//             style={{
//               background: "#f8f9fa",
//               border: "none",
//               borderRadius: "50%",
//               padding: 8,
//               cursor: "pointer",
//             }}
//           >
//             <X size={20} color="#64748b" />
//           </button>
//         </div>
//         <p
//           style={{
//             color: "#64748b",
//             fontWeight: 600,
//             fontSize: 15,
//             marginBottom: 24,
//             fontFamily: "inherit",
//           }}
//         >
//           {results.label}
//         </p>
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           {results.recs.map((r, i) => (
//             <div
//               key={i}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "18px 20px",
//                 border: "1.5px solid #f1f5f9",
//                 borderRadius: 18,
//                 background: "#fafbfc",
//               }}
//             >
//               <div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 8,
//                     marginBottom: 4,
//                   }}
//                 >
//                   <span
//                     style={{
//                       background: "#e60000",
//                       color: "#fff",
//                       fontSize: 10,
//                       fontWeight: 900,
//                       padding: "3px 8px",
//                       borderRadius: 20,
//                       letterSpacing: 0.5,
//                       fontFamily: "inherit",
//                     }}
//                   >
//                     {r.tag}
//                   </span>
//                 </div>
//                 <p
//                   style={{
//                     margin: 0,
//                     fontWeight: 800,
//                     fontSize: 17,
//                     color: "#0f172a",
//                     fontFamily: "inherit",
//                   }}
//                 >
//                   {r.meal}
//                 </p>
//                 <p
//                   style={{
//                     margin: 0,
//                     color: "#94a3b8",
//                     fontSize: 13,
//                     fontWeight: 600,
//                     fontFamily: "inherit",
//                   }}
//                 >
//                   {r.vendor} · ⭐ {r.rating} · 🕒 {r.time}
//                 </p>
//               </div>
//               <button
//                 style={{
//                   background: "#e60000",
//                   color: "#fff",
//                   border: "none",
//                   padding: "12px 20px",
//                   borderRadius: 40,
//                   fontWeight: 900,
//                   cursor: "pointer",
//                   fontSize: 15,
//                   fontFamily: "inherit",
//                 }}
//               >
//                 {r.price}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// //  DATA
// // ─────────────────────────────────────────────

// const stats = [
//   { value: "15m", label: "Avg. Delivery Time" },
//   { value: "20+", label: "Campuses Expanding" },
//   { value: "4.9★", label: "Platform Rating" },
//   { value: "₦0", label: "Delivery Fee Today" },
// ];

// const campuses = [
//   {
//     name: "Lead City University",
//     city: "Ibadan",
//     state: "Oyo",
//     status: "LIVE",
//     time: "12m",
//   },
//   {
//     name: "Ajayi Crowther University",
//     city: "Oyo",
//     state: "Oyo",
//     status: "LIVE",
//     time: "15m",
//   },
//   {
//     name: "University of Ibadan",
//     city: "Ibadan",
//     state: "Oyo",
//     status: "SOON",
//     time: "20m",
//   },
//   {
//     name: "The Polytechnic Ibadan",
//     city: "Ibadan",
//     state: "Oyo",
//     status: "SOON",
//     time: "—",
//   },
// ];

// // ─────────────────────────────────────────────
// //  MAIN PAGE
// // ─────────────────────────────────────────────

// export default function ODGLanding() {
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [aiPrompt, setAiPrompt] = useState("");
//   const [aiLoading, setAiLoading] = useState(false);
//   const [aiModal, setAiModal] = useState<RecommendationResult | null>(null);

//   const handleAI = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!aiPrompt.trim()) return;
//     setAiLoading(true);
//     setTimeout(() => {
//       setAiModal(aiEngine.processPrompt(aiPrompt));
//       setAiLoading(false);
//     }, 1400);
//   };

//   const CSS = `
//     @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     :root {
//       --red:    #e60000;
//       --red2:   #ff4d4d;
//       --dark:   #0f172a;
//       --mid:    #1e293b;
//       --muted:  #64748b;
//       --light:  #f8f9fa;
//       --white:  #ffffff;
//       --border: #eaeaea;
//     }

//     body { font-family: 'DM Sans', sans-serif; background: var(--white); color: var(--dark); overflow-x: hidden; scroll-behavior: smooth; }

//     @keyframes scrollLeft  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
//     @keyframes pulse-red   { 0%,100% { box-shadow: 0 0 0 0 rgba(230,0,0,0.45); } 70% { box-shadow: 0 0 0 7px rgba(230,0,0,0); } }
//     @keyframes fadeIn      { from { opacity:0; } to { opacity:1; } }
//     @keyframes fadeUp      { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes slideUp     { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
//     @keyframes floatA      { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
//     @keyframes floatB      { 0%,100% { transform:translateY(0) rotate(-2deg); } 50% { transform:translateY(-18px) rotate(2deg); } }
//     @keyframes gridMove    { from { background-position: 0 0; } to { background-position: 60px 60px; } }
//     @keyframes spin        { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }

//     /* NAV */
//     .nav { position:fixed; top:0; left:0; right:0; z-index:800; padding:0 5%; display:flex; align-items:center; justify-content:space-between; height:72px; background:rgba(255,255,255,0.96); backdrop-filter:blur(20px); border-bottom:1px solid rgba(0,0,0,0.06); }
//     .nav-logo { font-family:'Syne',sans-serif; font-size:28px; font-weight:900; letter-spacing:-1px; color:var(--dark); text-decoration:none; }
//     .nav-logo span { color:var(--red); }
//     .nav-links { display:flex; gap:36px; align-items:center; }
//     .nav-link { color:var(--dark); text-decoration:none; font-weight:600; font-size:15px; transition:color 0.2s; }
//     .nav-link:hover { color:var(--red); }
//     .btn-nav { background:var(--red); color:#fff; border:none; padding:10px 26px; border-radius:40px; font-weight:700; font-size:15px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:opacity 0.2s; }
//     .btn-nav:hover { opacity:0.88; }
//     .btn-menu { display:none; background:none; border:none; cursor:pointer; }

//     /* HERO */
//     .hero { min-height:100vh; background:var(--red); display:flex; align-items:center; padding:120px 5% 80px; position:relative; overflow:hidden; }
//     .hero-grid-bg { position:absolute; inset:0; opacity:0.06; background-image:linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px); background-size:60px 60px; animation:gridMove 6s linear infinite; }
//     .hero-container { position:relative; z-index:2; max-width:1400px; margin:0 auto; width:100%; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
//     .hero-eyebrow { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); padding:8px 18px; border-radius:40px; font-size:12px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#fff; margin-bottom:28px; }
//     .hero-h1 { font-family:'Syne',sans-serif; font-size:clamp(48px,7vw,90px); font-weight:900; line-height:1.02; letter-spacing:-2.5px; color:#fff; margin-bottom:24px; }
//     .hero-sub { font-size:clamp(16px,1.6vw,20px); line-height:1.65; color:rgba(255,255,255,0.82); max-width:520px; margin-bottom:44px; font-weight:500; }
//     .hero-ctas { display:flex; gap:16px; flex-wrap:wrap; }
//     .btn-white { background:#fff; color:var(--red); border:none; padding:16px 36px; border-radius:50px; font-weight:800; font-size:17px; cursor:pointer; display:inline-flex; align-items:center; gap:10px; font-family:'DM Sans',sans-serif; transition:transform 0.2s, box-shadow 0.2s; }
//     .btn-white:hover { transform:translateY(-2px); box-shadow:0 12px 28px rgba(0,0,0,0.2); }
//     .btn-ghost { background:transparent; color:#fff; border:2px solid rgba(255,255,255,0.35); padding:14px 32px; border-radius:50px; font-weight:700; font-size:17px; cursor:pointer; display:inline-flex; align-items:center; gap:10px; font-family:'DM Sans',sans-serif; transition:border-color 0.2s; }
//     .btn-ghost:hover { border-color:#fff; }

//     /* FLOATERS */
//     .hero-floaters { position:relative; height:480px; }
//     .floater { position:absolute; background:#fff; border-radius:24px; padding:18px 24px; box-shadow:0 20px 48px rgba(0,0,0,0.18); display:flex; align-items:center; gap:14px; }
//     .floater-icon { width:46px; height:46px; border-radius:14px; background:var(--red); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
//     .floater-label { font-weight:700; font-size:13px; color:var(--muted); line-height:1.3; }
//     .floater-value { font-family:'Syne',sans-serif; font-weight:900; font-size:18px; color:var(--dark); }

//     /* SECTIONS */
//     .section { padding:120px 5%; }
//     .section-alt { background:#f8f9fa; }
//     .container { max-width:1400px; margin:0 auto; }
//     .section-eyebrow { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:800; letter-spacing:2.5px; text-transform:uppercase; color:var(--red); margin-bottom:16px; }
//     .section-h2 { font-family:'Syne',sans-serif; font-size:clamp(36px,5vw,68px); font-weight:900; letter-spacing:-1.5px; line-height:1.08; margin-bottom:20px; }
//     .section-sub { font-size:clamp(15px,1.5vw,19px); color:var(--muted); line-height:1.7; max-width:600px; font-weight:500; }

//     /* AI SEARCH */
//     .ai-pill { display:flex; align-items:center; background:#fff; border-radius:100px; border:1.5px solid var(--border); box-shadow:0 20px 50px rgba(0,0,0,0.07); max-width:860px; margin:0 auto; transition:box-shadow 0.3s, border-color 0.3s; overflow:hidden; }
//     .ai-pill:focus-within { box-shadow:0 24px 60px rgba(230,0,0,0.14); border-color:rgba(230,0,0,0.35); }
//     .ai-input { flex:1; border:none; outline:none; padding:20px 28px; font-size:18px; font-weight:600; font-family:'DM Sans',sans-serif; color:var(--dark); background:transparent; }
//     .ai-input::placeholder { color:#b0b8c8; font-weight:500; }
//     .btn-red { background:var(--red); color:#fff; border:none; padding:16px 36px; border-radius:50px; font-weight:800; font-size:16px; cursor:pointer; display:inline-flex; align-items:center; gap:9px; font-family:'DM Sans',sans-serif; transition:opacity 0.2s; margin:6px; }
//     .btn-red:hover { opacity:0.9; }
//     .btn-red:disabled { opacity:0.6; cursor:not-allowed; }
//     .ai-spinner { width:20px; height:20px; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.7s linear infinite; }

//     /* STATS */
//     .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; background:var(--border); border:1px solid var(--border); border-radius:24px; overflow:hidden; }
//     .stat-cell { background:#fff; padding:40px 32px; text-align:center; }
//     .stat-value { font-family:'Syne',sans-serif; font-size:clamp(36px,4vw,56px); font-weight:900; color:var(--dark); line-height:1; margin-bottom:8px; }
//     .stat-label { font-size:14px; color:var(--muted); font-weight:600; }

//     /* FEATURES */
//     .features-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
//     .feature-card { background:#fff; border-radius:24px; padding:36px; border:1.5px solid var(--border); transition:border-color 0.25s, box-shadow 0.25s, transform 0.25s; }
//     .feature-card:hover { border-color:rgba(230,0,0,0.3); box-shadow:0 16px 40px rgba(230,0,0,0.08); transform:translateY(-4px); }
//     .feature-icon { width:52px; height:52px; background:var(--light); border-radius:16px; display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
//     .feature-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; margin-bottom:10px; }
//     .feature-desc { color:var(--muted); font-size:15px; line-height:1.65; font-weight:500; }

//     /* CAMPUSES */
//     .campus-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
//     .campus-card { padding:32px; border-radius:20px; border:1.5px solid var(--border); display:flex; justify-content:space-between; align-items:center; background:#fff; transition:border-color 0.2s; }
//     .campus-card:hover { border-color:rgba(230,0,0,0.25); }
//     .campus-badge-live { background:rgba(230,0,0,0.08); color:var(--red); font-size:11px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; padding:4px 10px; border-radius:20px; display:inline-block; margin-bottom:10px; }
//     .campus-badge-soon { background:#f1f5f9; color:var(--muted); font-size:11px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; padding:4px 10px; border-radius:20px; display:inline-block; margin-bottom:10px; }
//     .campus-name { font-family:'Syne',sans-serif; font-size:22px; font-weight:900; color:var(--dark); margin-bottom:6px; }
//     .campus-loc { font-size:14px; color:var(--muted); font-weight:600; display:flex; align-items:center; gap:5px; }
//     .campus-time { font-family:'Syne',sans-serif; font-size:28px; font-weight:900; color:var(--dark); }
//     .campus-time-label { font-size:12px; color:var(--muted); font-weight:600; text-align:right; }

//     /* ── JOIN CTA (replaces the old inline registration form) ── */
//     .join-section { background:var(--dark); padding:120px 5%; }
//     .join-inner { max-width:1400px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
//     .join-cards { display:flex; flex-direction:column; gap:16px; }
//     .join-card {
//       background:rgba(255,255,255,0.04);
//       border:1.5px solid rgba(255,255,255,0.08);
//       border-radius:20px; padding:24px 28px;
//       display:flex; align-items:center; gap:20px;
//       transition:border-color 0.2s, background 0.2s;
//       cursor:pointer; text-decoration:none;
//     }
//     .join-card:hover { border-color:rgba(230,0,0,0.4); background:rgba(230,0,0,0.05); }
//     .join-card-icon { width:48px; height:48px; background:rgba(230,0,0,0.15); border-radius:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
//     .join-card-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:#fff; margin-bottom:3px; }
//     .join-card-desc { color:rgba(255,255,255,0.5); font-size:13px; font-weight:500; }
//     .join-card-arrow { margin-left:auto; color:rgba(255,255,255,0.3); flex-shrink:0; }
//     .join-cta-btn { display:inline-flex; align-items:center; gap:10px; background:var(--red); color:#fff; border:none; padding:18px 40px; border-radius:50px; font-family:'DM Sans',sans-serif; font-weight:800; font-size:18px; cursor:pointer; transition:opacity 0.2s, transform 0.2s; margin-top:8px; }
//     .join-cta-btn:hover { opacity:0.88; transform:translateY(-2px); }
//     .join-login-link { display:inline-flex; align-items:center; gap:8px; margin-left:20px; color:rgba(255,255,255,0.5); font-size:15px; font-weight:600; cursor:pointer; border:none; background:none; transition:color 0.2s; }
//     .join-login-link:hover { color:#fff; }

//     /* FOOTER */
//     .footer { padding:80px 5% 40px; border-top:1.5px solid var(--border); }
//     .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:60px; margin-bottom:60px; }
//     .footer-logo { font-family:'Syne',sans-serif; font-size:28px; font-weight:900; color:var(--dark); margin-bottom:16px; }
//     .footer-logo span { color:var(--red); }
//     .footer-desc { color:var(--muted); font-size:16px; line-height:1.7; font-weight:500; }
//     .footer-heading { font-family:'Syne',sans-serif; font-weight:800; font-size:16px; color:var(--dark); margin-bottom:24px; }
//     .footer-link { display:block; color:var(--muted); text-decoration:none; font-weight:600; font-size:15px; margin-bottom:14px; transition:color 0.2s; }
//     .footer-link:hover { color:var(--red); }
//     .footer-bottom { border-top:1.5px solid var(--border); padding-top:32px; display:flex; justify-content:space-between; align-items:center; color:var(--muted); font-size:14px; font-weight:600; flex-wrap:wrap; gap:16px; }

//     /* RESPONSIVE */
//     @media (max-width: 1100px) {
//       .hero-container { grid-template-columns:1fr; }
//       .hero-floaters { display:none; }
//       .stats-grid { grid-template-columns:repeat(2,1fr); }
//       .features-grid { grid-template-columns:repeat(2,1fr); }
//       .join-inner { grid-template-columns:1fr; gap:48px; }
//       .footer-grid { grid-template-columns:1fr 1fr; }
//     }
//     @media (max-width: 768px) {
//       .nav-links { display:none; flex-direction:column; position:fixed; top:72px; left:0; right:0; background:#fff; padding:28px 5%; border-bottom:1px solid var(--border); box-shadow:0 20px 40px rgba(0,0,0,0.08); z-index:799; }
//       .nav-links.open { display:flex; }
//       .btn-menu { display:flex; }
//       .ai-pill { flex-direction:column; border-radius:24px; padding:12px; }
//       .ai-input { text-align:center; font-size:16px; }
//       .ai-pill .btn-red { width:calc(100% - 12px); justify-content:center; margin:0 6px 6px; }
//       .ai-search-icon { display:none; }
//       .stats-grid { grid-template-columns:1fr 1fr; }
//       .features-grid { grid-template-columns:1fr; }
//       .campus-grid { grid-template-columns:1fr; }
//       .footer-grid { grid-template-columns:1fr; gap:40px; }
//       .footer-bottom { flex-direction:column; text-align:center; }
//       .section { padding:80px 5%; }
//       .join-section { padding:80px 5%; }
//       .join-cta-btn { width:100%; justify-content:center; }
//       .join-login-link { margin-left:0; margin-top:12px; }
//     }
//   `;

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: CSS }} />

//       <DynamicIsland />

//       {/* ── NAV ── */}
//       <nav className="nav">
//         <a href="#" className="nav-logo">
//           ODG<span>.</span>
//         </a>
//         <button className="btn-menu" onClick={() => setMenuOpen((o) => !o)}>
//           {menuOpen ? (
//             <X size={28} color="var(--dark)" />
//           ) : (
//             <Menu size={28} color="var(--dark)" />
//           )}
//         </button>
//         <div className={`nav-links ${menuOpen ? "open" : ""}`}>
//           <a href="#ai" className="nav-link" onClick={() => setMenuOpen(false)}>
//             ODG AI
//           </a>
//           <a
//             href="#campuses"
//             className="nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             Campuses
//           </a>
//           <a
//             href="#join"
//             className="nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             Join
//           </a>
//           <button className="btn-nav" onClick={() => router.push("/login")}>
//             Sign In
//           </button>
//         </div>
//       </nav>

//       {/* ── HERO ── */}
//       <header className="hero">
//         <div className="hero-grid-bg" />
//         <div className="hero-container">
//           <div>
//             <div className="hero-eyebrow">
//               <span
//                 style={{
//                   width: 8,
//                   height: 8,
//                   borderRadius: "50%",
//                   background: "#fff",
//                   animation: "pulse-red 1.8s infinite",
//                   flexShrink: 0,
//                 }}
//               />
//               Now Live · Ibadan & Oyo
//             </div>
//             <h1 className="hero-h1">
//               Campus meals.
//               <br />
//               Delivered in
//               <br />
//               <span
//                 style={{
//                   color: "rgba(255,255,255,0.45)",
//                   textDecoration: "line-through",
//                   fontSize: "0.7em",
//                 }}
//               >
//                 forever.
//               </span>{" "}
//               15 min.
//             </h1>
//             <p className="hero-sub">
//               The premium food delivery network built for Nigerian university
//               campuses. Hot, fresh meals from top vendors — to your exact hostel
//               door.
//             </p>
//             <div className="hero-ctas">
//               <button
//                 className="btn-white"
//                 onClick={() => router.push("/register?role=user")}
//               >
//                 <ShoppingBag size={22} /> Order Now
//               </button>
//               <button
//                 className="btn-ghost"
//                 onClick={() =>
//                   document
//                     .getElementById("campuses")
//                     ?.scrollIntoView({ behavior: "smooth" })
//                 }
//               >
//                 Explore Campuses <ArrowRight size={20} />
//               </button>
//             </div>
//           </div>

//           <div className="hero-floaters">
//             <div
//               className="floater"
//               style={{
//                 top: "8%",
//                 right: "5%",
//                 animation: "floatA 6s ease-in-out infinite",
//               }}
//             >
//               <div className="floater-icon">
//                 <Flame size={22} color="#fff" />
//               </div>
//               <div>
//                 <div className="floater-label">Trending Now</div>
//                 <div className="floater-value">Spicy Chicken Wrap</div>
//               </div>
//             </div>
//             <div
//               className="floater"
//               style={{
//                 top: "42%",
//                 left: "0%",
//                 animation: "floatB 7.5s ease-in-out infinite",
//               }}
//             >
//               <div className="floater-icon">
//                 <Clock size={22} color="#fff" />
//               </div>
//               <div>
//                 <div className="floater-label">ETA to Block C</div>
//                 <div className="floater-value">12 Minutes</div>
//               </div>
//             </div>
//             <div
//               className="floater"
//               style={{
//                 bottom: "12%",
//                 right: "12%",
//                 animation: "floatA 5.5s ease-in-out infinite 1s",
//                 background: "#0f172a",
//               }}
//             >
//               <div
//                 className="floater-icon"
//                 style={{ background: "rgba(255,255,255,0.1)" }}
//               >
//                 <Star size={22} color="#f59e0b" fill="#f59e0b" />
//               </div>
//               <div>
//                 <div className="floater-label" style={{ color: "#94a3b8" }}>
//                   Vendor Rating
//                 </div>
//                 <div className="floater-value" style={{ color: "#fff" }}>
//                   4.9 · 200+ Reviews
//                 </div>
//               </div>
//             </div>
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%,-50%)",
//                 width: 320,
//                 height: 320,
//                 borderRadius: "50%",
//                 border: "1.5px solid rgba(255,255,255,0.12)",
//                 zIndex: -1,
//               }}
//             />
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%,-50%)",
//                 width: 480,
//                 height: 480,
//                 borderRadius: "50%",
//                 border: "1px solid rgba(255,255,255,0.06)",
//                 zIndex: -1,
//               }}
//             />
//           </div>
//         </div>
//       </header>

//       {/* ── TICKER ── */}
//       <Ticker />

//       {/* ── STATS ── */}
//       <div className="section" style={{ paddingBottom: 0 }}>
//         <div className="container">
//           <div className="stats-grid">
//             {stats.map((s, i) => (
//               <div key={i} className="stat-cell">
//                 <div className="stat-value">{s.value}</div>
//                 <div className="stat-label">{s.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── AI SEARCH ── */}
//       <section id="ai" className="section" style={{ textAlign: "center" }}>
//         <div className="container">
//           <div className="section-eyebrow">
//             <Sparkles size={16} /> ODG Food AI
//           </div>
//           <h2
//             className="section-h2"
//             style={{ margin: "0 auto 16px", maxWidth: 720 }}
//           >
//             What are you <span style={{ color: "var(--red)" }}>craving?</span>
//           </h2>
//           <p className="section-sub" style={{ margin: "0 auto 48px" }}>
//             Describe your mood, budget, or dietary needs — our AI matches you
//             with the best campus vendors instantly.
//           </p>
//           <form onSubmit={handleAI} className="ai-pill">
//             <Search
//               size={24}
//               color="#b0b8c8"
//               style={{ marginLeft: 20, flexShrink: 0 }}
//               className="ai-search-icon"
//             />
//             <input
//               value={aiPrompt}
//               onChange={(e) => setAiPrompt(e.target.value)}
//               placeholder="e.g., 'budget ₦2500, something spicy near Block D'"
//               className="ai-input"
//               required
//             />
//             <button type="submit" className="btn-red" disabled={aiLoading}>
//               {aiLoading ? (
//                 <>
//                   <div className="ai-spinner" /> Scanning…
//                 </>
//               ) : (
//                 <>
//                   <Sparkles size={18} /> Find Food
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </section>

//       <AIModal results={aiModal} onClose={() => setAiModal(null)} />

//       {/* ── FEATURES ── */}
//       <section className="section section-alt">
//         <div className="container">
//           <div className="section-eyebrow">
//             <Zap size={16} /> Why ODG
//           </div>
//           <h2 className="section-h2">
//             Built for campus life.
//             <br />
//             <span style={{ color: "var(--red)" }}>Nothing else.</span>
//           </h2>
//           <p className="section-sub" style={{ marginBottom: 56 }}>
//             Every feature engineered around how students actually eat, order,
//             and live on campus.
//           </p>
//           <div className="features-grid">
//             {[
//               {
//                 icon: <Clock size={24} color="var(--red)" />,
//                 title: "15-Minute Guarantee",
//                 desc: "Our rider network is geo-optimised around campus layouts. Your food is hot when it arrives, not when it leaves.",
//               },
//               {
//                 icon: <MapPin size={24} color="var(--red)" />,
//                 title: "Hostel-Precise Delivery",
//                 desc: 'Drop a pin at your exact block and room number. No more "meet me at the gate" situations.',
//               },
//               {
//                 icon: <Star size={24} color="var(--red)" />,
//                 title: "Curated 4.7★+ Vendors",
//                 desc: "Every restaurant on ODG passes our taste and hygiene audit. Mediocre food doesn't ship.",
//               },
//               {
//                 icon: <Sparkles size={24} color="var(--red)" />,
//                 title: "AI-Powered Matching",
//                 desc: "Tell us your budget, craving, and dietary needs. Our AI surfaces the best options in seconds.",
//               },
//               {
//                 icon: <Shield size={24} color="var(--red)" />,
//                 title: "Secure Payments",
//                 desc: "Pay with cards, bank transfers, or campus wallets. Every transaction is encrypted end-to-end.",
//               },
//               {
//                 icon: <TrendingUp size={24} color="var(--red)" />,
//                 title: "Vendor Analytics",
//                 desc: "Restaurant partners get real-time dashboards, peak-hour insights, and order flow management tools.",
//               },
//             ].map((f, i) => (
//               <div key={i} className="feature-card">
//                 <div className="feature-icon">{f.icon}</div>
//                 <h3 className="feature-title">{f.title}</h3>
//                 <p className="feature-desc">{f.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CAMPUSES ── */}
//       <section id="campuses" className="section">
//         <div className="container">
//           <div className="section-eyebrow">
//             <MapPin size={16} /> Coverage
//           </div>
//           <h2 className="section-h2">
//             Active <span style={{ color: "var(--red)" }}>campuses.</span>
//           </h2>
//           <p className="section-sub" style={{ marginBottom: 48 }}>
//             We&apos;re live on the highest-density student campuses in Oyo
//             State, with rapid expansion underway.
//           </p>
//           <div className="campus-grid">
//             {campuses.map((c, i) => (
//               <div key={i} className="campus-card">
//                 <div>
//                   <span
//                     className={
//                       c.status === "LIVE"
//                         ? "campus-badge-live"
//                         : "campus-badge-soon"
//                     }
//                   >
//                     {c.status === "LIVE" ? "● Live Now" : "○ Coming Soon"}
//                   </span>
//                   <div className="campus-name">{c.name}</div>
//                   <div className="campus-loc">
//                     <MapPin size={14} />
//                     {c.city}, {c.state}
//                   </div>
//                 </div>
//                 <div style={{ textAlign: "right" }}>
//                   <div className="campus-time">{c.time}</div>
//                   <div className="campus-time-label">Avg. ETA</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── JOIN CTA (replaces the old inline form) ── */}
//       <section id="join" className="join-section">
//         <div className="join-inner">
//           {/* Copy */}
//           <div>
//             <div
//               className="section-eyebrow"
//               style={{ color: "rgba(255,255,255,0.45)" }}
//             >
//               <Zap size={16} /> Join the Network
//             </div>
//             <h2 className="section-h2" style={{ color: "#fff" }}>
//               Your account.
//               <br />
//               <span style={{ color: "var(--red)" }}>Your role.</span>
//             </h2>
//             <p
//               className="section-sub"
//               style={{ color: "rgba(255,255,255,0.55)", marginBottom: 40 }}
//             >
//               Sign up as a student to start ordering, or as a vendor to manage
//               your restaurant and unlock live dashboards.
//             </p>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 gap: 0,
//               }}
//             >
//               <button
//                 className="join-cta-btn"
//                 onClick={() => router.push("/register")}
//               >
//                 <Zap size={20} /> Create Account
//               </button>
//               <button
//                 className="join-login-link"
//                 onClick={() => router.push("/login")}
//               >
//                 Already have an account? Sign in →
//               </button>
//             </div>
//           </div>

//           {/* Role cards */}
//           <div className="join-cards">
//             {[
//               {
//                 icon: <Utensils size={22} color="var(--red)" />,
//                 role: "Student",
//                 desc: "Order from top campus vendors in minutes.",
//                 href: "/register?role=user",
//               },
//               {
//                 icon: <Store size={22} color="var(--red)" />,
//                 role: "Vendor",
//                 desc: "List your restaurant, manage orders, grow revenue.",
//                 href: "/register?role=vendor",
//               },
//               {
//                 icon: <Bike size={22} color="var(--red)" />,
//                 role: "Rider",
//                 desc: "Deliver on your schedule and earn daily.",
//                 href: "/register?role=rider",
//               },
//             ].map((item, i) => (
//               <a key={i} className="join-card" href={item.href}>
//                 <div className="join-card-icon">{item.icon}</div>
//                 <div>
//                   <div className="join-card-title">{item.role}</div>
//                   <div className="join-card-desc">{item.desc}</div>
//                 </div>
//                 <ArrowRight size={18} className="join-card-arrow" />
//               </a>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── FOOTER ── */}
//       <footer className="footer">
//         <div className="container">
//           <div className="footer-grid">
//             <div>
//               <div className="footer-logo">
//                 ODG<span>.</span>
//               </div>
//               <p className="footer-desc">
//                 The premium food delivery network for Nigerian university
//                 campuses. Hot meals. Fast riders. Zero compromise.
//               </p>
//             </div>
//             <div>
//               <div className="footer-heading">Platform</div>
//               <a href="#ai" className="footer-link">
//                 ODG Food AI
//               </a>
//               <a href="#campuses" className="footer-link">
//                 Campuses
//               </a>
//               <a href="/register" className="footer-link">
//                 Create Account
//               </a>
//             </div>
//             <div>
//               <div className="footer-heading">Partner</div>
//               <a href="/register?role=vendor" className="footer-link">
//                 List Your Restaurant
//               </a>
//               <a href="/register?role=rider" className="footer-link">
//                 Become a Rider
//               </a>
//               <a href="#" className="footer-link">
//                 Contact Sales
//               </a>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <span>© 2026 ODG Deliveries Ltd. All rights reserved.</span>
//             <div style={{ display: "flex", gap: 32 }}>
//               <a href="#" className="footer-link" style={{ marginBottom: 0 }}>
//                 Privacy Policy
//               </a>
//               <a href="#" className="footer-link" style={{ marginBottom: 0 }}>
//                 Terms of Service
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }
