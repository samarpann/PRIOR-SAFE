import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex px-4 py-6 bg-transparent" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 md:space-x-4 max-w-7xl mx-auto w-full">
        <li className="inline-flex items-center">
          <a href="#" className="inline-flex items-center text-sm font-medium text-industrial-400 hover:text-industrial-900 premium-transition">
            <Home size={14} className="mr-2" />
            Home
          </a>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight size={14} className="text-industrial-300" />
              <a
                href="#"
                className={`ml-2 md:ml-4 text-sm font-medium ${
                  index === items.length - 1 
                    ? 'text-industrial-900 cursor-default' 
                    : 'text-industrial-400 hover:text-industrial-900 premium-transition'
                }`}
              >
                {item}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
