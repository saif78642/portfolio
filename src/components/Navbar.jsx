import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Sun, Moon, Download, Linkedin, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_SECTIONS = [
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    const ids = NAV_SECTIONS.map(s => s.id);

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const handleLinkClick = useCallback((e, targetId) => {
    setIsOpen(false);
    if (targetId) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `/#${targetId}`);
      }
    }
  }, []);

  const handleLogoClick = useCallback((e) => {
    setIsOpen(false);
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '/');
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
      style={{
        background: scrolled ? 'var(--bg-nav)' : 'var(--bg-nav-transparent)',
        borderColor: 'var(--border-color)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-6 py-3 max-w-[1200px] mx-auto">
        <a
          href="/"
          onClick={handleLogoClick}
          className="font-semibold text-sm tracking-tight hover:opacity-80 transition-opacity flex-shrink-0"
          style={{ color: 'var(--text-primary)' }}
        >
          Mohammad Saif Khan
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_SECTIONS.map((link) => (
            <a
              key={link.name}
              href={`/#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300"
              style={{
                color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: activeSection === link.id ? 'var(--bg-card-hover)' : 'transparent',
              }}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: 'var(--text-primary)' }} />
              )}
            </a>
          ))}

        </nav>

        <div className="flex items-center gap-2">
          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="https://www.linkedin.com/in/mdsaifkhan10/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://github.com/saif78642"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: 'var(--bg-card-hover)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={16} className="transition-transform duration-300" />
            ) : (
              <Moon size={16} className="transition-transform duration-300" />
            )}
          </button>

          {/* Resume Download (Desktop) */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all flex-shrink-0"
            style={{
              border: '1px solid var(--border-hover)',
              color: 'var(--text-primary)',
            }}
          >
            <Download size={14} />
            Resume
          </a>

          {/* Get in Touch CTA (Desktop) */}
          <a
            href="/#contact"
            onClick={(e) => handleLinkClick(e, 'contact')}
            className="hidden md:inline-flex px-5 py-2 text-sm font-semibold rounded-full transition-colors flex-shrink-0"
            style={{
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
            }}
          >
            Get in Touch
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="block h-6 w-6" style={{ color: 'var(--text-primary)' }} />
            ) : (
              <Menu className="block h-6 w-6" style={{ color: 'var(--text-primary)' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div style={{ background: 'var(--bg-overlay)', borderTop: '1px solid var(--border-subtle)' }} className="backdrop-blur-xl">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {NAV_SECTIONS.map((link) => (
              <a
                key={link.name}
                href={`/#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="block rounded-xl px-4 py-3 text-base font-medium transition-colors"
                style={{
                  background: activeSection === link.id ? 'var(--bg-card-hover)' : 'transparent',
                  color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                {link.name}
              </a>
            ))}

            <div className="h-px my-2" style={{ background: 'var(--border-subtle)' }} />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Download size={16} />
              Download Resume
            </a>
            <div className="flex items-center gap-3 px-4 py-3">
              <a
                href="https://www.linkedin.com/in/mdsaifkhan10/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/saif78642"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
            </div>
            <a
              href="/#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="block rounded-xl px-4 py-3 text-base font-medium text-center"
              style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
