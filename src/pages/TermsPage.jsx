import { SectionHeader } from '../components/common';

export default function TermsPage() {
  return (
    <div className="py-8">
      <div className="container-premium max-w-4xl">
        <SectionHeader title="Terms & Conditions" subtitle="Last updated: January 2026" />
        <div className="space-y-8">
          {[
            { title: 'Acceptance of Terms', content: 'By accessing and using CricAsh, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our service.' },
            { title: 'Use of Service', content: 'You may use CricAsh for lawful purposes only. You agree not to use the service in any way that could damage, disable, or impair the service.' },
            { title: 'Intellectual Property', content: 'All content on CricAsh, including text, graphics, logos, and software, is the property of CricAsh and is protected by copyright laws.' },
            { title: 'User Content', content: 'Any content you submit to CricAsh, such as comments or feedback, grants us a non-exclusive, royalty-free license to use, modify, and display such content.' },
            { title: 'Disclaimer', content: 'CricAsh provides information on an "as is" basis. We strive for accuracy but cannot guarantee that all information is complete, current, or error-free.' },
            { title: 'Limitation of Liability', content: 'CricAsh shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the service.' },
          ].map(section => (
            <div key={section.title}>
              <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
