import { SectionHeader } from '../components/common';

export default function PrivacyPage() {
  return (
    <div className="py-8">
      <div className="container-premium max-w-4xl">
        <SectionHeader title="Privacy Policy" subtitle="Last updated: January 2026" />
        <div className="prose dark:prose-invert max-w-none">
          {[
            { title: 'Information We Collect', content: 'We collect information you provide directly, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and preferences.' },
            { title: 'How We Use Information', content: 'We use the information to provide and improve our services, personalize your experience, send updates about cricket matches and news, and communicate with you.' },
            { title: 'Cookies and Tracking', content: 'We use cookies and similar technologies to maintain your session, remember your preferences, and analyze usage patterns to improve our platform.' },
            { title: 'Data Sharing', content: 'We do not sell your personal information. We may share anonymized, aggregated data for analytics purposes. We may share information when required by law.' },
            { title: 'Data Security', content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
            { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You can also opt out of marketing communications at any time.' },
            { title: 'Changes to This Policy', content: 'We may update this policy from time to time. We will notify you of any material changes by posting the new policy on this page.' },
          ].map(section => (
            <div key={section.title} className="mb-8">
              <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
