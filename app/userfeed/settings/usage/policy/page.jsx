"use client";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-[#171b18]">

      <main className="max-w-[760px] mx-auto px-5 md:px-8 py-12 md:py-20">
         <Link
                  href="/userfeed/settings"
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                  <MdArrowBack />
                  <span className="ml-2 text-sm font-medium">Back to Settings</span>
                </Link>

        <header className="mb-12">

          <p className="text-[#b6842a] uppercase tracking-[0.15em] text-xs font-semibold font-sans">
            Data Protection
          </p>

          <h1 className="
            mt-3
            text-3xl md:text-4xl
            font-bold
            text-[#123027]
            font-sans
          ">
            SCAH Privacy Policy
          </h1>

          <p className="mt-3 text-gray-500 text-sm">
            Data Controller: SCAH LIMITED
          </p>

        </header>


        <PolicySection
          number="1"
          title="Scope"
        >

          <p>
            This Policy explains how SCAH collects, uses, discloses,
            and protects personal data of athletes (including minors),
            scouts, academies, and visitors to the Platform.
          </p>

          <p>
            It should be read together with the Cookie Policy and,
            for minors, the Child Safety &amp; Parental Consent Policy.
          </p>

        </PolicySection>



        <PolicySection
          number="2"
          title="Data We Collect"
        >

          <PolicyTable
            headers={[
              "Category",
              "Examples",
              "Source"
            ]}
            rows={[
              [
                "Account data",
                "Name, email, phone, date of birth, password (hashed), profile photo",
                "User-provided"
              ],

              [
                "Athlete profile data",
                'Team ("Super Eagles"), nationality, position, height/weight, performance stats, highlight video/photos',
                "User or guardian-provided"
              ],

              [
                "Minor-specific data",
                "Parent/guardian name and contact, school (optional), verifiable-consent records",
                "Guardian-provided at signup"
              ],

              [
                "Location data",
                'Approximate location used for "trials based on your location and distance"; precise GPS if permission granted',
                "Device, with permission"
              ],

              [
                "Communications",
                "Chat messages, notification interactions",
                "User-generated"
              ],

              [
                "Verification data",
                "Government ID (scouts/academies), academy accreditation documents",
                "User-provided"
              ],

              [
                "Usage/device data",
                "IP address, device identifiers, browser type, pages viewed, session logs",
                "Automatically collected"
              ],

              [
                "Cookies/tracking",
                "See Cookie Policy",
                "Automatically collected"
              ],

              [
                "Special category data",
                "Information inferable from health/injury notes an athlete chooses to add",
                "User-provided (optional; treated as sensitive)"
              ],

            ]}
          />


          <p>
            We do not knowingly collect biometric identifiers (e.g.,
            facial-recognition templates) at this time; if SCAH later
            introduces facial recognition or biometric matching, this
            Policy and consent flows will be updated before launch.
          </p>


        </PolicySection>
                <PolicySection
          number="3"
          title="How We Use Data (Purpose & Legal Basis)"
        >

          <PolicyTable
            headers={[
              "Purpose",
              "NDPA/NDPR basis",
              "GDPR/UK GDPR basis"
            ]}
            rows={[
              [
                "Create/operate account",
                "Contract necessity",
                "Contract necessity; consent for minors' special categories"
              ],

              [
                "Show tryouts by location",
                "Consent (location permission)",
                "Consent"
              ],

              [
                "Enable scout–athlete discovery/matching",
                "Contract necessity / legitimate interest",
                "Legitimate interest, balanced against minors' best interests"
              ],

              [
                "Minor-account safeguarding (Guardian-CC'd Channel, chat monitoring)",
                "Legal obligation / legitimate interest (child protection)",
                "Legitimate interest (child protection)"
              ],

              [
                "Trust & safety moderation, fraud/scam detection",
                "Legitimate interest",
                "Legitimate interest"
              ],

              [
                "Marketing communications",
                "Consent (opt-in)",
                "Consent (opt-in); never direct-marketed to minor accounts"
              ],

              [
                "Legal compliance / law enforcement requests",
                "Legal obligation",
                "Legal obligation"
              ],

              [
                "Product analytics/improvement",
                "Legitimate interest, minimised/pseudonymised",
                "Legitimate interest"
              ]

            ]}
          />

        </PolicySection>
                <PolicySection
          number="4"
          title="Children's Data — Heightened Protections"
        >

          <div className="
            bg-[#f6ecd8]
            border border-[#e3c88a]
            rounded-lg
            p-4
            text-sm
            text-[#5a4319]
          ">
            Applies to accounts aged 13–17. SCAH applies these protections
            irrespective of the user's actual country of residence —
            the strictest global standard, not a jurisdiction-by-jurisdiction one.
          </div>


          <h3 className="font-sans font-semibold text-[#123027] mt-6 mb-3">
            4.1 Where an account belongs to a user aged 13–17
          </h3>


          <ol className="list-[lower-alpha] pl-6 space-y-3">

            <li>
              Verifiable parental/guardian consent obtained before account
              activation.
            </li>

            <li>
              No use of a minor's data for behavioural advertising,
              profiling for marketing, or sale/sharing with data brokers.
            </li>

            <li>
              No public display of precise location, school, or home address.
            </li>

            <li>
              Parent/guardian has standing rights to access, export,
              and delete the minor's data at any time.
            </li>

            <li>
              Retention of minors' data limited to what is necessary,
              with automatic deletion after 6 months of inactivity or
              when the user turns 18 and does not re-consent.
            </li>

          </ol>



          <h3 className="font-sans font-semibold text-[#123027] mt-6 mb-3">
            4.2 Under-13 registration
          </h3>


          <p>
            SCAH does not knowingly collect data from a person under 13
            through a self-registered account. If we learn we have
            inadvertently collected such data, we will delete it promptly
            and notify the submitting guardian.
          </p>


        </PolicySection>




        <PolicySection
          number="5"
          title="Disclosure of Data"
        >

          <h3 className="font-sans font-semibold text-[#123027]">
            5.1 We share data with:
          </h3>


          <ul className="list-disc pl-6 space-y-3">

            <li>
              Other users, based on profile visibility settings and,
              for minors, subject to the Guardian-CC'd Channel.
            </li>

            <li>
              Service providers including hosting, infrastructure,
              cloud storage, analytics, customer support, and
              ID-verification vendors under confidentiality agreements.
            </li>

            <li>
              Academies and scouts users actively engage with through
              tryout applications.
            </li>

            <li>
              Law enforcement/regulators where legally required or
              necessary to protect a child from harm.
            </li>

            <li>
              A successor entity in the event of merger, acquisition,
              or asset sale.
            </li>

          </ul>


          <h3 className="font-sans font-semibold text-[#123027] mt-6">
            5.2
          </h3>


          <p>
            We do not sell personal data and do not share data for
            cross-context behavioural advertising purposes involving
            minors' data.
          </p>


        </PolicySection>





        <PolicySection
          number="6"
          title="International Data Transfers"
        >

          <p>
            SCAH's infrastructure may process data outside Nigeria
            (for example cloud hosting in the EU/US).
          </p>


          <p>
            Where EU/UK resident data is transferred outside the EEA/UK,
            we rely on Standard Contractual Clauses or the UK IDTA,
            supplemented by a transfer risk assessment.
          </p>


          <p>
            Where Nigerian data subjects' information is transferred
            outside Nigeria, SCAH ensures adequate protection consistent
            with NDPA 2023 requirements.
          </p>


        </PolicySection>





        <PolicySection
          number="7"
          title="Data Retention"
        >

          <PolicyTable
            headers={[
              "Data",
              "Retention"
            ]}
            rows={[
              [
                "Active account data",
                "Duration of account + 2 years post-closure for legal/dispute purposes"
              ],

              [
                "Minor account data",
                "Per Section 4.1(e)"
              ],

              [
                "Chat logs involving minors",
                "Retained longer than standard chat logs to support safeguarding investigations"
              ],

              [
                "ID verification documents",
                "Duration of verified status + 1 years"
              ],

              [
                "Marketing consent records",
                "Until withdrawal + statute-of-limitations period"
              ]

            ]}
          />


        </PolicySection>
                <PolicySection
          number="8"
          title="Security"
        >

          <p>
            We apply technical and organisational measures including
            encryption in transit (TLS), access controls, and staff
            training, particularly for personnel with access to minors'
            data or safeguarding reports.
          </p>


          <p>
            In the event of a personal data breach, we will notify the
            Nigeria Data Protection Commission (NDPC) within the NDPA
            mandated timeframe and notify affected users without undue delay.
          </p>


        </PolicySection>




        <PolicySection
          number="9"
          title="Your Rights"
        >

          <p>
            All users may request access, correction, deletion,
            restriction of processing, data portability, and objection
            to processing based on legitimate interest.
          </p>


          <p>
            Guardians of minor accounts may exercise these rights on
            behalf of the minor at any time.
          </p>


          <p>
            EU/UK users may lodge complaints with their local supervisory
            authority.
          </p>


          <p>
            California residents have rights under CCPA/CPRA including
            access, deletion, correction, and opting out of sale/sharing.
          </p>


          <p>
            Verified requests will generally be responded to within
            30 days as a working standard.
          </p>


        </PolicySection>





        <PolicySection
          number="10"
          title="Automated Decision-Making"
        >

          <p>
            SCAH may use algorithms to rank or recommend tryout listings
            or suggested people. These systems do not make final scouting
            or selection decisions.
          </p>


          <p>
            Users may request human review of rankings that materially
            affect their visibility.
          </p>


        </PolicySection>





        <PolicySection
          number="11"
          title="Changes to This Policy"
        >

          <p>
            We will notify users of material changes through in-app
            notices and email at least 30 days in advance.
          </p>


          <p>
            For minor accounts, guardians will also be notified and
            additional consent may be requested where data use expands.
          </p>


        </PolicySection>



        <footer className="
          mt-10
          pt-6
          border-t
          border-gray-200
          text-sm
          text-gray-500
        ">

          SCAH LIMITED is the data controller for information processed
          through the Platform. This page should be read alongside the
          Cookie Policy, Terms of Service, and Child Safety & Parental
          Consent Policy.

        </footer>
              </main>
    </div>
  );
}



function PolicySection({number,title,children}){

return (
<section className="mb-12">

<div className="flex items-center gap-4 mb-5">

<div className="
w-10 h-10 rounded-full
bg-[#123027]
text-white
flex items-center justify-center
font-sans font-bold
">

{number}

</div>


<h2 className="
font-sans
text-xl
font-bold
text-[#123027]
">

{title}

</h2>

</div>


<hr className="
border-[#e2e9e0]
border-2
mb-6
"/>


<div className="space-y-4 leading-7">

{children}

</div>


</section>
)

}




function PolicyTable({headers,rows}){

return (

<div className="overflow-x-auto">

<table className="w-full text-sm border-collapse">


<thead>

<tr className="bg-[#123027] text-white">

{
headers.map(header=>(
<th
key={header}
className="p-3 text-left font-sans"
>
{header}
</th>
))
}

</tr>

</thead>



<tbody>

{
rows.map((row,index)=>(

<tr
key={index}
className="
border-b
border-gray-200
even:bg-[#eef2ec]
"
>

{
row.map((cell,i)=>(

<td
key={i}
className="p-3 align-top"
>
{cell}
</td>

))
}

</tr>

))
}


</tbody>


</table>

</div>

)

}