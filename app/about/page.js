import { getMembers } from "@/lib/dataStore";
import MemberCard from "@/components/MemberCard";
import Link from "next/link";

export const metadata = {
  title: "About Us | Students' Senate IIEST Shibpur",
};

export default function AboutPage() {
  const members = getMembers();

  return (
    <>
      {/* hero section, different vibe from home */}
      <section className="relative min-h-[70vh] flex items-end bg-cream overflow-hidden pt-16">
        {/* large decorative text in background */}
        <p
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[20vw] text-primary/5 whitespace-nowrap select-none pointer-events-none"
          aria-hidden="true"
        >
          SENATE
        </p>

        {/* vertical accent stripe */}
        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-accent hidden md:block" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-16 lg:px-24 pb-16 pt-32">
          <span className="section-label">About</span>
          <h1 className="font-display text-5xl md:text-7xl font-black text-primary leading-none tracking-tight mt-2">
            Students&apos;
            <br />
            <span className="text-accent">Senate</span>
            <br />
            <span className="text-2xl md:text-3xl font-normal text-primary/60 italic mt-2 block">
              IIEST Shibpur &mdash; est. tradition of self-governance
            </span>
          </h1>
        </div>

        {/* bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-secondary" />
      </section>

      {/* narrative description */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-primary text-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* left: hand-drawn image placeholder and quote */}
          <div className="flex flex-col gap-8">
            {/* placeholder for hand-drawn illustration */}
            <div className="border border-cream/20 p-8 text-center bg-cream/5 relative">
              <p className="font-display italic text-cream/40 text-sm mb-2">
                illustration
              </p>
              <div className="w-full h-48 flex items-center justify-center">
                {/* the actual hand-drawn images will be placed in public/assets/illustrations/ */}
                <img
                  src="/assets/illustrations/sketch-1.jpeg"
                  alt="senate illustration"
                  className="max-h-full object-contain opacity-80"
                />
                <p className="font-display text-cream/20 text-6xl font-bold absolute">
                  IIEST
                </p>
              </div>
            </div>

            <blockquote className="border-l-4 border-accent pl-6">
              <p className="font-display italic text-xl text-cream/80 leading-relaxed">
                &ldquo;The Senate is not merely a student body &mdash; it is the
                living constitution of student life at IIEST Shibpur.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* right: text */}
          <div className="space-y-6 font-body text-cream/80 leading-relaxed">
            <h2 className="font-display text-3xl font-bold text-cream mb-6">
              What is the Student Senate comprised of?
            </h2>
            <p>
              The Students&apos; Senate is the supreme representative body of
              all students at IIEST Shibpur. Established to ensure a democratic
              and transparent system of student governance, the Senate operates
              under a well-defined constitution and works closely with the
              institute administration.
            </p>
            <p>
              The Senate is comprised of two key bodies: the{" "}
              <strong className="text-secondary">Executive Secretariat</strong>,
              which includes professors nominated by the Director and student
              office bearers elected by the General Council; and the{" "}
              <strong className="text-secondary">General Council</strong>, which
              consists of representatives from all academic departments, clubs,
              societies, and special interest groups across the campus.
            </p>
            <p>
              Through regular meetings, the Senate deliberates on matters of
              student welfare, hostel affairs, academic policies,
              extracurricular activities, and grievance redressal &mdash;
              ensuring that the student community has a meaningful voice in
              institutional affairs.
            </p>

            {/* second illustration placeholder */}
            <div className="border border-cream/20 p-6 text-center bg-cream/5 mt-4">
              <img
                src="/assets/illustrations/sketch-2.jpeg"
                alt="senate illustration 2"
                className="max-h-32 object-contain mx-auto opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* executive secretariat */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-cream">
        <div className="max-w-7xl mx-auto">
          <span className="section-label">Leadership</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            The Executive Secretariat
          </h2>
          <p className="font-body text-primary/60 text-sm mb-12 max-w-xl">
            Academic Year 2025&ndash;26. Composition as per the Director&apos;s
            order and election results declared vide DSW/Int/149/25 dated
            07/11/2025.
          </p>

          {/* professors row */}
          <div className="mb-16">
            <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-primary/40 mb-6">
              Professors &mdash; nominated by the Director
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {members.professors.map((prof) => (
                <MemberCard key={prof.id} member={prof} variant="professor" />
              ))}
            </div>
          </div>

          {/* student secretariat row */}
          <div>
            <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-primary/40 mb-6">
              Student Office Bearers &mdash; elected by the General Council
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {members.executiveSecretariat.map((student) => (
                <MemberCard
                  key={student.id}
                  member={student}
                  variant="student"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* general council */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="section-label">Representatives</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
                The General Council
              </h2>
              <p className="font-body text-primary/60 text-sm mt-2">
                38 members representing academic departments, clubs, and
                societies &mdash; AY 2025&ndash;26
              </p>
            </div>
          </div>

          {/* grid of members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {members.generalCouncil.map((m, i) => (
              <div
                key={m.id}
                className="flex items-center gap-3 py-3 border-b border-secondary/40 last:border-0"
              >
                <span className="font-body text-xs text-primary/30 w-6 text-right flex-shrink-0">
                  {i + 1}
                </span>
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-display font-bold text-primary">
                    {m.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-primary truncate">
                    {m.name}
                  </p>
                  <p className="font-body text-xs text-primary/50 truncate">
                    {m.department}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta to notifications */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-accent text-cream">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl font-bold">Stay Informed</h3>
            <p className="font-body text-cream/80 text-sm mt-1">
              Check the latest announcements and notices from the Senate.
            </p>
          </div>
          <Link
            href="/notifications"
            className="bg-cream text-accent font-body font-semibold px-6 py-3 hover:bg-cream/90 transition-colors whitespace-nowrap"
          >
            View Notifications &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
