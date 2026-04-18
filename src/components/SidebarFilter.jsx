import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';

const FilterSection = ({ title, options, isExpanded, onToggle, activeOptions, onOptionToggle }) => {
  return (
    <div className="border-b border-industrial-100 py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left focus:outline-none group"
      >
        <span className="text-sm font-bold uppercase tracking-wider text-industrial-900 group-hover:text-accent-dark premium-transition">
          {title}
        </span>
        {isExpanded ? (
          <ChevronUp size={18} className="text-industrial-400" />
        ) : (
          <ChevronDown size={18} className="text-industrial-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option, index) => {
            const name = typeof option === 'string' ? option : option.name;
            const isActive = activeOptions.includes(name);
            
            return (
              <label key={index} className="flex items-center group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => onOptionToggle(title, name)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-industrial-300 bg-white checked:bg-industrial-900 checked:border-industrial-900 premium-transition"
                  />
                  <div className="pointer-events-none absolute left-1 top-1 text-white opacity-0 peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className={`ml-3 text-sm premium-transition ${isActive ? 'text-industrial-900 font-bold' : 'text-industrial-600 group-hover:text-industrial-900'}`}>
                  {name}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SidebarFilter = ({ filters, activeFilters, onToggle, onClear }) => {
  const [expandedSections, setExpandedSections] = useState({
    'Product category': true,
    'Sectors': false,
    'Risks': false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-full lg:w-72 flex-shrink-0">
      <div className="lg:sticky lg:top-24 space-y-2">
        <div className="flex items-center justify-between mb-6 lg:border-b lg:border-industrial-100 lg:pb-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-industrial-900" />
            <h3 className="font-bold text-lg text-industrial-900 uppercase">Filters</h3>
          </div>
          <button 
            onClick={onClear}
            className="text-xs font-bold text-accent-dark hover:text-industrial-900 uppercase tracking-widest hidden lg:block"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-2">
          {Object.entries(filters).map(([title, options]) => (
            <FilterSection
              key={title}
              title={title}
              options={options}
              isExpanded={expandedSections[title]}
              onToggle={() => toggleSection(title)}
              activeOptions={activeFilters[title] || []}
              onOptionToggle={onToggle}
            />
          ))}
        </div>
        
        {/* Banner */}
        <div className="mt-12 bg-industrial-900 rounded-2xl p-6 text-white overflow-hidden relative group">
          <div className="relative z-10">
            <h4 className="font-bold text-xl mb-2">Need Help?</h4>
            <p className="text-industrial-300 text-sm mb-4">Find the right head protection for your specific needs.</p>
            <button className="bg-accent text-industrial-900 font-bold px-4 py-2 rounded-lg text-sm hover:bg-white premium-transition">
              Consult an Expert
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/40 premium-transition"></div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
