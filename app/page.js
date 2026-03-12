import Link from "next/link";
import Image from "next/image";
import { getNotifications } from "@/lib/dataStore";
import { getResolution } from "@/lib/dataStore";
import NotificationCard from "@/components/NotificationCard";

// home page is a server component so data is fetched at request time
export default async function HomePage() {
  const notifications = (await getNotifications()).slice(0, 5);
  const resolution = await getResolution();

  return (
    <>
      {/* hero section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-sand border-b-8 border-primary pt-20">
        {/* brutalist background pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: "linear-gradient(#111 2px, transparent 2px), linear-gradient(90deg, #111 2px, transparent 2px)", 
            backgroundSize: "40px 40px" 
          }} 
        />
        
        <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 py-12">
          
          {/* Main Hero Card */}
          <div className="flex-1 bg-cream p-8 md:p-12 lg:p-16 border-4 border-primary shadow-[16px_16px_0_0_#111111] relative">
            <div className="absolute -top-4 -left-4 bg-accent text-primary font-display font-black text-sm uppercase tracking-widest px-4 py-1 border-2 border-primary shadow-[4px_4px_0_0_#111]">
              Est. 1856
            </div>
            
            <p className="font-display font-bold text-sm md:text-md uppercase tracking-widest text-primary/80 mb-6 border-b-2 border-primary pb-2 inline-block">
              IIEST Shibpur
            </p>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-none uppercase tracking-tighter mb-8">
              Students&apos;
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-cream bg-primary px-2 py-1 border-4 border-primary">SENATE</span>
                <span className="absolute top-2 left-2 w-full h-full bg-accent -z-10 border-4 border-primary" />
              </span>
            </h1>

            <p className="font-body text-base md:text-lg font-medium text-primary leading-relaxed max-w-xl mb-10 pl-6 border-l-8 border-accent">
              The apex democratic body representing every student. 
              Bridging the gap between the Students and the Council.
              Committed to transparency and academic excellence.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link href="/about" className="btn-primary text-base md:text-lg">
                About the Senate
              </Link>
              <Link href="/notifications" className="btn-outline text-base md:text-lg">
                Notice Board
              </Link>
            </div>
          </div>

          {/* Image visual block */}
          <div className="hidden lg:block w-full lg:w-5/12">
            <div className="relative border-4 border-primary bg-primary p-4 shadow-[16px_16px_0_0_#111111] group">
              <div className="relative w-full aspect-[3/4] border-4 border-primary overflow-hidden bg-cream">
                <Image
                  src="/assets/imgs/IIEST_Shibpur_Clock.png"
                  alt="IIEST Shibpur Clock Tower"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-bottom grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-primary font-display font-black uppercase text-2xl tracking-tighter px-6 py-3 border-4 border-primary shadow-[8px_8px_0_0_#111]">
                Clock Tower
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* resolution section */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-primary text-cream border-b-8 border-primary-dark">
        <div className="max-w-7xl mx-auto">
          <div className="bg-cream text-primary p-8 md:p-16 border-4 border-cream shadow-[12px_12px_0_0_#cd7a47] relative">
            
            {/* huge quotes decor */}
            <div className="absolute top-4 left-6 text-9xl font-display font-black text-secondary/30 pointer-events-none leading-none select-none">
              &ldquo;
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
              <div className="lg:w-1/3">
                <div className="section-label bg-accent text-primary border-primary shadow-[4px_4px_0_0_#111]">
                  Resolution {resolution.year}
                </div>
                <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mt-4">
                  Our<br />Resolve
                </h2>
              </div>
              <div className="lg:w-2/3">
                <p className="font-display text-xl md:text-3xl font-bold uppercase tracking-tight leading-snug border-l-8 border-primary pl-8 py-2">
                  {resolution.text}
                </p>
                {resolution.updatedAt && (
                  <div className="mt-8 font-display font-bold text-xs uppercase tracking-widest bg-primary text-cream px-3 py-1 inline-block border-2 border-primary">
                    Updated {new Date(resolution.updatedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* what is the senate */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-cream border-b-8 border-primary overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* decorative visual block - brutalist abstraction */}
          <div className="relative order-2 lg:order-1 h-96 w-full max-w-md mx-auto">
            <div className="absolute top-10 left-10 w-full h-full bg-secondary border-4 border-primary shadow-[12px_12px_0_0_#111]" />
            <div className="absolute top-0 left-0 w-full h-full bg-accent border-4 border-primary flex items-center justify-center transition-transform hover:-translate-y-2 hover:-translate-x-2 duration-300">
              <div className="bg-cream p-8 border-4 border-primary w-4/5 shadow-[8px_8px_0_0_#111]">
                <p className="font-display text-5xl font-black uppercase text-center tracking-tighter mb-6 border-b-4 border-primary pb-4">
                  Structures
                </p>
                <ul className="space-y-4 font-display font-bold text-sm uppercase tracking-widest text-primary">
                  {["Executive Secretariat", "General Council", "Academic Units", "Student Clubs"].map((item) => (
                    <li key={item} className="flex flex-col border-2 border-primary p-2 bg-cream hover:bg-primary hover:text-cream transition-colors cursor-default">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* text */}
          <div className="order-1 lg:order-2">
            <span className="section-label">Organization</span>
            <h2 className="font-display text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-none mb-8">
              What is the
              <br />
              <span className="text-secondary">Senate?</span>
            </h2>
            <div className="space-y-6 font-body text-lg font-medium text-primary/90 leading-relaxed border-l-4 border-primary pl-6 mb-10">
              <p>
                The Students&apos; Senate is the apex democratic body representing
                all students of IIEST Shibpur.
              </p>
              <p>
                It comprises the Executive Secretariat &mdash; elected members who oversee
                governance &mdash; and the General Council, consisting of
                representatives from every academic department, society, and club.
              </p>
              <p>
                The Senate serves as the official interface between the student
                community and the institute administration, advocating for student
                welfare, academic reforms, and campus life improvements.
              </p>
            </div>
            <Link href="/about" className="btn-accent text-lg shadow-[6px_6px_0_0_#111] hover:shadow-[4px_4px_0_0_#111]">
              Meet the Council &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* top notifications */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-secondary border-b-8 border-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6 border-b-4 border-primary pb-6">
            <div>
              <span className="section-label bg-cream text-primary border-primary">Live</span>
              <h2 className="font-display text-5xl md:text-7xl font-black text-cream uppercase tracking-tighter drop-shadow-[4px_4px_0_#111]">
                Notices
              </h2>
            </div>
            <Link
              href="/notifications"
              className="btn-primary bg-cream text-primary border-4 hover:bg-primary hover:text-cream shadow-[6px_6px_0_0_#111]"
            >
              View All Notices
            </Link>
          </div>

          {notifications.length === 0 ? (
            <div className="bg-cream border-4 border-primary p-12 text-center shadow-[12px_12px_0_0_#111]">
              <p className="font-display font-bold text-2xl uppercase tracking-widest text-primary/50">
                No active notifications.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notifications.map((n) => (
                <NotificationCard key={n.id} notification={n} />
              ))}
            </div>
          )}

          <div className="mt-12 md:hidden">
            <Link href="/notifications" className="btn-primary w-full text-center border-4">
              View All &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
