import { SectionHeader, GlassCard } from '../components/common';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Shield } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-8">
      <div className="container-premium">
        <SectionHeader title="Contact Us" subtitle="Get in touch with the CricAsh team" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: 'support@cricasth.com' },
              { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: MapPin, label: 'Address', value: '123 Cricket Lane, Sports City, SC 12345' },
              { icon: Globe, label: 'Website', value: 'www.cricasth.com' },
            ].map(item => (
              <GlassCard key={item.label} className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cricket-50 dark:bg-cricket-900/20 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-cricket-600 dark:text-cricket-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cricket-500" /> Send us a message
              </h3>
              {submitted ? (
                <div className="text-center py-12">
                  <Send className="w-12 h-12 mx-auto text-cricket-500 mb-3" />
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Message Sent!</p>
                  <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input placeholder="Your Name" required className="input-search" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    <input placeholder="Email Address" type="email" required className="input-search" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <input placeholder="Subject" required className="input-search" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                  <textarea placeholder="Your Message" rows={5} required className="input-search resize-none" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  <button type="submit" className="btn-primary flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
              <p className="text-xs text-gray-400 mt-4 text-center">Created & Maintained by <span className="text-cricket-500 font-medium">Syed Ashar</span></p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
