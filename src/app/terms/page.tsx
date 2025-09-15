export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <div className="space-y-4">
        <p>
          Welcome to Coin Worth Checker. By using our website, you agree to these
          Terms of Service. Please read them carefully.
        </p>
        <h2 className="text-2xl font-semibold">1. Use of Our Service</h2>
        <p>
          Coin Worth Checker provides AI-powered coin value estimations for
          informational purposes only. We do not guarantee the accuracy of the
          estimations and are not liable for any financial decisions made based
          on the information provided.
        </p>
        <h2 className="text-2xl font-semibold">2. User Conduct</h2>
        <p>
          You agree not to use the service for any unlawful purpose or in any way
          that could damage, disable, or impair the service.
        </p>
        <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
        <p>
          All content and materials available on Coin Worth Checker, including
          but not limited to text, graphics, website name, code, images and
          logos are the intellectual property of Coin Worth Checker, and are
          protected by applicable copyright and trademark law.
        </p>
        <h2 className="text-2xl font-semibold">4. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify
          you of any changes by posting the new Terms of Service on this page.
        </p>
        <h2 className="text-2xl font-semibold">5. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at{' '}
          <a href="mailto:hpasadkhan@gmail.com" className="text-primary hover:underline">
            hpasadkhan@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
