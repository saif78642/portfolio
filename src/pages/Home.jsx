import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Terminal, BarChart, Database, Network, Mail,
  Github, ExternalLink, Code2, Brain, TerminalSquare, Bot,
  Briefcase, GraduationCap, Award, CheckCircle2, Send, MapPin, Loader2,
  Linkedin, Download, FileText, CircleDot
} from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────── */

const ALL_PROJECTS = [
  {
    id: 'proj0',
    title: 'GTM Auditor — AI-Powered Container Analysis',
    category: 'AI / Full Stack',
    description: 'An intelligent chat interface for auditing Google Tag Manager containers. Powered by Google Gemini with full container context caching, real-time SSE streaming, and persistent chat history on Cloudflare\'s serverless edge.',
    tags: ['React', 'TypeScript', 'Cloudflare Workers', 'Google Gemini', 'D1', 'KV'],
    icon: <Bot className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />,
    link: null,
    github: 'https://github.com/saif78642/gtm_auditor'
  },
  {
    id: 'proj1',
    title: 'Spring Boot + React CRUD Application',
    category: 'Engineering',
    description: 'Built a microservice-based app for user management with secure backend foundations and structured frontend flows.',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL'],
    icon: <TerminalSquare className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />,
    link: null,
    github: null
  },
  {
    id: 'proj2',
    title: 'Facial Recognition Attendance System',
    category: 'Data',
    description: 'Developed a facial recognition system using Convolutional Neural Networks (CNNs) in Python to automate attendance tracking. Achieved 90% accuracy.',
    tags: ['Python', 'CNNs', 'Computer Vision'],
    icon: <Brain className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />,
    link: null,
    github: null
  },
  {
    id: 'proj3',
    title: 'House Price Prediction',
    category: 'Data',
    description: 'Built a Linear Regression model to predict house prices based on features like area income, house age, number of rooms, and population.',
    tags: ['Python', 'Linear Regression', 'RMSE', 'R-squared'],
    icon: <Database className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />,
    link: null,
    github: null
  }
];

const TIMELINE = [
  {
    id: 1,
    role: 'Data Analyst / Implementation Specialist',
    company: 'A2ZDM Pvt. Ltd., Indore',
    date: 'Jan 2024 — Present',
    icon: <Briefcase className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />,
    description: 'Utilize Google Tag Manager to implement and manage tracking codes for website analytics, ensuring accurate data collection.',
    highlights: [
      'Analyze user behavior and campaign performance using Google Analytics',
      'Create interactive dashboards and reports in Google Looker Studio',
      'Perform data querying and analysis using Google BigQuery',
      'Collaborate with cross-functional teams to enhance data tracking'
    ],
  },
  {
    id: 2,
    role: 'B.Tech — Data Science',
    company: 'Acropolis Institute of Technology and Research, Indore',
    date: '2020 — 2024',
    icon: <GraduationCap className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />,
    description: 'Graduated with 7.62/10.0 CGPA. Specialized in Data Science, Data Analytics, Data Visualization, and Machine Learning.',
    highlights: [
      'Built major projects in facial recognition and predictive modeling',
      'Clearance: Wipro Talent Next Program – Full Stack Java Application Development'
    ],
  },
  {
    id: 3,
    role: '12th Class (CBSE)',
    company: 'Little Flower School, Indore',
    date: '2020',
    icon: <Award className="h-4 w-4" style={{ color: 'var(--text-primary)' }} />,
    description: 'Completed with 72.8%',
  }
];

const SKILLS = [
  { category: 'Languages', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { category: 'Frontend', items: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
  { category: 'Backend & Cloud', items: ['Spring Boot', 'Cloudflare Workers', 'MySQL', 'D1 (SQLite)'] },
  { category: 'AI & Analytics', items: ['Google Gemini', 'Google Tag Manager', 'Google Analytics', 'Power BI'] },
  { category: 'DevOps & Tools', items: ['Git', 'Wrangler', 'Postman', 'Cloudflare KV'] }
];

const METRICS = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '+', label: 'Major Projects' },
  { value: null, text: 'Java', label: 'Full Stack Dev' },
  { value: null, text: 'Python', label: 'Data Science' },
];

/* ─── Animated Counter Hook ─────────────────────────────────── */

function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView || value === null) return;
    let start = 0;
    const step = Math.ceil(duration / value);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="text-3xl font-bold tracking-tight tabular-nums" style={{ color: 'var(--text-primary)' }}>
      {value !== null ? `${count}${suffix}` : null}
    </span>
  );
}

