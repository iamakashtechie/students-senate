// member card used in the about page
export default function MemberCard({ member, variant = "default" }) {
  const { name, role, department, profilePic, linkedIn, rollNo } = member;

  if (variant === "professor") {
    return (
      <div className="bg-primary text-cream p-5 flex flex-col items-center text-center gap-3 hover:bg-primary-dark transition-colors">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-secondary bg-secondary/30">
          {profilePic ? (
            <img
              src={profilePic}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-display font-bold text-cream">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="font-display font-semibold text-base leading-tight">
            {name}
          </p>
          <p className="font-body text-xs text-accent font-medium mt-0.5">
            {role}
          </p>
          <p className="font-body text-xs text-cream/70 mt-1">{department}</p>
        </div>
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-body text-secondary hover:text-accent transition-colors"
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
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-secondary bg-secondary/30 group-hover:border-accent transition-colors">
          {profilePic ? (
            <img
              src={profilePic}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-display font-bold text-primary">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="font-body font-semibold text-sm text-primary">{name}</p>
          {rollNo && (
            <p className="font-body text-xs text-primary/50">{rollNo}</p>
          )}
          <p className="font-body text-xs text-accent font-medium mt-0.5">
            {role}
          </p>
          <p className="font-body text-xs text-primary/60 mt-0.5 leading-tight">
            {department}
          </p>
        </div>
      </div>
    );
  }

  // default: compact row for general council table
  return (
    <div className="flex items-center gap-3 py-2 border-b border-secondary/50 last:border-0 hover:bg-secondary/10 px-2 transition-colors">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-display font-bold text-primary">
          {name.charAt(0)}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium text-primary truncate">
          {name}
        </p>
        <p className="font-body text-xs text-primary/60 truncate">
          {department}
        </p>
      </div>
    </div>
  );
}
