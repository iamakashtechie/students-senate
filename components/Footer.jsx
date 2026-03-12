import Link from "next/link";
import { getResolution } from "@/lib/dataStore";

export default async function Footer() {
  const resolution = await getResolution();
  return (
    <footer className="bg-primary text-cream mt-auto border-t-8 border-primary-dark">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* brand column */}
          <div className="space-y-6">
            <div className="w-16 h-16 bg-cream flex items-center justify-center border-4 border-primary">
              <span className="text-primary text-2xl font-display font-black tracking-tighter">
                SS
              </span>
            </div>
            <div>
              <h3 className="font-display text-3xl font-black text-cream uppercase mb-2 tracking-tight">
                Students&apos; Senate
              </h3>
              <p className="font-body text-sm text-cream/80 leading-relaxed font-medium uppercase tracking-widest">
                IIEST Shibpur (Est. 1856)
                <br />
                Academic Year {resolution.year}
              </p>
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className="font-display font-black text-xl uppercase text-accent border-b-2 border-accent pb-2 mb-6 inline-block tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Notifications", href: "/notifications" },
                { name: "About the Senate", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display font-bold text-sm uppercase tracking-widest text-cream hover:text-accent hover:pl-2 transition-all flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-accent group-hover:w-4 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact column */}
          <div>
            <h4 className="font-display font-black text-xl uppercase text-accent border-b-2 border-accent pb-2 mb-6 inline-block tracking-widest">
              Contact
            </h4>
            <div className="space-y-4">
              <p className="font-body text-sm text-cream/90 leading-relaxed uppercase tracking-wider font-semibold border-l-4 border-secondary pl-4">
                IIEST Shibpur
                <br />
                Botanical Garden Area
                <br />
                Howrah, West Bengal 711103
                <br />
                India
              </p>
              <p className="font-body text-xs text-cream/50 uppercase tracking-widest mt-4">
                Bridging the gap between
                <br />
                Students AND Council
              </p>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t-4 border-primary-light pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display font-bold text-xs text-cream uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Students&apos; Senate
          </p>
          <p className="font-display font-bold text-xs text-secondary uppercase tracking-widest px-4 py-2 border-2 border-secondary hover:bg-secondary hover:text-primary transition-colors cursor-pointer">
            Built by Web Dev Team
          </p>
        </div>
      </div>
    </footer>
  );
}