/* ─── Section Header Component ──────────────────────────────── */

function SectionHeader({ overline, title, description, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>{overline}</p>
      <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      {description && (
        <p className="mt-4 max-w-2xl text-lg" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      )}
    </motion.div>
  );
}

/* ─── Gradient Divider ──────────────────────────────────────── */

function GradientDivider() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-6">
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border-color), transparent)' }} />
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────── */

export default function Home() {
  const [formState, setFormState] = useState({ state: 'idle' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormState({ state: 'submitting' });
    setTimeout(() => {
      setFormState({ state: 'success' });
      e.target.reset();
      setTimeout(() => {
        setFormState({ state: 'idle' });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center w-full relative">

      {/* ── Ambient Background Glows ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full blur-[120px] animate-[float_20s_ease-in-out_infinite]" style={{ background: 'var(--glow-purple)' }} />
        <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] animate-[float_25s_ease-in-out_infinite_reverse]" style={{ background: 'var(--glow-sky)' }} />
        <div className="absolute bottom-[10%] left-[40%] w-[350px] h-[350px] rounded-full blur-[100px] animate-[float_22s_ease-in-out_infinite_2s]" style={{ background: 'var(--glow-emerald)' }} />
      </div>

      {/* ━━━━━━━━━━━ HERO SECTION ━━━━━━━━━━━ */}
      <section className="min-h-[85vh] flex items-center pt-24 pb-16 px-6 relative w-full overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
        <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" style={{ background: 'var(--hero-glow)' }}></div>

        <div className="max-w-[1200px] mx-auto w-full z-10">
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 mt-8 sm:mt-0"
            >
              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold uppercase tracking-widest"
                style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', color: 'var(--accent-emerald)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent-emerald)' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent-emerald)' }}></span>
                </span>
                Available for Opportunities
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                Mohammad Saif Khan
              </h1>
              <p className="text-xl sm:text-2xl font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
                Software Engineer
              </p>
              <p className="text-lg leading-relaxed max-w-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
                Aspiring Software Engineer with a strong foundation in Java development and web technologies. Passionate about designing and delivering scalable solutions in agile development environments.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'Professional Experience @ A2ZDM Pvt. Ltd.',
                  'B.Tech Data Science @ Acropolis Institute of Technology',
                  'Skilled in Core Java, Spring Boot, React, and SQL'
                ].map((text, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3 text-sm sm:text-base"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: 'var(--accent-emerald)' }} />
                    <span>{text}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#projects" className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all hover:shadow-lg" style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}>
                  See My Work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 border text-sm font-semibold rounded-full transition-all hover:shadow-md" style={{ borderColor: 'var(--border-hover)', color: 'var(--text-primary)' }}>
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 border text-sm font-medium rounded-full transition-all" style={{ borderColor: 'var(--border-hover)', color: 'var(--text-primary)' }}>
                  Get in Touch
                </a>
              </div>
              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                <a href="https://linkedin.com/in/mdsaifkhan10/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110" style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)' }} aria-label="LinkedIn Profile">
                  <Linkedin className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                </a>
                <a href="https://github.com/saif78642" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110" style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)' }} aria-label="GitHub Profile">
                  <Github className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                </a>
                <a href="mailto:imohammadsaifkhan@gmail.com" className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-110" style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)' }} aria-label="Email">
                  <Mail className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0 self-center"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] lg:w-[280px] lg:h-[280px] rounded-[2rem] overflow-hidden shadow-2xl" style={{ border: '1px solid var(--border-color)', background: 'var(--icon-bg)' }}>
                  <img src="https://picsum.photos/seed/saif/600/600" alt="Mohammad Saif Khan" className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━ METRICS SECTION ━━━━━━━━━━━ */}
      <section className="w-full border-y relative z-10" style={{ borderColor: 'var(--border-color)', background: 'var(--metric-bg)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {METRICS.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col ${i < 3 ? 'md:border-r' : ''} ${i === 0 ? 'md:pr-8' : i === 3 ? 'md:pl-8' : 'md:px-8'}`}
                style={{ borderColor: 'var(--border-color)' }}
              >
                {metric.value !== null ? (
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                ) : (
                  <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{metric.text}</span>
                )}
                <span className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ━━━━━━━━━━━ PROJECTS SECTION ━━━━━━━━━━━ */}
      <section id="projects" className="w-full max-w-[1200px] mx-auto px-6 py-32 relative z-10">
        <SectionHeader
          overline="Portfolio"
          title="Selected Work"
          description="A selection of robust systems, predictive models, and open-source contributions."
          className="mb-16"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {ALL_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between overflow-hidden rounded-[2rem] p-8 transition-all duration-300"
              style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-2xl p-3 transition-colors" style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)' }}>
                    {project.icon}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {project.category}
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-bold transition-all" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="mb-6 leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
                <div className="mb-8 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-lg px-3 py-1 font-mono text-xs" style={{ background: 'var(--bg-tag)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {(project.github || project.link) && (
                <div className="flex items-center gap-6 mt-auto pt-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>
                      <ExternalLink className="h-4 w-4" />
                      View Details
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <GradientDivider />

      {/* ━━━━━━━━━━━ EXPERIENCE SECTION ━━━━━━━━━━━ */}
      <section id="experience" className="w-full border-t py-32 relative z-10" style={{ borderColor: 'var(--border-color)', background: 'var(--metric-bg)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid gap-20 lg:grid-cols-12">

            {/* Timeline Column */}
            <div className="lg:col-span-7">
              <SectionHeader overline="Journey" title="Experience & Education" className="mb-12" />
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-px" style={{ '--tw-before-background': 'var(--border-color)' }}>
                <style>{`.timeline-line::before { background: linear-gradient(to bottom, transparent, var(--border-color), transparent) !important; }`}</style>
                {TIMELINE.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative flex items-start gap-6 group"
                  >
                    <div className="mt-1 flex items-center justify-center w-10 h-10 rounded-full z-10 box-content shrink-0 transition-colors" style={{ border: '1px solid var(--border-hover)', background: 'var(--bg-base)', boxShadow: `0 0 0 8px var(--bg-base)` }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 rounded-[1.5rem] p-8 transition-all duration-300" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                        <h3 className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>{item.role}</h3>
                        <time className="font-mono text-sm mt-1 sm:mt-0" style={{ color: 'var(--text-muted)' }}>{item.date}</time>
                      </div>
                      <div className="text-sm font-medium mb-4" style={{ color: 'var(--text-secondary)' }}>{item.company}</div>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                      {item.highlights && (
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-emerald)' }} />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Column */}
            <div className="lg:col-span-5">
              <SectionHeader overline="Arsenal" title="Capabilities" className="mb-12" />
              <div className="flex flex-col gap-6">
                {SKILLS.map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-[1.5rem] p-6 transition-all duration-300"
                    style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.borderColor = 'var(--border-hover)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                  >
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                      {skillGroup.category}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {skillGroup.items.map(skill => (
                        <li key={skill} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <GradientDivider />

      {/* ━━━━━━━━━━━ CONTACT SECTION ━━━━━━━━━━━ */}
      <section id="contact" className="w-full border-t py-32 relative z-10" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', color: 'var(--accent-emerald)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent-emerald)' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent-emerald)' }}></span>
                </span>
                Open to Opportunities
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>Let's Work Together.</h2>
              <p className="text-lg leading-relaxed max-w-lg mb-12" style={{ color: 'var(--text-secondary)' }}>
                I'm actively looking for full-time roles in systems engineering, full stack development, and data analytics. Let's connect.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)' }}>
                    <Mail className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Email</div>
                    <a href="mailto:imohammadsaifkhan@gmail.com" className="text-lg font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                      imohammadsaifkhan@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)' }}>
                    <Linkedin className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>LinkedIn</div>
                    <a href="https://linkedin.com/in/mdsaifkhan10/" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:opacity-70 transition-opacity" style={{ color: 'var(--text-primary)' }}>
                      linkedin.com/in/mdsaifkhan10/
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)' }}>
                    <MapPin className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Location</div>
                    <div className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Indore, India · Open to Remote</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)' }}>
                    <FileText className="h-6 w-6" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Resume</div>
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:opacity-70 transition-opacity inline-flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                      Download PDF
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="rounded-[2rem] p-8 sm:p-10 shadow-2xl backdrop-blur-xl" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Send a Message</h2>
                <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>I'll get back to you as soon as possible.</p>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-xl px-5 py-4 focus:outline-none focus:ring-1 transition-colors"
                      style={{ border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-xl px-5 py-4 focus:outline-none focus:ring-1 transition-colors"
                      style={{ border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full rounded-xl px-5 py-4 focus:outline-none focus:ring-1 transition-colors resize-none"
                      style={{ border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)' }}
                      placeholder="Tell me about the role or project..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState.state !== 'idle'}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
                  >
                    {formState.state === 'idle' && (
                      <>
                        <span>Send Message</span>
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                    {formState.state === 'submitting' && (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    )}
                    {formState.state === 'success' && (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-green-600">Message Sent!</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
