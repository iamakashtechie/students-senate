import { getNotifications } from "@/lib/dataStore";
import NotificationCard from "@/components/NotificationCard";

export const metadata = {
  title: "Notifications | Students' Senate IIEST Shibpur",
};

// group notifications by year-month for a clean timeline display
function groupByMonth(notifications) {
  return notifications.reduce((acc, n) => {
    const d = new Date(n.date);
    const key = isNaN(d)
      ? "Other"
      : d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
    if (!acc[key]) acc[key] = [];
    acc[key].push(n);
    return acc;
  }, {});
}

export default async function NotificationsPage() {
  const notifications = (await getNotifications()).sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  const grouped = groupByMonth(notifications);
  const months = Object.keys(grouped);

  return (
    <>
      {/* page header */}
      <section className="relative pt-28 pb-16 px-8 md:px-16 lg:px-24 bg-primary text-cream overflow-hidden">
        <div
          className="absolute inset-0 bg-cream/5"
          style={{ clipPath: "polygon(0 0, 40% 0, 20% 100%, 0 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <span className="inline-block text-xs font-body font-medium tracking-widest uppercase bg-accent text-cream px-3 py-1 mb-4">
            Official
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-black text-cream leading-none">
            Notifications
          </h1>
          <p className="font-body text-cream/60 text-sm mt-3">
            Announcements, notices, and updates from the Students&apos; Senate,
            IIEST Shibpur.
          </p>
          <p className="font-body text-cream/40 text-xs mt-1">
            {notifications.length} total notice
            {notifications.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* notifications listing */}
      <section className="py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {notifications.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-4xl text-primary/20 font-bold">
                No notices
              </p>
              <p className="font-body text-sm text-primary/40 mt-2">
                check back soon for announcements.
              </p>
            </div>
          )}

          {months.map((month) => (
            <div key={month} className="mb-12">
              {/* month label */}
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-body text-xs font-semibold tracking-widest uppercase text-primary/40">
                  {month}
                </h2>
                <div className="flex-1 h-px bg-secondary/50" />
              </div>

              {/* notices for this month */}
              <div className="space-y-4">
                {grouped[month].map((n) => (
                  <div key={n.id} id={`notice-${n.id}`}>
                    <NotificationCard notification={n} showFull={true} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
