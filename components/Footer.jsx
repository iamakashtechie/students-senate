import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-cream mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* brand column */}
          <div>
            <h3 className="font-display text-xl font-bold text-cream mb-3">
              Students&apos; Senate
            </h3>
            <p className="font-body text-sm text-secondary leading-relaxed">
              Indian Institute of Engineering Science and Technology, Shibpur.
              <br />
              Academic Year 2025&ndash;26.
            </p>
          </div>

          {/* quick links */}
          <div>
            <h4 className="font-body font-semibold text-sm tracking-widest uppercase text-secondary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Notifications", href: "/notifications" },
                { name: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact column */}
          <div>
            <h4 className="font-body font-semibold text-sm tracking-widest uppercase text-secondary mb-4">
              Contact
            </h4>
            <p className="font-body text-sm text-cream/80 leading-relaxed">
              IIEST Shibpur
              <br />
              Howrah, West Bengal 711103
              <br />
              India
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-primary-light pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-cream/60">
            &copy; {new Date().getFullYear()} Students&apos; Senate, IIEST
            Shibpur. All rights reserved.
          </p>
          <p className="font-body text-xs text-cream/40">
            built by the web dev team
          </p>
        </div>
      </div>
    </footer>
  );
}
