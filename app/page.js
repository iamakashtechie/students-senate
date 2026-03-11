import Link from "next/link";
import { getNotifications } from "@/lib/dataStore";
import { getResolution } from "@/lib/dataStore";
import NotificationCard from "@/components/NotificationCard";

// home page is a server component so data is fetched at request time
export default function HomePage() {
  const notifications = getNotifications().slice(0, 5);
  const resolution = getResolution();

  return (
    <>
      {/* hero section */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-primary">
        {/* cream diagonal background shape */}
        <div
          className="absolute inset-0 bg-cream"
          style={{ clipPath: "polygon(0 0, 55% 0, 35% 100%, 0 100%)" }}
        />

        {/* secondary accent bar top right */}
        <div className="absolute top-0 right-0 w-1/2 h-2 bg-accent" />

        {/* text block */}
        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-20 pt-32 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-end gap-10">
          <div className="flex-1 max-w-xl">
            {/* small institute logo placeholder */}
            <div className="w-12 h-12 bg-accent mb-8 flex items-center justify-center">
              <span className="text-cream font-display font-bold text-xs text-center leading-tight">
                SS
              </span>
            </div>

            <p className="font-body text-sm md:text-base font-medium text-primary/70 mb-4 tracking-wide">
              Indian Institute of Engineering Science and Technology, Shibpur
            </p>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-none tracking-tight">
              STUDENTS&apos;
              <br />
              <span className="text-accent">SENATE</span>
            </h1>

            <p className="font-body text-sm text-primary/60 mt-6 leading-relaxed max-w-sm">
              The elected body representing every student at IIEST Shibpur
              &mdash; committed to transparency, welfare, and academic
              excellence.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/about" className="btn-primary">
                About the Senate
              </Link>
              <Link href="/notifications" className="btn-outline">
                Notifications
              </Link>
            </div>
          </div>

          {/* clock tower image */}
          <div className="hidden md:flex flex-1 justify-end items-end relative h-96">
            <img
              src="/assets/imgs/IIEST_Shibpur_Clock.png"
              alt="IIEST Shibpur Clock Tower"
              className="h-full object-contain object-bottom"
            />
            {/* decorative secondary box behind image */}
            <div className="absolute bottom-0 right-0 w-4/5 h-3/4 bg-secondary/20 -z-10 rounded-tl-2xl" />
          </div>
        </div>

        {/* bottom band */}
        <div className="relative z-10 bg-primary w-full py-4 px-8 md:px-16 lg:px-24">
          <p className="font-body text-xs text-cream/50 tracking-widest uppercase">
            Academic Year 2025&ndash;26 &nbsp;&bull;&nbsp; Executive Secretariat
            in session
          </p>
        </div>
      </section>

      {/* resolution section */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-primary text-cream">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <span className="section-label bg-secondary/20 text-secondary">
              Resolution {resolution.year}
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 leading-tight">
              Our
              <br />
              <span className="text-accent">Resolve</span>
            </h2>
          </div>
          <div className="md:w-2/3">
            <p className="font-body text-lg leading-relaxed text-cream/80 italic border-l-4 border-accent pl-6">
              &ldquo;{resolution.text}&rdquo;
            </p>
            <p className="font-body text-xs text-cream/40 mt-4">
              {resolution.updatedAt
                ? `Last updated ${new Date(resolution.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`
                : ""}
            </p>
          </div>
        </div>
      </section>

      {/* what is the senate */}
      <section className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* decorative visual block */}
          <div className="relative">
            <div className="w-full aspect-square bg-secondary/20 rounded-sm relative overflow-hidden max-w-md">
              <div className="absolute top-0 left-0 w-1/2 h-1 bg-accent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-10">
                  <p className="font-display text-7xl font-black text-primary/10">
                    SS
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      "Executive Secretariat",
                      "General Council",
                      "Academic Units",
                      "Student Clubs",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                        <p className="font-body text-sm text-primary/60">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* corner decorations */}
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/20" />
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20" />
            </div>
          </div>

          {/* text */}
          <div>
            <span className="section-label">About the Senate</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
              What is the
              <br />
              Student Senate?
            </h2>
            <p className="font-body text-base text-primary/70 leading-relaxed mb-4">
              The Students&apos; Senate is the apex democratic body representing
              all students of IIEST Shibpur. It comprises the Executive
              Secretariat &mdash; nominated and elected members who oversee
              governance &mdash; and the General Council, consisting of
              representatives from every academic department, society, and club.
            </p>
            <p className="font-body text-base text-primary/70 leading-relaxed mb-8">
              The Senate serves as the official interface between the student
              community and the institute administration, advocating for student
              welfare, academic reforms, and campus life improvements.
            </p>
            <Link href="/about" className="btn-primary inline-block">
              Learn More &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* top notifications */}
      <section className="py-20 px-8 md:px-16 lg:px-24 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-label">Latest</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary">
                Notifications
              </h2>
            </div>
            <Link
              href="/notifications"
              className="font-body text-sm font-medium text-accent hover:underline hidden md:block"
            >
              View all &rarr;
            </Link>
          </div>

          {notifications.length === 0 ? (
            <p className="font-body text-primary/50 text-sm">
              no notifications at this time.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notifications.map((n) => (
                <NotificationCard key={n.id} notification={n} />
              ))}
            </div>
          )}

          <div className="mt-8 md:hidden">
            <Link href="/notifications" className="btn-outline inline-block">
              View all notifications &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
