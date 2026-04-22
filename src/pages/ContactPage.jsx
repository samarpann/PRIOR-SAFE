import React from 'react';
import AppLayout from '../components/AppLayout';
import { Mail, Phone, MapPin } from 'lucide-react';

function ContactPage() {
  return (
    <AppLayout>
      <div style={{ padding: '2rem' }}>
        <div style={{ 
          background: 'white',
          borderRadius: '1.5rem',
          padding: '3rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem', textAlign: 'center' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
            Have questions about our products or need a custom safety solution? Our team is ready to help you find exactly what you need.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '2rem' }}>Contact Information</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={24} color="#2563eb" />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>Phone Support</h4>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b' }}>+1 (800) 123-SAFE</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={24} color="#2563eb" />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>Email Us</h4>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b' }}>support@priorsafe.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin size={24} color="#2563eb" />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>Headquarters</h4>
                    <p style={{ margin: '0.25rem 0 0', color: '#64748b' }}>123 Industrial Way, Safety City, 90210</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem' }}>Send a Message</h2>
              <form>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Full Name</label>
                  <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Email Address</label>
                  <input type="email" placeholder="john@company.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Message</label>
                  <textarea rows="4" placeholder="How can we help you?" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }}></textarea>
                </div>
                <button type="button" className="admin-btn admin-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ContactPage;
