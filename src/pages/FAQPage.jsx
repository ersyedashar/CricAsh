import { useState } from 'react';
import { SectionHeader, GlassCard } from '../components/common';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'What is CricAsh?', a: 'CricAsh is a premium cricket information platform that provides live scores, player statistics, match analysis, and a comprehensive database of international cricketers from around the world.' },
  { q: 'How often is the data updated?', a: 'Our data is updated in real-time during live matches and within minutes of match completion. Player statistics and rankings are refreshed daily to ensure accuracy.' },
  { q: 'Is CricAsh free to use?', a: 'Yes! CricAsh is completely free to use. We believe cricket information should be accessible to all fans worldwide.' },
  { q: 'Can I compare players?', a: 'Absolutely! Our Compare Players feature allows you to compare career statistics, achievements, and performance metrics of any two international cricketers side by side.' },
  { q: 'Do you cover domestic leagues?', a: 'Yes, we cover major domestic leagues including IPL, PSL, BBL, The Hundred, SA20, ILT20, CPL, LPL, MLC, and BPL with dedicated pages and statistics.' },
  { q: 'How can I report an error?', a: 'If you find any incorrect information, please contact us through the Contact page or email support@cricasth.com. We appreciate your help in keeping our data accurate.' },
  { q: 'Is there a mobile app?', a: 'Currently, CricAsh is available as a responsive web application that works beautifully on all devices. A native mobile app is on our roadmap for the future.' },
  { q: 'How does the Fantasy Cricket section work?', a: 'Our Fantasy section provides expert tips including Dream Team picks, Captain/Vice Captain suggestions, pitch reports, and weather conditions to help you make informed fantasy cricket decisions.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="py-8">
      <div className="container-premium max-w-3xl">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 mx-auto text-cricket-500 mb-4" />
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-3">Frequently Asked Questions</h1>
          <p className="text-gray-500 dark:text-gray-400">Everything you need to know about CricAsh</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <GlassCard key={i} className="overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-navy-700 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
