import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-industrial-900 text-white pt-24 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="text-white">
                <svg width="40" height="40" viewBox="0 0 100 100">
                  <path d="M20 85 L80 85 L65 15 L35 15 Z" stroke="white" fill="none" strokeWidth="5" strokeLinejoin="round"/>
                  <line x1="30" y1="65" x2="70" y2="65" stroke="white" strokeWidth="5" />
                  <line x1="38" y1="40" x2="62" y2="40" stroke="white" strokeWidth="5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-2xl tracking-tight leading-none">Ecom Experts</span>
                <span className="text-industrial-400 text-[8px] font-black uppercase tracking-[0.3em] mt-1">Online Sales Platform</span>
              </div>
            </div>
            <p className="text-industrial-400 text-sm leading-relaxed mb-8 max-w-sm">
              Empowering industrial enterprises with cutting-edge digital sales solutions and premium safety equipment. Your trusted partner in industrial excellence.
            </p>
            <div className="flex items-center gap-4">
              <div className="text-xs font-black uppercase tracking-widest text-accent">Leadership</div>
              <div className="text-sm font-bold text-white">Nimlesh Garg <span className="text-industrial-500 font-medium ml-2 text-xs uppercase tracking-tighter">— CEO</span></div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-accent">Solutions</h4>
            <ul className="space-y-4 text-sm font-bold text-industrial-400">
              <li><a href="#" className="hover:text-white premium-transition">Marketplace</a></li>
              <li><a href="#" className="hover:text-white premium-transition">Bulk Orders</a></li>
              <li><a href="#" className="hover:text-white premium-transition">Logistics</a></li>
              <li><a href="#" className="hover:text-white premium-transition">Consulting</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-5">
            <h4 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-accent">Contact Information</h4>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-industrial-800 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <p className="text-sm text-industrial-300 leading-relaxed">
                  Shop No. 2, Ground Floor, MPL No. 242, Gali Phatak Karor, Ajmeri Gate, New Delhi-110006
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-industrial-800 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-accent" />
                  </div>
                  <span className="text-sm font-bold text-industrial-300">+91 9317341500</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-industrial-800 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <span className="text-sm font-bold text-industrial-300">ecomexperts2025@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-industrial-800 rounded-xl flex items-center justify-center shrink-0">
                  <Globe size={18} className="text-accent" />
                </div>
                <span className="text-sm font-bold text-industrial-300">www.ecomexperts.co.in</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-industrial-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-industrial-500 font-black uppercase tracking-[0.3em]">
          <p>© 2025 ECOM EXPERTS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white premium-transition">Terms</a>
            <a href="#" className="hover:text-white premium-transition">Privacy</a>
            <a href="#" className="hover:text-white premium-transition">Certificates</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
