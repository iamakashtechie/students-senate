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
      className={`group relative bg-cream border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        important
          ? "border-l-4 border-l-accent border-secondary"
          : "border-secondary"
      }`}
    >
      {/* important badge */}
      {important && (
        <span className="absolute top-3 right-3 text-[10px] font-body font-semibold tracking-widest uppercase bg-accent text-cream px-2 py-0.5">
          Important
        </span>
      )}

      <div className="p-5">
        {/* date */}
        <p className="font-body text-xs text-primary/60 mb-1">
          {formatDate(date)}
        </p>

        {/* title */}
        <h3 className="font-display text-lg font-semibold text-primary leading-snug mb-2 pr-16">
          {title}
        </h3>

        {/* description */}
        <p
          className={`font-body text-sm text-primary/80 leading-relaxed ${showFull ? "" : "line-clamp-2"}`}
        >
          {description}
        </p>

        {/* attachments */}
        {attachments.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {attachments.map((att, i) => (
              <a
                key={i}
                href={att.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-body font-medium text-primary border border-primary/30 px-2 py-1 hover:bg-primary hover:text-cream transition-colors"
              >
                {/* simple file icon text */}
                {att.type === "pdf" ? "PDF" : "IMG"} &mdash; {att.name}
              </a>
            ))}
          </div>
        )}

        {/* read more link shown on listing pages */}
        {!showFull && (
          <Link
            href={`/notifications#notice-${id}`}
            className="inline-block mt-3 text-xs font-body font-medium text-accent hover:underline"
          >
            View &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
