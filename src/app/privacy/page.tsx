import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <div className="space-y-4">
        <p>
          Your privacy is important to us. It is Coin Worth Checker's policy to
          respect your privacy regarding any information we may collect from you
          across our website.
        </p>
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p>
          We only collect information about you if we have a reason to do so –
          for example, to provide our Services, to communicate with you, or to
          make our Services better. We collect this information from three
          sources: if and when you provide information to us, automatically
          through operating our Services, and from outside sources.
        </p>
        <h2 className="text-2xl font-semibold">2. How We Use Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our
          services. We do not share your personal information with third-parties,
          except where required by law.
        </p>
        <h2 className="text-2xl font-semibold">3. Security</h2>
        <p>
          We take reasonable precautions to protect your information. We have
          implemented security measures to protect the information we collect.
        </p>
        <h2 className="text-2xl font-semibold">4. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </p>
        <h2 className="text-2xl font-semibold">5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{' '}
          <Link href="/contact" className="text-primary hover:underline">
            our contact page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
