import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Mail,
  Github,
  Linkedin,
  Globe,
  Phone,
  Download,
  ExternalLink,
  MapPin,
  Calendar,
  GraduationCap
} from "lucide-react";

// ---------- Quick data you can customize ----------
const PROFILE = {
  name: "Akila Induwara Herath",
  role: "Software Engineer",
  location: "Colombo, Sri Lanka",
  blurb:
    "I design and build delightful web apps. I care about performance, accessibility, and clean UI.",
  email: "akilainduwara@gmail.com",
  phone: "+94 71 433 0705",
  socials: [
    { name: "GitHub", href: "https://github.com/AkilaInduwara", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/akilainduwara/", icon: Linkedin },
    { name: "Website", href: "https://yourdomain.com", icon: Globe }
  ]
};

const SKILLS = [
  "JavaScript (ES202x)",
  "TypeScript",
  "React / Next.js",
  "Node.js / Express",
  "Python",
  "Java / Spring",
  "Tailwind CSS",
  "PostgreSQL / MySQL",
  "Prisma / ORM",
  "REST / GraphQL",
  "CI/CD",
  "Cloud (Vercel, Netlify, AWS)"
];

const PROJECTS = [
  {
    title: "Project Atlas",
    description:
      "A geospatial dashboard for lagoon and coastal change with time-series charts and map overlays.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "Mapbox", "Node", "PostGIS"],
    demo: "https://example.com/atlas",
    source: "https://github.com/your/atlas"
  },
  {
    title: "CineMIS AI",
    description:
      "An AI-powered movie identification system with video/audio/subtitle search and TMDb integration.",
    image:
      "https://images.unsplash.com/photo-1497015289639-54688650d173?q=80&w=1600&auto=format&fit=crop",
    tags: ["Next.js", "Supabase", "OpenAI", "TMDb"],
    demo: "https://example.com/cinemis",
    source: "https://github.com/your/cinemis"
  },
  {
    title: "Learnova LMS",
    description:
      "Minimal LMS (React + Node + Prisma) featuring role-based access, quizzes, and analytics.",
    image:
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "Vite", "Express", "Prisma"],
    demo: "https://example.com/learnova",
    source: "https://github.com/your/learnova"
  }
];

const EXPERIENCE = [
  {
    role: "Fund Administrator",
    company: "HSBC",
    period: "Aug 2024 – Present",
    location: "Colombo",
    bullets: [
      "Daily NAV and cash reconciliation across multi-asset funds.",
      "Built internal scripts to automate variance checks (-35% manual effort)."
    ]
  },
  {
    role: "Software Engineering Intern",
    company: "Your Company",
    period: "Jan 2024 – Jul 2024",
    location: "Remote",
    bullets: [
      "Implemented authentication & role-based dashboards (React/Node).",
      "Improved page speed to 95+ Lighthouse with code-splitting and caching."
    ]
  }
];

const EDUCATION = [
  {
    program: "Higher Diploma in Information Technology",
    org: "SLIIT",
    period: "2021 – 2024",
    // note: "Final year project: AI-driven geospatial platform for spice cultivation."
  },
  {
    program: "CIMA Operational Level (in progress)",
    org: "CIMA",
    period: "2025 – ",
    note: "E1 • P1 • F1"
  }
];

const TESTIMONIALS = [
  {
    quote:
      "Delivers reliably with beautiful, maintainable code. A great mix of product sense and engineering.",
    name: "Shirley P.",
    role: "Product Lead"
  },
  {
    quote:
      "Understands business goals and ships fast without compromising quality.",
    name: "Valerie E.",
    role: "Founder"
  }
];

// ---------- Helpers ----------
const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm shadow-sm backdrop-blur bg-white/60 dark:bg-neutral-900/60">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border bg-white/70 dark:bg-neutral-900/60 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="px-3 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg focus:outline-none focus:ring"
    >
      {children}
    </a>
  );
}

