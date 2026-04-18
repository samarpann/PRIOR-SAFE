import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-industrial-900 text-white pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-industrial-900 font-black text-sm">DP</span>
              </div>
              <span className="text-white font-black text-lg tracking-tight">DELTA PLUS</span>
            </div>
            <p className="text-industrial-400 text-sm leading-relaxed mb-6">
              Delta Plus is a major global player in the PPE market, listed on the Paris stock exchange and established in 110 countries.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-accent">Solutions</h4>
            <ul className="space-y-4 text-sm text-industrial-300">
              <li><a href="#" className="hover:text-white premium-transition">Head Protection</a></li>
              <li><a href="#" className="hover:text-white premium-transition">Hand Protection</a></li>
              <li><a href="#" className="hover:text-white premium-transition">Body Protection</a></li>
              <li><a href="#" className="hover:text-white premium-transition">Foot Protection</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-accent">Company</h4>
            <ul className="space-y-4 text-sm text-industrial-300">
              <li><a href="#" className="hover:text-white premium-transition">About Us</a></li>
              <li><a href="#" className="hover:text-white premium-transition">Sustainability</a></li>
              <li><a href="#" className="hover:text-white premium-transition">Careers</a></li>
              <li><a href="#" className="hover:text-white premium-transition">Media Kit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-accent">Newsletter</h4>
            <p className="text-industrial-400 text-sm mb-4">Stay updated with our latest safety innovations.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-industrial-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-accent"
              />
              <button className="bg-accent text-industrial-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-white premium-transition">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-industrial-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-industrial-500 font-medium font-mono uppercase tracking-widest">
          <p>© 2024 DELTA PLUS GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Legal Notice</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
