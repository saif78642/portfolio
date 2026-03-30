import React from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col font-sans selection:bg-[var(--selection-bg)]" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
        <Navbar />
        <main className="flex-1 w-full pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
