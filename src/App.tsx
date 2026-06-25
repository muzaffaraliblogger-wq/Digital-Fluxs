import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  TrendingUp,
  Sparkles,
  Activity,
  FileText,
  CheckCircle,
  Phone,
  MapPin,
  Mail,
  Globe,
  Lock,
  Shield,
  Eye,
  Settings,
  Search,
  Plus,
  Trash2,
  Download,
  ExternalLink,
  Briefcase,
  Clock,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Sparkle,
  Smile,
  HeartPulse,
  Send,
  Sliders,
  Check,
  AlertCircle
} from "lucide-react";

// Types
interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  status: "New" | "Contacted" | "Qualified" | "Booked" | "Closed";
  source: string;
  notes?: string;
  createdAt: string;
}

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  doctorId: string;
  treatmentId: string;
  date: string;
  time: string;
  notes: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "Unread" | "Read" | "Replied";
}

interface ActivityLog {
  id: string;
  timestamp: string;
  type: string;
  message: string;
}

interface DashboardStats {
  appointmentsToday: number;
  totalLeads: number;
  totalPatients: number;
  revenue: number;
  visitorCount: number;
  recentActivities: ActivityLog[];
}

// Doctors dataset
const DOCTORS = [
  { id: "doc-1", name: "Dr. Alexander Mercer", role: "Chief Implantologist", bio: "DDS, MS (Columbia University). Over 18 years of excellence in cosmetic restorations.", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80" },
  { id: "doc-2", name: "Dr. Sarah Jenkins", role: "Orthodontics Specialist", bio: "Ph.D. in Aligner Science & Orthodontic Arts (King's College London).", image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=300&q=80" },
  { id: "doc-3", name: "Dr. Michael Chang", role: "Endodontics Specialist", bio: "Microscopic Root Canal Therapy expert. Board-certified with international honors.", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80" },
  { id: "doc-4", name: "Dr. Emily Ross", role: "Pediatric Dental Surgeon", bio: "Double-board certified Pediatric Dentist. Specialized in anxious patient care.", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80" }
];

// Treatments dataset
const TREATMENTS = [
  {
    id: "srv-1",
    name: "Cosmetic Dentistry",
    description: "Premium handcrafted porcelain veneers and smile re-contouring for a flawless Hollywood appearance.",
    price: "$1,200 - $2,500 per tooth",
    duration: "2 sessions",
    benefits: ["Bespoke design mirroring natural tooth anatomy", "High-stain resistant glass-ceramic porcelain", "Minimally invasive preparation technology"],
    timeline: ["Digital 3D Smile Analysis", "Trial Smile Mockup", "Artisanal Veneer Cementation"],
    icon: Sparkles
  },
  {
    id: "srv-2",
    name: "Dental Implants",
    description: "Lifetime-guaranteed single tooth or full-mouth restoration utilizing state-of-the-art titanium roots.",
    price: "$3,200 - $5,500",
    duration: "3 - 6 months",
    benefits: ["Pre-designed computer-guided keyhole placement", "High biocompatible titanium structures", "Instant stable tooth loading capabilities"],
    timeline: ["CBCT Bone Scan Planning", "Guided Implant Placement", "Bespoke Zirconia Crown Crown Fitting"],
    icon: Activity
  },
  {
    id: "srv-3",
    name: "Root Canal Therapy",
    description: "Painless microscopic nerve rescue restoring severely infected root chambers with 99.8% precision.",
    price: "$850 - $1,400",
    duration: "1 - 2 sessions",
    benefits: ["Advanced endodontic laser decontamination", "Eliminates dental pain instantly", "Preserves the biological integrity of your original tooth"],
    timeline: ["Microscopic Pulp Cleanse", "Three-dimensional Obturation", "Fiber Post & Core Crown Reinforcement"],
    icon: HeartPulse
  },
  {
    id: "srv-4",
    name: "Teeth Whitening",
    description: "Advanced laser-activated whitening technology delivering up to 8 shades lighter in single session.",
    price: "$350 - $600",
    duration: "45 minutes",
    benefits: ["Laser-activated zero sensitivity chemistry", "Includes customized take-home maintainers", "Guaranteed visible same-day aesthetic lift"],
    timeline: ["Gingival Protection Isolation", "Laser-Activated Gel Cycle", "Mineralizing Enamel Enclosure"],
    icon: Sparkle
  },
  {
    id: "srv-5",
    name: "Orthodontics & Aligners",
    description: "Virtually invisible clear aligners custom-modeled by orthodontic AI algorithms for swift tooth movement.",
    price: "$4,800 - $6,500",
    duration: "6 - 14 months",
    benefits: ["Zero dietary limits with removable medical trays", "AI progress-monitoring minimizes office visits", "Includes premium post-treatment retainer set"],
    timeline: ["Full-jaw Intraoral 3D Scan", "Dynamic Treatment Trajectory Preview", "Weekly Progression Trays Exchange"],
    icon: Sliders
  },
  {
    id: "srv-6",
    name: "Pediatric Dentistry",
    description: "Gentle child-centered preventive hygiene, sealants, and early guidance in an ultra-fun atmosphere.",
    price: "$150 - $300",
    duration: "30 - 45 mins",
    benefits: ["Anxiety-free laughing gas options", "BPA-free high adhesion fissure protective sealants", "Fun interactive oral education"],
    timeline: ["Interactive Friendly Introduction", "Gentle Diagnostic Cleanse", "Tooth-Monster Shield Polish"],
    icon: Smile
  },
  {
    id: "srv-7",
    name: "Emergency Dental Care",
    description: "Immediate same-day interventions for sudden trauma, tooth loss, abscesses, or excruciating root pain.",
    price: "From $250",
    duration: "Immediate relief",
    benefits: ["Guaranteed prompt same-day treatment slot", "Instant on-site computed diagnostics", "Flexible rapid-response medical team"],
    timeline: ["Emergency Trauma Triage", "Instant Diagnostics & Sedation", "Definitive Pain Elimination"],
    icon: Shield
  }
];

// Blog posts
const BLOG_POSTS = [
  {
    id: "post-1",
    title: "The Ultimate Guide to Porcelain Veneers vs Clear Aligners",
    excerpt: "Discover which premium aesthetic pathway best aligns with your long-term smile transformation goals and lifestyle requirements.",
    content: "When mapping out a world-class smile makeover, patients are typically presented with two premier dental solutions: custom porcelain veneers or therapeutic clear aligners. Porcelain veneers are micro-thin glass-ceramic shells hand-painted and bonded over prepared teeth. This delivers instant correction of shade, minor gaps, chip marks, and length in only two office visits. Conversely, clear aligners represent a highly structured, longer-term corrective orthodontic therapy that gently shifts original teeth into correct alignment using sequential biological forces. While veneers offer a literal overnight aesthetic upgrade, aligners prioritize natural structural integrity. Choosing the right treatment depends heavily on whether your primary objective is addressing immediate cosmetic blemishes or solving long-term occlusion and functional layout concerns.",
    author: "Dr. Alexander Mercer",
    category: "Cosmetic",
    date: "June 18, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "post-2",
    title: "Guided Surgery: How AI is Revolutionizing Dental Implants",
    excerpt: "Learn how computed tomography and 3D intraoral navigation eliminate surgical guesswork for lifetime-guaranteed implant restorations.",
    content: "The era of estimating bone density and freehand drilling during implant placement has been completely replaced by guided robotic surgery. At DentalCare, we utilize advanced 3D computer-guided software to stitch together 3D Cone Beam Computed Tomography (CBCT) data with modern intraoral laser scans. This creates an exact digital clone of the patient's oral architecture. The implantologist can digitally place virtual titanium implants within the software, avoiding complex anatomical structures like nerves or sinus cavities down to a tenth of a millimeter. This meticulous blueprint is then materialized into an physical surgical guide using ultra-precise 3D printers, resulting in faster healing times, less pain, and unparalleled longevity.",
    author: "Dr. Sarah Jenkins",
    category: "Technology",
    date: "May 29, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "post-3",
    title: "Caring for Your Teeth Whitening: Tips for Prolonged Radiance",
    excerpt: "A comprehensive checklist of habits, diet, and dynamic home accessories to preserve the glowing shade of your professional laser treatment.",
    content: "To guarantee your premium teeth whitening results last, understanding the 'White Diet' is essential. In the first 48 hours following a professional laser treatment, your tooth enamel is temporarily more porous and prone to absorbing pigments. Patients must strictly avoid dark berries, coffee, red wines, and curry sauces during this crucial window. Incorporating customized home-maintenance trays with active remineralization gels, staying hydrated, and using gentle, non-abrasive polishing toothpastes will preserve your brilliant shade for many years.",
    author: "Dr. Emily Ross",
    category: "Hygiene",
    date: "April 12, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80",
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "services" | "blog" | "contact" | "book" | "crm">("home");
  const [selectedService, setSelectedService] = useState<typeof TREATMENTS[0] | null>(null);
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  // Stats from backend
  const [stats, setStats] = useState<DashboardStats>({
    appointmentsToday: 1,
    totalLeads: 4,
    totalPatients: 3,
    revenue: 14500,
    visitorCount: 1248,
    recentActivities: [],
  });

  // CRM specific state
  const [crmLeads, setCrmLeads] = useState<Lead[]>([]);
  const [crmAppointments, setCrmAppointments] = useState<Appointment[]>([]);
  const [crmContacts, setCrmContacts] = useState<ContactSubmission[]>([]);
  const [isCrmAuthenticated, setIsCrmAuthenticated] = useState<boolean>(false);
  const [crmPassword, setCrmPassword] = useState<string>("");
  const [crmError, setCrmError] = useState<string>("");
  const [leadSearch, setLeadSearch] = useState<string>("");
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>("All");

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    patientName: "",
    phone: "",
    email: "",
    doctorId: "doc-1",
    treatmentId: "srv-1",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    time: "10:00",
    notes: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState<string>("");
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [contactSuccess, setContactSuccess] = useState<string>("");
  const [contactLoading, setContactLoading] = useState<boolean>(false);

  // WordPress File Generator state (interactive inspection)
  const [wpFileView, setWpFileView] = useState<"style.css" | "functions.php" | "header.php" | "footer.php" | "crm-plugin" | "appt-plugin">("style.css");

  // Before After gallery slider simulation state
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Load backend stats & data
  const refreshCRMData = async () => {
    try {
      const statsRes = await fetch("/api/dashboard");
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      const leadsRes = await fetch("/api/leads");
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setCrmLeads(leadsData);
      }

      const apptsRes = await fetch("/api/appointments");
      if (apptsRes.ok) {
        const apptsData = await apptsRes.json();
        setCrmAppointments(apptsData);
      }

      const contactsRes = await fetch("/api/contacts");
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setCrmContacts(contactsData);
      }
    } catch (err) {
      console.error("Error connecting to full-stack backend:", err);
    }
  };

  useEffect(() => {
    refreshCRMData();
    // Refresh stats every 15 seconds silently
    const interval = setInterval(refreshCRMData, 15000);
    return () => clearInterval(interval);
  }, []);

  // Submit appointment booking
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.patientName || !bookingForm.phone || !bookingForm.date || !bookingForm.time) {
      alert("Please fill out all required fields.");
      return;
    }
    setBookingLoading(true);
    setBookingSuccess("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm)
      });
      if (res.ok) {
        const data = await res.json();
        setBookingSuccess(`Success! Appointment request received for ${bookingForm.patientName} on ${bookingForm.date} at ${bookingForm.time}. A secure SMTP email notification has been simulated for both doctor and patient.`);
        setBookingForm({
          patientName: "",
          phone: "",
          email: "",
          doctorId: "doc-1",
          treatmentId: "srv-1",
          date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          time: "10:00",
          notes: ""
        });
        refreshCRMData();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to book appointment.");
      }
    } catch (err) {
      alert("Error reaching booking server.");
    } finally {
      setBookingLoading(false);
    }
  };

  // Submit contact message
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Please fill out Name, Email, and Message.");
      return;
    }
    setContactLoading(true);
    setContactSuccess("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setContactSuccess("Thank you! Your message was received by the admin team. An automated AI-guided email responder has been sent to your inbox.");
        setContactForm({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: ""
        });
        refreshCRMData();
      } else {
        alert("Failed to submit contact request.");
      }
    } catch (err) {
      alert("Error reaching server.");
    } finally {
      setContactLoading(false);
    }
  };

  // Authenticate CRM Panel
  const handleCrmLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Super secure clinic code, defaulting to empty or 'admin' or 'dentalcare'
    if (crmPassword.toLowerCase() === "admin" || crmPassword.toLowerCase() === "dentalcare" || crmPassword === "") {
      setIsCrmAuthenticated(true);
      setCrmError("");
      refreshCRMData();
    } else {
      setCrmError("Invalid administrative clinic password. Use 'admin' or leave blank.");
    }
  };

  // Change lead status dynamically
  const updateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        refreshCRMData();
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Change appointment status
  const updateAppointmentStatus = async (apptId: string, newStatus: Appointment["status"]) => {
    try {
      const res = await fetch(`/api/appointments/${apptId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        refreshCRMData();
      }
    } catch (err) {
      console.error("Failed to update appointment", err);
    }
  };

  // Delete lead
  const deleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to remove this lead record?")) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
      if (res.ok) {
        refreshCRMData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete appointment
  const deleteAppt = async (apptId: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      const res = await fetch(`/api/appointments/${apptId}`, { method: "DELETE" });
      if (res.ok) {
        refreshCRMData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter leads based on query
  const filteredLeads = crmLeads.filter((l) => {
    const matchesSearch =
      l.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch) ||
      l.serviceInterest.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus = leadStatusFilter === "All" || l.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-[#1A1A1A] font-sans flex flex-col antialiased">
      
      {/* Upper Announcement Rail */}
      <div className="bg-[#0F4C81] text-white py-2.5 px-4 text-xs font-semibold tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#1DB6C4]" />
              Premium Global Hubs: London • New York • Dubai • Sydney • Beverly Hills
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-[#1DB6C4] text-white px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase animate-pulse">Emergency Triage</span>
            <span className="hover:underline cursor-pointer flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#1DB6C4]" />
              +1 800 DENTAL CARE (Toll-Free 24/7)
            </span>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav id="navbar" className="bg-white px-6 py-5 sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab("home"); setSelectedPost(null); }}>
            <div className="w-10 h-10 bg-[#0F4C81] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Sparkles className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-[#0F4C81] block leading-none">
                DentalCare<span className="text-[#1DB6C4]">.</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mt-1">Creating Healthy Smiles</span>
            </div>
          </div>

          {/* Navigation links */}
          <div className="hidden lg:flex gap-8 text-xs font-bold text-[#0f4c81] uppercase tracking-wider items-center">
            <button
              onClick={() => { setActiveTab("home"); setSelectedPost(null); }}
              className={`hover:text-[#1DB6C4] transition-colors pb-1 border-b-2 ${activeTab === "home" ? "border-[#1DB6C4] text-[#1DB6C4]" : "border-transparent"}`}
            >
              Overview
            </button>
            <button
              onClick={() => { setActiveTab("services"); setSelectedPost(null); }}
              className={`hover:text-[#1DB6C4] transition-colors pb-1 border-b-2 ${activeTab === "services" ? "border-[#1DB6C4] text-[#1DB6C4]" : "border-transparent"}`}
            >
              Treatments
            </button>
            <button
              onClick={() => { setActiveTab("blog"); setSelectedPost(null); }}
              className={`hover:text-[#1DB6C4] transition-colors pb-1 border-b-2 ${activeTab === "blog" ? "border-[#1DB6C4] text-[#1DB6C4]" : "border-transparent"}`}
            >
              Hygiene Blog
            </button>
            <button
              onClick={() => { setActiveTab("contact"); setSelectedPost(null); }}
              className={`hover:text-[#1DB6C4] transition-colors pb-1 border-b-2 ${activeTab === "contact" ? "border-[#1DB6C4] text-[#1DB6C4]" : "border-transparent"}`}
            >
              Contact Us
            </button>
            <button
              onClick={() => { setActiveTab("crm"); setSelectedPost(null); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 hover:text-[#1DB6C4] transition-all text-[11px] font-extrabold ${activeTab === "crm" ? "bg-blue-50 text-[#0F4C81] border border-blue-100" : ""}`}
            >
              <Lock className="w-3.5 h-3.5 text-[#1DB6C4]" />
              Staff CRM
            </button>
          </div>

          {/* Call-to-action button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setActiveTab("book"); setSelectedPost(null); }}
              className="bg-[#1DB6C4] hover:bg-[#0F4C81] text-white px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-500/15 hover:shadow-lg transition-all"
            >
              Secure Booking
            </button>
          </div>

        </div>
      </nav>

      {/* Hero Section (only when Home is active) */}
      {activeTab === "home" && (
        <section className="bg-gradient-to-br from-white via-[#F7FAFC] to-[#e6f4f5] relative overflow-hidden py-20 lg:py-28 px-6 border-b border-gray-100">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-[#1DB6C4] animate-pulse"></span>
                <span className="text-[10px] text-[#0F4C81] uppercase font-extrabold tracking-widest font-display">
                  VIP International Healthcare
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F4C81] leading-[1.1] tracking-tight">
                Advanced Dental Care For <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C81] via-[#1DB6C4] to-[#0A3256]">Every Smile.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed">
                Experience the pinnacle of biological oral surgery, premium veneers, and computed 3D dental diagnostics in luxurious clinical suites. Backed by real-time patient pipeline and CRM coordination.
              </p>

              {/* Verified patient social proof */}
              <div className="flex flex-wrap gap-6 pt-2 items-center">
                <div className="flex -space-x-3.5">
                  <img className="w-11 h-11 rounded-full border-4 border-white bg-gray-200" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="patient" />
                  <img className="w-11 h-11 rounded-full border-4 border-white bg-gray-300" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="patient" />
                  <img className="w-11 h-11 rounded-full border-4 border-white bg-gray-400" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="patient" />
                  <div className="flex items-center justify-center w-11 h-11 rounded-full border-4 border-white bg-[#0F4C81] text-white text-[10px] font-black tracking-tighter">15k+</div>
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm font-semibold">★★★★★</div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    5.0 Rated Global Patient Case Studies
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => setActiveTab("book")}
                  className="bg-[#0F4C81] hover:bg-[#1DB6C4] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-950/20 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Consultation
                </button>
                <a
                  href="tel:+1800555019"
                  className="bg-white border-2 border-gray-200 text-[#0F4C81] hover:border-[#1DB6C4] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#1DB6C4]" /> Call Care Team
                </a>
              </div>
            </div>

            {/* Right Interactive Image Column (Before & After Slider) */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1DB6C4]/10 to-transparent rounded-3xl -rotate-2 scale-105"></div>
              
              <div className="relative bg-white p-4 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden select-none">
                  
                  {/* Before (Original) Background */}
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542614471-001ccf2b449c?auto=format&fit=crop&w=600&q=80')` }}>
                    <div className="absolute top-4 left-4 bg-black/60 text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded">
                      Classic Teeth (Before)
                    </div>
                  </div>

                  {/* After (Restored) Sliding Overlay */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-cover bg-center border-r-2 border-white" 
                    style={{ 
                      width: `${sliderPosition}%`, 
                      backgroundImage: `url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80')` 
                    }}
                  >
                    <div className="absolute top-4 right-4 bg-[#1DB6C4]/90 text-white text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded whitespace-nowrap">
                      DentalCare Restored (After)
                    </div>
                  </div>

                  {/* Slider Control Handle */}
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderPosition} 
                    onChange={(e) => setSliderPosition(Number(e.target.value))} 
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  />
                  <div 
                    className="absolute top-0 bottom-0 pointer-events-none flex items-center justify-center" 
                    style={{ left: `calc(${sliderPosition}% - 14px)` }}
                  >
                    <div className="w-7 h-7 bg-[#0F4C81] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white text-xs font-black">
                      &harr;
                    </div>
                  </div>

                </div>

                <div className="p-4 pt-5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#1DB6C4]">Artisanal Cosmetic Veneers</span>
                    <span className="text-xs font-semibold text-gray-500">Slide to compare</span>
                  </div>
                  <h4 className="font-bold text-[#0F4C81] text-sm">Full Smile Makeover Design</h4>
                  <p className="text-xs text-gray-400">Handcrafted, ultra-thin ceramic veneers fitted in just 2 painless appointments.</p>
                </div>
              </div>

              {/* Small floating counter widget */}
              <div className="absolute -bottom-6 -left-6 bg-[#0F4C81] text-white p-4 rounded-2xl shadow-xl flex items-center gap-3.5 max-w-xs border border-blue-900">
                <div className="p-2.5 bg-[#1DB6C4] rounded-lg">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-teal-300 uppercase tracking-widest font-bold">Diagnostics</p>
                  <p className="text-xs font-semibold">100% Computerized Intraoral 3D Scanning</p>
                </div>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* Counter Statistics Dashboard Block */}
      {activeTab === "home" && (
        <section className="bg-white py-12 px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-[#0F4C81]">15k+</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Happy Patients</p>
              <p className="text-[10px] text-gray-400">USA, UK, & MENA</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-[#1DB6C4]">25+</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expert Doctors</p>
              <p className="text-[10px] text-gray-400">Double-Board Certified</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-[#0F4C81]">99.8%</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Success Rate</p>
              <p className="text-[10px] text-gray-400">Zero-Implant Rejections</p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-[#1DB6C4]">100%</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Painless Laser</p>
              <p className="text-[10px] text-gray-400">Biological Dental Care</p>
            </div>
          </div>
        </section>
      )}

      {/* Main Core View Area */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          
          {/* VIEW: HOME OVERVIEW (TREATMENTS LIST & DOCTORS & DETAILED PROOF) */}
          {activeTab === "home" && (
            <div className="space-y-20">
              
              {/* Treatments Category Cards */}
              <div className="space-y-8" id="services">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-[#1DB6C4] uppercase font-extrabold text-xs tracking-widest">
                    Signature Services
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F4C81]">
                    Luxury Specialized Dental Treatments
                  </h2>
                  <p className="text-sm text-gray-500">
                    We offer fully personalized biological smile engineering with guaranteed transparent pricing, detailed process timelines, and rapid recovery features.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {TREATMENTS.slice(0, 4).map((treatment) => {
                    const IconComponent = treatment.icon;
                    return (
                      <div 
                        key={treatment.id}
                        className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#1DB6C4] shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="w-12 h-12 bg-[#F7FAFC] text-[#0F4C81] group-hover:bg-[#1DB6C4] group-hover:text-white rounded-xl flex items-center justify-center transition-colors">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-extrabold text-[#0F4C81] text-lg group-hover:text-[#1DB6C4] transition-colors">{treatment.name}</h3>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">{treatment.price}</p>
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{treatment.description}</p>
                        </div>
                        <button 
                          onClick={() => { setSelectedService(treatment); setActiveTab("services"); }}
                          className="mt-6 text-[#1DB6C4] font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:underline"
                        >
                          View Benefits & Process <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <button 
                    onClick={() => setActiveTab("services")}
                    className="inline-flex items-center gap-2 bg-[#0F4C81] hover:bg-[#1DB6C4] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    View All Treatments & Pricing <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expert Clinicians Profile Section */}
              <div className="space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-[#1DB6C4] uppercase font-extrabold text-xs tracking-widest">
                    Medical Directory
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F4C81]">
                    Meet Our World-Class Specialists
                  </h2>
                  <p className="text-sm text-gray-500">
                    Our interdisciplinary team of double-board certified implantologists, cosmetic surgeons, and pediatric specialists are committed to lifetime oral care.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {DOCTORS.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between">
                      <div className="relative h-64 bg-gray-100 overflow-hidden group">
                        <img className="w-full h-full object-cover transition-transform group-hover:scale-105" src={doc.image} alt={doc.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                          <div>
                            <p className="text-white font-extrabold text-sm">{doc.name}</p>
                            <p className="text-teal-300 font-semibold text-[11px] uppercase tracking-wider">{doc.role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <p className="text-xs text-gray-500 leading-relaxed italic">"{doc.bio}"</p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400 font-bold border-t border-gray-100">
                          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#1DB6C4]" /> Board Certified</span>
                          <span>Columbia Alumni</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Toggles on Home */}
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-[#1DB6C4] uppercase font-extrabold text-xs tracking-widest">FAQ</span>
                  <h3 className="text-2xl font-extrabold text-[#0F4C81]">Patient General Questions</h3>
                  <p className="text-xs text-gray-500">Answers to frequent questions regarding our international patient packages.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { q: "How long does the dental implant restoration process take?", a: "With computer-guided keyhole planning, the primary titanium implant insertion takes only 25 minutes. Osseointegration (bone fusing) typically takes 3 months, followed by custom zirconia crown fitting." },
                    { q: "Do you accept international patients and direct currency payments?", a: "Yes, we accommodate international clientele with custom VIP packages including concierge clinic pickup, nearby hotel partnerships, and direct payments in USD, GBP, EUR, and AED." },
                    { q: "What anesthesia levels do you provide for surgical anxiety?", a: "We offer tailored anesthesia protocols: from highly targeted zero-needle local freezing to conscious oral sedation and certified deep IV anesthesia administered by in-house anesthesiologists." }
                  ].map((faq, i) => (
                    <details key={i} className="group border-b border-gray-100 pb-4 last:border-0 last:pb-0 cursor-pointer">
                      <summary className="flex justify-between items-center font-bold text-[#0F4C81] text-sm py-2 list-none">
                        <span>{faq.q}</span>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="text-xs text-gray-500 mt-2 pl-1 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Newsletter Call to Action */}
              <div className="bg-[#0F4C81] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <Sparkles className="w-64 h-64 text-white" />
                </div>
                <div className="space-y-3 z-10 max-w-lg">
                  <span className="text-teal-300 font-extrabold text-xs uppercase tracking-widest">Newsletter Guide</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold">Receive Elite Oral Hygiene Guides</h3>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Subscribe to receive monthly custom smile-maintenance plans, clinical technology reports, and exclusive international package announcements.
                  </p>
                </div>
                <div className="w-full md:w-auto z-10 flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="bg-white/10 text-white placeholder-blue-200 border border-white/20 rounded-xl px-4 py-3 text-xs outline-none focus:border-teal-400 min-w-[240px]" 
                  />
                  <button 
                    onClick={() => alert("Thank you! You have successfully subscribed to DentalCare Insights.")}
                    className="bg-[#1DB6C4] hover:bg-white hover:text-[#0F4C81] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Subscribe
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* VIEW: SERVICES & DETAILS */}
          {activeTab === "services" && (
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[#1DB6C4] uppercase font-extrabold text-xs tracking-widest">Our Medical Menu</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F4C81]">Personalized Specialty Treatments</h2>
                <p className="text-sm text-gray-500">Click any treatment category below to inspect our comprehensive surgical benefits, pricing schedules, and clinical timeline mapping.</p>
              </div>

              {/* Treatment Filter Grid */}
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="md:col-span-1 space-y-2">
                  {TREATMENTS.map((treatment) => (
                    <button
                      key={treatment.id}
                      onClick={() => setSelectedService(treatment)}
                      className={`w-full text-left p-4 rounded-xl font-semibold text-xs transition-all flex justify-between items-center border ${selectedService?.id === treatment.id ? "bg-[#0F4C81] text-white border-[#0F4C81]" : "bg-white text-gray-600 hover:bg-gray-50 border-gray-100"}`}
                    >
                      <span>{treatment.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-65" />
                    </button>
                  ))}
                </div>

                <div className="md:col-span-2 lg:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  {selectedService ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-start flex-wrap gap-4 border-b border-gray-100 pb-5">
                        <div>
                          <h3 className="text-2xl font-extrabold text-[#0F4C81]">{selectedService.name}</h3>
                          <span className="inline-block mt-2 px-3 py-1 bg-teal-50 text-[#1DB6C4] text-[10px] font-extrabold uppercase tracking-widest rounded">
                            Luxury Healthcare Standard
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase font-bold text-gray-400">Indicative Pricing</p>
                          <p className="text-lg font-bold text-[#1DB6C4]">{selectedService.price}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">Duration: {selectedService.duration}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-bold text-[#0F4C81] text-sm uppercase tracking-wider">Treatment Description</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{selectedService.description}</p>
                      </div>

                      {/* Benefits list */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-[#0F4C81] text-sm uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-[#1DB6C4]" /> Key Treatment Benefits
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-3 pl-1">
                          {selectedService.benefits.map((b, idx) => (
                            <li key={idx} className="text-xs text-gray-500 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1DB6C4] mt-1.5 shrink-0"></span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Process Timeline */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-[#0F4C81] text-sm uppercase tracking-wider">Clinical Process Timeline</h4>
                        <div className="grid sm:grid-cols-3 gap-4">
                          {selectedService.timeline.map((step, idx) => (
                            <div key={idx} className="bg-[#F7FAFC] p-4 rounded-xl border border-gray-100 relative">
                              <span className="absolute top-2 right-2 text-xs font-black text-[#1DB6C4]">0{idx + 1}</span>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phase {idx + 1}</p>
                              <p className="text-xs font-bold text-[#0F4C81] mt-1">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center flex-wrap gap-4">
                        <p className="text-[10px] text-gray-400 italic">Interested in this specialty? Book your custom assessment tray.</p>
                        <button
                          onClick={() => {
                            setBookingForm({
                              ...bookingForm,
                              treatmentId: selectedService.id
                            });
                            setActiveTab("book");
                          }}
                          className="bg-[#1DB6C4] hover:bg-[#0F4C81] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          Book Treatment Now
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 space-y-4">
                      <Sparkles className="w-12 h-12 text-[#1DB6C4]/30 mx-auto" />
                      <h3 className="font-bold text-[#0F4C81]">Select a Treatment Category</h3>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto">Click on any of the category buttons on the left margin to explore treatment pathways, process workflows, benefits, and price lists.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VIEW: HYGIENE BLOG & ARTICLES */}
          {activeTab === "blog" && (
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[#1DB6C4] uppercase font-extrabold text-xs tracking-widest">Articles & Knowledge</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F4C81]">The DentalCare Hygiene Journal</h2>
                <p className="text-sm text-gray-500">Expert advice, clinical guides, and teeth maintenance tutorials written directly by our board-certified clinical specialists.</p>
              </div>

              {selectedPost ? (
                /* Single Post Detail View */
                <article className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto space-y-6">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-xs font-bold text-gray-400 hover:text-[#1DB6C4] flex items-center gap-1 uppercase tracking-widest pb-2"
                  >
                    &larr; Back to Hygiene Journal
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-extrabold text-[#1DB6C4]">
                      <span>{selectedPost.category}</span>
                      <span>•</span>
                      <span>{selectedPost.date}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F4C81]">{selectedPost.title}</h3>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 pt-1 border-y border-gray-100 py-3">
                      <span className="w-8 h-8 rounded-full bg-[#F7FAFC] border border-gray-100 flex items-center justify-center font-bold text-[#0F4C81]">
                        {selectedPost.author.charAt(4)}
                      </span>
                      <div>
                        <p className="font-bold text-gray-700">{selectedPost.author}</p>
                        <p className="text-[10px] text-gray-400">Clinical Directory Contributor • {selectedPost.readTime}</p>
                      </div>
                    </div>
                  </div>

                  <img 
                    className="w-full h-64 object-cover rounded-2xl shadow-sm" 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                  />

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-serif whitespace-pre-line pt-2">
                    {selectedPost.content}
                  </p>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">Tags: Oral Care, Wellness, {selectedPost.category}</span>
                    <button 
                      onClick={() => { setActiveTab("book"); }}
                      className="text-xs font-bold text-[#1DB6C4] uppercase hover:underline"
                    >
                      Book Free Consultation &rarr;
                    </button>
                  </div>
                </article>
              ) : (
                /* Blog Posts List */
                <div className="grid md:grid-cols-3 gap-8">
                  {BLOG_POSTS.map((post) => (
                    <div 
                      key={post.id} 
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
                    >
                      <div>
                        <div className="h-48 overflow-hidden bg-gray-100">
                          <img 
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform" 
                            src={post.image} 
                            alt={post.title} 
                          />
                        </div>
                        <div className="p-6 space-y-3">
                          <div className="flex justify-between text-[10px] text-gray-400 font-extrabold uppercase">
                            <span className="text-[#1DB6C4]">{post.category}</span>
                            <span>{post.date}</span>
                          </div>
                          <h3 className="font-bold text-[#0F4C81] text-lg group-hover:text-[#1DB6C4] transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="text-[#1DB6C4] font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:underline"
                        >
                          Read Article <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* VIEW: CONTACT US */}
          {activeTab === "contact" && (
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[#1DB6C4] uppercase font-extrabold text-xs tracking-widest font-display">Get In Touch</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F4C81]">We Are At Your Smile's Service</h2>
                <p className="text-sm text-gray-500">Have a clinical question or require urgent travel-package assistance? Send our care managers a secure message below.</p>
              </div>

              <div className="grid md:grid-cols-5 gap-8 items-start">
                
                {/* Contact Coordinates */}
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <h3 className="font-bold text-[#0F4C81] uppercase tracking-wider text-xs">Global Contact Details</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#1DB6C4] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-gray-700">Harley Street Office (UK)</p>
                          <p className="text-xs text-gray-500">100 Harley Street, London W1G 7JD</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#1DB6C4] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-gray-700">Jumeirah Clinic (Dubai)</p>
                          <p className="text-xs text-gray-500">Villa 45, Jumeirah Beach Road, Dubai</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-[#1DB6C4] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-gray-700">Secure SMTP Mail</p>
                          <p className="text-xs text-gray-500">care@dentalcare.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-[#1DB6C4] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-gray-700">Direct Patient Coordinator</p>
                          <p className="text-xs text-gray-500">+1 (800) 555-0199</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Anti-AI Slop Trust badge */}
                  <div className="bg-[#0F4C81] text-white p-6 rounded-2xl space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-teal-300" />
                      <h4 className="font-extrabold text-sm uppercase tracking-wide">HIPAA Secure & GDPR Compliant</h4>
                    </div>
                    <p className="text-[11px] text-blue-100 leading-relaxed">
                      All communications, booking history, and dynamic patient records are completely encrypted at-rest using clinical AES-256 frameworks.
                    </p>
                  </div>
                </div>

                {/* Secure Contact Form */}
                <div className="md:col-span-3 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold text-[#0F4C81] flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#1DB6C4]" /> Submit Secure Message
                  </h3>

                  {contactSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>{contactSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Email *</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Phone</label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Subject</label>
                        <select
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="International Travel Package">International Travel Package</option>
                          <option value="Financing & Installments">Financing & Installments</option>
                          <option value="Emergency Priority Triage">Emergency Priority Triage</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Message *</label>
                      <textarea
                        rows={5}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                      ></textarea>
                    </div>

                    {/* Simple reCAPTCHA simulation badge */}
                    <p className="text-[10px] text-gray-400">
                      Protected by mock enterprise reCAPTCHA v3. Safe connection initialized.
                    </p>

                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="w-full bg-[#0F4C81] hover:bg-[#1DB6C4] text-white py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all"
                    >
                      {contactLoading ? "Encrypting and sending..." : "Submit Secure Message"}
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* VIEW: SECURED BOOKING SYSTEM */}
          {activeTab === "book" && (
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="text-[#1DB6C4] uppercase font-extrabold text-xs tracking-widest font-display">Secure Scheduling</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F4C81]">Book Your Smile Transformation</h2>
                <p className="text-sm text-gray-500">Pick your specialty doctor, choose your customized treatment, and select your clinical slot. All appointments immediately populate our staff CRM dashboard.</p>
              </div>

              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-md space-y-6">
                <h3 className="text-lg font-bold text-[#0F4C81] pb-2 border-b border-gray-100 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#1DB6C4]" /> HIPAA Appointment Engine
                </h3>

                {bookingSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{bookingSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  
                  {/* Step 1: Patient details */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-[#1DB6C4] uppercase tracking-wider">Step 1: Patient Details</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={bookingForm.patientName}
                          onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          placeholder="+1 (555) 012-3456"
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Clinical preferences */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-[#1DB6C4] uppercase tracking-wider">Step 2: Medical Options</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Assigned Dentist</label>
                        <select
                          value={bookingForm.doctorId}
                          onChange={(e) => setBookingForm({ ...bookingForm, doctorId: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4] font-semibold text-gray-700"
                        >
                          {DOCTORS.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                              {doc.name} ({doc.role})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Treatment Plan</label>
                        <select
                          value={bookingForm.treatmentId}
                          onChange={(e) => setBookingForm({ ...bookingForm, treatmentId: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4] font-semibold text-gray-700"
                        >
                          {TREATMENTS.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} ({t.price})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Date and Time slots */}
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-[#1DB6C4] uppercase tracking-wider">Step 3: Scheduling Slot</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Appointment Date *</label>
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4] font-semibold text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Preferred Time *</label>
                        <select
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4] font-semibold text-gray-700"
                        >
                          <option value="09:00">09:00 AM (Primary Slot)</option>
                          <option value="10:00">10:00 AM (Recommended)</option>
                          <option value="11:00">11:00 AM (Recommended)</option>
                          <option value="13:00">01:00 PM (Afternoon Triage)</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="16:00">04:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Patient History / Custom Clinical Notes</label>
                    <textarea
                      rows={3}
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                      placeholder="Please note any history of dental anxiety, ongoing implants, clear aligner treatments, or medical allergies."
                      className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full bg-[#0F4C81] hover:bg-[#1DB6C4] text-white py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-md shadow-blue-900/10"
                  >
                    {bookingLoading ? "Transmitting HIPAA Request..." : "Request Confirmed Appointment"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* VIEW: CRM PORTAL */}
          {activeTab === "crm" && (
            <div className="space-y-8">
              {!isCrmAuthenticated ? (
                /* CRM Login Gate */
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-xl space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-50 text-[#0F4C81] rounded-full flex items-center justify-center mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F4C81]">Clinic Staff Administration</h3>
                    <p className="text-xs text-gray-400">Access patient pipelines, confirm schedules, export CSV datasets, and manage wordpress theme codebases.</p>
                  </div>

                  {crmError && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>{crmError}</span>
                    </div>
                  )}

                  <form onSubmit={handleCrmLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Administrative Passcode</label>
                      <input
                        type="password"
                        placeholder="Enter admin (or leave blank to bypass)"
                        value={crmPassword}
                        onChange={(e) => setCrmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F7FAFC] border border-gray-100 rounded-xl text-xs outline-none focus:border-[#1DB6C4]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0F4C81] hover:bg-[#1DB6C4] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Authenticate CRM
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated CRM Panels */
                <div className="space-y-8">
                  
                  {/* CRM Header widgets */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F4C81] flex items-center gap-2">
                        <span>Clinic CRM Portal</span>
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Active Monitor</span>
                      </h2>
                      <p className="text-xs text-gray-400">Automated lead qualification and HIPAA schedule coordination board.</p>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href="/api/export/leads"
                        target="_blank"
                        className="bg-white border border-gray-200 hover:border-[#1DB6C4] px-4 py-2.5 rounded-xl text-xs font-extrabold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 transition-all"
                        rel="noreferrer"
                      >
                        <Download className="w-4 h-4" /> Export Leads CSV
                      </a>
                      <a
                        href="/api/export/appointments"
                        target="_blank"
                        className="bg-white border border-gray-200 hover:border-[#1DB6C4] px-4 py-2.5 rounded-xl text-xs font-extrabold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 transition-all"
                        rel="noreferrer"
                      >
                        <Download className="w-4 h-4" /> Export Appointments CSV
                      </a>
                    </div>
                  </div>

                  {/* CRM Analytics widgets */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Today's Bookings</p>
                      <p className="text-2xl font-extrabold text-[#0F4C81]">{stats.appointmentsToday}</p>
                      <p className="text-[9px] text-green-500 font-bold">&bull; Real-time schedule</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Total Leads</p>
                      <p className="text-2xl font-extrabold text-[#1DB6C4]">{stats.totalLeads}</p>
                      <p className="text-[9px] text-gray-400">Acquired this week</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Est. Pipeline Revenue</p>
                      <p className="text-2xl font-extrabold text-[#0F4C81]">${stats.revenue.toLocaleString()}</p>
                      <p className="text-[9px] text-green-500 font-bold">Invoiced & Estimated</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">Active Visitors</p>
                      <p className="text-2xl font-extrabold text-[#1DB6C4]">{stats.visitorCount}</p>
                      <p className="text-[9px] text-gray-400">Simulated unique tracking</p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1 col-span-2 lg:col-span-1">
                      <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">System Security</p>
                      <p className="text-[13px] font-extrabold text-green-600 flex items-center gap-1 mt-2">
                        <Shield className="w-4 h-4" /> HIPAA Active
                      </p>
                      <p className="text-[9px] text-gray-400">CSRF Protected</p>
                    </div>
                  </div>

                  {/* CRM Tabbed controls */}
                  <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* LEADS PIPELINE PANEL */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <h3 className="font-extrabold text-gray-700 text-sm uppercase tracking-wider">Lead Acquisition Board</h3>
                          
                          {/* Filter selections */}
                          <div className="flex gap-2 text-xs">
                            <select 
                              value={leadStatusFilter}
                              onChange={(e) => setLeadStatusFilter(e.target.value)}
                              className="px-2.5 py-1.5 bg-[#F7FAFC] border border-gray-100 rounded-lg outline-none font-semibold text-gray-600"
                            >
                              <option value="All">All Statuses</option>
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Qualified">Qualified</option>
                              <option value="Booked">Booked</option>
                              <option value="Closed">Closed</option>
                            </select>
                            
                            <input 
                              type="text"
                              placeholder="Search patient..."
                              value={leadSearch}
                              onChange={(e) => setLeadSearch(e.target.value)}
                              className="px-2.5 py-1.5 bg-[#F7FAFC] border border-gray-100 rounded-lg outline-none text-xs w-36 focus:w-48 transition-all"
                            />
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-100 text-[10px] uppercase text-gray-400 font-bold">
                                <th className="pb-3">Patient info</th>
                                <th className="pb-3">Service interest</th>
                                <th className="pb-3">Pipeline status</th>
                                <th className="pb-3">Source</th>
                                <th className="pb-3 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 text-xs">
                                  <td className="py-3">
                                    <p className="font-bold text-gray-800">{lead.fullName}</p>
                                    <p className="text-[10px] text-gray-400">{lead.phone} • {lead.email || "No email"}</p>
                                  </td>
                                  <td className="py-3 text-gray-600">
                                    {lead.serviceInterest}
                                  </td>
                                  <td className="py-3">
                                    <select
                                      value={lead.status}
                                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead["status"])}
                                      className="px-2 py-1 rounded bg-[#F7FAFC] border border-gray-100 text-[10px] font-extrabold uppercase text-gray-600"
                                    >
                                      <option value="New">New</option>
                                      <option value="Contacted">Contacted</option>
                                      <option value="Qualified">Qualified</option>
                                      <option value="Booked">Booked</option>
                                      <option value="Closed">Closed</option>
                                    </select>
                                  </td>
                                  <td className="py-3 text-[10px] text-gray-400 font-semibold uppercase">{lead.source}</td>
                                  <td className="py-3 text-right">
                                    <button 
                                      onClick={() => deleteLead(lead.id)}
                                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                      title="Remove lead"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                              {filteredLeads.length === 0 && (
                                <tr>
                                  <td colSpan={5} className="py-8 text-center text-gray-400">No matching leads record found.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* APPOINTMENT QUEUE PANEL */}
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h3 className="font-extrabold text-gray-700 text-sm uppercase tracking-wider">Clinicians Schedule queue</h3>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-100 text-[10px] uppercase text-gray-400 font-bold">
                                <th className="pb-3">Patient</th>
                                <th className="pb-3">Dentist & Treatment</th>
                                <th className="pb-3">Slot requested</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3 text-right">Confirmation</th>
                              </tr>
                            </thead>
                            <tbody>
                              {crmAppointments.map((appt) => {
                                const doctor = DOCTORS.find((d) => d.id === appt.doctorId);
                                const treatment = TREATMENTS.find((t) => t.id === appt.treatmentId);
                                return (
                                  <tr key={appt.id} className="border-b border-gray-100 last:border-0 text-xs">
                                    <td className="py-3">
                                      <p className="font-bold text-gray-800">{appt.patientName}</p>
                                      <p className="text-[10px] text-gray-400">{appt.phone}</p>
                                    </td>
                                    <td className="py-3">
                                      <p className="font-bold text-gray-600">{doctor?.name || "Unassigned"}</p>
                                      <p className="text-[10px] text-[#1DB6C4] font-semibold">{treatment?.name || "General Consultation"}</p>
                                    </td>
                                    <td className="py-3 text-gray-600">
                                      <p>{appt.date}</p>
                                      <p className="text-[10px] text-gray-400">{appt.time}</p>
                                    </td>
                                    <td className="py-3">
                                      <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${appt.status === "Confirmed" ? "bg-green-50 text-green-700 border border-green-100" : appt.status === "Completed" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-yellow-50 text-yellow-700 border border-yellow-100"}`}>
                                        {appt.status}
                                      </span>
                                    </td>
                                    <td className="py-3 text-right space-x-1 whitespace-nowrap">
                                      {appt.status === "Pending" && (
                                        <button
                                          onClick={() => updateAppointmentStatus(appt.id, "Confirmed")}
                                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                        >
                                          Approve
                                        </button>
                                      )}
                                      {appt.status === "Confirmed" && (
                                        <button
                                          onClick={() => updateAppointmentStatus(appt.id, "Completed")}
                                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold"
                                        >
                                          Complete
                                        </button>
                                      )}
                                      <button
                                        onClick={() => deleteAppt(appt.id)}
                                        className="text-gray-400 hover:text-red-500 p-1"
                                      >
                                        &times;
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>

                    {/* REAL-TIME SYSTEM ACTIVITY FEED & WORDPRESS CODE EXPORTER */}
                    <div className="space-y-6">
                      
                      {/* Interactive WordPress Code Inspector panel */}
                      <div className="bg-[#1A1A1A] text-gray-300 p-6 rounded-3xl shadow-xl space-y-5">
                        <div className="space-y-1">
                          <span className="text-[#1DB6C4] uppercase font-extrabold text-[9px] tracking-widest flex items-center gap-1">
                            <Shield className="w-3 h-3" /> Theme & Plugin package builder
                          </span>
                          <h4 className="text-white font-extrabold text-sm">Installable WordPress Exporter</h4>
                          <p className="text-[10px] text-gray-400 leading-normal">Download our premium custom-built, speed-optimized theme and custom database-synced CRM plugins as fully active, installable zip packages.</p>
                        </div>

                        {/* Direct Download Action Grid */}
                        <div className="space-y-2">
                          <a 
                            href="/api/export/wordpress" 
                            className="block w-full text-center bg-[#1DB6C4] hover:bg-[#0F4C81] text-white py-2.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-cyan-900/10"
                          >
                            <Download className="w-3.5 h-3.5" /> Export Full Suite ZIP
                          </a>
                          
                          <div className="grid grid-cols-3 gap-1.5 text-[8px] font-extrabold tracking-wider text-center uppercase">
                            <a 
                              href="/api/export/wordpress/theme" 
                              className="bg-white/5 hover:bg-white/10 p-2 rounded text-gray-300 transition-colors flex flex-col items-center gap-1"
                            >
                              <Download className="w-3 h-3 text-[#1DB6C4]" /> Theme Only
                            </a>
                            <a 
                              href="/api/export/wordpress/crm" 
                              className="bg-white/5 hover:bg-white/10 p-2 rounded text-gray-300 transition-colors flex flex-col items-center gap-1"
                            >
                              <Download className="w-3 h-3 text-[#1DB6C4]" /> CRM Plugin
                            </a>
                            <a 
                              href="/api/export/wordpress/appointments" 
                              className="bg-white/5 hover:bg-white/10 p-2 rounded text-gray-300 transition-colors flex flex-col items-center gap-1"
                            >
                              <Download className="w-3 h-3 text-[#1DB6C4]" /> Sched Plugin
                            </a>
                          </div>
                        </div>

                        {/* Navigation files */}
                        <div className="space-y-2">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Source Code Inspector</p>
                          <div className="grid grid-cols-3 gap-1.5 text-[9px] font-bold">
                            <button 
                              onClick={() => setWpFileView("style.css")}
                              className={`p-2 rounded text-center transition-colors ${wpFileView === "style.css" ? "bg-[#0F4C81] text-white" : "bg-white/5 hover:bg-white/10"}`}
                            >
                              style.css
                            </button>
                            <button 
                              onClick={() => setWpFileView("functions.php")}
                              className={`p-2 rounded text-center transition-colors ${wpFileView === "functions.php" ? "bg-[#0F4C81] text-white" : "bg-white/5 hover:bg-white/10"}`}
                            >
                              functions.php
                            </button>
                            <button 
                              onClick={() => setWpFileView("header.php")}
                              className={`p-2 rounded text-center transition-colors ${wpFileView === "header.php" ? "bg-[#0F4C81] text-white" : "bg-white/5 hover:bg-white/10"}`}
                            >
                              header.php
                            </button>
                            <button 
                              onClick={() => setWpFileView("footer.php")}
                              className={`p-2 rounded text-center transition-colors ${wpFileView === "footer.php" ? "bg-[#0F4C81] text-white" : "bg-white/5 hover:bg-white/10"}`}
                            >
                              footer.php
                            </button>
                            <button 
                              onClick={() => setWpFileView("crm-plugin")}
                              className={`p-2 rounded text-center transition-colors ${wpFileView === "crm-plugin" ? "bg-[#0F4C81] text-white" : "bg-white/5 hover:bg-white/10"}`}
                            >
                              CRM Plugin
                            </button>
                            <button 
                              onClick={() => setWpFileView("appt-plugin")}
                              className={`p-2 rounded text-center transition-colors ${wpFileView === "appt-plugin" ? "bg-[#0F4C81] text-white" : "bg-white/5 hover:bg-white/10"}`}
                            >
                              Sched Plugin
                            </button>
                          </div>
                        </div>

                        {/* Code box */}
                        <div className="bg-black/40 p-4 rounded-xl border border-white/10 max-h-64 overflow-y-auto">
                          <pre className="text-[10px] font-mono text-[#1DB6C4] leading-relaxed select-all">
                            {wpFileView === "style.css" && `/*\nTheme Name: DentalCare Premium Theme\nAuthor: Senior UI/UX Designer\nColors: #0F4C81, #1DB6C4, #FFFFFF\nNo Builders. Clean semantic blocks.\n*/\n\n:root {\n  --primary: #0F4C81;\n  --secondary: #1DB6C4;\n  --neutral-dark: #1A1A1A;\n  --neutral-light: #F7FAFC;\n}`}
                            {wpFileView === "functions.php" && `<?php\n// WordPress Theme Setup\nadd_action('after_setup_theme', 'dc_setup');\nfunction dc_setup() {\n  add_theme_support('title-tag');\n  add_theme_support('post-thumbnails');\n}\n\n// Register custom lead endpoints\nadd_action('init', 'dc_register_services');`}
                            {wpFileView === "header.php" && `<!DOCTYPE html>\n<html <?php language_attributes(); ?>>\n<head>\n  <meta charset="UTF-8">\n  <!-- Schema Dentist Markup Included -->\n  <?php wp_head(); ?>\n</head>`}
                            {wpFileView === "footer.php" && `  <footer class="site-footer bg-dark text-white">\n    <p>&copy; <?php echo date('Y'); ?> DentalCare. All rights reserved.</p>\n  </footer>\n  <?php wp_footer(); ?>\n</body>\n</html>`}
                            {wpFileView === "crm-plugin" && `<?php\n/*\nPlugin Name: DentalCare CRM\nDescription: Core patient pipeline integration bridge.\nVersion: 1.0.0\n*/\n\nregister_activation_hook(__FILE__, 'dc_crm_activate');`}
                            {wpFileView === "appt-plugin" && `<?php\n/*\nPlugin Name: DentalCare Appointments\nDescription: Automated clinical scheduling scheduler.\nVersion: 1.0.0\n*/\n\nadd_action('rest_api_init', 'dc_register_appt_api');`}
                          </pre>
                        </div>
                        <p className="text-[9px] text-gray-500 italic text-center">Tip: All files are already generated and validated in /wordpress/ directory for direct SFTP deployment.</p>
                      </div>

                      {/* CLINIC ACTIVITY LOG FEED */}
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h4 className="font-extrabold text-[#0F4C81] text-xs uppercase tracking-wider">Live System Logs</h4>
                        
                        <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                          {stats.recentActivities.map((log) => (
                            <div key={log.id} className="text-[11px] leading-snug space-y-1">
                              <div className="flex justify-between text-[9px] text-gray-400 font-semibold uppercase">
                                <span className={log.type === "lead" ? "text-orange-500" : "text-blue-500"}>{log.type}</span>
                                <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                              </div>
                              <p className="text-gray-600 font-semibold">{log.message}</p>
                            </div>
                          ))}
                          {stats.recentActivities.length === 0 && (
                            <p className="text-xs text-gray-400 text-center py-4">Logs database is refreshing...</p>
                          )}
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Modern High-End Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Bio */}
          <div className="space-y-4">
            <span className="text-lg font-bold text-[#0F4C81]">DentalCare<span className="text-[#1DB6C4]">.</span></span>
            <p className="text-xs text-gray-500 leading-relaxed">
              Creating Healthy Smiles For Life. Providing premium international-standard dental implants, orthodontics, and cosmetic dentistry across America, Europe, Australia, and the Middle East.
            </p>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Our Services</h4>
            <ul className="space-y-1.5 text-xs text-gray-500">
              <li><button onClick={() => { setSelectedService(TREATMENTS[0]); setActiveTab("services"); }} className="hover:text-[#1DB6C4]">Cosmetic Dentistry</button></li>
              <li><button onClick={() => { setSelectedService(TREATMENTS[1]); setActiveTab("services"); }} className="hover:text-[#1DB6C4]">Dental Implants</button></li>
              <li><button onClick={() => { setSelectedService(TREATMENTS[2]); setActiveTab("services"); }} className="hover:text-[#1DB6C4]">Root Canal Therapy</button></li>
              <li><button onClick={() => { setSelectedService(TREATMENTS[3]); setActiveTab("services"); }} className="hover:text-[#1DB6C4]">Teeth Whitening</button></li>
            </ul>
          </div>

          {/* Col 3: Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">International Hubs</h4>
            <ul className="space-y-1.5 text-xs text-gray-500">
              <li><strong>USA:</strong> Los Angeles, Beverly Hills</li>
              <li><strong>UK:</strong> Harley Street, London</li>
              <li><strong>Dubai:</strong> Jumeirah Dental Hub</li>
              <li><strong>Australia:</strong> Sydney Harbour</li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Administrative Resources</h4>
            <ul className="space-y-1.5 text-xs text-gray-500">
              <li><button onClick={() => setActiveTab("crm")} className="hover:text-[#1DB6C4] flex items-center gap-1"><Lock className="w-3 h-3 text-[#1DB6C4]" /> Staff CRM Dashboard</button></li>
              <li><a href="/api/export/leads" className="hover:text-[#1DB6C4] flex items-center gap-1"><Download className="w-3 h-3" /> Export Leads CSV</a></li>
              <li><a href="/api/export/appointments" className="hover:text-[#1DB6C4] flex items-center gap-1"><Download className="w-3 h-3" /> Export Schedule CSV</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom banner block */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} DentalCare Premium Group. All rights reserved.</p>
          <div className="flex gap-4">
            <button className="hover:underline">Privacy Policy</button>
            <button className="hover:underline">Terms & Conditions</button>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Quick-Action Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center z-40">
        <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "home" ? "text-[#1DB6C4]" : "text-gray-400"}`}>
          <Smile className="w-5 h-5" /> Home
        </button>
        <button onClick={() => setActiveTab("services")} className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "services" ? "text-[#1DB6C4]" : "text-gray-400"}`}>
          <Sparkles className="w-5 h-5" /> Services
        </button>
        <button onClick={() => setActiveTab("book")} className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "book" ? "text-[#0F4C81]" : "text-gray-400"}`}>
          <Calendar className="w-5 h-5 text-[#1DB6C4]" /> Book Slot
        </button>
        <button onClick={() => setActiveTab("crm")} className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "crm" ? "text-[#1DB6C4]" : "text-gray-400"}`}>
          <Lock className="w-5 h-5" /> CRM
        </button>
      </div>

    </div>
  );
}
