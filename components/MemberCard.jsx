import Image from "next/image";

// member card used in the about page
export default function MemberCard({ member, variant = "default" }) {
  const { name, role, department, profilePic, linkedIn, rollNo } = member;

  if (variant === "professor") {
    return (
      <div className="brutalist-card p-6 flex flex-col items-center text-center gap-4 group">
        <div className="w-24 h-24 overflow-hidden border-4 border-primary bg-secondary/30 shadow-[4px_4px_0_0_#111] relative group-hover:-translate-y-1 transition-transform">
          <Image
            src={profilePic || "/assets/imgs/person.jpg"}
            alt={name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            sizes="96px"
          />
        </div>
        <div>
          <p className="font-display font-black text-xl leading-tight uppercase tracking-tight mt-2">
            {name}
          </p>
          <div className="inline-block font-display text-xs font-bold uppercase tracking-widest bg-primary text-cream px-2 py-0.5 mt-2 border-2 border-primary shadow-[2px_2px_0_0_#111]">
            {role}
          </div>
          <p className="font-body text-xs text-primary/80 font-semibold uppercase tracking-wider mt-3 pl-2 border-l-2 border-accent inline-block">{department}</p>
        </div>
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs font-display font-bold uppercase tracking-widest text-primary border-b-2 border-primary hover:text-accent hover:border-accent transition-colors"
          >
            LinkedIn &rarr;
          </a>
        )}
      </div>
    );
  }

  if (variant === "student") {
    return (
      <div className="flex flex-col items-center text-center group">
        <div className="w-20 h-20 overflow-hidden border-2 border-primary bg-secondary/30 shadow-[4px_4px_0_0_#111] relative group-hover:-translate-y-1 transition-transform border-b-4">
          <Image
            src={profilePic || "/assets/imgs/person.jpg"}
            alt={name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            sizes="80px"
          />
        </div>
        <div className="mt-4 flex flex-col items-center">
          <p className="font-display font-bold text-base uppercase tracking-tight text-primary">{name}</p>
          {rollNo && (
            <p className="font-display font-bold text-[10px] tracking-widest text-primary/70 bg-primary/5 px-2 py-0.5 mt-1 border border-primary/20">{rollNo}</p>
          )}
          <p className="font-display text-xs font-bold uppercase tracking-widest text-accent mt-2">
            {role}
          </p>
          <p className="font-body text-[10px] font-semibold text-primary/70 uppercase tracking-widest mt-1 text-center max-w-[140px]">
            {department}
          </p>
        </div>
      </div>
    );
  }

  // default: compact row for general council table
  return (
    <div className="flex items-center gap-4 py-3 border-b-2 border-primary/20 last:border-b-0 hover:bg-secondary/10 px-4 transition-colors group">
      <div className="w-10 h-10 bg-cream border-2 border-primary flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_0_#111] group-hover:-translate-y-0.5 duration-200 overflow-hidden relative">
        <Image
          src={profilePic || "/assets/imgs/person.jpg"}
          alt={name}
          fill
          className="object-cover grayscale group-hover:grayscale-0"
          sizes="40px"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p className="font-display text-sm font-bold text-primary uppercase tracking-wider truncate">
          {name}
        </p>
        <p className="font-body text-xs font-semibold text-primary/60 uppercase tracking-widest truncate">
          {department}
        </p>
      </div>
    </div>
  );
}
