import React from 'react';
import AppLayout from '../components/AppLayout';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Award, Zap, Users, Globe, HardHat, Eye, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

function HomePage() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <AppLayout>
      <div>
        {/* Immersive Hero Section */}
        <div style={{ 
          position: 'relative',
          height: '80vh',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '4rem',
          margin: '1.5rem',
          borderRadius: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          {/* Background Image & Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 0.2) 100%)',
            zIndex: 1
          }} />

          {/* Hero Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}
          >
            <motion.div variants={fadeInUp} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '800', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)', backdropFilter: 'blur(10px)' }}>
              <Shield size={16} /> NEXT-GENERATION INDUSTRIAL SAFETY
            </motion.div>
            
            <motion.h1 variants={fadeInUp} style={{ fontSize: '4.5rem', fontWeight: '900', color: 'white', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Defend Your <span style={{ color: '#3b82f6' }}>Workforce.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} style={{ color: '#cbd5e1', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '600px' }}>
              Equip your team with state-of-the-art Personal Protective Equipment. From advanced polycarbonate helmets to ultra-clear respiratory masks, we provide gear that doesn't compromise on safety or comfort.
            </motion.p>
            
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/products" style={{ background: '#2563eb', color: 'white', padding: '1.25rem 2.5rem', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Explore Catalogue <ArrowRight size={20} />
              </Link>
              <Link to="/about" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem 2.5rem', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: '800', display: 'flex', alignItems: 'center', textDecoration: 'none', backdropFilter: 'blur(10px)', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                Our Mission
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Key Metrics Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', padding: '0 3.5rem', marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '500+', label: 'Enterprise Clients' },
            { value: '1M+', label: 'Products Delivered' },
            { value: '100%', label: 'Safety Certified' }
          ].map((metric, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{ background: 'white', padding: '2rem', borderRadius: '1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', textAlign: 'center', border: '1px solid #f1f5f9' }}
            >
              <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#2563eb', marginBottom: '0.25rem' }}>{metric.value}</h3>
              <p style={{ color: '#64748b', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Categories Showcase */}
        <div style={{ padding: '6rem 3.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' }}>Premium Safety Divisions</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Browse our specialized categories designed for specific industrial risks and compliance requirements.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { title: 'Skull Protection', icon: <HardHat size={32} />, img: 'https://images.unsplash.com/photo-1541888081682-965a396ba259?auto=format&fit=crop&q=80', desc: 'High-impact resistant helmets for construction and heavy industry.' },
              { title: 'Eye Protection', icon: <Eye size={32} />, img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80', desc: 'Anti-fog, UV-resistant safety goggles and premium visors.' },
              { title: 'Respiratory Gear', icon: <Activity size={32} />, img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80', desc: 'Advanced filtration masks protecting against fumes and particulates.' }
            ].map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                style={{ background: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.3s' }}
              >
                <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                  <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover:scale-110" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)' }} />
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', color: 'white' }}>
                    <div style={{ background: '#2563eb', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      {cat.icon}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>{cat.title}</h3>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>{cat.desc}</p>
                  <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Explore Category <ArrowRight size={16} /></span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div style={{ background: '#1e293b', padding: '6rem 3.5rem', color: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ background: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '800', marginBottom: '1.5rem' }}>
                THE PRIOR SAFE ADVANTAGE
              </div>
              <h2 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: 1.1, marginBottom: '2rem' }}>
                Engineered for the Extreme.
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                We don't just sell equipment; we deliver peace of mind. Every product in our catalogue undergoes rigorous stress testing to ensure it surpasses global safety benchmarks.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: <Award />, title: 'International Certifications', desc: 'CE, ANSI, and ISO compliance across all product lines.' },
                  { icon: <Zap />, title: 'Innovative Ergonomics', desc: 'Designed for 12-hour shifts without compromising comfort.' },
                  { icon: <Globe />, title: 'Global Supply Chain', desc: 'Rapid delivery networks ensuring you never face downtime.' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ background: '#2563eb', padding: '0.75rem', borderRadius: '1rem', color: 'white' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.title}</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80" alt="Industrial Safety" style={{ width: '100%', borderRadius: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }} />
              <div style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', background: 'white', padding: '2rem', borderRadius: '1.5rem', color: '#1e293b', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <Shield size={32} color="#2563eb" />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '900' }}>100% Secure</h4>
                </div>
                <p style={{ color: '#64748b', margin: 0, fontWeight: '600' }}>Zero compromise policy.</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ padding: '6rem 3.5rem', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderRadius: '2rem', padding: '5rem 2rem', color: 'white', boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.3)' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem' }}>Ready to Upgrade Your Safety Standard?</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 3rem' }}>Join thousands of enterprises trusting Prior Safe for their critical PPE requirements.</p>
            <Link to="/products" style={{ background: 'white', color: '#1d4ed8', padding: '1.25rem 3rem', borderRadius: '1rem', fontSize: '1.1rem', fontWeight: '900', textDecoration: 'none', display: 'inline-block', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              Shop Now
            </Link>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}

export default HomePage;
