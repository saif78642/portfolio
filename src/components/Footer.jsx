import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-base)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Let's Connect</h2>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Open to new opportunities, collaborations, and discussions around systems, data, and software.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:imohammadsaifkhan@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full transition-colors"
                style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
              >
                <span>Get in Touch</span>
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full transition-colors"
                style={{ border: '1px solid var(--border-hover)', color: 'var(--text-primary)' }}
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 sm:gap-12">
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Navigate</h3>
              <ul className="space-y-3">
                <li><a href="/#projects" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>Projects</a></li>
                <li><a href="/#experience" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>Experience</a></li>

              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Connect</h3>
              <ul className="space-y-3">
                <li><a href="https://www.linkedin.com/in/mdsaifkhan10/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>LinkedIn</a></li>
                <li><a href="https://github.com/saif78642" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>GitHub</a></li>
                <li><a href="mailto:imohammadsaifkhan@gmail.com" className="transition-colors hover:opacity-80" style={{ color: 'var(--text-secondary)' }}>Email</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t flex flex-col gap-3" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Mohammad Saif Khan. All rights reserved.</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Indore, India · Open to Remote</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
