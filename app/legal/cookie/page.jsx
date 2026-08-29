
"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Settings } from "lucide-react";

export default function CookiePolicy() {
  const openCookieSettings = () => {
    window.dispatchEvent(new Event("open-cookie-settings"));
  };

  return (
    <div className="min-h-screen bg-white text-[#171b18]">
      <main className="max-w-[760px] mx-auto px-5 md:px-8 py-12 md:py-20">

        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <MdArrowBack />
          <span className="ml-2 text-sm font-medium">
            Back to Home
          </span>
        </Link>

        <header className="mb-12">
          <p className="text-[#b6842a] uppercase tracking-[0.15em] text-xs font-semibold font-sans">
            Privacy &amp; Data Protection
          </p>

          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#123027] font-sans">
            SCAH Cookie Policy
          </h1>

          <p className="mt-3 text-gray-500 text-sm">
            How SCAH uses cookies and similar technologies
          </p>

          <p className="mt-2 text-xs text-gray-400">
            Last updated: August 29, 2026
          </p>

          {/* Manage Preferences */}
          <button
            type="button"
            onClick={openCookieSettings}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 transition"
          >
            <Settings className="w-4 h-4" />
            Manage Cookie Preferences
          </button>
        </header>

        <PolicySection number="1" title="What This Covers">
          <p>
            This Policy explains how SCAH and its service providers use
            cookies and similar technologies, including local storage,
            SDKs, and pixels, on the Platform.
          </p>

          <p>
            Cookies and similar technologies may be used to support
            essential Platform functionality, remember preferences,
            understand how the Platform is used, and, where applicable,
            support marketing activities.
          </p>
        </PolicySection>

        <PolicySection number="2" title="Categories of Cookies We Use">
          <PolicyTable
            headers={[
              "Category",
              "Purpose",
              "Examples",
              "Consent",
            ]}
            rows={[
              [
                "Strictly Necessary",
                "Required for essential Platform functionality, including authentication, security, and maintaining user sessions.",
                "Authentication/session tokens, security tokens",
                "Not optional",
              ],
              [
                "Preferences",
                "Remembering user choices and preferences to improve the Platform experience.",
                "Language preferences, feed preferences, interface settings",
                "Optional",
              ],
              [
                "Analytics",
                "Understanding how users interact with the Platform so we can identify problems and improve the service.",
                "Page views, session information, usage analytics",
                "Opt-in required",
              ],
              [
                "Marketing",
                "Supporting advertising or marketing measurement where these technologies are used.",
                "Advertising or campaign measurement cookies",
                "Opt-in required",
              ],
            ]}
          />
        </PolicySection>

        <PolicySection number="3" title="Strictly Necessary Cookies">
          <p>
            Strictly necessary cookies are required for SCAH to operate
            properly. These may include cookies or similar technologies
            used for authentication, security, session management, and
            other essential Platform functions.
          </p>

          <p>
            Because these technologies are necessary for the Platform to
            function, they cannot be disabled through the cookie
            preference controls.
          </p>

          <div className="bg-[#f6ecd8] border border-[#e3c88a] rounded-lg p-4 text-sm text-[#5a4319]">
            If you block or delete essential cookies through your browser,
            certain SCAH features, including login and account-related
            functionality, may not work correctly.
          </div>
        </PolicySection>

        <PolicySection number="4" title="Managing Your Cookie Preferences">
          <p>
            When you first visit SCAH, you may be presented with a cookie
            consent banner. The banner allows you to:
          </p>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Accept All:</strong> allow all available cookie
              categories.
            </li>

            <li>
              <strong>Reject Non-Essential:</strong> allow only strictly
              necessary cookies.
            </li>

            <li>
              <strong>Cookie Settings:</strong> choose which optional
              categories you want to allow.
            </li>
          </ul>

          <p>
            You can also revisit your preferences by selecting{" "}
            <strong>Manage Cookie Preferences</strong> above.
          </p>

          <p>
            You may also manage or delete cookies through your browser
            settings. Blocking certain cookies may affect the
            functionality of the Platform.
          </p>
        </PolicySection>

        <PolicySection number="5" title="Third-Party Technologies">
          <p>
            SCAH may use third-party services for functions such as
            hosting, content delivery, analytics, security, error
            monitoring, or other Platform services.
          </p>

          <p>
            Where third-party technologies place non-essential cookies or
            similar tracking technologies on your device, SCAH will seek
            the appropriate consent before activating those technologies
            where required.
          </p>

          <p>
            A current list of relevant third-party processors may be
            requested by contacting{" "}
            <a
              href="mailto:support@scah.club"
              className="text-teal-700 hover:underline"
            >
              support@scah.club
            </a>
            .
          </p>
        </PolicySection>

        <PolicySection number="6" title="Children and Minors">
          <p>
            SCAH is committed to protecting the privacy and safety of
            younger users.
          </p>

          <p>
            Where SCAH identifies an account as belonging to a minor,
            applicable privacy and consent protections will be applied in
            accordance with SCAH's policies and applicable law.
          </p>

          <p>
            SCAH does not use advertising or cross-context behavioural
            tracking on accounts identified as belonging to users under
            18.
          </p>

          <div className="bg-[#f6ecd8] border border-[#e3c88a] rounded-lg p-4 text-sm text-[#5a4319]">
            Advertising and behavioural-tracking technologies should
            remain disabled for accounts identified as belonging to
            minors.
          </div>
        </PolicySection>

        <PolicySection number="7" title="Changes to This Policy">
          <p>
            We may update this Cookie Policy when our technology,
            services, or legal requirements change.
          </p>

          <p>
            Where a change materially affects how we use non-essential
            cookies or similar technologies, we may request consent again
            where required.
          </p>
        </PolicySection>

        <PolicySection number="8" title="Contact Us">
          <p>
            If you have questions about this Cookie Policy or how SCAH
            uses cookies and similar technologies, you can contact us at:
          </p>

          <p>
            <a
              href="mailto:support@scah.club"
              className="text-teal-700 font-medium hover:underline"
            >
              support@scah.club
            </a>
          </p>
        </PolicySection>

        <footer className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500">
          SCAH LIMITED — Cookie Policy. This page should be read alongside
          the Privacy Policy, Terms of Service, and Child Safety &amp;
          Parental Consent Policy.
        </footer>
      </main>
    </div>
  );
}

function PolicySection({ number, title, children }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 rounded-full bg-[#123027] text-white flex items-center justify-center font-sans font-bold flex-shrink-0">
          {number}
        </div>

        <h2 className="font-sans text-xl font-bold text-[#123027]">
          {title}
        </h2>
      </div>

      <hr className="border-[#e2e9e0] border-2 mb-6" />

      <div className="space-y-4 leading-7">
        {children}
      </div>
    </section>
  );
}

function PolicyTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#123027] text-white">
            {headers.map((header) => (
              <th
                key={header}
                className="p-3 text-left font-sans"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 even:bg-[#eef2ec]"
            >
              {row.map((cell, i) => (
                <td
                  key={i}
                  className="p-3 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

