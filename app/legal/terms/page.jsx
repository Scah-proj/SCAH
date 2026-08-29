"use client";

import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-[#171b18]">
      <main className="max-w-[760px] mx-auto px-5 md:px-8 py-12 md:py-20">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <MdArrowBack />
          <span className="ml-2 text-sm font-medium">Back to Home</span>
        </Link>

        <header className="mb-12">
          <p className="text-[#b6842a] uppercase tracking-[0.15em] text-xs font-semibold font-sans">
            Legal
          </p>

          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#123027] font-sans">
            SCAH Terms of Service
          </h1>

          <p className="mt-3 text-gray-500 text-sm">
            Operator: SCAH LIMITED
          </p>
        </header>

        <PolicySection number="1" title="Acceptance of Terms">
          <p>
            These Terms of Service ("Terms") form a legally binding agreement
            between you ("User", "you") and SCAH governing your access to and
            use of the SCAH website, mobile applications, and related services
            (collectively, the "Platform").
          </p>

          <p>
            By creating an account, browsing the Platform, or clicking "I
            Agree," you confirm that you have read, understood, and agree to be
            bound by these Terms, our Privacy Policy, our Community Guidelines,
            and (where applicable) our Child Safety &amp; Parental Consent
            Policy, each incorporated by reference.
          </p>

          <p>
            If you are using the Platform on behalf of an organisation (e.g.,
            an academy, club, or scouting agency), you represent that you have
            authority to bind that organisation, and "you" refers to both you
            individually and the organisation.
          </p>

          <p>
            If you do not agree to these Terms, you must not access or use the
            Platform.
          </p>
        </PolicySection>

        <PolicySection number="2" title="Description of Service">
          <p>SCAH is a scouting and talent-discovery platform that enables:</p>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              Athletes to create profiles, share performance content (photos,
              videos, statistics), and discover and apply to tryouts/trials.
            </li>
            <li>
              Scouts, coaches, and trainers to discover athlete talent, engage
              with content, and communicate with athletes (subject to Section 4
              and 8 restrictions where the athlete is a minor).
            </li>
            <li>
              Academies, clubs, and organisations to publish trial/tryout
              listings, evaluate applicants, and communicate with athletes
              and/or their parents/guardians.
            </li>
          </ul>

          <p>
            SCAH is a discovery and communication platform only. SCAH does not:
          </p>

          <ol className="list-[lower-alpha] pl-6 space-y-3">
            <li>
              act as a football/sports agent, intermediary, or players' agent
              as defined under FIFA Regulations on Working with Intermediaries
              or the Nigeria Football Federation ("NFF") regulations, unless
              separately licensed and disclosed;
            </li>
            <li>
              guarantee any tryout outcome, contract offer, transfer, or
              scholarship;
            </li>
            <li>
              verify the professional credentials of every scout or academy
              beyond the tiered verification described in Section 5, and users
              engage with each other at their own risk subject to Section 13
              (Disclaimers).
            </li>
          </ol>

          <p>
            We may add, modify, or discontinue features at any time. Material
            changes affecting minors' safety will not be made without updating
            the Child Safety &amp; Parental Consent Policy and, where required,
            re-obtaining consent.
          </p>
        </PolicySection>

        <PolicySection number="3" title="Eligibility">
          <p>
            You must be at least 13 years old to have any presence on the
            Platform in any form (including a profile created on your behalf).
          </p>

          <p>
            Users aged 13 to 17 may hold an athlete account only where:
          </p>

          <ol className="list-[lower-alpha] pl-6 space-y-3">
            <li>
              a parent or legal guardian has completed the verifiable parental
              consent process described in the Child Safety &amp; Parental
              Consent Policy; and
            </li>
            <li>
              the account is flagged internally as a minor account, triggering
              the restrictions in Section 8.
            </li>
          </ol>

          <p>
            Users under 13 may not create an account. An academy or coach may
            submit a minor under 13 to a tryout listing only through the
            "Guardian-Submitted Prospect" pathway described in the Child Safety
            &amp; Parental Consent Policy, which does not create a public profile
            or messaging capability for the child.
          </p>

          <p>
            Scouts, academies, and organisational users must be at least 18 and
            complete the applicable verification tier in Section 5 before
            contacting any minor account.
          </p>

          <p>
            You may not use the Platform if you are barred from receiving
            services under the laws of Nigeria or any other applicable
            jurisdiction, or if you have previously been removed from the
            Platform for a safeguarding violation.
          </p>
        </PolicySection>

        <PolicySection number="4" title="Accounts">
          <p>
            You must provide accurate, current information and keep it updated.
            Impersonation of any person, academy, or organisation is prohibited
            and will result in immediate suspension.
          </p>

          <p>
            You are responsible for maintaining the confidentiality of your
            login credentials and for all activity under your account. Notify
            us immediately at <a href="mailto:support@scah.club" className="text-teal-700 hover:underline">support@scah.club</a> of any unauthorised
            use.
          </p>

          <p>
            Minor accounts are linked to a parent/guardian account. The
            parent/guardian retains the ability to view activity summaries,
            restrict messaging, and delete the account at any time, as further
            described in the Child Safety &amp; Parental Consent Policy.
          </p>

          <p>
            One person/entity may not maintain more than one active account
            without our written permission (multi-team academies may request
            multiple verified sub-accounts).
          </p>
        </PolicySection>

        <PolicySection number="5" title="Verification Tiers (Scouts, Coaches, Academies)">
          <p>
            To protect minors, organisational and scouting users are placed
            into verification tiers before gaining messaging or contact-
            information access:
          </p>

          <PolicyTable
            headers={["Tier", "Requirements / Access"]}
            rows={[
              [
                "Unverified",
                "Can browse public Explore content only; cannot message any user; cannot view minors' full profiles or contact details.",
              ],
              [
                "Tier 1 — Identity Verified",
                "Government-issued ID submitted and checked; can message adult athletes (18+) only.",
              ],
              [
                "Tier 2 — Organisationally Verified",
                "Tier 1 plus proof of affiliation with a recognised academy, club, or federation-registered entity (accreditation letter, business registration, or federation listing); may message minor athletes only through the guardian-cc'd channel, described in Section 8.3.",
              ],
            ]}
          />

          <p>
            SCAH reserves the right to request additional documentation,
            conduct periodic re-verification, and revoke any tier at its sole
            discretion, including on the basis of user reports.
          </p>

          <p>
            Verification is a risk-reduction measure, not a guarantee of a
            scout's or academy's legitimacy, bona fides, or licensing status.
            Users must exercise independent judgment — see Section 13.
          </p>
        </PolicySection>

        <PolicySection number="6" title="User Content">
          <p>
            "User Content" means any photo, video, text, statistic, profile
            information, or other material a user uploads or submits.
          </p>

          <p>
            You grant SCAH a worldwide, non-exclusive, royalty-free,
            sublicensable license to host, store, reproduce, display, and
            distribute your User Content solely for operating, promoting, and
            improving the Platform (e.g., displaying a highlight reel in
            Explore/Trending). This license ends when you delete the content
            or your account, except content already shared with another user
            (e.g., in a chat) which that recipient may retain, and residual
            copies in backups deleted per our routine retention schedule.
          </p>

          <p>
            For minor accounts, the license requires prior parental/guardian
            consent, is limited to non-commercial platform display (no
            third-party licensing, no use in paid advertising featuring the
            minor without separate, specific written parental consent), and a
            parent/guardian may revoke the license and demand takedown at any
            time, subject to Section 6.6.
          </p>

          <p>
            You represent that you own or have the necessary rights to all User
            Content you submit, and that it does not infringe any third party's
            intellectual property, privacy, or publicity rights.
          </p>

          <p>
            SCAH may remove or restrict any User Content that violates these
            Terms, the Community Guidelines, or applicable law, without prior
            notice where safeguarding is at issue.
          </p>

          <p>
            We may retain and disclose User Content where required by law, to
            respond to legal process, to protect the rights/safety of any
            person, or as necessary to investigate a suspected safeguarding
            violation, even after a deletion request.
          </p>
        </PolicySection>

        <PolicySection number="7" title="Tryouts and Trial Listings">
          <p>
            Academies/organisations posting a tryout listing represent that the
            listing is genuine, that they have authority to conduct the
            tryout, and that all information (dates, venue, eligibility
            criteria, fees if any) is accurate.
          </p>

          <p>
            SCAH does not organise, supervise, insure, or guarantee the safety
            of any in-person tryout. Attendance at any tryout is at the
            athlete's (and, for minors, the parent/guardian's) own risk.
            Organisers are solely responsible for on-site safeguarding, first
            aid, and duty-of-care compliance with applicable child-safeguarding-
            in-sport standards.
          </p>

          <p>
            SCAH may require academies to confirm they carry appropriate
            safeguarding policies and (where the listing targets minors) a
            valid child-protection policy before a listing is published.
          </p>

          <p>
            SCAH may remove any listing that appears fraudulent, requests
            upfront payment from athletes/families for "guaranteed" trial
            access, or otherwise resembles a known scouting-scam pattern.
          </p>
        </PolicySection>

        <PolicySection number="8" title="Communication Between Users (Minor Protections)">
          <p>
            All athlete-to-athlete and scout-to-adult-athlete messaging is
            subject to the Community Guidelines and content moderation
            described there.
          </p>

          <p>
            No direct, private, unsupervised messaging between a verified
            scout/academy account and a minor account is permitted. All such
            communication must occur through the Guardian-CC'd Channel: the
            parent/guardian linked to the minor's account is automatically
            copied on, and may view, every message thread involving that minor.
          </p>

          <p>
            Requests by any user for a minor's off-platform contact details
            (phone number, personal social media, home address), for private
            meetings not disclosed to the parent/guardian, or for images/content
            outside the scope of ordinary scouting evaluation, are strictly
            prohibited and constitute a safeguarding violation reportable under
            Section 14 and our Child Safety &amp; Parental Consent Policy.
          </p>

          <p>
            SCAH uses a combination of automated keyword/pattern detection and
            human review to monitor for grooming indicators in minor-linked
            chats. See the Privacy Policy for how this monitoring is disclosed
            and processed.
          </p>
        </PolicySection>

        <PolicySection number="9" title="Fees">
          <p>
            [Placeholder — no payment flow was identified on the reviewed
            pages. If SCAH introduces paid features (e.g., premium visibility
            for athletes, subscription tiers for academies), a separate Fees
            &amp; Billing Schedule will be incorporated by reference here,
            including refund terms compliant with the Federal Competition and
            Consumer Protection Act 2018.]
          </p>

          <p>
            SCAH will never charge an athlete or family a fee as a condition of
            being considered for, or invited to, a tryout. Any listing that
            does so should be reported immediately.
          </p>
        </PolicySection>

        <PolicySection number="10" title="Intellectual Property">
          <p>
            The Platform, including its design, logos ("SCAH" wordmark and
            associated marks), software, and compiled database of listings, is
            owned by SCAH or its licensors and protected under the Nigerian
            Copyright Act and applicable international treaties.
          </p>

          <p>
            You may not copy, scrape, reverse-engineer, or create derivative
            works from the Platform except as expressly permitted, or use
            automated means (bots, scrapers) to access the Platform without
            prior written consent.
          </p>
        </PolicySection>

        <PolicySection number="11" title="Prohibited Conduct">
          <p>Users must not:</p>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              harass, threaten, or make unwelcome sexual advances toward any
              user, particularly minors;
            </li>
            <li>
              impersonate any person or misrepresent academy/scout affiliation;
            </li>
            <li>
              upload content depicting a minor in a sexualised, exploitative,
              or degrading manner (zero-tolerance — see Section 14.2);
            </li>
            <li>
              solicit payment from athletes/families in exchange for trial
              access, contracts, or "guaranteed" scouting outcomes;
            </li>
            <li>circumvent the Guardian-CC'd Channel or verification tiers;</li>
            <li>upload malware, spam, or engage in phishing;</li>
            <li>
              violate any applicable law, including child protection, data
              protection, and anti-trafficking legislation.
            </li>
          </ul>

          <p>
            Full conduct rules and the enforcement ladder are set out in the
            Community Guidelines.
          </p>
        </PolicySection>

        <PolicySection number="12" title="Suspension and Termination">
          <p>
            We may suspend or terminate any account, with or without notice,
            for violation of these Terms, suspected safeguarding risk, or as
            required by law. Safeguarding-related suspensions take effect
            immediately and pending review.
          </p>

          <p>
            You may delete your account at any time via Settings. For minor
            accounts, deletion may be initiated by the linked parent/guardian
            at any time without requiring the minor's consent.
          </p>

          <p>
            Sections 6.6, 10, 13, 14, 15, and 17 survive termination.
          </p>
        </PolicySection>

        <PolicySection number="13" title="Disclaimers">
          <p>
            THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND,
            EXPRESS OR IMPLIED, TO THE MAXIMUM EXTENT PERMITTED BY LAW.
          </p>

          <p>
            SCAH does not guarantee the accuracy of any user's claimed
            credentials, the outcome of any tryout, or the conduct of any
            third party (including scouts and academies) on or off the
            Platform. Users are responsible for exercising their own judgment,
            and parents/guardians are responsible for supervising minors' use
            of the Platform notwithstanding SCAH's safeguarding measures.
          </p>

          <p>
            SCAH is not liable for events occurring at in-person tryouts
            organised by third parties (see Section 7.2).
          </p>
        </PolicySection>

        <PolicySection number="14" title="Reporting and Safeguarding Escalation">
          <p>
            Any user may report a safety concern via the in-app "Report"
            function or <a href="mailto:support@scah.club" className="text-teal-700 hover:underline">support@scah.club</a>. Reports involving suspected
            child sexual abuse material ("CSAM"), grooming, or trafficking are
            escalated immediately to SCAH's Trust &amp; Safety team and, where
            legally required, reported to the Nigeria Police Force, the
            National Agency for the Prohibition of Trafficking in Persons
            (NAPTIP), and/or the National Center for Missing &amp; Exploited
            Children (NCMEC) reporting channel where the content or user has a
            US nexus, in addition to any equivalent authority in the relevant
            jurisdiction.
          </p>

          <p>
            SCAH has zero tolerance for CSAM. Any account uploading or sharing
            such content will be permanently banned, reported to law
            enforcement, and SCAH will preserve evidence as required by law,
            notwithstanding any deletion request.
          </p>
        </PolicySection>

        <PolicySection number="15" title="Limitation of Liability">
          <p>
            To the maximum extent permitted by Nigerian law, SCAH's aggregate
            liability for any claim arising from these Terms or use of the
            Platform is limited to the greater of (a) the fees you paid to SCAH
            in the 12 months preceding the claim.
          </p>
        </PolicySection>

        <PolicySection number="16" title="Governing Law and Dispute Resolution">
          <p>
            These Terms are governed by the laws of the Federal Republic of
            Nigeria.
          </p>

          <p>
            Disputes will first be addressed through good-faith negotiation,
            then (if unresolved within 30 days) referred to arbitration in
            Lagos, Nigeria under the Arbitration and Mediation Act 2023, save
            that either party may seek injunctive relief in any competent court
            for urgent safeguarding or IP matters.
          </p>

          <p>
            International users: Nothing in this section limits any non-waivable
            statutory right you hold as a consumer under the law of your
            country of residence (including EU/UK/US residents), including the
            right to bring proceedings in your home jurisdiction's courts where
            mandated by local consumer-protection law.
          </p>
        </PolicySection>

        <PolicySection number="17" title="General Provisions">
          <p>
            <strong>Changes to Terms.</strong> We may amend these Terms;
            material changes will be notified in-app or by email at least 14
            days before taking effect, and for minor accounts, will also be
            sent to the linked parent/guardian.
          </p>

          <p>
            <strong>Assignment.</strong> SCAH may assign these Terms in
            connection with a merger, acquisition, or sale of assets, subject
            to the transferee's assumption of these Terms and the Privacy
            Policy.
          </p>

          <p>
            <strong>Severability.</strong> If any provision is found
            unenforceable, the remainder continues in effect.
          </p>

          <p>
            <strong>Entire Agreement.</strong> These Terms, the Privacy Policy,
            Community Guidelines, Child Safety &amp; Parental Consent Policy,
            and (where applicable) the Scout/Academy Verification Agreement
            constitute the entire agreement between you and SCAH.
          </p>

          <p>
            <strong>Contact.</strong> SCAH LIMITED, <a href="mailto:support@scah.club" className="text-teal-700 hover:underline">support@scah.club</a>.
          </p>
        </PolicySection>

        <footer className="mt-10 pt-6 border-t border-gray-200 text-sm text-gray-500">
          SCAH LIMITED — Terms of Service. This page should be read alongside
          the Privacy Policy, Cookie Policy, Community Guidelines, and Child
          Safety &amp; Parental Consent Policy.
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

      <div className="space-y-4 leading-7">{children}</div>
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
              <th key={header} className="p-3 text-left font-sans">
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
                <td key={i} className="p-3 align-top">
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