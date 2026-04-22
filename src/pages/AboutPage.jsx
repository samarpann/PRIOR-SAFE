import React from 'react';
import AppLayout from '../components/AppLayout';
import { ShieldCheck, Target, Globe, Award, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <AppLayout>
      <div>
        {/* Immersive Header */}
        <div style={{ 
          position: 'relative',
          height: '50vh',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
            zIndex: 1
          }} />

          {/* Header Content */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={fadeInUp}
            style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '800px' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '800', marginBottom: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.3)', backdropFilter: 'blur(10px)' }}>
              OUR LEGACY
            </div>
            <h1 style={{ fontSize: '4.5rem', fontWeight: '900', color: 'white', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              We Engineer <span style={{ color: '#3b82f6' }}>Safety.</span>
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.2rem', lineHeight: 1.6 }}>
              For over four decades, Prior Safe has been the global standard for industrial protection, safeguarding millions of workers in the most hazardous environments on Earth.
            </p>
          </motion.div>
        </div>

        {/* Content Section */}
        <div style={{ padding: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Mission & Vision */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem' }}>The Mission That Drives Us</h2>
              <p style={{ color: '#475569', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Our job is unequivocally to protect women and men at work. To achieve this, we design, manufacture, and distribute complete personal and collective protection solutions for professionals worldwide.
              </p>
              <p style={{ color: '#475569', fontSize: '1.15rem', lineHeight: 1.8 }}>
                We don't just supply gear; we partner with industries to develop skills through rigorous training programs, technical tutorials, and dedicated centers of expertise. 
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative' }}
            >
              <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" alt="Team at work" style={{ width: '100%', borderRadius: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
              <div style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', background: '#2563eb', padding: '2rem', borderRadius: '1.5rem', color: 'white', boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <TrendingUp size={32} />
                  <h4 style={{ fontSize: '2rem', fontWeight: '900' }}>45+</h4>
                </div>
                <p style={{ color: '#bfdbfe', margin: 0, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>Years of Excellence</p>
              </div>
            </motion.div>
          </div>

          {/* Core Values */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' }}>Our Core Pillars</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>The foundational principles that guide every product we engineer.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
            {[
              { icon: <ShieldCheck size={40} />, title: 'Zero Compromise', desc: 'Safety isn\'t a feature; it\'s our foundational requirement. We exceed compliance.' },
              { icon: <Target size={40} />, title: 'Precision Engineering', desc: 'Every millimeter of our equipment is meticulously designed using advanced CAD.' },
              { icon: <Globe size={40} />, title: 'Global Reach', desc: 'Operating in over 80 countries, providing standardized protection globally.' },
              { icon: <Award size={40} />, title: 'Award Winning', desc: 'Recognized by industry leaders for pioneering ergonomic safety solutions.' },
              { icon: <Users size={40} />, title: 'Human Centric', desc: 'We design for the worker first, ensuring comfort during 12-hour shifts.' },
              { icon: <TrendingUp size={40} />, title: 'Continuous Innovation', desc: 'Reinvesting 15% of revenue into R&D for next-generation materials.' }
            ].map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ background: 'white', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', transition: 'transform 0.3s' }}
                className="hover:-translate-y-2"
              >
                <div style={{ color: '#2563eb', marginBottom: '1.5rem', background: '#eff6ff', display: 'inline-flex', padding: '1rem', borderRadius: '1rem' }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' }}>{val.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

export default AboutPage;
