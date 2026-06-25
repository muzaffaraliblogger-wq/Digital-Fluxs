import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import AdmZip from "adm-zip";

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

interface DB {
  leads: Lead[];
  appointments: Appointment[];
  contacts: ContactSubmission[];
  logs: ActivityLog[];
  visitorCount: number;
}

const DB_FILE = path.join(process.cwd(), "db.json");

// Helper to load DB
function loadDB(): DB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error loading database file, initializing fresh", err);
  }
  
  // Initial rich dataset
  const initialDB: DB = {
    leads: [
      {
        id: "l-1",
        fullName: "Sarah Connor",
        email: "sarah.connor@example.com",
        phone: "+1 (555) 019-2834",
        serviceInterest: "Dental Implants",
        status: "Qualified",
        source: "Google Ads",
        notes: "Patient is interested in full mouth dental implants. Has some jaw bone density concerns.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "l-2",
        fullName: "James Smith",
        email: "james.smith@example.co.uk",
        phone: "+44 7911 123456",
        serviceInterest: "Teeth Whitening",
        status: "New",
        source: "Facebook Campaign",
        notes: "Wants whitening before his wedding in late July.",
        createdAt: new Date().toISOString(),
      },
      {
        id: "l-3",
        fullName: "Aisha Al-Mansoori",
        email: "aisha.m@gov.ae",
        phone: "+971 50 123 4567",
        serviceInterest: "Orthodontics",
        status: "Booked",
        source: "Website Form",
        notes: "Interested in Invisalign/clear aligners. Booked for initial 3D scan.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "l-4",
        fullName: "Robert Taylor",
        email: "robert.t@example.ca",
        phone: "+1 (416) 555-0143",
        serviceInterest: "Cosmetic Dentistry",
        status: "Contacted",
        source: "Referral",
        notes: "Interested in porcelain veneers. Called and left a voicemail.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    appointments: [
      {
        id: "a-1",
        patientName: "Aisha Al-Mansoori",
        phone: "+971 50 123 4567",
        email: "aisha.m@gov.ae",
        doctorId: "doc-2", // Dr. Sarah Jenkins
        treatmentId: "srv-5", // Orthodontics
        date: new Date().toISOString().split("T")[0], // Today
        time: "10:30",
        notes: "Invisalign initial consultation and 3D intraoral scanning",
        status: "Confirmed",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "a-2",
        patientName: "John Doe",
        phone: "+1 (310) 555-0199",
        email: "john.doe@example.com",
        doctorId: "doc-1", // Dr. Alexander Mercer
        treatmentId: "srv-2", // Dental Implants
        date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Tomorrow
        time: "14:00",
        notes: "Post-op checkup for single tooth implant on quadrant 2.",
        status: "Confirmed",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "a-3",
        patientName: "Emily Watson",
        phone: "+61 2 9382 1111",
        email: "emily.watson@example.com.au",
        doctorId: "doc-3", // Dr. Michael Chang
        treatmentId: "srv-3", // Root Canal
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Yesterday
        time: "09:00",
        notes: "Emergency severe toothache. Needs root canal on lower molar.",
        status: "Completed",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "a-4",
        patientName: "Liam Carter",
        phone: "+1 (604) 555-0182",
        email: "liam.carter@example.com",
        doctorId: "doc-4", // Dr. Emily Ross
        treatmentId: "srv-6", // Pediatric Dentistry
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        time: "11:00",
        notes: "6-month regular checkup and fluoride varnish treatment for age 7.",
        status: "Pending",
        createdAt: new Date().toISOString(),
      },
    ],
    contacts: [
      {
        id: "c-1",
        name: "Marcus Aurelius",
        email: "marcus@philosophy.it",
        phone: "+39 06 123456",
        subject: "Corporate Dental Package Inquiry",
        message: "Hello, I am looking to establish a partnership with DentalCare for our executive team based in Dubai. We have around 45 employees who would need premium dental plans. Please contact me regarding tailored packages.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: "Read",
      },
      {
        id: "c-2",
        name: "Helena Rostova",
        email: "helena@russia.net",
        phone: "+1 (212) 555-0115",
        subject: "Veneers Pricing & Financing",
        message: "Can you provide more information on financing options for porcelain veneers? I am coming to your clinic from Canada for a smile makeover and want to plan the budget beforehand.",
        createdAt: new Date().toISOString(),
        status: "Unread",
      },
    ],
    logs: [
      {
        id: "log-1",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        type: "lead",
        message: "New lead Sarah Connor added via Google Ads.",
      },
      {
        id: "log-2",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        type: "appointment",
        message: "Appointment a-3 completed for Emily Watson by Dr. Michael Chang.",
      },
      {
        id: "log-3",
        timestamp: new Date().toISOString(),
        type: "lead",
        message: "New lead James Smith added via Facebook Campaign.",
      },
    ],
    visitorCount: 1248,
  };
  
  saveDB(initialDB);
  return initialDB;
}