function ProjectCard({ p }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <div className="flex items-center gap-2">
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                className="inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline"
                rel="noreferrer"
              >
                <ExternalLink className="h-4 w-4" /> Demo
              </a>
            )}
            {p.source && (
              <a
                href={p.source}
                target="_blank"
                className="inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" /> Code
              </a>
            )}
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);

  const year = new Date().getFullYear();
  const nav = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" }
    ],
    []
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-neutral-950 dark:to-neutral-900 text-slate-900 dark:text-slate-100">
      {/* Top nav */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-neutral-900/60 border-b">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="font-extrabold tracking-tight text-lg md:text-xl">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Portfolio</span>
            </a>
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((n) => (
                <NavLink key={n.href} href={n.href}>{n.label}</NavLink>
              ))}
              <a
                href="#contact"
                className="ml-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black px-3 py-2 text-sm font-semibold shadow-sm hover:shadow focus:outline-none focus:ring"
              >
                Hire me
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDark((d) => !d)}
                className="rounded-xl border px-2.5 py-2 focus:outline-none focus:ring"
                aria-label="Toggle dark mode"
                title="Toggle theme"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <a
                href="#contact"
                className="md:hidden rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black px-3 py-2 text-sm font-semibold shadow-sm hover:shadow"
              >
                Hire
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <motion.div {...fade}>
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <p className="text-sm text-slate-500 dark:text-slate-400">Hello, I'm</p>
                <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-tight">
                  {PROFILE.name}
                </h1>
                <p className="mt-2 text-xl md:text-2xl text-blue-600 dark:text-cyan-400 font-semibold">
                  {PROFILE.role}
                </p>
                <p className="mt-4 text-base md:text-lg text-slate-500 dark:text-slate-400">
                  {PROFILE.blurb}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    className="rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black px-5 py-2.5 font-semibold shadow-sm hover:shadow"
                  >
                    View Projects
                  </a>
                  <a
                    href="/resume.pdf"
                    className="rounded-xl border px-5 py-2.5 font-semibold inline-flex items-center gap-2 hover:shadow"
                  >
                    <Download className="h-4 w-4" /> Download CV
                  </a>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{PROFILE.location}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />Available from: <strong className="ml-1">Today</strong></span>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  {PROFILE.socials.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="rounded-xl border px-3 py-2 inline-flex items-center gap-2 hover:shadow">
                      {s.icon && <s.icon className="h-4 w-4" />} <span className="hidden sm:inline">{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="md:col-span-5">
                <Card className="p-4">
                  <img
                    src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200&auto=format&fit=crop"
                    alt="Profile"
                    className="h-64 w-full object-cover rounded-xl"
                  />
                  <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                    <p>
                      <strong className="text-slate-900 dark:text-slate-100">Contact:</strong> {PROFILE.email} · {PROFILE.phone}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="About" subtitle="A quick snapshot of who I am" />
          <motion.div {...fade}>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 md:col-span-2">
                <p className="leading-relaxed text-slate-500 dark:text-slate-400">
                  I’m a product-minded engineer who enjoys shaping ideas into polished, fast, and accessible
                  experiences. I love working across the stack, from APIs and databases to pixel-perfect UI.
                </p>
                <ul className="mt-4 list-disc pl-6 space-y-1 text-sm text-slate-500 dark:text-slate-400">
                  <li>Focus areas: UI/UX, performance, DX, automation</li>
                  <li>Values: clarity, ownership, kindness</li>
                  <li>Hobbies: maps, photography, teaching</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold">Education</h3>
                <div className="mt-3 space-y-3">
                  {EDUCATION.map((e) => (
                    <div key={e.program} className="text-sm">
                      <div className="font-medium inline-flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" /> {e.program}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400">{e.org} • {e.period}</div>
                      {e.note && <div className="text-slate-500 dark:text-slate-400 mt-1">{e.note}</div>}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="Skills" subtitle="Tech I use often" />
          <motion.div {...fade}>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="Projects" subtitle="A few things I’ve built" />
          <motion.div {...fade}>
            <div className="grid md:grid-cols-3 gap-6">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="Experience" subtitle="Where I’ve worked" />
          <motion.ol {...fade} className="relative border-l pl-6 space-y-8">
            {EXPERIENCE.map((x) => (
              <li key={x.role} className="ml-2">
                <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-blue-600 dark:bg-cyan-400" />
                <div className="flex flex-wrap items-center gap-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{x.role}</span>
                  <span>@ {x.company}</span>
                  <span>• {x.period}</span>
                  <span>• {x.location}</span>
                </div>
                <ul className="mt-2 list-disc pl-6 space-y-1 text-sm text-slate-500 dark:text-slate-400">
                  {x.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="Testimonials" subtitle="Nice words from collaborators" />
          <motion.div {...fade} className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} className="p-6">
                <p className="text-base leading-relaxed">“{t.quote}”</p>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">— {t.name}, {t.role}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="Contact" subtitle="Let’s build something great together" />
          <motion.div {...fade} className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold">Drop a message</h3>
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const name = fd.get("name");
                  const email = fd.get("email");
                  const message = fd.get("message");
                  const mailto = `mailto:${PROFILE.email}?subject=Portfolio%20enquiry%20from%20${encodeURIComponent(
                    name
                  )}&body=${encodeURIComponent(`${message}\n\nReply to: ${email}`)}`;
                  window.location.href = mailto;
                }}
              >
                <div>
                  <label className="text-sm" htmlFor="name">Name</label>
                  <input id="name" name="name" required className="mt-1 w-full rounded-xl border bg-transparent px-3 py-2 focus:outline-none focus:ring" />
                </div>
                <div>
                  <label className="text-sm" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required className="mt-1 w-full rounded-xl border bg-transparent px-3 py-2 focus:outline-none focus:ring" />
                </div>
                <div>
                  <label className="text-sm" htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={4} required className="mt-1 w-full rounded-xl border bg-transparent px-3 py-2 focus:outline-none focus:ring" />
                </div>
                <button className="w-full rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black px-5 py-2.5 font-semibold shadow-sm hover:shadow">Send</button>
              </form>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold">Reach me</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> {PROFILE.email}</p>
                <p className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> {PROFILE.phone}</p>
                <div className="flex items-center gap-2 mt-2">
                  {PROFILE.socials.map((s) => (
                    <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="rounded-xl border px-3 py-2 inline-flex items-center gap-2 hover:shadow">
                      {s.icon && <s.icon className="h-4 w-4" />} <span className="hidden sm:inline">{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p>© {year} {PROFILE.name}. All rights reserved.</p>
            <p>
              Built with <span className="font-medium text-slate-900 dark:text-slate-100">React</span> & <span className="font-medium text-slate-900 dark:text-slate-100">Tailwind</span>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
