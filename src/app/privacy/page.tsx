export const metadata = {
  title: "Privacy Policy — 28 Days of AI",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: April 11, 2026</p>

      <h2>1. Overview</h2>
      <p>
        This Privacy Policy explains how thisbeautifulchaos.org (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects
        information in connection with the &ldquo;28 Days of AI&rdquo; SMS
        program (&ldquo;the Program&rdquo;).
      </p>

      <h2>2. Information We Collect</h2>
      <p>When you sign up for the Program, we collect:</p>
      <ul>
        <li>Your mobile phone number</li>
        <li>Your first name (optional)</li>
        <li>
          Your approximate time zone, derived from your IP address at the time
          of signup, so we can deliver messages at 10:00 AM local time
        </li>
        <li>The date of your signup</li>
        <li>A log of which messages have been delivered to you</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect only to:</p>
      <ul>
        <li>Deliver the 28 days of educational SMS messages you signed up for</li>
        <li>Schedule messages at your local time</li>
        <li>Prevent duplicate or missed sends</li>
        <li>Honor STOP requests and maintain an unsubscribe list</li>
        <li>Respond to HELP or support inquiries</li>
      </ul>

      <h2>4. Information Sharing</h2>
      <p>
        <strong>We do not sell, rent, or share your personal information
        with third parties for marketing purposes.</strong> Your phone number
        is only shared with our SMS delivery provider (Twilio) for the sole
        purpose of sending you the messages you signed up for, and with
        Airtable, which we use as our subscriber database. Both providers
        maintain their own privacy policies and data protection standards.
      </p>

      <h2>5. SMS Opt-Out</h2>
      <p>
        You can stop receiving messages at any time by replying{" "}
        <strong>STOP</strong> to any message. Upon receiving STOP, we will
        mark your phone number as unsubscribed and will not send you any
        further messages from the Program.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your phone number and delivery log for the duration of the
        Program and a reasonable period afterward to prevent re-enrollment
        of unsubscribed users and to resolve any support issues. You may
        request deletion of your data at any time by emailing{" "}
        <a href="mailto:avni@thisbeautifulchaos.org">
          avni@thisbeautifulchaos.org
        </a>
        .
      </p>

      <h2>7. Security</h2>
      <p>
        We use commercially reasonable measures to protect your information
        from unauthorized access, alteration, or disclosure. However, no
        method of transmission or storage is 100% secure.
      </p>

      <h2>8. Children&rsquo;s Privacy</h2>
      <p>
        The Program is not intended for children under the age of 13, and
        we do not knowingly collect information from children under 13.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will
        be reflected by the &ldquo;Last updated&rdquo; date at the top of
        this page.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions about this Privacy Policy or to request deletion of
        your data, contact{" "}
        <a href="mailto:avni@thisbeautifulchaos.org">
          avni@thisbeautifulchaos.org
        </a>
        .
      </p>

      <p className="back">
        <a href="/signup">&larr; Back to signup</a>
      </p>
    </main>
  );
}