// Helper to save DB
function saveDB(db: DB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving database file", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Middleware to log activities
  const logActivity = (type: string, message: string) => {
    const db = loadDB();
    const newLog: ActivityLog = {
      id: "log-" + Date.now(),
      timestamp: new Date().toISOString(),
      type,
      message,
    };
    db.logs.unshift(newLog);
    // Limit to 100 logs
    if (db.logs.length > 100) {
      db.logs = db.logs.slice(0, 100);
    }
    saveDB(db);
  };

  // --- API ROUTES FIRST ---

  // Dashboard Summary Endpoint
  app.get("/api/dashboard", (req: Request, res: Response) => {
    const db = loadDB();
    
    // Increment visitor count randomly/realistically to simulate traffic
    db.visitorCount += Math.floor(Math.random() * 3) + 1;
    saveDB(db);

    const appointmentsToday = db.appointments.filter(
      (a) => a.date === new Date().toISOString().split("T")[0]
    ).length;

    const totalLeads = db.leads.length;
    const totalPatients = new Set(db.appointments.map((a) => a.phone)).size;
    
    // Revenue calculations: Implants ($3500), Whitening ($450), Root Canal ($900), Ortho ($5000), default $250
    const pricingMap: Record<string, number> = {
      "srv-1": 1200, // Cosmetic Veneers
      "srv-2": 3200, // Implants
      "srv-3": 850,  // Root Canal
      "srv-4": 350,  // Whitening
      "srv-5": 4800, // Ortho
      "srv-6": 180,  // Pediatric
      "srv-7": 250,  // Emergency
    };

    const completedAppts = db.appointments.filter((a) => a.status === "Completed");
    const confirmedAppts = db.appointments.filter((a) => a.status === "Confirmed");
    
    let revenue = 14500; // base starting revenue
    completedAppts.forEach((a) => {
      revenue += pricingMap[a.treatmentId] || 250;
    });
    // Add some weight for Closed leads
    const closedLeads = db.leads.filter((l) => l.status === "Closed").length;
    revenue += closedLeads * 1500;

    res.json({
      appointmentsToday,
      totalLeads,
      totalPatients,
      revenue,
      visitorCount: db.visitorCount,
      recentActivities: db.logs.slice(0, 10),
    });
  });

  // Leads CRUD
  app.get("/api/leads", (req: Request, res: Response) => {
    const db = loadDB();
    res.json(db.leads);
  });

  app.post("/api/leads", (req: Request, res: Response) => {
    const db = loadDB();
    const { fullName, email, phone, serviceInterest, source, notes } = req.body;
    
    if (!fullName || !phone) {
      res.status(400).json({ error: "Name and Phone are required." });
      return;
    }

    const newLead: Lead = {
      id: "l-" + Date.now(),
      fullName,
      email: email || "",
      phone,
      serviceInterest: serviceInterest || "General Consultation",
      status: "New",
      source: source || "Website Form",
      notes: notes || "",
      createdAt: new Date().toISOString(),
    };

    db.leads.unshift(newLead);
    saveDB(db);
    logActivity("lead", `New Lead generated: ${fullName} (${serviceInterest})`);
    res.status(201).json(newLead);
  });

  app.put("/api/leads/:id", (req: Request, res: Response) => {
    const db = loadDB();
    const { id } = req.params;
    const index = db.leads.findIndex((l) => l.id === id);

    if (index === -1) {
      res.status(404).json({ error: "Lead not found." });
      return;
    }

    db.leads[index] = {
      ...db.leads[index],
      ...req.body,
    };

    saveDB(db);
    logActivity("lead", `Lead status updated for ${db.leads[index].fullName}: ${db.leads[index].status}`);
    res.json(db.leads[index]);
  });

  app.delete("/api/leads/:id", (req: Request, res: Response) => {
    const db = loadDB();
    const { id } = req.params;
    const lead = db.leads.find((l) => l.id === id);
    if (!lead) {
      res.status(404).json({ error: "Lead not found." });
      return;
    }

    db.leads = db.leads.filter((l) => l.id !== id);
    saveDB(db);
    logActivity("lead", `Deleted lead: ${lead.fullName}`);
    res.json({ success: true });
  });

  // Appointments CRUD
  app.get("/api/appointments", (req: Request, res: Response) => {
    const db = loadDB();
    res.json(db.appointments);
  });

  app.post("/api/appointments", (req: Request, res: Response) => {
    const db = loadDB();
    const { patientName, phone, email, doctorId, treatmentId, date, time, notes } = req.body;

    if (!patientName || !phone || !date || !time) {
      res.status(400).json({ error: "Patient Name, Phone, Date, and Time are required." });
      return;
    }

    const newAppointment: Appointment = {
      id: "a-" + Date.now(),
      patientName,
      phone,
      email: email || "",
      doctorId: doctorId || "doc-1",
      treatmentId: treatmentId || "srv-1",
      date,
      time,
      notes: notes || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    db.appointments.unshift(newAppointment);
    
    // Also push to Leads automatically as "Booked" or "New"
    const leadExists = db.leads.some((l) => l.phone === phone);
    if (!leadExists) {
      const treatmentsMap: Record<string, string> = {
        "srv-1": "Cosmetic Dentistry",
        "srv-2": "Dental Implants",
        "srv-3": "Root Canal",
        "srv-4": "Teeth Whitening",
        "srv-5": "Orthodontics",
        "srv-6": "Pediatric Dentistry",
        "srv-7": "Emergency Dental Care",
      };
      db.leads.unshift({
        id: "l-" + Date.now(),
        fullName: patientName,
        email: email || "",
        phone,
        serviceInterest: treatmentsMap[treatmentId] || "General Consultation",
        status: "Booked",
        source: "Appointment Booking",
        notes: "Auto-generated lead from direct appointment request.",
        createdAt: new Date().toISOString(),
      });
    }

    saveDB(db);
    logActivity("appointment", `New appointment request received from ${patientName} on ${date} at ${time}`);
    res.status(201).json(newAppointment);
  });

  app.put("/api/appointments/:id", (req: Request, res: Response) => {
    const db = loadDB();
    const { id } = req.params;
    const index = db.appointments.findIndex((a) => a.id === id);

    if (index === -1) {
      res.status(404).json({ error: "Appointment not found." });
      return;
    }

    db.appointments[index] = {
      ...db.appointments[index],
      ...req.body,
    };

    saveDB(db);
    logActivity("appointment", `Appointment for ${db.appointments[index].patientName} set to ${db.appointments[index].status}`);
    res.json(db.appointments[index]);
  });

  app.delete("/api/appointments/:id", (req: Request, res: Response) => {
    const db = loadDB();
    const { id } = req.params;
    const appt = db.appointments.find((a) => a.id === id);
    if (!appt) {
      res.status(404).json({ error: "Appointment not found." });
      return;
    }

    db.appointments = db.appointments.filter((a) => a.id !== id);
    saveDB(db);
    logActivity("appointment", `Deleted appointment for: ${appt.patientName}`);
    res.json({ success: true });
  });

  // Contacts Submissions CRUD
  app.get("/api/contacts", (req: Request, res: Response) => {
    const db = loadDB();
    res.json(db.contacts);
  });

  app.post("/api/contacts", (req: Request, res: Response) => {
    const db = loadDB();
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, Email, and Message are required." });
      return;
    }

    const newContact: ContactSubmission = {
      id: "c-" + Date.now(),
      name,
      email,
      phone: phone || "",
      subject: subject || "General Inquiry",
      message,
      createdAt: new Date().toISOString(),
      status: "Unread",
    };

    db.contacts.unshift(newContact);
    
    // Add to Leads too! Leads capture is automated
    const leadExists = db.leads.some((l) => l.phone === phone || l.email === email);
    if (!leadExists) {
      db.leads.unshift({
        id: "l-" + Date.now(),
        fullName: name,
        email: email,
        phone: phone || "N/A",
        serviceInterest: "General Inquiry",
        status: "New",
        source: "Contact Form",
        notes: `Inquiry: ${subject}. Content: ${message}`,
        createdAt: new Date().toISOString(),
      });
    }

    saveDB(db);
    logActivity("contact", `New Contact Form submission from ${name}: "${subject}"`);
    res.status(201).json(newContact);
  });

  app.put("/api/contacts/:id", (req: Request, res: Response) => {
    const db = loadDB();
    const { id } = req.params;
    const index = db.contacts.findIndex((c) => c.id === id);

    if (index === -1) {
      res.status(404).json({ error: "Contact submission not found." });
      return;
    }

    db.contacts[index] = {
      ...db.contacts[index],
      ...req.body,
    };

    saveDB(db);
    res.json(db.contacts[index]);
  });

  // Export endpoints to generate simple downloadable CSV text files
  app.get("/api/export/leads", (req: Request, res: Response) => {
    const db = loadDB();
    let csv = "ID,Full Name,Email,Phone,Service Interest,Status,Source,Created At,Notes\n";
    db.leads.forEach((l) => {
      csv += `"${l.id}","${l.fullName.replace(/"/g, '""')}","${l.email}","${l.phone}","${l.serviceInterest}","${l.status}","${l.source}","${l.createdAt}","${(l.notes || "").replace(/"/g, '""')}"\n`;
    });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=leads_export.csv");
    res.send(csv);
  });

  app.get("/api/export/appointments", (req: Request, res: Response) => {
    const db = loadDB();
    let csv = "ID,Patient Name,Phone,Email,Doctor,Treatment,Date,Time,Status,Notes,Created At\n";
    db.appointments.forEach((a) => {
      csv += `"${a.id}","${a.patientName.replace(/"/g, '""')}","${a.phone}","${a.email}","${a.doctorId}","${a.treatmentId}","${a.date}","${a.time}","${a.status}","${(a.notes || "").replace(/"/g, '""')}","${a.createdAt}"\n`;
    });
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=appointments_export.csv");
    res.send(csv);
  });

  // Export full WordPress bundle (Theme + All 4 CRM/Booking plugins) as an installable zip file
  app.get("/api/export/wordpress", (req: Request, res: Response) => {
    try {
      const zip = new AdmZip();
      
      const themePath = path.join(process.cwd(), "wordpress", "theme");
      const pluginsPath = path.join(process.cwd(), "wordpress", "plugins");

      if (fs.existsSync(themePath)) {
        zip.addLocalFolder(themePath, "dentalcare-theme");
      }
      
      if (fs.existsSync(pluginsPath)) {
        // This will add each child plugin directory inside dentalcare-plugins/
        zip.addLocalFolder(pluginsPath, "dentalcare-plugins");
      }

      const zipBuffer = zip.toBuffer();
      
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=dentalcare_wordpress_suite.zip");
      res.send(zipBuffer);
    } catch (err: any) {
      console.error("Error generating WordPress ZIP file:", err);
      res.status(500).json({ error: "Failed to compile installable WordPress theme & plugin ZIP suite." });
    }
  });

  // Export Theme Only as installable theme ZIP file
  app.get("/api/export/wordpress/theme", (req: Request, res: Response) => {
    try {
      const zip = new AdmZip();
      const themePath = path.join(process.cwd(), "wordpress", "theme");
      if (fs.existsSync(themePath)) {
        zip.addLocalFolder(themePath, "dentalcare");
        const zipBuffer = zip.toBuffer();
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=dentalcare_theme_installable.zip");
        res.send(zipBuffer);
      } else {
        res.status(404).json({ error: "Theme source directory not found." });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to compile installable theme zip." });
    }
  });

  // Export CRM Plugin Only as installable plugin ZIP file
  app.get("/api/export/wordpress/crm", (req: Request, res: Response) => {
    try {
      const zip = new AdmZip();
      const pluginPath = path.join(process.cwd(), "wordpress", "plugins", "dentalcare-crm");
      if (fs.existsSync(pluginPath)) {
        zip.addLocalFolder(pluginPath, "dentalcare-crm");
        const zipBuffer = zip.toBuffer();
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=dentalcare_crm_plugin.zip");
        res.send(zipBuffer);
      } else {
        res.status(404).json({ error: "CRM plugin source directory not found." });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to compile CRM plugin zip." });
    }
  });

  // Export Appointments Plugin Only as installable plugin ZIP file
  app.get("/api/export/wordpress/appointments", (req: Request, res: Response) => {
    try {
      const zip = new AdmZip();
      const pluginPath = path.join(process.cwd(), "wordpress", "plugins", "dentalcare-appointments");
      if (fs.existsSync(pluginPath)) {
        zip.addLocalFolder(pluginPath, "dentalcare-appointments");
        const zipBuffer = zip.toBuffer();
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=dentalcare_appointments_plugin.zip");
        res.send(zipBuffer);
      } else {
        res.status(404).json({ error: "Appointments plugin source directory not found." });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to compile Appointments plugin zip." });
    }
  });

  // Export Contact Form Plugin Only as installable plugin ZIP file
  app.get("/api/export/wordpress/contact", (req: Request, res: Response) => {
    try {
      const zip = new AdmZip();
      const pluginPath = path.join(process.cwd(), "wordpress", "plugins", "dentalcare-contact");
      if (fs.existsSync(pluginPath)) {
        zip.addLocalFolder(pluginPath, "dentalcare-contact");
        const zipBuffer = zip.toBuffer();
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", "attachment; filename=dentalcare_contact_plugin.zip");
        res.send(zipBuffer);
      } else {
        res.status(404).json({ error: "Contact Form plugin source directory not found." });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to compile Contact Form plugin zip." });
    }
  });

  // --- VITE DEV / PRODUCTION MIDDLEWARE ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DentalCare Full Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
