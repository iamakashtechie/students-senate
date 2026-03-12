import { getMembers, getResolution } from "@/lib/dataStore";
import MemberCard from "@/components/MemberCard";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us | Students' Senate IIEST Shibpur",
};

export default async function AboutPage() {
  const members = await getMembers();
  const resolution = await getResolution();

  return (
    <div className="pt-20 bg-cream">
      {/* hero section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-sand border-b-8 border-primary overflow-hidden">
        {/* large decorative text in background */}
        <p
          className="absolute font-display font-black text-[18vw] text-primary/10 whitespace-nowrap select-none pointer-events-none leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          TRADITION
        </p>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-20 py-16">
          <div className="bg-cream border-4 border-primary p-8 md:p-16 shadow-[16px_16px_0_0_#111] max-w-4xl">
            <span className="section-label bg-accent text-primary">About Us</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-none tracking-tighter uppercase mt-6 mb-4">
              Students&apos;<br />
              <span className="text-secondary border-b-8 border-secondary pb-2 inline-block mt-2">Senate</span>
            </h1>
            <p className="font-body text-xl font-bold uppercase tracking-widest text-primary/80 mt-10 pl-6 border-l-8 border-primary">
              Est. Tradition of Self-Governance
              <br />
              IIEST Shibpur
            </p>
          </div>
        </div>
      </section>

      {/* narrative description */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-primary text-cream border-b-8 border-primary-dark">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* left: illustration block */}
          <div className="w-full lg:w-5/12 flex flex-col gap-12">
            <div className="bg-cream border-4 border-cream p-4 shadow-[12px_12px_0_0_#cd7a47] relative group hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300">
              <div className="absolute -top-6 -left-6 bg-accent text-primary font-display font-black uppercase text-sm px-4 py-2 border-4 border-primary shadow-[4px_4px_0_0_#111]">
                Fig 1. Legacy
              </div>
              <div className="w-full aspect-[4/3] relative border-4 border-primary overflow-hidden bg-primary/10 flex items-center justify-center">
                <Image
                  src="/assets/illustrations/sketch-1.jpeg"
                  alt="senate illustration"
                  fill
                  className="object-cover opacity-80 mix-blend-multiply grayscale contrast-150"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <p className="font-display text-primary/10 text-8xl font-black absolute">
                  IIEST
                </p>
              </div>
            </div>

            <div className="bg-secondary p-8 border-4 border-cream shadow-[8px_8px_0_0_#cd7a47]">
              <p className="font-display font-bold text-xl md:text-2xl text-primary uppercase tracking-tight leading-snug border-l-4 border-primary pl-6">
                &ldquo;The Senate is not merely a student body &mdash; it is the
                living constitution of student life at IIEST Shibpur.&rdquo;
              </p>
            </div>
          </div>

          {/* right: text content */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <h2 className="font-display text-4xl md:text-5xl font-black text-cream uppercase tracking-tight mb-10 border-b-4 border-secondary pb-6 inline-block">
              Constitution & Purpose
            </h2>
            <div className="font-body text-lg text-cream/90 font-medium leading-relaxed space-y-8">
              <p className="bg-cream/10 p-6 border-l-4 border-accent">
                The Students&apos; Senate is the supreme representative body of
                all students at IIEST Shibpur. Established to ensure a democratic
                and transparent system of student governance, the Senate operates
                under a well-defined constitution and works closely with the
                institute administration.
              </p>
              <p>
                The Senate is comprised of two key bodies: the{" "}
                <strong className="text-secondary bg-cream/10 px-2 py-1">Executive Secretariat</strong>,
                which includes professors nominated by the Director and student
                office bearers elected by the General Council; and the{" "}
                <strong className="text-secondary bg-cream/10 px-2 py-1">General Council</strong>, which
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
            </div>
          </div>

        </div>
      </section>

      {/* executive secretariat */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-cream border-b-8 border-primary">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="section-label">Leadership</span>
            <h2 className="font-display text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter mb-6">
              Executive Secretariat
            </h2>
            <div className="inline-block bg-primary text-cream font-display font-bold text-sm uppercase tracking-widest px-6 py-2 border-4 border-primary shadow-[6px_6px_0_0_#111]">
              Academic Year {resolution.year}
            </div>
          </div>

          {/* professors row */}
          <div className="mb-24">
            <div className="flex items-center gap-6 mb-12">
              <h3 className="font-display text-2xl font-black uppercase tracking-widest text-primary whitespace-nowrap">
                Directorial Nominees
              </h3>
              <div className="flex-1 h-2 bg-primary" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.professors.map((prof) => (
                <MemberCard key={prof.id} member={prof} variant="professor" />
              ))}
            </div>
          </div>

          {/* student secretariat row */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <h3 className="font-display text-2xl font-black uppercase tracking-widest text-primary whitespace-nowrap">
                Elected Bearers
              </h3>
              <div className="flex-1 h-2 bg-primary" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
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
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-secondary/20 border-b-8 border-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="section-label">Representatives</span>
              <h2 className="font-display text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter">
                General Council
              </h2>
            </div>
            <div className="bg-primary text-cream font-display font-bold px-6 py-3 border-4 border-primary shadow-[6px_6px_0_0_#111]">
              38 MEMBERS
            </div>
          </div>

          {/* grid of members */}
          <div className="bg-cream border-4 border-primary p-6 md:p-10 shadow-[12px_12px_0_0_#111]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-2">
              {members.generalCouncil.map((m, i) => (
                <div key={m.id} className="flex items-center">
                  <div className="font-display font-black text-primary/30 w-8 text-right mr-4 text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1">
                    <MemberCard member={m} variant="default" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* cta to notifications */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-accent text-primary">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 bg-cream p-12 lg:p-16 border-4 border-primary shadow-[16px_16px_0_0_#111]">
          <div>
            <h3 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter">Stay Informed</h3>
            <p className="font-body text-primary/80 font-bold uppercase tracking-widest text-sm md:text-base mt-4 max-w-lg leading-relaxed">
              Check the latest announcements, notices, and official resolutions from the Senate.
            </p>
          </div>
          <Link
            href="/notifications"
            className="btn-primary text-xl px-10 py-5 whitespace-nowrap"
          >
            Notice Board &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
