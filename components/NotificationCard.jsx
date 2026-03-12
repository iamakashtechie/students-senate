import Link from "next/link";

// formats iso date string to a readable form
function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function NotificationCard({ notification, showFull = false }) {
  const {
    id,
    title,
    date,
    description,
    attachments = [],
    important,
  } = notification;

  return (
    <div
      className={`brutalist-card group relative p-6 md:p-8 flex flex-col h-full ${
        important ? "border-l-8 border-l-accent border-primary" : "border-2 border-primary"
      }`}
    >
      {/* important badge */}
      {important && (
        <span className="absolute top-0 right-0 text-[10px] font-display font-black tracking-widest uppercase bg-accent text-primary px-3 py-1 border-b-2 border-l-2 border-primary shadow-[-2px_2px_0_0_#111]">
          Important
        </span>
      )}

      {/* date */}
      <p className="font-display font-bold text-xs uppercase text-primary/80 tracking-widest mb-3 pb-2 border-b-2 border-primary inline-block self-start">
        {formatDate(date)}
      </p>

      {/* title */}
      <h3 className="font-display text-xl md:text-2xl font-black text-primary uppercase leading-tight tracking-tight mb-4 pr-8">
        {title}
      </h3>

      {/* description */}
      <p
        className={`font-body text-sm text-primary/90 font-medium leading-relaxed mb-6 flex-1 ${showFull ? "" : "line-clamp-3"}`}
      >
        {description}
      </p>

      {/* attachments */}
      {attachments.length > 0 && (
        <div className="mt-auto pt-4 border-t-2 border-primary flex flex-wrap gap-2">
          {attachments.map((att, i) => (
            <a
              key={i}
              href={att.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-display font-bold uppercase tracking-widest text-primary border-2 border-primary bg-cream px-3 py-1.5 hover:-translate-y-1 hover:shadow-[2px_2px_0_0_#111] transition-all"
            >
              <span className="bg-primary text-cream px-1.5 py-0.5 mr-1">{att.type === "pdf" ? "PDF" : "IMG"}</span>
              {att.name}
            </a>
          ))}
        </div>
      )}

      {/* read more link shown on listing pages */}
      {!showFull && (
        <div className="mt-6 pt-4 border-t-2 border-primary/20">
          <Link
            href={`/notifications#notice-${id}`}
            className="inline-block text-sm font-display font-black tracking-widest uppercase text-accent hover:text-primary transition-colors hover:translate-x-1 duration-200"
          >
            Read Notice &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
